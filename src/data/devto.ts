interface DevToArticle {
  id: number;
  title: string;
  description: string;
  published_at: string;
  slug: string;
  body_markdown: string;
  url: string;
  cover_image: string | null;
}

const DEV_TO_API = 'https://dev.to/api';
const DEV_TO_API_KEY = '4kQpckzb5UE1moVLyXXrVfXH';

export async function getDevToPosts() {
  const response = await fetch(`${DEV_TO_API}/articles/me`, {
    headers: {
      'api-key': DEV_TO_API_KEY
    },
    next: { revalidate: 3600 }
  });
  const articles: DevToArticle[] = await response.json();

  return articles.map((article) => ({
    slug: `devto-${article.id}`,
    metadata: {
      title: article.title,
      publishedAt: article.published_at,
      summary: article.description,
      image: article.cover_image,
      devToUrl: article.url,
    },
    source: '',
  }));
}

export async function getDevToPost(id: string) {
  const articleId = id.replace('devto-', '');
  const response = await fetch(`${DEV_TO_API}/articles/${articleId}`, {
    headers: {
      'api-key': DEV_TO_API_KEY
    },
    next: { revalidate: 3600 }
  });
  const article: DevToArticle = await response.json();

  return {
    slug: `devto-${article.id}`,
    metadata: {
      title: article.title,
      publishedAt: article.published_at,
      summary: article.description,
      image: article.cover_image,
      devToUrl: article.url,
    },
    source: article.body_markdown,
  };
}
