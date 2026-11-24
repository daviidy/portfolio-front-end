import { DM_Sans, Newsreader } from "next/font/google";
import "./roadmap.css";

const dm = DM_Sans({ subsets: ["latin"], variable: "--font-dm", display: "swap" });
const news = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-news",
  display: "swap",
});

export default function RoadmapLayout({ children }: { children: React.ReactNode }) {
  return (
    <main data-rm className={`rm ${dm.variable} ${news.variable}`}>
      {children}
    </main>
  );
}
