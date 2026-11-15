import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/home/sections";
import { bookingHref } from "@/data/site";

export const metadata: Metadata = {
  title: "Book a one-on-one call",
  description: "Pick a time for a private one-on-one retirement plan review.",
};

export default function WorkshopCallPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-paper pb-32">
      <div className="relative">
        <SiteHeader />
        <section className="mx-auto max-w-4xl px-6 pb-8 pt-12 md:pt-16">
          <Link href="/workshop" className="font-sf text-sm text-brand-navy/70 underline-offset-4 hover:underline">
            ← Back to the workshop
          </Link>
          <h1 className="mt-4 font-display text-3xl uppercase leading-tight text-brand-navy sm:text-4xl">
            Pick a time that works for you
          </h1>
          <p className="mt-3 max-w-2xl font-sf text-base text-brand-navy/80">
            A private one-on-one call: the principles, the scorecard and your tax numbers.
          </p>
          <iframe
            src={bookingHref}
            title="Book a call"
            className="mt-8 h-[44rem] w-full rounded-3xl border border-brand-bronze/30 bg-white"
          />
        </section>
      </div>
    </main>
  );
}
