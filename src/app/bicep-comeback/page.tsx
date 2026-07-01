"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { PasswordGate } from "@/components/password-gate";

const NAVY = "#1F3A5F";
const ACCENT = "#EAF1F8";
const GREEN = "#2E7D32";

const STORAGE_KEY = "dy_bicep_comeback_v1";

type SessionType = "gym-tue" | "gym-thu" | "home";

const SESSIONS: { id: SessionType; label: string }[] = [
  { id: "gym-tue", label: "Gym · Tue" },
  { id: "gym-thu", label: "Gym · Thu" },
  { id: "home", label: "Home" },
];

type Exercise = { name: string; target: string };
type ExerciseLog = { done: boolean; weight: string; actual: string };
type SessionMeta = { date: string; notes: string };

type Store = {
  exercises: Record<string, ExerciseLog>;
  sessions: Record<string, SessionMeta>;
  measurements: Record<number, string>;
};

const EMPTY_STORE: Store = { exercises: {}, sessions: {}, measurements: {} };

const GYM_W1_2: Exercise[] = [
  { name: "Incline dumbbell curl", target: "3 x 10-12" },
  { name: "Cable curl (single arm or bar)", target: "3 x 12-15" },
  { name: "Hammer curl", target: "3 x 10" },
  { name: "Spider curl / preacher curl", target: "2 x 12" },
];

const GYM_W3_4: Exercise[] = [
  { name: "Barbell curl", target: "3 x 8" },
  { name: "Incline dumbbell curl (push the weight)", target: "4 x 8-10" },
  { name: "Cable curl", target: "3 x 10-12" },
  { name: "Spider curl (3 sec eccentric)", target: "3 x 10" },
  { name: "Hammer curl", target: "2 x 10" },
];

const HOME_W1_2: Exercise[] = [
  { name: "Band standing curl (double)", target: "4 x 15-20" },
  { name: "Dumbbell concentration curl", target: "3 x 10-12" },
  { name: "Band incline curl", target: "3 x 15" },
  { name: "Dumbbell 21s", target: "2 rounds" },
  { name: "Hammer curl", target: "3 x 12" },
];

const HOME_W3_4: Exercise[] = [
  { name: "Band standing curl (heavier band / slower)", target: "4 x 15-20" },
  { name: "Dumbbell concentration curl (4 sec down)", target: "3 x 10" },
  { name: "Band drag curl", target: "3 x 12" },
  { name: "Dumbbell 21s", target: "3 rounds" },
  { name: "Cross-body hammer curl (each arm)", target: "3 x 10" },
];

function getExercises(week: number, session: SessionType): Exercise[] {
  const phase2 = week >= 3;
  if (session === "home") return phase2 ? HOME_W3_4 : HOME_W1_2;
  return phase2 ? GYM_W3_4 : GYM_W1_2;
}

const PHASE_LABEL: Record<number, string> = {
  1: "Foundation",
  2: "Foundation",
  3: "Intensification",
  4: "Intensification",
};

