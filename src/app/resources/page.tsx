import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calculator } from "lucide-react";
import { SiteHeader } from "@/components/home/sections";

export const metadata: Metadata = {
  title: "Resources",
  description: "Free tools to see what taxes will cost you in retirement and how long your money will last.",
};

const RESOURCES = [
  {
    href: "/resources/retirement-tax-calculator",
    icon: Calculator,
    kicker: "Free calculator",
    title: "Retirement Tax Calculator",
    body: "See how long your 401(k), IRA or brokerage account will last, what you will pay in taxes, and grade your plan with a 15-question scorecard.",
    cta: "Get the calculator",
  },
];

export default function ResourcesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-paper pb-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-[20rem] size-[30rem] rounded-full bg-brand-bronze/25 blur-3xl" />
        <div className="absolute -right-40 top-[8rem] size-[30rem] rounded-full bg-brand-navy/15 blur-3xl" />
      </div>
      <div className="relative">
        <SiteHeader />
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-14 md:pt-20">
          <p className="font-sf text-xs font-semibold uppercase tracking-[0.16em] text-brand-bronze">Resources</p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl uppercase leading-tight text-brand-navy sm:text-4xl">
            Free tools to take the guesswork out of money
          </h1>
        </section>
        <section className="mx-auto grid max-w-6xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group flex flex-col rounded-3xl border-2 border-brand-bronze/70 bg-white/45 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(17,42,70,0.06),0_18px_40px_-16px_rgba(17,42,70,0.28)] backdrop-blur-2xl transition hover:-translate-y-1"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-brand-navy text-brand-cream">
                <r.icon className="size-5" />
              </span>
              <p className="mt-5 font-sf text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-bronze">{r.kicker}</p>
              <h2 className="mt-1 font-sf text-xl font-bold text-brand-navy">{r.title}</h2>
              <p className="mt-2 flex-1 font-sf text-sm leading-relaxed text-brand-navy/80">{r.body}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-sf text-sm font-semibold text-brand-bronze">
                {r.cta}
                <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
