import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/home/sections";
import { CalculatorGatePage } from "@/components/resources/calculator-gate-page";

export const metadata: Metadata = {
  title: "Retirement Tax Calculator",
  description:
    "Free calculator: see how long your 401(k), IRA or brokerage account will last and what taxes will really cost you.",
};

export default function RetirementTaxCalculatorPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-paper pb-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-[20rem] size-[30rem] rounded-full bg-brand-bronze/25 blur-3xl" />
        <div className="absolute -right-40 top-[8rem] size-[30rem] rounded-full bg-brand-navy/15 blur-3xl" />
      </div>
      <div className="relative">
        <SiteHeader />
        <section className="mx-auto max-w-4xl px-6 pb-8 pt-12 md:pt-16">
          <Link href="/resources" className="font-sf text-sm text-brand-navy/70 underline-offset-4 hover:underline">
            ← All resources
          </Link>
          <h1 className="mt-4 font-display text-3xl uppercase leading-tight text-brand-navy sm:text-4xl">
            Retirement Tax Calculator
          </h1>
          <p className="mt-3 max-w-2xl font-sf text-base text-brand-navy/80">
            Change the amber boxes and everything updates. See what taxes cost you and how long your money lasts.
          </p>
        </section>
        <section className="mx-auto max-w-5xl px-6">
          <CalculatorGatePage />
        </section>
      </div>
    </main>
  );
}
