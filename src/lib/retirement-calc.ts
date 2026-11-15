// Port of the "Retirement_Tax_Calculators_and_Scorecard" workbook.
// Simplified on purpose: same tax rate every year, no inflation, no Social Security.

export type YearRow = {
  year: number;
  start: number;
  withdrawn: number;
  taxes: number;
  end: number;
  funded: number; // share of the year that was funded (1 = full year)
};

export type DrawdownResult = {
  withdrawPerYear: number;
  taxFirstYear: number;
  yearsLast: number;
  totalTaxes: number;
  totalSpending: number;
  rows: YearRow[];
};

type DrawdownInput = {
  balance: number;
  annualReturn: number; // 0.10 = 10%
  spending: number; // wanted each year, after tax
  taxRate: number; // 0.24 = 24%
  /** Share of the balance that is gain (brokerage only). Omit for 401(k)/IRA, where every dollar is taxed. */
  gainShare?: number;
};

const MAX_YEARS = 100;

export function drawdown(i: DrawdownInput): DrawdownResult {
  // Fraction of each withdrawn dollar that is taxed: 100% for a 401(k)/IRA, only the gain part for a brokerage account.
  const taxedPart = i.gainShare === undefined ? 1 : i.gainShare;
  const effRate = taxedPart * i.taxRate;
  const withdrawPerYear = i.spending / (1 - effRate);
  const taxPerYear = withdrawPerYear - i.spending;

  const rows: YearRow[] = [];
  let bal = i.balance;
  let yearsLast = 0;
  let totalTaxes = 0;
  let totalSpending = 0;

  for (let y = 1; y <= MAX_YEARS && bal > 0 && withdrawPerYear > 0; y++) {
    const funded = Math.min(1, bal / withdrawPerYear);
    const withdrawn = withdrawPerYear * funded;
    const taxes = taxPerYear * funded;
    const end = funded < 1 ? 0 : (bal - withdrawPerYear) * (1 + i.annualReturn);
    rows.push({ year: y, start: bal, withdrawn, taxes, end, funded });
    yearsLast += funded;
    totalTaxes += taxes;
    totalSpending += i.spending * funded;
    bal = end;
    if (funded < 1) break;
  }

  return { withdrawPerYear, taxFirstYear: taxPerYear, yearsLast, totalTaxes, totalSpending, rows };
}

// ---------- Plan scorecard ----------

export type Answer = "yes" | "partly" | "no";
export const POINTS: Record<Answer, number> = { yes: 2, partly: 1, no: 0 };

export const SCORECARD: { test: string; question: string }[] = [
  { test: "Liquidity", question: "I can reach at least six months of expenses within days, with no penalty and no tax bill." },
  { test: "Liquidity", question: "If I lost my job tomorrow, I could pay my bills without touching retirement accounts early." },
  { test: "Liquidity", question: "I can reach a meaningful part of my long-term savings before age 59½ without a penalty." },
  { test: "Safety", question: "I know how much I would lose in a 30–40% market drop, and I can live with it." },
  { test: "Safety", question: "The money I will need in the first five years of retirement is protected from market swings." },
  { test: "Safety", question: "My money sits with institutions I have checked (financial strength, long track record)." },
  { test: "Predictability", question: "I know what my accounts earned last year after all fees, and what I pay in fees." },
  { test: "Predictability", question: "Guaranteed income (or a similar source) covers my basic bills, whatever the market does." },
  { test: "Predictability", question: "My plan raises my income each year to keep up with inflation." },
  { test: "Taxes", question: "I know what share of my savings is taxed now, taxed later, or tax-free." },
  { test: "Taxes", question: "Part of my retirement income will come from tax-free sources." },
  { test: "Taxes", question: "I have estimated my tax bill in retirement, not just my account balance." },
  { test: "Income", question: "I know how much I must withdraw to net the income I need after taxes." },
  { test: "Income", question: "My plan still lasts to age 95 if tax rates are higher than today." },
  { test: "Income", question: "My beneficiaries are current, and I know how my accounts pass to them and what tax they will owe." },
];

export function bandFor(score: number): string {
  if (score >= 24) return "Built to last";
  if (score >= 16) return "Solid base, real gaps";
  if (score >= 8) return "At risk";
  return "Needs a rebuild";
}
