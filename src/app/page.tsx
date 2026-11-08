import {
  Engineering,
  FinalCta,
  Finance,
  Hero,
  Story,
} from "@/components/home/sections";

export default function HomePage() {
  return (
    <main className="pb-20">
      <Hero />
      <Story />
      <Engineering />
      <Finance />
      <FinalCta />
    </main>
  );
}
