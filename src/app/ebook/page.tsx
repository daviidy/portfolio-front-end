import { DATA } from "@/data/resume";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Ebook",
  description: "Download my free ebook and learn more about software development.",
};

export default function EbookPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] space-y-8">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Free Ebook</h1>
        <p className="text-lg text-muted-foreground">
          Download my free ebook and learn more about software development.
        </p>
      </div>
      
      <div className="klaviyo-form-Yxt67z"></div>
    </main>
  );
}
