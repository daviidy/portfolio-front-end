import type { Metadata } from "next";
import Link from "next/link";
import { ROADMAP_BOOKING_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "The Immigrant's Wealth Roadmap | David Yao",
  robots: { index: false, follow: false },
};

const PDF_HREF = "/roadmap/immigrant-wealth-roadmap.pdf";

function Sheet({ n, label, children }: { n: number; label: string; children: React.ReactNode }) {
  return (
    <article className="rm-page" aria-label={`Page ${n}`}>
      <div className="rm-head">
        <span className="rm-label">{label}</span>
        <a className="rm-pill" href={ROADMAP_BOOKING_URL}>
          Book a call →
        </a>
      </div>
      {children}
      <div className="rm-foot">
        <span>The Immigrant&apos;s Wealth Roadmap</span>
        <b>{String(n).padStart(2, "0")}</b>
      </div>
    </article>
  );
}

function H({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <h2 className="rm-h">
      <span className="n">{n})</span>
      <span>{children}</span>
    </h2>
  );
}

const Disclaimer = () => (
  <p className="rm-disclaimer">
    Educational content only. This is not tax, legal or investment advice, and examples are illustrations, not promises of
    results. Products, features and availability vary by state and carrier. Talk to a licensed professional about your own
    situation.
  </p>
);

function StarFigure() {
  // Six points of the star inside a "tax advantaged" oval, as in the whiteboard sketch.
  const pts = [
    { x: 260, y: 62, t: "Liquidity", a: "middle" },
    { x: 396, y: 134, t: "Safety", a: "start" },
    { x: 396, y: 246, t: "Income protection", a: "start" },
    { x: 260, y: 318, t: "Income replacement", a: "middle" },
    { x: 124, y: 246, t: "Predictable rate", a: "end" },
    { x: 124, y: 134, t: "Generational wealth", a: "end" },
  ] as const;
  const edge = (i: number, j: number) => (
    <line key={`${i}-${j}`} x1={pts[i].x} y1={pts[i].y} x2={pts[j].x} y2={pts[j].y} stroke="#8ab4f8" strokeOpacity="0.55" strokeWidth="1.4" />
  );
  return (
    <figure className="rm-fig">
      <svg viewBox="-110 0 740 380" role="img" aria-label="Six requirements inside a tax advantaged oval">
        <ellipse cx="260" cy="190" rx="338" ry="178" fill="rgba(138,180,248,0.05)" stroke="#f2c46d" strokeOpacity="0.7" strokeWidth="1.6" />
        <text x="260" y="26" textAnchor="middle" fontSize="12" letterSpacing="3" fill="#f2c46d">
          TAX ADVANTAGED
        </text>
        {[edge(0, 2), edge(2, 4), edge(4, 0), edge(1, 3), edge(3, 5), edge(5, 1)]}
        {pts.map((p) => (
          <g key={p.t}>
            <circle cx={p.x} cy={p.y} r="6" fill="#8ab4f8" />
            <text
              x={p.x + (p.a === "start" ? 14 : p.a === "end" ? -14 : 0)}
              y={p.y + (p.a === "middle" ? (p.y < 190 ? -14 : 24) : 5)}
              textAnchor={p.a}
              fontSize="14"
              fill="#fafafa"
            >
              {p.t}
            </text>
          </g>
        ))}
        <text x="260" y="196" textAnchor="middle" fontSize="13" fill="#b3b9c4">
          one vehicle,
        </text>
        <text x="260" y="214" textAnchor="middle" fontSize="13" fill="#b3b9c4">
          all six points
        </text>
      </svg>
    </figure>
  );
}

function VennFigure() {
  return (
    <figure className="rm-fig">
      <svg viewBox="-70 0 700 520" role="img" aria-label="Three circles: financial, foundational and intellectual wealth overlap as authentic wealth">
        <circle cx="280" cy="170" r="150" fill="rgba(138,180,248,0.16)" stroke="#8ab4f8" strokeWidth="1.6" />
        <circle cx="198" cy="312" r="150" fill="rgba(242,196,109,0.15)" stroke="#f2c46d" strokeWidth="1.6" />
        <circle cx="362" cy="312" r="150" fill="rgba(111,207,138,0.15)" stroke="#6fcf8a" strokeWidth="1.6" />
        <text x="280" y="70" textAnchor="middle" fontSize="12" letterSpacing="3" fill="#8ab4f8">1 · FINANCIAL</text>
        <text x="280" y="94" textAnchor="middle" fontSize="13" fill="#e5e7eb">Liquidity · Safety</text>
        <text x="280" y="112" textAnchor="middle" fontSize="13" fill="#e5e7eb">Return · Tax-free</text>
        <text x="112" y="372" textAnchor="middle" fontSize="12" letterSpacing="3" fill="#f2c46d">2 · FOUNDATIONAL</text>
        <text x="112" y="396" textAnchor="middle" fontSize="13" fill="#e5e7eb">Family · Values</text>
        <text x="112" y="414" textAnchor="middle" fontSize="13" fill="#e5e7eb">Health · Faith</text>
        <text x="448" y="372" textAnchor="middle" fontSize="12" letterSpacing="3" fill="#6fcf8a">3 · INTELLECTUAL</text>
        <text x="448" y="396" textAnchor="middle" fontSize="13" fill="#e5e7eb">Knowledge · Skills</text>
        <text x="448" y="414" textAnchor="middle" fontSize="13" fill="#e5e7eb">Wisdom</text>
        <text x="280" y="258" textAnchor="middle" fontSize="15" className="serif" fill="#fafafa">Authentic</text>
        <text x="280" y="278" textAnchor="middle" fontSize="15" className="serif" fill="#fafafa">Wealth</text>
        {/* anchor */}
        <g stroke="#fafafa" strokeWidth="2" fill="none" strokeLinecap="round" transform="translate(280 318)">
          <circle cx="0" cy="-14" r="5" />
          <line x1="0" y1="-9" x2="0" y2="22" />
          <line x1="-8" y1="-2" x2="8" y2="-2" />
          <path d="M-16 10 Q-14 24 0 24 Q14 24 16 10" />
        </g>
      </svg>
    </figure>
  );
}

