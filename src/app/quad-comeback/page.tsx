"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { PasswordGate } from "@/components/password-gate";

const NAVY = "#1F3A5F";
const ACCENT = "#EAF1F8";
const GREEN = "#2E7D32";
const RED = "#C62828";

const STORAGE_KEY = "dy_quad_comeback_v1";

type Exercise = { name: string; target: string };
type ExerciseLog = { done: boolean; weight: string; actual: string };
type DayMeta = { date: string; pain: "yes" | "no" | null; notes: string };
type CheckLog = { wallSitL: string; wallSitR: string; stepUpsL: string; stepUpsR: string };

type Store = {
  exercises: Record<string, ExerciseLog>;
  days: Record<string, DayMeta>;
  checks: Record<number, CheckLog>;
};

const EMPTY_STORE: Store = { exercises: {}, days: {}, checks: {} };

const PHASES: { id: number; title: string; weeks: number[]; exercises: Exercise[] }[] = [
  {
    id: 1,
    title: "Phase 1 — Rebuild the Foundation",
    weeks: [1, 2],
    exercises: [
      { name: "Wall sit (both legs)", target: "3 x 30-45 sec" },
      { name: "Bodyweight squat", target: "3 x 12" },
      { name: 'Right-leg step-up (low step, 6-8")', target: "3 x 10" },
      { name: "Right-leg split squat / Spanish squat", target: "3 x 10" },
      { name: "Single-leg glute bridge (right)", target: "3 x 12" },
      { name: "Terminal knee extension w/ band (right)", target: "3 x 15" },
      { name: "Calf raise, single leg (right)", target: "3 x 15" },
    ],
  },
  {
    id: 2,
    title: "Phase 2 — Add Load + Single-Leg Volume",
    weeks: [3, 4],
    exercises: [
      { name: "Goblet squat (holding weight)", target: "3 x 10" },
      { name: "Right-leg Bulgarian split squat (back foot elevated)", target: "4 x 8" },
      { name: 'Right-leg step-up, higher step (12-14") + light weight', target: "3 x 10" },
      { name: "Single-leg RDL (right), bodyweight/light weight", target: "3 x 10" },
      { name: "Single-leg wall sit hold (right)", target: "3 x 20-30 sec" },
      { name: "Lateral band walks", target: "3 x 10 each direction" },
    ],
  },
  {
    id: 3,
    title: "Phase 3 — Strength Phase",
    weeks: [5, 6],
    exercises: [
      { name: "Right-leg Bulgarian split squat (weighted)", target: "4 x 6-8" },
      { name: "Single-leg box squat (right), to chair", target: "4 x 6-8" },
      { name: "Goblet squat (heavier)", target: "3 x 8" },
      { name: "Single-leg RDL (right), weighted", target: "3 x 8" },
      { name: "Step-down (right), slow eccentric (4 sec down)", target: "3 x 8" },
      { name: "Single-leg calf raise (right), weighted", target: "3 x 12" },
    ],
  },
  {
    id: 4,
    title: "Phase 4 — Power + Peak Strength",
    weeks: [7, 8],
    exercises: [
      { name: "Right-leg Bulgarian split squat (heaviest load yet)", target: "4 x 6" },
      { name: "Single-leg box squat (right), deeper if tolerated", target: "4 x 6" },
      { name: "Tempo step-ups (right), 3 sec up / 3 sec down", target: "3 x 8" },
      { name: "Small hop-and-hold (right leg) — only if cleared, no pain history", target: "3 x 5" },
      { name: "Single-leg RDL (right), heaviest load", target: "3 x 8" },
      { name: "Single-leg wall sit hold (right)", target: "3 x 40-60 sec" },
    ],
  },
];

const CHECK_WEEKS = [2, 4, 6, 8];

function getPhaseForWeek(week: number) {
  return PHASES.find((p) => p.weeks.includes(week))!;
}

