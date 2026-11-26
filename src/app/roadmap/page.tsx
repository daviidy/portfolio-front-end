import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ROADMAP_FORM_ID, ROADMAP_FORM_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "The Immigrant's Wealth Roadmap | David Yao",
  description:
    "Free guide: the roadmap to build wealth in the US as an immigrant. Your FIN number, the 3 goals of money, the 4 principles of prudent investing, and authentic wealth in 3D.",
};

const INSIDE = [
  ["01", "Your destination", "Your FIN number starts with the income you want when you retire, not with a rule built to help you survive."],
  ["02", "The 3 goals of money", "Income protection, income replacement and generational wealth, in the right order."],
  ["03", "The 4 principles of prudent investing", "A four-question test any vehicle must pass: liquidity, safety, predictable return, tax-favored."],
  ["04", "Savings is the fuel", "Why the best vehicle goes nowhere without fuel, and how to start filling the tank."],
  ["05", "Authentic wealth in 3D", "Financial, foundational and intellectual wealth: the part most roadmaps leave out."],
];

export default function RoadmapLanding() {
  return (
    <>
      <header className="rm-bar">
        <Link href="/" className="rm-mark">
          <i className="rm-dot" aria-hidden="true" />
          David Yao
        </Link>
      </header>

      <section className="rm-land">
        <div>
          <div className="rm-eyebrow">
            <i className="rm-dot" aria-hidden="true" />
            Free guide for immigrants
          </div>
          <h1 className="rm-h1">
            <span className="a">Nobody tells you this:</span>
            <span className="b serif">the roadmap to build wealth in the US as an immigrant</span>
          </h1>
          <p className="rm-lede">
            I came here with a plan to work hard and <mark>save</mark>. Nobody showed me the map. This is the map I wish I
            had on day one.
          </p>
          <ul className="rm-list">
            {INSIDE.map(([n, t, d]) => (
              <li key={n}>
                <i>{n}</i>
                <span>
                  <b>{t}.</b> {d}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="rm-card" id="get-the-guide">
          <h2 className="serif">Get the free roadmap</h2>
          <p>Leave your email and phone number and the guide opens right away. You can download it and book a call from inside.</p>
          <iframe
            src={ROADMAP_FORM_URL}
            id={`inline-${ROADMAP_FORM_ID}`}
            title="Get the free roadmap"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-activation-type="alwaysActivated"
            data-deactivation-type="neverDeactivate"
            data-form-name="Website - Immigrant Wealth Roadmap Freebie"
            data-form-id={ROADMAP_FORM_ID}
            data-height="auto"
          />
          <Script src="https://apps.iulinsiders.com/js/form_embed.js" strategy="lazyOnload" />
          <p className="rm-fine">
            By submitting you agree to be contacted by David Yao about this guide. No spam. Educational content only, not
            tax, legal or investment advice.
          </p>
        </aside>
      </section>
    </>
  );
}
