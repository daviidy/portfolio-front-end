import fs from "fs";
import matter from "gray-matter";
import type { MetadataRoute } from "next";
import path from "path";

const BASE_URL = "https://david-yao.com";

const STATIC_ROUTES = [
  "",
  "/about",
  "/blog",
  "/bicep-comeback",
  "/content-calendars",
  "/dreams",
  "/ebook",
  "/fitness",
  "/quad-comeback",
];

function getLocalPostSlugs(): { slug: string; lastModified: Date }[] {
  const contentDir = path.join(process.cwd(), "content");
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter((file) => path.extname(file) === ".mdx")
    .map((file) => {
      const slug = path.basename(file, path.extname(file));
      const source = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const { data } = matter(source);
      return {
        slug,
        lastModified: data.publishedAt ? new Date(data.publishedAt) : new Date(),
      };
    });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getLocalPostSlugs();
  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
    })),
    ...posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.lastModified,
    })),
  ];
}
