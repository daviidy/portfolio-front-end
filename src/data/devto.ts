interface DevToArticle {
  id: number;
  title: string;
  description: string;
  published_at: string;
  slug: string;
  body_markdown: string;
  url: string;
  cover_image: string | null;
  comments_count: number;
}

interface DevToComment {
  id: number;
  created_at: string;
  body_html: string;
  user: {
    name: string;
    username: string;
    profile_image: string;
  };
  children: DevToComment[];
}

const DEV_TO_API = 'https://dev.to/api';
const DEV_TO_API_KEY = '4kQpckzb5UE1moVLyXXrVfXH';

export async function getDevToPosts() {
  try {
    const response = await fetch(`${DEV_TO_API}/articles/me`, {
      headers: {
        'api-key': DEV_TO_API_KEY
      },
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      console.error('Failed to fetch dev.to posts:', await response.text());
      return [];
    }

    const articles: DevToArticle[] = await response.json();

    return articles.map((article) => ({
      slug: `devto-${article.id}`,
      metadata: {
        title: article.title,
        publishedAt: article.published_at,
        summary: article.description,
        image: article.cover_image,
        devToUrl: article.url,
        commentsCount: article.comments_count,
      },
      source: '',
    }));
  } catch (error) {
    console.error('Error fetching dev.to posts:', error);
    return [];
  }
}

export async function getDevToPost(id: string) {
  try {
    const articleId = id.replace('devto-', '');
    const response = await fetch(`${DEV_TO_API}/articles/${articleId}`, {
      headers: {
        'api-key': DEV_TO_API_KEY
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      console.error('Failed to fetch dev.to post:', await response.text());
      throw new Error('Failed to fetch article');
    }

    const article: DevToArticle = await response.json();

    return {
      slug: `devto-${article.id}`,
      metadata: {
        title: article.title,
        publishedAt: article.published_at,
        summary: article.description,
        image: article.cover_image,
        devToUrl: article.url,
        commentsCount: article.comments_count,
      },
      source: article.body_markdown,
    };
  } catch (error) {
    console.error('Error fetching dev.to post:', error);
    throw error;
  }
}

export async function getDevToComments(articleId: string) {
  try {
    const id = articleId.replace('devto-', '');
    const response = await fetch(`${DEV_TO_API}/comments?a_id=${id}`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      console.error('Failed to fetch dev.to comments:', await response.text());
      return [];
    }

    const text = await response.text();
    if (!text) {
      return [];
    }

    try {
      const comments: DevToComment[] = JSON.parse(text);
      return comments;
    } catch (parseError) {
      console.error('Error parsing comments JSON:', parseError, 'Response text:', text);
      return [];
    }
  } catch (error) {
    console.error('Error fetching dev.to comments:', error);
    return [];
  }
}
