"use client";

import { useState, useEffect, ReactNode } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

// SHA-256 of "WealthForever!26"
const CORRECT_HASH = "698763e0059fc6f7ab259724edb41a2e04547c861018a15603de2ed85f6040a4";
const STORAGE_KEY = "dy_auth_v1";

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function PasswordGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);
  const [input, setInput] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === CORRECT_HASH) setUnlocked(true);
    setReady(true);
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setChecking(true);
    setError(false);
    const hash = await sha256(input);
    if (hash === CORRECT_HASH) {
      localStorage.setItem(STORAGE_KEY, hash);
      setUnlocked(true);
    } else {
      setError(true);
      setInput("");
    }
    setChecking(false);
  }

  if (!ready) return null;
  if (unlocked) return <>{children}</>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="size-12 rounded-full bg-muted flex items-center justify-center">
          <Lock className="size-5 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Protected page</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter the password to continue.</p>
        </div>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-3 w-full max-w-xs">
        <div className="relative">
          <input
            type={showPw ? "text" : "password"}
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false); }}
            placeholder="Password"
            autoFocus
            className={`w-full border rounded-lg px-4 py-2.5 pr-10 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
              error ? "border-rose-500" : "border-border"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPw((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>

        {error && (
          <p className="text-xs text-rose-500 text-center">Incorrect password. Try again.</p>
        )}

        <button
          type="submit"
          disabled={checking || !input}
          className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white rounded-lg py-2.5 text-sm font-medium transition-colors"
        >
          {checking ? "Checking…" : "Unlock"}
        </button>
      </form>
    </div>
  );
}
