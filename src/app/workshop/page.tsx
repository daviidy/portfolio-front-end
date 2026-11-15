import type { Metadata } from "next";
import { SiteHeader } from "@/components/home/sections";
import { WorkshopFlow } from "@/components/workshop/workshop-flow";

export const metadata: Metadata = {
  title: "Is Your Retirement Plan Built to Last?",
  description:
    "Free in-person workshop: the principles that decide whether a retirement plan lasts, a scorecard to grade your plan, and a tax calculator. Saturday, November 21 at 2:00 PM ET, Brandywine Hundred Library, Wilmington, DE.",
};

const KICKER = "font-sf text-xs font-semibold uppercase tracking-[0.16em] text-brand-bronze";
const H2 = "mt-3 font-display text-2xl uppercase leading-tight text-brand-navy sm:text-3xl";
const BODY = "font-sf text-base leading-relaxed text-brand-navy/80";
const CARD =
  "rounded-3xl border border-brand-bronze/30 bg-white/70 p-6 shadow-[0_18px_40px_-20px_rgba(17,42,70,0.35)] backdrop-blur sm:p-8";

const DETAILS = [
  ["Date", "Saturday, November 21"],
  ["Time", "2:00 PM ET"],
  ["Location", "Brandywine Hundred Library, 1300 Foulk Rd, Wilmington, DE"],
];

const QUESTIONS = [
  "What does my retirement actually look like?",
  "Will my money last as long as I do?",
  "How much of it will actually go to taxes?",
];

const MOVES = [
  {
    n: "1",
    title: "Learn the principles",
    body: "The few ideas that decide whether a retirement plan lasts: where your money sits, how taxes work, and what you actually get to spend.",
  },
  {
    n: "2",
    title: "Grade your plan",
    body: "Fifteen simple questions, three minutes, one score. See where your plan is strong and where the gaps are.",
  },
  {
    n: "3",
    title: "See your tax bill",
    body: "A simple calculator: your balance, what it earns, what you spend. See how long it lasts and what you could pay in taxes.",
  },
];

const DISCOVER = [
  ["The one question to answer first", "before you trust any retirement account or any projection."],
  [
    "Why “I’ll start when I have more”",
    "quietly costs you the most valuable thing you own: time.",
  ],
  [
    "Why a bigger balance isn’t the same as more spendable income",
    "and the math most statements never show you.",
  ],
  ["Your plan’s score", "a quick checklist that shows where your retirement plan is strong and where it’s exposed."],
  ["A clear first step you can take that same week", "not a vague idea, a real next move."],
];

