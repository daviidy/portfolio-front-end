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
    <main data-home className="min-h-screen bg-brand-paper">
      <SiteHeader />
      <Hero />
      <WhoAmI />
      <Story />
      <WhatIDid />
      <FinalCta />
    </main>
  );
}
