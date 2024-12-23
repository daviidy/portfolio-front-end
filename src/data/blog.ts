import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { getDevToPost, getDevToPosts } from "./devto";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  devToUrl?: string;
};

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: {
        dark: 'github-dark',
        light: 'github-light',
      },
      keepBackground: true,
      defaultLang: 'plaintext',
    })
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

export async function getPost(slug: string) {
  if (slug.startsWith('devto-')) {
    const devToPost = await getDevToPost(slug);
    const content = await markdownToHTML(devToPost.source);
    return {
      source: content,
      metadata: devToPost.metadata,
      slug,
    };
  }

  const filePath = path.join("content", `${slug}.mdx`);
  let source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data: metadata } = matter(source);
  const content = await markdownToHTML(rawContent);
  return {
    source: content,
    metadata,
    slug,
  };
}

async function getAllPosts(dir: string) {
  let mdxFiles = getMDXFiles(dir);
  const [localPosts, devToPosts] = await Promise.all([
    Promise.all(
      mdxFiles.map(async (file) => {
        let slug = path.basename(file, path.extname(file));
        let { metadata, source } = await getPost(slug);
        return {
          metadata,
          slug,
          source,
        };
      })
    ),
    getDevToPosts(),
  ]);

  return [...localPosts, ...devToPosts];
}

export async function getBlogPosts() {
  return getAllPosts(path.join(process.cwd(), "content"));
}