function QuadComebackContent() {
  const [store, setStore] = useState<Store>(EMPTY_STORE);
  const [loaded, setLoaded] = useState(false);
  const [week, setWeek] = useState(1);
  const [day, setDay] = useState<number | "check">(1);

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

  const phase = getPhaseForWeek(week);
  const hasCheck = CHECK_WEEKS.includes(week);

  function exerciseKey(name: string) {
    return `${week}-${day}-${name}`;
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

  const dayKey = `${week}-${day}`;
  function getDayMeta(): DayMeta {
    return store.days[dayKey] ?? { date: "", pain: null, notes: "" };
  }
  function updateDayMeta(patch: Partial<DayMeta>) {
    setStore((s) => ({
      ...s,
      days: { ...s.days, [dayKey]: { ...getDayMeta(), ...patch } },
    }));
  }

  function getCheck(): CheckLog {
    return store.checks[week] ?? { wallSitL: "", wallSitR: "", stepUpsL: "", stepUpsR: "" };
  }
  function updateCheck(patch: Partial<CheckLog>) {
    setStore((s) => ({
      ...s,
      checks: { ...s.checks, [week]: { ...getCheck(), ...patch } },
    }));
  }

  function selectWeek(w: number) {
    setWeek(w);
    setDay(1);
  }

  if (!loaded) return null;

  const dayMeta = getDayMeta();

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
          8-Week Home Strength Program
        </p>
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: NAVY }}>
          Right Quad Comeback
        </h1>
      </div>

      {/* Safety copy */}
      <div className="rounded-lg p-4 flex gap-3 text-sm" style={{ background: ACCENT, color: NAVY }}>
        <AlertTriangle className="size-5 shrink-0 mt-0.5" />
        <p>
          <strong>Pain rule:</strong> mild fatigue is fine; sharp/stabbing pain or next-day
          swelling means stop that exercise and ease off load. This is a general home-exercise
          progression, not medical advice — check back with your PT/surgeon if anything changes.
        </p>
      </div>

      {/* Progress indicator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium" style={{ color: NAVY }}>
            Week {week} of 8 · {phase.title}
          </span>
          <span className="text-muted-foreground font-mono text-xs">
            {Math.round((week / 8) * 100)}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${(week / 8) * 100}%`, background: GREEN }}
          />
        </div>
      </div>

      {/* Week selector grouped by phase */}
      <div className="space-y-3">
        {PHASES.map((p) => (
          <div key={p.id} className="space-y-1.5">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
              {p.title}
            </p>
            <div className="flex gap-2">
              {p.weeks.map((w) => (
                <button
                  key={w}
                  onClick={() => selectWeek(w)}
                  className={`flex-1 rounded-lg py-2 text-sm font-semibold border transition-colors ${
                    week === w ? "" : "border-border"
                  }`}
                  style={week === w ? { background: NAVY, color: "white", borderColor: NAVY } : undefined}
                >
                  Week {w}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Day tabs */}
      <div className="flex gap-2 border-b border-border pb-2">
        {[1, 2, 3].map((d) => (
          <button
            key={d}
            onClick={() => setDay(d)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={day === d ? { background: NAVY, color: "white" } : { background: ACCENT, color: NAVY }}
          >
            Day {d}
          </button>
        ))}
        {hasCheck && (
          <button
            onClick={() => setDay("check")}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors ml-auto"
            style={day === "check" ? { background: GREEN, color: "white" } : { background: ACCENT, color: GREEN }}
          >
            Progress Check
          </button>
        )}
      </div>

      {day !== "check" ? (
        <div className="space-y-6">
          {/* Day extras */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Date</label>
              <input
                type="date"
                value={dayMeta.date}
                onChange={(e) => updateDayMeta({ date: e.target.value })}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Pain/swelling after?</label>
              <div className="flex gap-2">
                <button
                  onClick={() => updateDayMeta({ pain: "no" })}
                  className={`flex-1 rounded-lg py-2 text-sm font-medium border transition-colors ${
                    dayMeta.pain === "no" ? "" : "border-border"
                  }`}
                  style={dayMeta.pain === "no" ? { background: GREEN, color: "white", borderColor: GREEN } : undefined}
                >
                  No
                </button>
                <button
                  onClick={() => updateDayMeta({ pain: "yes" })}
                  className={`flex-1 rounded-lg py-2 text-sm font-medium border transition-colors ${
                    dayMeta.pain === "yes" ? "" : "border-border"
                  }`}
                  style={dayMeta.pain === "yes" ? { background: RED, color: "white", borderColor: RED } : undefined}
                >
                  Yes
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Notes</label>
              <input
                type="text"
                value={dayMeta.notes}
                onChange={(e) => updateDayMeta({ notes: e.target.value })}
                placeholder="Optional notes"
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
            {phase.exercises.map((ex) => {
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
                    placeholder="Reps/time"
                    className="w-full border border-border rounded-lg px-2 py-1.5 text-sm"
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-border p-4 space-y-4">
          <p className="text-sm font-semibold" style={{ color: GREEN }}>
            Biweekly Progress Check — Week {week}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                Single-leg wall sit hold (seconds)
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={getCheck().wallSitL}
                  onChange={(e) => updateCheck({ wallSitL: e.target.value })}
                  placeholder="Left leg"
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  value={getCheck().wallSitR}
                  onChange={(e) => updateCheck({ wallSitR: e.target.value })}
                  placeholder="Right leg"
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                Single-leg step-ups in 60 sec
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={getCheck().stepUpsL}
                  onChange={(e) => updateCheck({ stepUpsL: e.target.value })}
                  placeholder="Left leg"
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  value={getCheck().stepUpsR}
                  onChange={(e) => updateCheck({ stepUpsR: e.target.value })}
                  placeholder="Right leg"
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center pt-4">
        Data is saved automatically on this device. Not medical advice.
      </p>
    </main>
  );
}

export default function QuadComebackPage() {
  return (
    <PasswordGate>
      <QuadComebackContent />
    </PasswordGate>
  );
}
