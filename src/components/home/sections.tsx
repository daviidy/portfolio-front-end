import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { bookingHref } from "@/data/site";
import { DATA } from "@/data/resume";

// Layout follows https://contentacademy.io/claude-skill: light warm page,
// left-aligned, eyebrow + uppercase heading + soft white cards, banner CTA.
// Colors: TecPatri palette. Titles: Brigends (font-display). Body: SF Pro (font-sf).
// NOTE: all copy is DRAFT, built only from facts David stated.

// Apple-style glass: translucent white, strong blur + saturation, hairline
// border (colour set per card), inner top highlight, soft drop shadow.
const CARD =
  "rounded-3xl border-2 bg-white/45 backdrop-blur-2xl backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(17,42,70,0.06),0_18px_40px_-16px_rgba(17,42,70,0.28)]";

const BORDERS = [
  "border-brand-bronze/70",
  "border-brand-navy/60",
  "border-[#d8bf98]",
  "border-brand-atom/50",
];

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

const CHECKLIST = [
  "Maxing the 401(k)",
  "Company match",
  "Money in the market",
  "Roth IRA",
  "Life insurance through work",
];

function Chapter({
  n,
  title,
  children,
  image,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
  image?: string;
}) {
  const border = BORDERS[(parseInt(n, 10) - 1) % BORDERS.length];
  return (
    <article
      className={`${CARD} ${border} grid gap-5 p-6 sm:p-8 ${
        image ? "md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]" : ""
      } md:gap-8`}
    >
      {image && (
        <div className="relative aspect-video overflow-hidden rounded-2xl ring-1 ring-brand-navy/10">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-cover"
          />
        </div>
      )}
      <div>
        <span className="font-display text-2xl text-brand-bronze">{n}</span>
        <h3 className="mt-2 font-sf text-xl font-bold text-brand-navy sm:text-2xl">
          {title}
        </h3>
        <div className="mt-3 space-y-3 font-sf text-base leading-relaxed text-black sm:text-lg">
          {children}
        </div>
      </div>
    </article>
  );
}

function Stat({
  value,
  label,
  strong = false,
}: {
  value: string;
  label: string;
  strong?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 ${
        strong
          ? "bg-brand-bronze text-brand-cream"
          : "bg-brand-cream/60 text-brand-navy ring-1 ring-brand-navy/5"
      }`}
    >
      <p className="font-display text-2xl sm:text-3xl">{value}</p>
      <p className="mt-1 font-sf text-sm">{label}</p>
    </div>
  );
}

export function WhoAmI() {
  return (
    <section id="story" className="mx-auto max-w-6xl px-6 py-14">
      <Eyebrow>Who I am</Eyebrow>
      <H2>I came here to build something that lasts</H2>
      <div className={`${CARD} border-brand-bronze/70 mt-8 max-w-3xl space-y-4 p-7 font-sf text-base leading-relaxed text-black sm:p-9 sm:text-lg`}>
        <p>
          I&apos;m David. I have a background in software engineering, I&apos;m
          a husband, and I came to the US in 2021 to build something that lasts.
        </p>
        <p>
          I&apos;m not here because I got rich fast. I&apos;m here because I
          got tired of not understanding where my money went. So I learned it
          properly, tested it on my own money first, and got licensed.
        </p>
      </div>
    </section>
  );
}

export function Story() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <Eyebrow>My story</Eyebrow>
      <H2>It wasn&apos;t always this way</H2>
      <div className="mt-8 space-y-5">
        <Chapter n="01" title="On paper, everything looked right">
          <ul className="grid gap-2 sm:grid-cols-2">
            {CHECKLIST.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <Check className="size-5 shrink-0 text-brand-bronze" />
                {c}
              </li>
            ))}
          </ul>
          <p className="font-semibold">
            Everybody said this was the plan. So I followed the plan.
          </p>
        </Chapter>

        <Chapter n="02" title="What I was actually chasing">
          <p>I was chasing freedom, and security.</p>
          <p>
            Being able to save a lot of the money I was earning, make it grow
            fast and not lose it. I wanted to be in a position where I would
            never have to worry about taking care of my family in the US and
            back home.
          </p>
        </Chapter>

        <Chapter n="03" title="Then came July">
          <p>
            I pulled money out of my savings and used it as a down payment on a
            brand new Tesla.
          </p>
          <p>
            The very next day, a meeting I thought was normal. Then somebody
            from HR joined the call. Then we got laid off.
          </p>
        </Chapter>

        <Chapter n="04" title="Two things hurt me">
          <p>
            The car payment was coming from my own savings account, money I
            needed to survive until I found a job.
          </p>
          <p>And it was killing the compounding effect in my account.</p>
        </Chapter>

        <Chapter n="05" title="Then I went to get my own money">
          <p>I asked my 401(k) for my own money.</p>
          <div className="grid gap-3 pt-1 sm:grid-cols-3">
            <Stat value="$4,649.82" label="Gross" />
            <Stat value="$3,487.37" label="The check I received" />
            <Stat value="+10%" label="Penalty bill at tax time" />
          </div>
        </Chapter>

        <Chapter n="06" title="What the taxes and penalties actually cost me">
          <div className="grid gap-3 sm:grid-cols-2">
            <Stat value="$1,600" label="What that check seemed to cost" />
            <Stat
              strong
              value="$17,000"
              label="What it really cost: $1,600 left alone at 10% for 25 years"
            />
          </div>
        </Chapter>

        <Chapter n="07" title="So I went down the rabbit hole">
          <p>
            I had followed the plan everyone gave me, and I still couldn&apos;t
            reach my own money without paying for it.
          </p>
        </Chapter>
      </div>
    </section>
  );
}

export function WhatIDid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <Eyebrow>What I did</Eyebrow>
      <H2>I finally found what I was looking for</H2>
      <div className={`${CARD} border-brand-navy/60 mt-8 max-w-3xl p-7 font-sf text-base leading-relaxed text-black sm:p-9 sm:text-lg`}>
        <p>
          After discovering this strategy, I started testing it for myself. I
          created a step-by-step plan that helped me move and grow my money
          somewhere I could actually reach it, without taxes, penalties, or
          asking permission.
        </p>
        <p className="mt-4 font-semibold">
          Now I teach that same process to others.
        </p>
      </div>
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