const GET = [
  ["A focused, in-person session", "on what makes a retirement plan last"],
  ["A scorecard and a tax calculator", "you can use on your own plan right away"],
  ["Time to ask your questions", "in a small, welcoming room"],
  ["$0 and no purchase required", "you’re free to simply listen and learn"],
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
          <p className={KICKER}>Free · In person · Sat, Nov 21 · 2:00 PM ET</p>
          <h1 className="mt-3 font-display text-3xl uppercase leading-tight text-brand-navy sm:text-5xl">
            Is your retirement plan built to last?
          </h1>
          <p className="mt-3 font-display text-lg uppercase text-brand-bronze">Find out in one afternoon.</p>
          <p className={`${BODY} mt-5 max-w-2xl`}>
            Join us <strong>Saturday, November 21 at 2:00 PM ET</strong> at the Brandywine Hundred Library for a free,
            practical session on <strong>the principles that decide whether a retirement plan lasts</strong>, plus a{" "}
            <strong>scorecard to grade your own plan</strong> and a{" "}
            <strong>calculator that shows what you could pay in taxes</strong>.
          </p>
          <a
            href="#rsvp"
            className="mt-6 inline-flex items-center rounded-full bg-brand-navy px-7 py-3 font-sf text-sm font-semibold text-brand-cream transition hover:opacity-90"
          >
            Yes, save my free seat →
          </a>
          <p className="mt-2 font-sf text-xs text-brand-navy/60">100% free · Limited seats · No purchase required</p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {DETAILS.map(([k, v]) => (
              <div key={k} className={CARD + " !p-5"}>
                <dt className={KICKER}>{k}</dt>
                <dd className="mt-1 font-sf text-sm font-semibold text-brand-navy">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-10">
          <p className={KICKER}>Be honest with yourself</p>
          <h2 className={H2}>Have you ever caught yourself asking…</h2>
          <ul className="mt-5 space-y-2 font-sf text-lg italic text-brand-navy">
            {QUESTIONS.map((q) => (
              <li key={q}>“{q}”</li>
            ))}
          </ul>
          <p className={`${BODY} mt-6`}>
            You&apos;re not behind because you&apos;re not smart. Most people simply <strong>never had a plan to follow</strong>.
          </p>
          <p className={`${BODY} mt-4`}>
            You work hard. You carry real responsibilities. And somewhere in the middle of it all, retirement becomes a
            &ldquo;someday&rdquo; word, and the question of whether your plan will actually last never gets asked.
          </p>
          <p className={`${BODY} mt-4`}>
            Years pass quietly. Not because you didn&apos;t care. Because nobody sat you down and showed you{" "}
            <strong>the first step</strong>, and the second, and the third. That&apos;s exactly what this Saturday is for.
          </p>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-10">
          <p className={KICKER}>The New Art of Living</p>
          <h2 className={H2}>One afternoon. Three simple moves.</h2>
          <p className={`${BODY} mt-3`}>
            A retirement plan isn&apos;t just a number in an account. Here&apos;s how we&apos;ll walk through it, in order:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {MOVES.map((m) => (
              <div key={m.n} className={CARD}>
                <span className="grid size-9 place-items-center rounded-full bg-brand-navy font-sf text-sm font-bold text-brand-cream">
                  {m.n}
                </span>
                <h3 className="mt-4 font-sf text-lg font-bold text-brand-navy">{m.title}</h3>
                <p className="mt-2 font-sf text-sm leading-relaxed text-brand-navy/80">{m.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-10">
          <p className={KICKER}>What you&apos;ll walk away with</p>
          <h2 className={H2}>In one afternoon, you&apos;ll discover…</h2>
          <ul className="mt-5 space-y-3">
            {DISCOVER.map(([b, rest]) => (
              <li key={b} className={`${BODY} flex gap-3`}>
                <span aria-hidden className="text-brand-bronze">✦</span>
                <span>
                  <strong>{b}</strong> {rest}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-10">
          <p className={KICKER}>A small room by design</p>
          <h2 className={H2}>Here&apos;s everything you get</h2>
          <p className={`${BODY} mt-3`}>
            This isn&apos;t a stadium and it isn&apos;t a webinar. It&apos;s a small, friendly room where you can ask your own
            questions and leave with a plan you actually understand.
          </p>
          <ul className="mt-5 space-y-3">
            {GET.map(([b, rest]) => (
              <li key={b} className={`${BODY} flex gap-3`}>
                <span aria-hidden className="text-brand-bronze">✓</span>
                <span>
                  <strong>{b}</strong> {rest}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section id="rsvp" className="mx-auto max-w-4xl scroll-mt-24 px-6 pt-6">
          <p className={`${BODY} mb-4`}>
            Seats are limited. If this is on your mind, reserve yours today. It takes 30 seconds.
          </p>
          <WorkshopFlow />
        </section>

        <section className="mx-auto max-w-4xl px-6 pt-10">
          <p className={BODY}>
            <strong>P.S.</strong> A retirement plan rewards one thing: <strong>checking it before you need it</strong>. One
            Saturday afternoon, November 21 at 2:00 PM ET at the Brandywine Hundred Library, could be the day your plan
            finally gets going. Reserve your free seat now, and bring someone who should hear this too.
          </p>
          <p className="mt-8 font-sf text-xs leading-relaxed text-brand-navy/60">
            Educational event. Not tax, legal or investment advice. No investment results are promised or guaranteed.
            Your info is private and will never be shared.
          </p>
        </section>
      </div>
    </main>
  );
}
