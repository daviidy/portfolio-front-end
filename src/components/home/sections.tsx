import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { bookingHref } from "@/data/site";
import { DATA } from "@/data/resume";

// NOTE: All copy below is DRAFT, built only from facts David stated
// (engineer, moved to the US through tech, runs a financial education
// company). No numbers or claims beyond that. Replace in the copy pass.

const STACK = Array.from(new Set(DATA.skills));

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-brand-cream/30 bg-brand-cream/10 px-4 py-1.5 text-xs tracking-[0.18em] uppercase text-brand-cream">
      {children}
    </span>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  // Bronze is only used as a box behind cream text (4.9:1), never as text on navy.
  return (
    <span className="inline-block rounded-lg bg-brand-bronze px-3 text-brand-cream">
      {children}
    </span>
  );
}

export function CtaButton({
  children = "Book a call",
  tone = "cream",
}: {
  children?: React.ReactNode;
  tone?: "cream" | "navy";
}) {
  const styles =
    tone === "cream"
      ? "bg-brand-cream text-brand-navy hover:bg-white"
      : "bg-brand-navy text-brand-cream hover:bg-brand-atom";
  return (
    <a
      href={bookingHref}
      className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors ${styles}`}
    >
      {children}
      <ArrowUpRight className="size-4" />
    </a>
  );
}

export function Hero() {
  return (
    <section className="bg-brand-navy text-brand-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28">
        <div className="space-y-8">
          <Pill>Engineer · Educator · Founder</Pill>
          <h1 className="font-sf font-bold text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
            Tech brought me to the US. <Highlight>Finance</Highlight> is what
            gives me freedom.
          </h1>
          <p className="max-w-xl font-sf text-xl leading-relaxed text-brand-cream/85 sm:text-2xl">
            I&apos;m a software engineer who also runs a company that teaches
            people how money really works, so they can build time and money
            freedom.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <CtaButton />
            <Link
              href="#story"
              className="text-sm text-brand-cream/80 underline-offset-4 hover:underline"
            >
              Read my story
            </Link>
          </div>
        </div>
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-brand-cream/15">
          <Image
            src="/david-avatar.png"
            alt={`Portrait of ${DATA.name}`}
            fill
            priority
            sizes="(min-width: 768px) 400px, 90vw"
            className="object-cover object-[52%_30%]"
          />
        </div>
      </div>
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
    <section id="story" className="bg-brand-cream text-brand-navy">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="text-xs tracking-[0.2em] uppercase text-brand-bronze">
          My story
        </p>
        <h2 className="mt-3 max-w-3xl font-sf font-bold text-3xl sm:text-4xl">
          Two skills. One goal: freedom.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {BEATS.map((b) => (
            <div
              key={b.n}
              className="rounded-2xl border border-brand-navy/10 bg-white/50 p-7"
            >
              <span className="font-sf font-bold text-3xl text-brand-bronze">
                {b.n}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 font-sf text-lg leading-relaxed text-black">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Engineering() {
  return (
    <section className="bg-brand-atom text-brand-cream">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="text-xs tracking-[0.2em] uppercase text-brand-cream/60">
          Engineering
        </p>
        <h2 className="mt-3 max-w-3xl font-sf font-bold text-3xl sm:text-4xl">
          I build software for a living.
        </h2>
        <p className="mt-5 max-w-2xl font-sf text-xl leading-relaxed text-brand-cream/80">
          {DATA.summary}
        </p>
        <div className="mt-10 flex flex-wrap gap-2">
          {STACK.map((s) => (
            <span
              key={s}
              className="rounded-full border border-brand-cream/20 bg-brand-navy/60 px-4 py-1.5 text-sm"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-4 text-sm">
          <Link
            href="/about"
            className="underline underline-offset-4 hover:text-white"
          >
            Experience and projects
          </Link>
          <Link
            href="/blog"
            className="underline underline-offset-4 hover:text-white"
          >
            What I teach on the blog
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
    <section className="bg-brand-cream text-brand-navy">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="text-xs tracking-[0.2em] uppercase text-brand-bronze">
          Financial education
        </p>
        <h2 className="mt-3 max-w-3xl font-sf font-bold text-3xl sm:text-4xl">
          Learn how money works, then make it work for you.
        </h2>
        <p className="mt-5 max-w-2xl font-sf text-xl leading-relaxed text-black">
          I run a company in the financial industry that educates people about
          money, so more of them can reach time and money freedom.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {PILLARS.map((p, i) => (
            <li
              key={p}
              className="flex items-center gap-4 rounded-2xl bg-brand-navy px-6 py-5 text-brand-cream"
            >
              <span className="grid size-9 place-items-center rounded-full bg-brand-bronze text-sm font-semibold">
                {i + 1}
              </span>
              <span className="text-lg">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="bg-brand-navy text-brand-cream">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <h2 className="font-sf font-bold text-3xl sm:text-5xl">
          Ready to talk about <Highlight>your</Highlight> freedom?
        </h2>
        <p className="mx-auto mt-5 max-w-xl font-sf text-xl text-brand-cream/80">
          Book a call and let&apos;s look at where you are and where you want
          to be.
        </p>
        <div className="mt-8">
          <CtaButton />
        </div>
      </div>
    </section>
  );
}
