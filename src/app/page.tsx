import {
  Engineering,
  FinalCta,
  Finance,
  Hero,
  Story,
} from "@/components/home/sections";

export default function HomePage() {
  return (
    <main data-home>
      <Hero />
      <Story />
      <Engineering />
      <Finance />
      <FinalCta />
    </main>
  );
}
