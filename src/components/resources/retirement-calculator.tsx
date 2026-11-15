"use client";

import { useMemo, useState } from "react";
import {
  Answer,
  POINTS,
  SCORECARD,
  bandFor,
  drawdown,
  type DrawdownResult,
} from "@/lib/retirement-calc";

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const CARD =
  "rounded-3xl border border-brand-bronze/30 bg-white/70 p-6 shadow-[0_18px_40px_-20px_rgba(17,42,70,0.35)] backdrop-blur sm:p-8";

function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="font-sf text-sm font-medium text-brand-navy">{label}</span>
      <div className="mt-1 flex items-center rounded-xl border border-amber-400/70 bg-amber-50 px-3 focus-within:ring-2 focus-within:ring-brand-bronze/40">
        {prefix && <span className="font-sf text-sm text-brand-navy/60">{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          min={0}
          step={step}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
          className="w-full bg-transparent px-2 py-2.5 font-sf text-sm text-brand-navy focus:outline-none"
        />
        {suffix && <span className="font-sf text-sm text-brand-navy/60">{suffix}</span>}
      </div>
    </label>
  );
}

function Stat({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`rounded-2xl p-4 ${strong ? "bg-brand-navy text-brand-cream" : "bg-brand-cream/60 text-brand-navy"}`}>
      <p className={`font-sf text-xs ${strong ? "text-brand-cream/80" : "text-brand-navy/70"}`}>{label}</p>
      <p className="mt-1 font-sf text-xl font-semibold sm:text-2xl">{value}</p>
    </div>
  );
}

function BalanceChart({ result }: { result: DrawdownResult }) {
  const pts = [result.rows[0]?.start ?? 0, ...result.rows.map((r) => r.end)];
  const max = Math.max(...pts, 1);
  const w = 600,
    h = 160,
    n = pts.length - 1 || 1;
  const xy = pts.map((v, i) => [(i / n) * w, h - (v / max) * (h - 8) - 4] as const);
  const line = xy.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  return (
    <figure>
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Account balance by year" className="h-40 w-full">
        <path d={`${line} L${w},${h} L0,${h} Z`} fill="#795833" opacity="0.15" />
        <path d={line} fill="none" stroke="#795833" strokeWidth="3" strokeLinejoin="round" />
      </svg>
      <figcaption className="mt-1 flex justify-between font-sf text-xs text-brand-navy/60">
        <span>Today: {usd(pts[0])}</span>
        <span>Year {result.rows.length}</span>
      </figcaption>
    </figure>
  );
}