function BicepContent() {
  const [store, setStore] = useState<Store>(EMPTY_STORE);
  const [loaded, setLoaded] = useState(false);
  const [week, setWeek] = useState(1);
  const [session, setSession] = useState<SessionType>("gym-tue");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setStore({ ...EMPTY_STORE, ...JSON.parse(raw) });
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }, [store, loaded]);

  const exercises = getExercises(week, session);

  function exerciseKey(name: string) {
    return `${week}-${session}-${name}`;
  }
  function getExercise(name: string): ExerciseLog {
    return store.exercises[exerciseKey(name)] ?? { done: false, weight: "", actual: "" };
  }
  function updateExercise(name: string, patch: Partial<ExerciseLog>) {
    setStore((s) => ({
      ...s,
      exercises: {
        ...s.exercises,
        [exerciseKey(name)]: { ...getExercise(name), ...patch },
      },
    }));
  }

  const sessionKey = `${week}-${session}`;
  function getSessionMeta(): SessionMeta {
    return store.sessions[sessionKey] ?? { date: "", notes: "" };
  }
  function updateSessionMeta(patch: Partial<SessionMeta>) {
    setStore((s) => ({
      ...s,
      sessions: { ...s.sessions, [sessionKey]: { ...getSessionMeta(), ...patch } },
    }));
  }

  function getMeasurement(w: number): string {
    return store.measurements[w] ?? "";
  }
  function updateMeasurement(w: number, value: string) {
    setStore((s) => ({ ...s, measurements: { ...s.measurements, [w]: value } }));
  }

  if (!loaded) return null;

  const meta = getSessionMeta();

  return (
    <main className="flex flex-col min-h-[70vh] space-y-6 pb-16">
      <Link
        href="/fitness"
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ChevronLeft className="size-4" />
        Back to Fitness
      </Link>

      <div className="space-y-1">
        <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
          4-Week Arm Explosion
        </p>
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: NAVY }}>
          Bicep Push
        </h1>
        <p className="text-sm text-muted-foreground">Goal: 16.5&quot; → 17.5&quot; by end of month</p>
      </div>

      {/* Key rules */}
      <div className="rounded-lg p-4 flex gap-3 text-sm" style={{ background: ACCENT, color: NAVY }}>
        <AlertTriangle className="size-5 shrink-0 mt-0.5" />
        <p>
          <strong>Rules:</strong> slow 2-3 sec eccentrics on every rep — this is where
          growth happens. No momentum. Squeeze at the top. Protein 1g/lb daily. Measure
          same arm, flexed, every Monday morning.
        </p>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium" style={{ color: NAVY }}>
            Week {week} of 4 · {PHASE_LABEL[week]}
          </span>
          <span className="text-muted-foreground font-mono text-xs">
            {Math.round((week / 4) * 100)}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${(week / 4) * 100}%`, background: GREEN }}
          />
        </div>
      </div>

      {/* Weekly measurement log */}
      <div className="rounded-lg border border-border p-4 space-y-3">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
          Weekly Measurement — flexed, inches (measure every Monday)
        </p>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((w) => (
            <div key={w} className="space-y-1">
              <label className="text-xs text-muted-foreground">Wk {w}</label>
              <input
                type="text"
                value={getMeasurement(w)}
                onChange={(e) => updateMeasurement(w, e.target.value)}
                placeholder='16.5"'
                className="w-full border border-border rounded-lg px-2 py-1.5 text-sm"
                style={w === week ? { borderColor: NAVY, outline: "none" } : undefined}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Week selector */}
      <div className="space-y-1.5">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide">Select Week</p>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((w) => (
            <button
              key={w}
              onClick={() => setWeek(w)}
              className={`rounded-lg py-2 text-sm font-semibold border transition-colors ${
                week === w ? "" : "border-border"
              }`}
              style={week === w ? { background: NAVY, color: "white", borderColor: NAVY } : undefined}
            >
              Week {w}
            </button>
          ))}
        </div>
      </div>

      {/* Session tabs */}
      <div className="flex gap-2 border-b border-border pb-2">
        {SESSIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSession(s.id)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={
              session === s.id
                ? { background: NAVY, color: "white" }
                : { background: ACCENT, color: NAVY }
            }
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Session date + notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Date</label>
          <input
            type="date"
            value={meta.date}
            onChange={(e) => updateSessionMeta({ date: e.target.value })}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Notes</label>
          <input
            type="text"
            value={meta.notes}
            onChange={(e) => updateSessionMeta({ notes: e.target.value })}
            placeholder="How did it feel? Any PRs?"
            className="w-full border border-border rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Exercise list */}
      <div className="rounded-lg border border-border overflow-hidden">
        <div
          className="hidden sm:grid grid-cols-[28px_1fr_110px_110px] gap-3 px-4 py-2 text-xs font-mono uppercase tracking-wide text-muted-foreground"
          style={{ background: ACCENT }}
        >
          <span></span>
          <span>Exercise</span>
          <span>Weight</span>
          <span>Actual</span>
        </div>
        {exercises.map((ex) => {
          const log = getExercise(ex.name);
          return (
            <div
              key={ex.name}
              className="grid grid-cols-1 sm:grid-cols-[28px_1fr_110px_110px] items-center gap-2 sm:gap-3 px-4 py-3 border-t border-border first:border-t-0"
            >
              <input
                type="checkbox"
                checked={log.done}
                onChange={(e) => updateExercise(ex.name, { done: e.target.checked })}
                className="size-5"
                style={{ accentColor: GREEN }}
              />
              <div>
                <p className="text-sm font-medium" style={{ color: log.done ? GREEN : NAVY }}>
                  {ex.name}
                </p>
                <p className="text-xs text-muted-foreground font-mono">{ex.target}</p>
              </div>
              <input
                type="text"
                value={log.weight}
                onChange={(e) => updateExercise(ex.name, { weight: e.target.value })}
                placeholder="Weight"
                className="w-full border border-border rounded-lg px-2 py-1.5 text-sm"
              />
              <input
                type="text"
                value={log.actual}
                onChange={(e) => updateExercise(ex.name, { actual: e.target.value })}
                placeholder="Reps"
                className="w-full border border-border rounded-lg px-2 py-1.5 text-sm"
              />
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground text-center pt-4">
        Data is saved automatically on this device.
      </p>
    </main>
  );
}

export default function BicepComebackPage() {
  return (
    <PasswordGate>
      <BicepContent />
    </PasswordGate>
  );
}
