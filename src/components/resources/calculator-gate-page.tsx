"use client";

import { LeadGate, useUnlocked } from "@/components/resources/lead-gate";
import { RetirementCalculator } from "@/components/resources/retirement-calculator";

export function CalculatorGatePage() {
  const { state, unlock } = useUnlocked("retirement-tax-calculator");

  if (state === "loading") return <div className="min-h-[24rem]" aria-busy="true" />;
  if (state === "open") return <RetirementCalculator />;

  return (
    <div className="mx-auto grid max-w-4xl gap-8 rounded-3xl border border-brand-bronze/30 bg-white/70 p-6 shadow-[0_18px_40px_-20px_rgba(17,42,70,0.35)] backdrop-blur sm:p-10 md:grid-cols-2">
      <div className="space-y-4">
        <p className="font-sf text-xs font-semibold uppercase tracking-[0.16em] text-brand-bronze">Free tool</p>
        <h2 className="font-display text-xl uppercase leading-tight text-brand-navy sm:text-2xl">
          See what taxes will really cost you
        </h2>
        <ul className="space-y-2 font-sf text-sm text-brand-navy/80">
          <li>• How long your 401(k), IRA or brokerage account will last</li>
          <li>• Exactly how much tax you pay on the way out</li>
          <li>• A 15-question scorecard that grades your plan out of 30</li>
        </ul>
        <p className="font-sf text-sm text-brand-navy/70">Enter your details and it opens right here, instantly.</p>
      </div>
      <LeadGate resource="retirement-tax-calculator" tag="Retirement Tax Calculator" onUnlock={unlock} />
    </div>
  );
}
