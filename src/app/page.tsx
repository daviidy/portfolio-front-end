import {
  Engineering,
  FinalCta,
  Finance,
  Hero,
  SiteHeader,
  Story,
} from "@/components/home/sections";

export default function HomePage() {
  return (
    <main data-home className="min-h-screen bg-brand-paper">
      <SiteHeader />
      <Hero />
      <Story />
      <Engineering />
      <Finance />
      <FinalCta />
    </main>
  );
}
