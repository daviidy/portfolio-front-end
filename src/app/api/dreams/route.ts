import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DREAMS_PATH = path.join(process.cwd(), "src/data/dreams.json");

export async function POST(request: Request) {
  try {
    const dream = await request.json();
    const dreams = JSON.parse(fs.readFileSync(DREAMS_PATH, "utf-8"));
    dreams.push(dream);
    fs.writeFileSync(DREAMS_PATH, JSON.stringify(dreams, null, 2));
    return NextResponse.json(dream, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save dream" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, ...updates } = await request.json();
    const dreams = JSON.parse(fs.readFileSync(DREAMS_PATH, "utf-8"));
    const next = dreams.map((d: { id: string }) => (d.id === id ? { ...d, ...updates } : d));
    fs.writeFileSync(DREAMS_PATH, JSON.stringify(next, null, 2));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to update dream" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const dreams = JSON.parse(fs.readFileSync(DREAMS_PATH, "utf-8"));
    const next = dreams.filter((d: { id: string }) => d.id !== id);
    fs.writeFileSync(DREAMS_PATH, JSON.stringify(next, null, 2));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete dream" }, { status: 500 });
  }
}
