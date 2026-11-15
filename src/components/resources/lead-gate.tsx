"use client";

import { useEffect, useState } from "react";
import { CRM_FORM_ID, CRM_FORM_SCRIPT, CRM_FORM_SRC } from "@/data/site";

const KEY = "dy_resource_access_v1";
const MSG = "dy-resource-unlocked";

function markUnlocked(resource: string) {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
    saved[resource] = new Date().toISOString();
    localStorage.setItem(KEY, JSON.stringify(saved));
  } catch {}
}

/**
 * Access state for a gated resource.
 * - "open": visitor already submitted the CRM form (remembered in localStorage).
 * - The CRM form's "On submit" action redirects to `<page>?access=granted`.
 *   If that redirect happens inside the form's iframe, this page (loaded in the frame)
 *   records the unlock and tells the parent window; if it happens at the top level,
 *   the page simply opens.
 */
export function useUnlocked(resource: string) {
  const [state, setState] = useState<"loading" | "locked" | "open">("loading");
  const [inFrame, setInFrame] = useState(false);

  useEffect(() => {
    const framed = window.self !== window.top;
    setInFrame(framed);

    const granted = new URLSearchParams(window.location.search).get("access") === "granted";
    if (granted) {
      markUnlocked(resource);
      if (framed) {
        try {
          window.parent.postMessage({ type: MSG, resource }, window.location.origin);
        } catch {}
        return;
      }
      window.history.replaceState(null, "", window.location.pathname);
      setState("open");
      return;
    }

    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
      setState(saved[resource] ? "open" : "locked");
    } catch {
      setState("locked");
    }

    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.data && e.data.type === MSG && e.data.resource === resource) {
        markUnlocked(resource);
        setState("open");
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [resource]);

  return { state, inFrame };
}

/** The Insiders CRM opt-in form (name, email, phone + SMS consent), embedded inline. */
export function LeadGate() {
  useEffect(() => {
    if (document.querySelector(`script[src="${CRM_FORM_SCRIPT}"]`)) return;
    const s = document.createElement("script");
    s.src = CRM_FORM_SCRIPT;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div className="min-h-[26rem] w-full">
      <iframe
        src={CRM_FORM_SRC}
        id={`inline-${CRM_FORM_ID}`}
        title="Get the retirement tax calculator"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Website - Retirement Tax Calculator Optin"
        data-height="auto"
        data-layout-iframe-id={`inline-${CRM_FORM_ID}`}
        data-form-id={CRM_FORM_ID}
        style={{ width: "100%", minHeight: "26rem", border: "none", borderRadius: "12px" }}
        loading="lazy"
      />
    </div>
  );
}
