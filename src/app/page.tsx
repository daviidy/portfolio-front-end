import {
  FinalCta,
  Hero,
  SiteHeader,
  Story,
  WhatIDid,
  WhoAmI,
} from "@/components/home/sections";

export default function HomePage() {
  return (
    <main data-home className="relative min-h-screen overflow-hidden bg-brand-paper">
      {/* soft colour fields so the glass cards have something to refract */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -left-32 top-[28rem] size-[34rem] rounded-full bg-brand-bronze/25 blur-3xl" />
        <div className="absolute -right-40 top-[70rem] size-[38rem] rounded-full bg-brand-navy/20 blur-3xl" />
        <div className="absolute -left-24 top-[130rem] size-[34rem] rounded-full bg-[#d8bf98]/60 blur-3xl" />
      </div>
      <div className="relative">
      <SiteHeader />
      <Hero />
      <WhoAmI />
      <Story />
      <WhatIDid />
      <FinalCta />
      </div>
    </main>
  );
}
