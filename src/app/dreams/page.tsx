"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Check, Clock, X, Upload, ChevronDown } from "lucide-react";
import seedDreams from "@/data/dreams.json";
import Image from "next/image";

type Category = "travel" | "lifestyle" | "sports" | "finance" | "health" | "impact" | "family";

interface Dream {
  id: string;
  title: string;
  description: string;
  category: Category;
  deadline: string | null;
  image: string | null;
  achieved: boolean;
}

const CATEGORY_COLORS: Record<Category, string> = {
  travel: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  lifestyle: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  sports: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  finance: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  health: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  impact: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  family: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
};

const STORAGE_KEY = "dy_dreams_v1";

const EMPTY_FORM = {
  title: "",
  description: "",
  category: "travel" as Category,
  deadline: "",
  image: "",
  achieved: false,
};

function formatDeadline(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function DreamsPage() {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [tab, setTab] = useState<"all" | "achieved" | "pending">("all");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<typeof EMPTY_FORM>>({});
  const [categoryOpen, setCategoryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setDreams(JSON.parse(stored));
    } else {
      setDreams(seedDreams as Dream[]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedDreams));
    }
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function persist(next: Dream[]) {
    setDreams(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function toggleAchieved(id: string) {
    persist(dreams.map((d) => (d.id === id ? { ...d, achieved: !d.achieved } : d)));
  }

  function deleteDream(id: string) {
    persist(dreams.filter((d) => d.id !== id));
  }

  function validate() {
    const e: Partial<typeof EMPTY_FORM> = {};
    if (!form.title.trim()) e.title = "Title is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submitDream() {
    if (!validate()) return;
    const next: Dream = {
      id: Date.now().toString(),
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      deadline: form.deadline || null,
      image: form.image.trim() || null,
      achieved: form.achieved,
    };
    persist([...dreams, next]);
    setShowModal(false);
    setForm(EMPTY_FORM);
    setErrors({});
  }

  const filtered = dreams.filter((d) => {
    if (tab === "achieved") return d.achieved;
    if (tab === "pending") return !d.achieved;
    return true;
  });

  const achievedCount = dreams.filter((d) => d.achieved).length;
  const pendingCount = dreams.filter((d) => !d.achieved).length;

  return (
    <main className="flex flex-col min-h-[70vh] space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
            Personal
          </p>
          <h1 className="text-3xl font-bold tracking-tight">My Dreams</h1>
          <p className="text-sm text-muted-foreground">
            {achievedCount} achieved · {pendingCount} in progress
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shrink-0"
        >
          <Plus className="size-4" />
          Add dream
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {(["all", "pending", "achieved"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
              tab === t
                ? "border-teal-600 text-teal-600"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "all" ? `All ${dreams.length}` : t === "pending" ? `In Progress ${pendingCount}` : `Achieved ${achievedCount}`}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-muted-foreground text-sm">No dreams here yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filtered.map((dream, idx) => (
            <DreamCard
              key={dream.id}
              dream={dream}
              index={idx + 1}
              onToggle={() => toggleAchieved(dream.id)}
              onDelete={() => deleteDream(dream.id)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-background border border-border rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
              <h2 className="font-semibold text-base">Add a new dream</h2>
              <button
                onClick={() => { setShowModal(false); setForm(EMPTY_FORM); setErrors({}); }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal body */}
            <div className="overflow-y-auto px-6 py-5 flex flex-col gap-4">
              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">
                  Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="I am driving a Lamborghini Urus..."
                  className={`w-full border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    errors.title ? "border-rose-500" : "border-border"
                  }`}
                />
                {errors.title && <p className="text-xs text-rose-500">{errors.title}</p>}
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Add some details about this dream..."
                  rows={3}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Category</label>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setCategoryOpen(!categoryOpen)}
                    className="w-full flex items-center justify-between border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none"
                  >
                    <span className="capitalize">{form.category}</span>
                    <ChevronDown className="size-4 text-muted-foreground" />
                  </button>
                  {categoryOpen && (
                    <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-background border border-border rounded-lg shadow-lg overflow-hidden">
                      {(Object.keys(CATEGORY_COLORS) as Category[]).map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => { setForm({ ...form, category: cat }); setCategoryOpen(false); }}
                          className={`w-full text-left px-3 py-2 text-sm capitalize hover:bg-muted transition-colors ${form.category === cat ? "bg-muted" : ""}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Image URL */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  <Upload className="size-3.5" />
                  Image URL <span className="text-muted-foreground text-xs font-normal">(optional)</span>
                </label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Deadline */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  Deadline <span className="text-muted-foreground text-xs font-normal">(optional)</span>
                </label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Achieved toggle */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Mark as achieved</label>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, achieved: !form.achieved })}
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    form.achieved ? "bg-teal-600" : "bg-muted-foreground/30"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 size-4 rounded-full bg-white shadow transition-transform ${
                      form.achieved ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex gap-3 px-6 py-4 border-t border-border shrink-0">
              <button
                onClick={() => { setShowModal(false); setForm(EMPTY_FORM); setErrors({}); }}
                className="flex-1 border border-border rounded-lg py-2 text-sm font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitDream}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-2 text-sm font-medium transition-colors"
              >
                Add dream
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function DreamCard({
  dream,
  index,
  onToggle,
  onDelete,
}: {
  dream: Dream;
  index: number;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className={`group relative flex flex-col gap-3 border rounded-xl p-5 transition-all ${
        dream.achieved
          ? "border-teal-200 bg-teal-50/50 dark:border-teal-900/40 dark:bg-teal-950/20"
          : "border-border bg-background hover:border-foreground/20"
      }`}
    >
      {/* Delete */}
      <button
        onClick={onDelete}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-rose-500 transition-all"
        title="Remove"
      >
        <X className="size-3.5" />
      </button>

      {/* Image */}
      {dream.image && (
        <div className="relative w-full h-32 rounded-lg overflow-hidden">
          <Image src={dream.image} alt={dream.title} fill className="object-cover" unoptimized />
        </div>
      )}

      {/* Top row */}
      <div className="flex items-start gap-3">
        {/* Check button */}
        <button
          onClick={onToggle}
          title={dream.achieved ? "Mark as pending" : "Mark as achieved"}
          className={`shrink-0 mt-0.5 size-5 rounded-full border-2 flex items-center justify-center transition-all ${
            dream.achieved
              ? "bg-teal-600 border-teal-600"
              : "border-muted-foreground/40 hover:border-teal-500"
          }`}
        >
          {dream.achieved && <Check className="size-3 text-white" strokeWidth={3} />}
        </button>

        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <p className={`text-sm font-medium leading-snug ${dream.achieved ? "line-through text-muted-foreground" : ""}`}>
            {dream.title}
          </p>
          {dream.description && (
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {dream.description}
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 flex-wrap pl-8">
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full capitalize ${CATEGORY_COLORS[dream.category]}`}>
          {dream.category}
        </span>
        {dream.deadline && (
          <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
            <Clock className="size-2.5" />
            {formatDeadline(dream.deadline)}
          </span>
        )}
        {dream.achieved && (
          <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 flex items-center gap-1 ml-auto">
            <Check className="size-2.5" strokeWidth={3} />
            Achieved
          </span>
        )}
      </div>
    </div>
  );
}
