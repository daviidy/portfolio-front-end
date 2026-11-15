import type { Metadata } from "next";
import { SiteHeader } from "@/components/home/sections";
import { WorkshopFlow } from "@/components/workshop/workshop-flow";

export const metadata: Metadata = {
  title: "Is Your Retirement Plan Built to Last?",
  description:
    "Free in-person workshop: the principles that decide whether a retirement plan lasts, a scorecard to grade your plan, and a tax calculator. Saturday, November 21 at 2:00 PM ET, Brandywine Hundred Library, Wilmington, DE.",
};

const POINTS = [
  "The principles that decide whether a retirement plan lasts",
  "A scorecard to grade your own plan out of 30",
  "A calculator that shows what taxes could cost you",
];

export default function WorkshopPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-paper pb-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-[20rem] size-[30rem] rounded-full bg-brand-bronze/25 blur-3xl" />
        <div className="absolute -right-40 top-[8rem] size-[30rem] rounded-full bg-brand-navy/15 blur-3xl" />
      </div>
      <div className="relative">
        <SiteHeader />
        <section className="mx-auto max-w-4xl px-6 pb-8 pt-12 md:pt-16">
          <p className="font-sf text-xs font-semibold uppercase tracking-[0.16em] text-brand-bronze">
            Free workshop · Sat, Nov 21 · 2:00 PM ET
          </p>
          <h1 className="mt-3 font-display text-3xl uppercase leading-tight text-brand-navy sm:text-4xl">
            Is your retirement plan built to last?
          </h1>
          <p className="mt-3 max-w-2xl font-sf text-base text-brand-navy/80">
            Brandywine Hundred Library, 1300 Foulk Rd, Wilmington, DE. Limited seats.
          </p>
          <ul className="mt-5 space-y-2 font-sf text-sm text-brand-navy/80">
            {POINTS.map((p) => (
              <li key={p}>• {p}</li>
            ))}
          </ul>
        </section>
        <section className="mx-auto max-w-4xl px-6">
          <WorkshopFlow />
        </section>
      </div>
    </main>
  );
}
