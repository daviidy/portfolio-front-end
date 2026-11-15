"use client";

import { useEffect, useState } from "react";
import { LEAD_WEBHOOK_URL } from "@/data/site";

const KEY = "dy_resource_access_v1";

export function useUnlocked(resource: string) {
  const [state, setState] = useState<"loading" | "locked" | "open">("loading");
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
      setState(saved[resource] ? "open" : "locked");
    } catch {
      setState("locked");
    }
  }, [resource]);
  const unlock = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
      saved[resource] = new Date().toISOString();
      localStorage.setItem(KEY, JSON.stringify(saved));
    } catch {}
    setState("open");
  };
  return { state, unlock };
}

const field =
  "w-full rounded-xl border border-brand-navy/20 bg-white px-4 py-3 font-sf text-sm text-brand-navy placeholder:text-brand-navy/40 focus:border-brand-bronze focus:outline-none focus:ring-2 focus:ring-brand-bronze/30";

export function LeadGate({
  resource,
  tag,
  onUnlock,
}: {
  resource: string; // e.g. "retirement-tax-calculator"
  tag: string; // CRM tag applied to the contact
  onUnlock: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();
    const phone = String(f.get("phone") || "").trim();
    const consent = f.get("consent") === "on";
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }
    setBusy(true);
    const [firstName, ...rest] = name.split(" ");
    const payload = {
      firstName,
      lastName: rest.join(" "),
      name,
      email,
      phone,
      smsConsent: consent,
      tags: [tag, "website"],
      source: "david-yao.com/" + resource,
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      submittedAt: new Date().toISOString(),
    };
    try {
      if (LEAD_WEBHOOK_URL) {
        // no-cors: the CRM webhook does not send CORS headers; we only need it delivered.
        await fetch(LEAD_WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=UTF-8" },
          body: JSON.stringify(payload),
        });
      } else {
        console.warn("LEAD_WEBHOOK_URL is not set: lead was NOT sent", payload);
      }
      onUnlock();
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3" noValidate={false}>
      <input name="name" required autoComplete="name" placeholder="First and last name" className={field} />
      <input name="email" type="email" required autoComplete="email" placeholder="Your best email" className={field} />
      <input name="phone" type="tel" required autoComplete="tel" placeholder="Your best phone number" className={field} />
      <label className="flex items-start gap-3 font-sf text-xs leading-relaxed text-brand-navy/70">
        <input name="consent" type="checkbox" required className="mt-0.5 size-4 shrink-0 accent-[#795833]" />
        <span>
          Yes, David Yao may contact me by email, call and text about this resource and my retirement planning.
          Message and data rates may apply. Reply STOP to opt out.
        </span>
      </label>
      {error && <p role="alert" className="font-sf text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-xl border border-brand-bronze bg-brand-bronze px-6 py-3 font-sf text-sm font-semibold text-brand-cream shadow-[0_2px_0_rgba(0,0,0,0.25),0_10px_22px_-10px_rgba(121,88,51,0.6)] transition hover:brightness-110 disabled:opacity-60"
      >
        {busy ? "Unlocking…" : "Unlock the calculator"}
      </button>
      <p className="font-sf text-xs text-brand-navy/55">No spam. Your details are never sold.</p>
    </form>
  );
}
