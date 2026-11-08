import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { bookingHref } from "@/data/site";
import { DATA } from "@/data/resume";

// Layout follows https://contentacademy.io/claude-skill: light warm page,
// left-aligned, eyebrow + uppercase heading + soft white cards, banner CTA.
// Colors: TecPatri palette. Titles: Brigends (font-display). Body: SF Pro (font-sf).
// NOTE: all copy is DRAFT, built only from facts David stated.

const STACK = Array.from(new Set(DATA.skills));

const CARD =
  "rounded-3xl bg-brand-surface shadow-[0_1px_2px_rgba(17,42,70,0.06),0_14px_34px_-14px_rgba(17,42,70,0.2)]";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sf text-xs font-semibold uppercase tracking-[0.16em] text-brand-bronze">
      {children}
    </p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-3 max-w-3xl font-display text-2xl uppercase leading-tight text-brand-navy sm:text-3xl">
      {children}
    </h2>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  // Bronze is a box behind cream text (4.9:1), never small text on navy.
  return (
    <span className="inline-block rounded-lg bg-brand-bronze px-2.5 text-brand-cream">
      {children}
    </span>
  );
}

export function CtaButton({
  children = "Book a call",
  variant = "outline",
}: {
  children?: React.ReactNode;
  variant?: "outline" | "solid";
}) {
  const styles =
    variant === "outline"
      ? "border border-brand-bronze bg-brand-surface text-brand-bronze shadow-[0_2px_0_rgba(121,88,51,0.25),0_10px_22px_-10px_rgba(121,88,51,0.45)] hover:bg-white"
      : "border border-brand-bronze bg-brand-bronze text-brand-cream shadow-[0_2px_0_rgba(0,0,0,0.25),0_10px_22px_-10px_rgba(121,88,51,0.6)] hover:brightness-110";
  return (
    <a
      href={bookingHref}
      className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 font-sf text-sm font-semibold transition ${styles}`}
    >
      {children}
      <ArrowUpRight className="size-4" />
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-6">
      <Link
        href="/"
        className="font-sf text-lg font-bold tracking-tight text-brand-navy"
      >
        david yao<span className="text-brand-bronze">.</span>
      </Link>
      <Link
        href="/about"
        className="font-sf text-sm text-brand-navy/70 hover:text-brand-navy"
      >
        About
      </Link>
    </header>
  );
}

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-16 md:grid-cols-2 md:pt-24">
      <div className="space-y-7">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-surface px-3.5 py-1.5 font-sf text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-navy shadow-[0_1px_2px_rgba(17,42,70,0.08)]">
          <span className="size-1.5 rounded-full bg-brand-bronze" />
          Engineer · Educator · Founder
        </span>
        <h1 className="font-display text-3xl uppercase leading-[1.12] text-brand-navy sm:text-4xl lg:text-5xl">
          Tech brought me to the US. <Highlight>Finance</Highlight> is what
          gives me freedom.
        </h1>
        <p className="max-w-md font-sf text-base leading-relaxed text-black sm:text-lg">
          I&apos;m a software engineer who also runs a company that teaches
          people how money really works, so they can build time and money
          freedom.
        </p>
        <div className="flex flex-wrap items-center gap-5">
          <CtaButton />
          <Link
            href="#story"
            className="font-sf text-sm text-brand-navy/70 underline-offset-4 hover:underline"
          >
            Read my story
          </Link>
        </div>
      </div>
      <figure className="space-y-3">
        <div className="rounded-[2rem] bg-[radial-gradient(120%_90%_at_75%_15%,#fffaf2_0%,#f0dfc8_45%,#d8bf98_100%)] p-5 sm:p-7">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl shadow-[0_24px_50px_-18px_rgba(17,42,70,0.55)] ring-1 ring-brand-navy/10">
            <Image
              src="/david-avatar.png"
              alt={`Portrait of ${DATA.name}`}
              fill
              priority
              sizes="(min-width: 768px) 384px, 90vw"
              className="object-cover object-[52%_30%]"
            />
          </div>
        </div>
        <figcaption className="text-center font-sf text-xs text-brand-navy/60">
          {DATA.name}
        </figcaption>
      </figure>
    </section>
  );
}

const BEATS = [
  {
    n: "01",
    title: "Tech brought me to the US",
    body: "Engineering was my way in. It opened the door to a new country and a career I built from scratch.",
  },
  {
    n: "02",
    title: "Nobody taught me how money works",
    body: "Earning well is not the same as being free. I had to learn the rules of money on my own.",
  },
  {
    n: "03",
    title: "Now I teach both",
    body: "I build software and I educate people on money, because the best way to learn is to teach.",
  },
];

export function Story() {
  return (
    <section id="story" className="mx-auto max-w-6xl px-6 py-14">
      <Eyebrow>My story</Eyebrow>
      <H2>Two skills. One goal: freedom.</H2>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {BEATS.map((b) => (
          <div key={b.n} className={`${CARD} p-7`}>
            <span className="font-display text-2xl text-brand-bronze">
              {b.n}
            </span>
            <h3 className="mt-4 font-sf text-lg font-bold text-brand-navy">
              {b.title}
            </h3>
            <p className="mt-2 font-sf text-[15px] leading-relaxed text-black">
              {b.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Engineering() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <Eyebrow>Engineering</Eyebrow>
      <H2>I build software for a living</H2>
      <div className={`${CARD} mt-8 p-7 sm:p-9`}>
        <p className="max-w-2xl font-sf text-base leading-relaxed text-black sm:text-lg">
          {DATA.summary}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {STACK.map((s) => (
            <span
              key={s}
              className="rounded-full bg-brand-cream/70 px-3.5 py-1 font-sf text-sm text-brand-navy"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap gap-5 font-sf text-sm font-semibold">
          <Link
            href="/about"
            className="text-brand-bronze underline-offset-4 hover:underline"
          >
            Experience and projects →
          </Link>
          <Link
            href="/blog"
            className="text-brand-bronze underline-offset-4 hover:underline"
          >
            What I teach on the blog →
          </Link>
        </div>
      </div>
    </section>
  );
}

const PILLARS = [
  "How money actually works",
  "Protecting what you build",
  "Growing it over time",
  "Buying back your time",
];

export function Finance() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <Eyebrow>Financial education</Eyebrow>
      <H2>Learn how money works, then make it work for you</H2>
      <p className="mt-4 max-w-2xl font-sf text-base leading-relaxed text-black sm:text-lg">
        I run a company in the financial industry that educates people about
        money, so more of them can reach time and money freedom.
      </p>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((p, i) => (
          <li
            key={p}
            className="rounded-3xl bg-brand-cream/60 p-6 ring-1 ring-brand-navy/5"
          >
            <span className="grid size-9 place-items-center rounded-full bg-brand-bronze font-sf text-sm font-bold text-brand-cream">
              {i + 1}
            </span>
            <p className="mt-5 font-sf text-lg font-bold leading-snug text-brand-navy">
              {p}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-28 pt-6">
      <div className="flex flex-col gap-6 rounded-3xl bg-brand-cream/80 p-7 ring-1 ring-brand-bronze/15 sm:flex-row sm:items-center sm:justify-between sm:p-9">
        <div>
          <h2 className="font-sf text-xl font-bold text-brand-navy">
            Ready to talk about your freedom?
          </h2>
          <p className="mt-1 font-sf text-sm text-black">
            Book a call and we&apos;ll look at where you are and where you want
            to be.
          </p>
        </div>
        <CtaButton variant="solid" />
      </div>
    </section>
  );
}
