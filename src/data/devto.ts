interface DevToArticle {
  id: number;
  title: string;
  description: string;
  published_at: string;
  slug: string;
  body_html: string;
  url: string;
  cover_image: string | null;
}

const DEV_TO_API = 'https://dev.to/api';
const DEV_TO_API_KEY = '4kQpckzb5UE1moVLyXXrVfXH';

async function processCodeBlocks(html: string) {
  // Replace dev.to's code block structure with our styled version
  const styledHtml = html.replace(
    /<div class="highlight">[\s\S]*?<pre.*?>([\s\S]*?)<\/pre>[\s\S]*?<\/div>/g,
    (_, code) => {
      // Remove existing syntax highlighting spans
      const cleanCode = code.replace(/<\/?span[^>]*>/g, '');
      // Decode HTML entities
      const decodedCode = cleanCode.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
      return `<pre class="language-"><code>${decodedCode}</code></pre>`;
    }
  );

  return styledHtml;
}

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
  const processedContent = await processCodeBlocks(article.body_html);

  return {
    slug: `devto-${article.id}`,
    metadata: {
      title: article.title,
      publishedAt: article.published_at,
      summary: article.description,
      image: article.cover_image,
      devToUrl: article.url,
    },
    source: processedContent,
  };
}
