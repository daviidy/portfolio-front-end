"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const PROGRAMS = [
  {
    href: "/quad-comeback",
    emoji: "🦵",
    title: "Right Quad Comeback",
    subtitle: "8-Week · Patellar Tendon Recovery",
    description:
      "Phase-by-phase strength rebuilding after surgical repair — wall sits to single-leg box squats. Track every session, weight, and biweekly strength checks.",
  },
  {
    href: "/bicep-comeback",
    emoji: "💪",
    title: "Bicep Push",
    subtitle: "4-Week · Arm Explosion",
    description:
      '16.5" → 17.5" by end of month. Gym Tue/Thu + home sessions engineered for maximum arm growth: incline curls, cables, 21s, and slow eccentrics.',
  },
];

export default function FitnessPage() {
  return (
    <main className="flex flex-col min-h-[70vh] space-y-8">
      <Link
        href="/"
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ChevronLeft className="size-4" />
        Back
      </Link>

      <div className="space-y-1">
        <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
          Personal
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Fitness Trackers</h1>
        <p className="text-sm text-muted-foreground">
          Active programs — password protected, auto-saved to this device.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PROGRAMS.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group flex flex-col gap-4 border border-border rounded-xl p-6 hover:border-foreground/30 hover:bg-muted/40 transition-all"
          >
            <div className="text-4xl">{p.emoji}</div>
            <div className="flex-1 space-y-1.5">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
                {p.subtitle}
              </p>
              <h2 className="text-xl font-bold">{p.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
            </div>
            <span className="text-sm font-medium text-foreground/60 group-hover:text-foreground transition-colors">
              Open tracker →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
