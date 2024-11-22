import { getBlogPosts, getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  let post = await getPost(params.slug);

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    devToUrl,
  } = post.metadata;
  let ogImage = image ? image : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: devToUrl || `${DATA.url}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  let post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section id="blog">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? post.metadata.image
              : `${DATA.url}/og?title=${post.metadata.title}`,
            url: post.metadata.devToUrl || `${DATA.url}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />
      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(post.metadata.publishedAt)}
          </p>
        </Suspense>
        {post.metadata.devToUrl && (
          <Link
            href={post.metadata.devToUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
          >
            Read on Dev.to →
          </Link>
        )}
      </div>
      <article
        className="prose dark:prose-invert max-w-none
          prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-900
          prose-pre:border prose-pre:border-neutral-200 dark:prose-pre:border-neutral-800
          prose-pre:rounded-lg
          prose-code:before:content-none prose-code:after:content-none
          prose-code:font-normal
          prose-code:bg-neutral-100 dark:prose-code:bg-neutral-900
          prose-code:rounded
          prose-code:px-1
          prose-code:py-0.5
          prose-code:text-neutral-800 dark:prose-code:text-neutral-200
          prose-a:text-blue-500 hover:prose-a:text-blue-400
          prose-headings:font-medium
          prose-h2:text-xl prose-h2:tracking-tight
          prose-p:leading-7
          prose-li:leading-7"
        dangerouslySetInnerHTML={{ __html: post.source }}
      ></article>
    </section>
  );
}