export default function GuidePage() {
  return (
    <>
      <header className="rm-bar">
        <Link href="/" className="rm-mark" aria-label="David Yao">
          <i className="rm-dot" aria-hidden="true" />
          David Yao
        </Link>
        <div className="rm-title" aria-hidden="true">
          <b>Wealth</b>
          <span>Roadmap</span>
        </div>
        <nav className="rm-actions" aria-label="Guide actions">
          <a className="rm-ghost" href={PDF_HREF} download>
            Download PDF
          </a>
          <a className="rm-cta" href={ROADMAP_BOOKING_URL}>
            Book a call <span aria-hidden="true">→</span>
          </a>
        </nav>
      </header>

      <section className="rm-pages" aria-label="The Immigrant's Wealth Roadmap">
        {/* 1 — cover */}
        <article className="rm-page rm-cover" aria-label="Page 1">
          <div className="rm-head">
            <span className="rm-label">
              <i className="rm-dot" aria-hidden="true" />
              David Yao
            </span>
            <a className="rm-pill" href={ROADMAP_BOOKING_URL}>
              Book a call →
            </a>
          </div>
          <div className="a">Nobody tells you this:</div>
          <div className="b">the roadmap to build wealth in the US as an immigrant</div>
          <p className="sub">
            Five steps from <mark>where you stand today</mark> to the number that sets you free.
          </p>
          <div className="rm-foot">
            <span>The Immigrant&apos;s Wealth Roadmap</span>
            <b>01</b>
          </div>
        </article>

        {/* 2 — destination */}
        <Sheet n={2} label="Step 1 · The destination">
          <H n="01">Know your destination: your FIN number</H>
          <p className="rm-p">
            Every trip starts with an address. In money, the address is your <b>FIN number</b>: your Financial
            Independence number. It is the amount of money working for you that covers your life without you having to
            trade another hour for it.
          </p>
          <p className="rm-p">
            Most immigrants never calculate it. They work hard, send money home, and hope. Hope is not a destination.
          </p>
          <div className="rm-sheet">
            <div className="rm-line">
              <span>Monthly cost of the life you want here (rent, food, kids, insurance)</span>
              <span className="blank" />
            </div>
            <div className="rm-line">
              <span>+ Monthly support you send to family abroad</span>
              <span className="blank" />
            </div>
            <div className="rm-line">
              <span>= Total monthly need, × 12 = yearly need</span>
              <span className="blank" />
            </div>
            <div className="rm-line gold res">
              <span>
                Yearly need ÷ 0.04 = <b>your FIN number</b>
              </span>
              <span className="blank" />
            </div>
          </div>
          <p className="rm-note">
            The 0.04 is a common rule-of-thumb for how much you can draw each year. It is an illustration, not a
            guarantee. We refine the real number together on a call.
          </p>
          <Disclaimer />
        </Sheet>

        {/* 3 — three goals */}
        <Sheet n={3} label="Step 2 · The road">
          <H n="02">The road has 3 goals, in this order</H>
          <p className="rm-p">
            The road to your FIN number is not &quot;invest more.&quot; It is three jobs your money must do, one after the
            other.
          </p>
          <div className="rm-three">
            <div className="rm-box">
              <span className="t">Goal 1</span>
              <span className="k">Income protection</span>
              If you cannot work tomorrow, does the income stop? Protect the paycheck first: health, disability, life.
            </div>
            <div className="rm-box">
              <span className="t">Goal 2</span>
              <span className="k">Income replacement</span>
              Build assets that pay you so one day your paycheck becomes optional.
            </div>
            <div className="rm-box gold">
              <span className="t">Goal 3</span>
              <span className="k">Generational wealth</span>
              What you leave behind, passed on in a way that protects your kids and the tax bill.
            </div>
          </div>
          <div className="rm-quote">Protect the kids. Grow it tax-free. Pass on a legacy.</div>
          <p className="rm-p" style={{ marginTop: 22 }}>
            Skip goal 1 and one accident can erase years of work. Skip goal 3 and the next generation starts from zero,
            like you did.
          </p>
        </Sheet>

        {/* 4 — four principles */}
        <Sheet n={4} label="Step 3 · The rules">
          <H n="03">The 4 principles of prudent investing</H>
          <p className="rm-p">
            Any vehicle out there, from a savings account to real estate, should be judged by the same four questions.
          </p>
          <div className="rm-four">
            <div className="rm-box">
              <span className="t">Principle 1</span>
              <span className="k">Liquidity</span>
              Can I get to my money when life happens, without penalty?
            </div>
            <div className="rm-box">
              <span className="t">Principle 2</span>
              <span className="k">Safety</span>
              Is my principal protected from market loss?
            </div>
            <div className="rm-box">
              <span className="t">Principle 3</span>
              <span className="k">Predictable rate of return</span>
              Can I plan around what it earns, or is it a guess?
            </div>
            <div className="rm-box gold">
              <span className="t">Principle 4</span>
              <span className="k">Tax-favored</span>
              How much of the growth do I actually keep?
            </div>
          </div>
          <p className="rm-p">Score the vehicles you use today. Be honest. Few pass all four, which is exactly the point.</p>
          <table className="rm-table">
            <thead>
              <tr>
                <th>My vehicle</th>
                <th>Liquid</th>
                <th>Safe</th>
                <th>Predictable</th>
                <th>Tax-favored</th>
              </tr>
            </thead>
            <tbody>
              {["Bank savings", "401(k) / IRA", "Brokerage account", "Real estate", "Other: ______"].map((v) => (
                <tr key={v}>
                  <td>{v}</td>
                  {[0, 1, 2, 3].map((c) => (
                    <td className="cell" key={c}>
                      <i />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Sheet>

        {/* 5 — fuel */}
        <Sheet n={5} label="Step 4 · The fuel">
          <H n="04">Savings is the fuel</H>
          <p className="rm-p">
            Picture the road to your FIN number. The vehicle is the car. <b>Savings is the fuel.</b> The best car in the
            world goes nowhere on an empty tank, and a small tank filled every month beats a big one you never fill.
          </p>
          <ol className="rm-steps">
            <li>
              <span>
                <b>Name the number.</b> Decide what you will save each month, as a fixed amount, not &quot;whatever is
                left.&quot;
              </span>
            </li>
            <li>
              <span>
                <b>Automate it.</b> Move it the day your paycheck lands, before it has a chance to be spent.
              </span>
            </li>
            <li>
              <span>
                <b>Aim it at the road.</b> Point every saved dollar at a vehicle that passes the four principles.
              </span>
            </li>
            <li>
              <span>
                <b>Raise it.</b> Each raise, add to the amount before your lifestyle absorbs it.
              </span>
            </li>
          </ol>
          <div className="rm-sheet">
            <div className="rm-line">
              <span>My monthly savings, starting now</span>
              <span className="blank" />
            </div>
            <div className="rm-line gold">
              <span>Date it starts</span>
              <span className="blank" />
            </div>
          </div>
        </Sheet>

        {/* 6 — the map together */}
        <Sheet n={6} label="Step 5 · The whole map">
          <H n="05">Put the map together</H>
          <StarFigure />
          <div className="rm-map">
            <div>
              <span>Destination</span>
              <b>Your FIN number</b>
            </div>
            <div>
              <span>The road</span>
              <b>Income protection → income replacement → generational wealth</b>
            </div>
            <div>
              <span>The rules</span>
              <b>Liquidity · safety · predictable return · tax-favored</b>
            </div>
            <div>
              <span>The fuel</span>
              <b>Savings, every month</b>
            </div>
          </div>
          <p className="rm-note">
            Cash-value life insurance and other tax-advantaged tools are built to be judged on these same points. A call
            shows you how your own numbers stack up.
          </p>
        </Sheet>

        {/* 7 — 3D */}
        <Sheet n={7} label="Beyond the money">
          <H n="06">Wealth in 3D: authentic wealth</H>
          <p className="rm-p">
            Money is only one dimension. A rich account and a broken family is not wealth. Authentic wealth grows in three
            places at once, and you optimize every area of life.
          </p>
          <VennFigure />
          <div className="rm-quote gold">
            KASH: Knowledge, Attitudes, Skills, Habits. A hand up, not a handout.
          </div>
        </Sheet>

        {/* 8 — close */}
        <Sheet n={8} label="Your next step">
          <div className="rm-close">
            <div className="a">Ready to find your number?</div>
            <div className="b">Let&apos;s map it together.</div>
            <p>
              Book a free call and we will work out your FIN number and which road gets you there.
            </p>
            <a className="rm-cta rm-cta--lg" href={ROADMAP_BOOKING_URL}>
              Book a call <span aria-hidden="true">→</span>
            </a>
          </div>
          <Disclaimer />
        </Sheet>
      </section>

      <footer className="rm-end">
        <a className="rm-ghost" href={PDF_HREF} download>
          Download PDF
        </a>
        <a className="rm-cta rm-cta--lg" href={ROADMAP_BOOKING_URL}>
          Book a call <span aria-hidden="true">→</span>
        </a>
      </footer>
    </>
  );
}
