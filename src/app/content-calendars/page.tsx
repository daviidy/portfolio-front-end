"use client";

import { useState } from "react";
import { ChevronLeft, Film, BookOpen } from "lucide-react";
import type { Metadata } from "next";

type View = "years" | "months" | "types";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const MONTH_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const CALENDARS: Record<number, Record<number, { stories?: string; reels?: string }>> = {
  2026: {
    5: {
      stories: "/calendars/stories-2026-05.html",
      reels: "/calendars/reels-2026-05.html",
    },
  },
};

const YEARS = Object.keys(CALENDARS).map(Number);

export default function ContentCalendarsPage() {
  const [view, setView] = useState<View>("years");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const handleYearClick = (year: number) => {
    setSelectedYear(year);
    setView("months");
  };

  const handleMonthClick = (month: number) => {
    setSelectedMonth(month);
    setView("types");
  };

  const handleBack = () => {
    if (view === "types") {
      setView("months");
      setSelectedMonth(null);
    } else if (view === "months") {
      setView("years");
      setSelectedYear(null);
    }
  };

  const monthsForYear = selectedYear ? CALENDARS[selectedYear] ?? {} : {};
  const typesForMonth =
    selectedYear && selectedMonth
      ? (CALENDARS[selectedYear]?.[selectedMonth] ?? {})
      : {};

  return (
    <main className="flex flex-col min-h-[70vh] space-y-8">
      {/* Breadcrumb / back */}
      {view !== "years" && (
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ChevronLeft className="size-4" />
          Back
        </button>
      )}

      {/* Title */}
      <div className="space-y-1">
        <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
          {view === "years" && "Content Calendars"}
          {view === "months" && `${selectedYear} · Select Month`}
          {view === "types" &&
            selectedYear &&
            selectedMonth &&
            `${MONTH_NAMES[selectedMonth - 1]} ${selectedYear} · Select Calendar`}
        </p>
        <h1 className="text-3xl font-bold tracking-tight">
          {view === "years" && "Calendars"}
          {view === "months" && String(selectedYear)}
          {view === "types" &&
            selectedMonth &&
            MONTH_NAMES[selectedMonth - 1]}
        </h1>
      </div>

      {/* Years view */}
      {view === "years" && (
        <div className="grid grid-cols-2 gap-4">
          {YEARS.map((year) => (
            <button
              key={year}
              onClick={() => handleYearClick(year)}
              className="group relative border border-border rounded-lg p-6 text-left hover:border-foreground/30 hover:bg-muted/40 transition-all"
            >
              <span className="text-4xl font-bold tracking-tight">{year}</span>
              <p className="text-xs text-muted-foreground mt-1 font-mono">
                {Object.keys(CALENDARS[year]).length} month
                {Object.keys(CALENDARS[year]).length !== 1 ? "s" : ""} available
              </p>
            </button>
          ))}
          {/* Future years placeholder */}
          {[2027].map((year) => (
            <div
              key={year}
              className="border border-border/40 rounded-lg p-6 opacity-40 cursor-not-allowed"
            >
              <span className="text-4xl font-bold tracking-tight">{year}</span>
              <p className="text-xs text-muted-foreground mt-1 font-mono">Coming soon</p>
            </div>
          ))}
        </div>
      )}

      {/* Months view */}
      {view === "months" && selectedYear && (
        <div className="grid grid-cols-3 gap-3">
          {MONTH_SHORT.map((name, idx) => {
            const monthNum = idx + 1;
            const hasContent = monthsForYear[monthNum] !== undefined;
            return (
              <button
                key={monthNum}
                onClick={() => hasContent && handleMonthClick(monthNum)}
                disabled={!hasContent}
                className={`border rounded-lg p-4 text-left transition-all ${
                  hasContent
                    ? "border-border hover:border-foreground/30 hover:bg-muted/40 cursor-pointer"
                    : "border-border/30 opacity-30 cursor-not-allowed"
                }`}
              >
                <span className="text-lg font-bold">{name}</span>
                {hasContent && (
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {monthsForYear[monthNum]?.stories && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                        Stories
                      </span>
                    )}
                    {monthsForYear[monthNum]?.reels && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                        Reels
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Calendar types view */}
      {view === "types" && selectedYear && selectedMonth && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {typesForMonth.reels ? (
            <a
              href={typesForMonth.reels}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 border border-border rounded-lg p-6 hover:border-foreground/30 hover:bg-muted/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-muted flex items-center justify-center">
                  <Film className="size-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold">Reels Calendar</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {MONTH_NAMES[selectedMonth - 1]} {selectedYear}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                30-day reels content plan with hooks, scripts, and CTAs.
              </p>
            </a>
          ) : (
            <div className="flex flex-col gap-3 border border-border/30 rounded-lg p-6 opacity-40 cursor-not-allowed">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-muted flex items-center justify-center">
                  <Film className="size-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold">Reels Calendar</p>
                  <p className="text-xs text-muted-foreground font-mono">Coming soon</p>
                </div>
              </div>
            </div>
          )}

          {typesForMonth.stories ? (
            <a
              href={typesForMonth.stories}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 border border-border rounded-lg p-6 hover:border-foreground/30 hover:bg-muted/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-muted flex items-center justify-center">
                  <BookOpen className="size-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold">Stories Calendar</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {MONTH_NAMES[selectedMonth - 1]} {selectedYear}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                30-day stories plan — 7 story types, 3 pillars, 2 lead baits/week.
              </p>
            </a>
          ) : (
            <div className="flex flex-col gap-3 border border-border/30 rounded-lg p-6 opacity-40 cursor-not-allowed">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-muted flex items-center justify-center">
                  <BookOpen className="size-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold">Stories Calendar</p>
                  <p className="text-xs text-muted-foreground font-mono">Coming soon</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
