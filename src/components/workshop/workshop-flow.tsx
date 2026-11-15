"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CRM_FORM_SCRIPT,
  WORKSHOP_FORM_ID,
  WORKSHOP_FORM_SRC,
  WORKSHOP_LAT,
  WORKSHOP_LNG,
  WORKSHOP_RADIUS_MILES,
} from "@/data/site";
import { useUnlocked } from "@/components/resources/lead-gate";

const CARD =
  "rounded-3xl border border-brand-bronze/30 bg-white/70 p-6 shadow-[0_18px_40px_-20px_rgba(17,42,70,0.35)] backdrop-blur sm:p-10";
const BTN =
  "inline-flex items-center justify-center rounded-full bg-brand-navy px-6 py-3 font-sf text-sm font-semibold text-brand-cream transition hover:opacity-90 disabled:opacity-50";

function miles(lat1: number, lon1: number, lat2: number, lon2: number) {
  const r = 3958.8;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(lat2 - lat1);
  const dLon = rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * r * Math.asin(Math.sqrt(a));
}

type Step = "zip" | "local" | "far";

function RsvpForm() {
  useEffect(() => {
    if (document.querySelector(`script[src="${CRM_FORM_SCRIPT}"]`)) return;
    const s = document.createElement("script");
    s.src = CRM_FORM_SCRIPT;
    s.async = true;
    document.body.appendChild(s);
  }, []);
  return (
    <iframe
      src={WORKSHOP_FORM_SRC}
      id={`inline-${WORKSHOP_FORM_ID}`}
      title="Reserve your seat"
      data-layout="{'id':'INLINE'}"
      data-trigger-type="alwaysShow"
      data-activation-type="alwaysActivated"
      data-deactivation-type="neverDeactivate"
      data-form-name="Website - Retirement Plan Workshop RSVP"
      data-height="auto"
      data-layout-iframe-id={`inline-${WORKSHOP_FORM_ID}`}
      data-form-id={WORKSHOP_FORM_ID}
      style={{ width: "100%", minHeight: "30rem", border: "none", borderRadius: "12px" }}
      loading="lazy"
    />
  );
}

export function WorkshopFlow() {
  const { state, inFrame } = useUnlocked("retirement-workshop");
  const [step, setStep] = useState<Step>("zip");
  const [zip, setZip] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function check() {
    setError("");
    if (!/^\d{5}$/.test(zip)) {
      setError("Enter a 5-digit ZIP code.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(`https://api.zippopotam.us/us/${zip}`);
      if (!res.ok) throw new Error("zip");
      const data = await res.json();
      const p = data.places?.[0];
      const d = miles(WORKSHOP_LAT, WORKSHOP_LNG, parseFloat(p.latitude), parseFloat(p.longitude));
      setStep(d <= WORKSHOP_RADIUS_MILES ? "local" : "far");
    } catch {
      setError("We couldn't find that ZIP code. Check it, or pick an option below.");
    } finally {
      setBusy(false);
    }
  }

  // Loaded inside the CRM form iframe after submit: the parent page takes over.
  if (inFrame) {
    return <p className="p-6 text-center font-sf text-sm text-brand-navy/70">You&apos;re in. Saving your seat…</p>;
  }

  if (state === "loading") return <div className="min-h-[20rem]" aria-busy="true" />;

  if (state === "open") {
    return (
      <div className={CARD}>
        <p className="font-sf text-xs font-semibold uppercase tracking-[0.16em] text-brand-bronze">You&apos;re registered</p>
        <h2 className="mt-2 font-display text-2xl uppercase leading-tight text-brand-navy">See you Saturday, November 21</h2>
        <p className="mt-3 font-sf text-brand-navy/80">
          2:00 PM ET at the Brandywine Hundred Library, 1300 Foulk Rd, Wilmington, DE. Check your texts and email for the
          details.
        </p>
        <Link href="/resources/retirement-tax-calculator" className={`${BTN} mt-6`}>
          Try the tax calculator now
        </Link>
      </div>
    );
  }

  if (step === "local") {
    return (
      <div className={CARD}>
        <p className="font-sf text-xs font-semibold uppercase tracking-[0.16em] text-brand-bronze">You&apos;re close enough</p>
        <h2 className="mt-2 font-display text-2xl uppercase leading-tight text-brand-navy">Reserve your free seat</h2>
        <div className="mt-6">
          <RsvpForm />
        </div>
        <button className="mt-4 font-sf text-sm text-brand-navy/60 underline" onClick={() => setStep("zip")}>
          Use a different ZIP code
        </button>
      </div>
    );
  }

  if (step === "far") {
    return (
      <div className={CARD}>
        <p className="font-sf text-xs font-semibold uppercase tracking-[0.16em] text-brand-bronze">Not near Wilmington?</p>
        <h2 className="mt-2 font-display text-2xl uppercase leading-tight text-brand-navy">
          Let&apos;s do it one-on-one
        </h2>
        <p className="mt-3 font-sf text-brand-navy/80">
          The workshop is in person, so it&apos;s a long drive from where you are. Book a private call and I&apos;ll walk you
          through the same principles, the scorecard and your tax numbers.
        </p>
        <Link href="/workshop/call" className={`${BTN} mt-6`}>
          Pick a time on my calendar
        </Link>
        <button className="ml-4 font-sf text-sm text-brand-navy/60 underline" onClick={() => setStep("zip")}>
          Use a different ZIP code
        </button>
      </div>
    );
  }

  return (
    <div className={CARD}>
      <p className="font-sf text-xs font-semibold uppercase tracking-[0.16em] text-brand-bronze">Step 1</p>
      <h2 className="mt-2 font-display text-2xl uppercase leading-tight text-brand-navy">Where do you live?</h2>
      <p className="mt-2 font-sf text-sm text-brand-navy/70">
        We use your ZIP code to point you to the right option: the in-person workshop or a one-on-one call.
      </p>
      <form
        className="mt-6 flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          check();
        }}
      >
        <input
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
          placeholder="ZIP code"
          aria-label="ZIP code"
          className="w-full rounded-full border border-brand-navy/20 bg-white px-5 py-3 font-sf text-base text-brand-navy sm:max-w-[14rem]"
        />
        <button type="submit" disabled={busy} className={BTN}>
          {busy ? "Checking…" : "Continue"}
        </button>
      </form>
      {error && (
        <div className="mt-3 font-sf text-sm text-red-700">
          <p>{error}</p>
          <p className="mt-2 space-x-4">
            <button className="underline" onClick={() => setStep("local")}>
              I&apos;m near Wilmington or Philly
            </button>
            <button className="underline" onClick={() => setStep("far")}>
              I&apos;m farther away
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