function Results({ r, taxLabel }: { r: DrawdownResult; taxLabel: string }) {
  const years = r.yearsLast >= 100 ? "100+ years" : `${r.yearsLast.toFixed(1)} years`;
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <Stat strong label="How long your money lasts" value={years} />
        <Stat strong label="Total taxes you pay" value={usd(r.totalTaxes)} />
        <Stat label="You must withdraw each year" value={usd(r.withdrawPerYear)} />
        <Stat label={taxLabel} value={usd(r.taxFirstYear)} />
      </div>
      <Stat label="Total spending money you receive" value={usd(r.totalSpending)} />
      <BalanceChart result={r} />
      <details className="rounded-2xl bg-white/60 p-4 font-sf text-sm text-brand-navy">
        <summary className="cursor-pointer font-medium">Year by year (the math behind the result)</summary>
        <div className="mt-3 max-h-72 overflow-auto">
          <table className="w-full text-right text-xs">
            <thead className="sticky top-0 bg-brand-paper text-brand-navy/70">
              <tr>
                {["Year", "Start", "Withdrawn", "Taxes", "End"].map((h) => (
                  <th key={h} className="px-2 py-1.5 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {r.rows.map((row) => (
                <tr key={row.year} className="border-t border-brand-navy/10">
                  <td className="px-2 py-1">{row.year}</td>
                  <td className="px-2 py-1">{usd(row.start)}</td>
                  <td className="px-2 py-1">{usd(row.withdrawn)}</td>
                  <td className="px-2 py-1">{usd(row.taxes)}</td>
                  <td className="px-2 py-1">{usd(row.end)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}

function Account401k() {
  const [balance, setBalance] = useState(1_000_000);
  const [ret, setRet] = useState(10);
  const [spend, setSpend] = useState(100_000);
  const [tax, setTax] = useState(24);
  const r = useMemo(
    () => drawdown({ balance, annualReturn: ret / 100, spending: spend, taxRate: Math.min(tax, 95) / 100 }),
    [balance, ret, spend, tax]
  );
  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <div className="space-y-4">
        <h3 className="font-display text-lg uppercase text-brand-navy">Your numbers</h3>
        <NumberField label="Starting balance" prefix="$" value={balance} onChange={setBalance} step={10000} />
        <NumberField label="Yearly return" suffix="%" value={ret} onChange={setRet} step={0.5} />
        <NumberField label="Spending you need each year, after tax" prefix="$" value={spend} onChange={setSpend} step={5000} />
        <NumberField label="Tax rate on what you withdraw" suffix="%" value={tax} onChange={setTax} step={1} />
        <p className="font-sf text-xs text-brand-navy/60">
          Every dollar you take out is taxed, so you withdraw more than you spend: spending ÷ (1 − tax rate).
        </p>
      </div>
      <Results r={r} taxLabel="Taxes in that first year" />
    </div>
  );
}

function AccountBrokerage() {
  const [balance, setBalance] = useState(300_000);
  const [ret, setRet] = useState(7);
  const [spend, setSpend] = useState(30_000);
  const [gain, setGain] = useState(40);
  const [tax, setTax] = useState(19);
  const r = useMemo(
    () =>
      drawdown({
        balance,
        annualReturn: ret / 100,
        spending: spend,
        taxRate: Math.min(tax, 95) / 100,
        gainShare: Math.min(gain, 100) / 100,
      }),
    [balance, ret, spend, gain, tax]
  );
  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <div className="space-y-4">
        <h3 className="font-display text-lg uppercase text-brand-navy">Your numbers</h3>
        <NumberField label="Starting balance" prefix="$" value={balance} onChange={setBalance} step={10000} />
        <NumberField label="Yearly return" suffix="%" value={ret} onChange={setRet} step={0.5} />
        <NumberField label="Spending you need each year, after tax" prefix="$" value={spend} onChange={setSpend} step={1000} />
        <NumberField label="Share of the balance that is gain" suffix="%" value={gain} onChange={setGain} step={5} />
        <NumberField label="Tax rate on gains" suffix="%" value={tax} onChange={setTax} step={1} />
        <p className="font-sf text-xs text-brand-navy/60">
          Only the gain part of what you withdraw is taxed. The rest is your own money coming back.
        </p>
      </div>
      <Results r={r} taxLabel="Taxes in that first year" />
    </div>
  );
}

function Scorecard() {
  const [answers, setAnswers] = useState<(Answer | null)[]>(() => SCORECARD.map(() => null));
  const score = answers.reduce<number>((s, a) => s + (a ? POINTS[a] : 0), 0);
  const answered = answers.filter(Boolean).length;
  const OPTIONS: { v: Answer; label: string }[] = [
    { v: "yes", label: "Yes" },
    { v: "partly", label: "Partly" },
    { v: "no", label: "No" },
  ];
  return (
    <div className="space-y-6">
      <p className="font-sf text-sm text-brand-navy/80">
        Pick Yes, Partly or No for each line. Yes = 2 points, Partly = 1, No = 0.
      </p>
      <ol className="space-y-3">
        {SCORECARD.map((q, i) => (
          <li key={i} className="rounded-2xl bg-white/60 p-4">
            <p className="font-sf text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-bronze">{q.test}</p>
            <p className="mt-1 font-sf text-sm text-brand-navy">{q.question}</p>
            <div role="radiogroup" aria-label={q.question} className="mt-3 flex gap-2">
              {OPTIONS.map((o) => {
                const on = answers[i] === o.v;
                return (
                  <button
                    key={o.v}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setAnswers((a) => a.map((x, j) => (j === i ? o.v : x)))}
                    className={`rounded-lg border px-4 py-1.5 font-sf text-sm transition ${
                      on
                        ? "border-brand-navy bg-brand-navy text-brand-cream"
                        : "border-brand-navy/25 bg-white text-brand-navy hover:border-brand-navy/60"
                    }`}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>
      <div className="sticky bottom-20 rounded-2xl bg-brand-navy p-5 text-brand-cream shadow-lg">
        <p className="font-sf text-xs text-brand-cream/80">
          Your score ({answered} of {SCORECARD.length} answered)
        </p>
        <p className="mt-1 font-sf text-3xl font-semibold">
          {score} <span className="text-lg font-normal text-brand-cream/80">/ 30</span>
        </p>
        <p className="font-sf text-sm font-medium">{answered ? bandFor(score) : "Answer the questions to see where you stand"}</p>
        <p className="mt-2 font-sf text-xs text-brand-cream/70">
          24–30 Built to last · 16–23 Solid base, real gaps · 8–15 At risk · 0–7 Needs a rebuild
        </p>
      </div>
    </div>
  );
}

const TABS = [
  { id: "401k", label: "401(k) / IRA", C: Account401k },
  { id: "brokerage", label: "Brokerage", C: AccountBrokerage },
  { id: "score", label: "Plan scorecard", C: Scorecard },
] as const;

export function RetirementCalculator() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("401k");
  const Active = TABS.find((t) => t.id === tab)!.C;
  return (
    <div className={CARD}>
      <div role="tablist" className="mb-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 font-sf text-sm font-medium transition ${
              tab === t.id ? "bg-brand-bronze text-brand-cream" : "bg-brand-cream/60 text-brand-navy hover:bg-brand-cream"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <Active />
      <p className="mt-8 border-t border-brand-navy/10 pt-4 font-sf text-xs text-brand-navy/55">
        Simplified: the same tax rate every year, no inflation, no Social Security. A planning illustration, not tax,
        legal or investment advice. Your real results will differ.
      </p>
    </div>
  );
}
