import { BlogPost, BlogPostSection } from './data';
import { BLOG_PLACEHOLDERS } from './placeholders';

const PERMAWEB_PORTAL = 'https://hb.portalinto.com';
const POSTS_INDEX_URL = `${PERMAWEB_PORTAL}/Uko7_w8kUt91gpXpXpXtbjfHgOn_KPC5APoqN8lFvT8~process@1.0/compute/posts?require-codec=application/json&accept-bundle=true`;
const ASSET_QUERY = 'require-codec=application/json&accept-bundle=true';
const UNKNOWN_HEADING = 'From the journal';

export const PERMAWEB_JOURNAL_CATEGORY = 'Permaweb Journal';

type PermawebCategory = {
  Name?: string;
};

type PermawebBlock = {
  Content?: string;
  Type?: string;
};

type PermawebMetadata = {
  Description?: string;
  ReleaseDate?: string | number;
  Status?: string;
  Thumbnail?: string;
  Url?: string;
  Topics?: string[];
  Categories?: PermawebCategory[];
  Content?: PermawebBlock[];
};

type PermawebIndexEntry = {
  AssetType?: string;
  ContentType?: string;
  Creator?: string;
  Id?: string;
  Name?: string;
  Metadata?: PermawebMetadata;
};

type PermawebPostsResponse = {
  Index?: PermawebIndexEntry[];
};

type PermawebAssetResponse = {
  Creator?: string;
  Name?: string;
  Metadata?: PermawebMetadata;
};

let cachedList: BlogPost[] | null = null;
let cachedListPromise: Promise<BlogPost[]> | null = null;
const slugToId = new Map<string, string>();
const detailCache = new Map<string, BlogPost>();

function buildAssetUrl(id: string) {
  return `${PERMAWEB_PORTAL}/${id}~process@1.0/compute/asset/?${ASSET_QUERY}`;
}

function parseEpochMs(value?: string | number) {
  if (value === undefined || value === null) return 0;
  const numeric = typeof value === 'string' ? Number(value) : value;
  if (!Number.isFinite(numeric)) return 0;
  return numeric;
}

function formatDate(value?: string | number) {
  const epoch = parseEpochMs(value);
  if (!epoch) return '';
  return new Date(epoch).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function normalizeSlug(value?: string, fallback?: string) {
  const base = (value ?? '').trim().toLowerCase();
  const normalized = base
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  if (normalized) return normalized;
  if (!fallback) return '';
  return `permaweb-${fallback.slice(0, 10).toLowerCase()}`;
}

function toAuthorLabel(creator?: string) {
  if (creator && creator.length <= 24) return creator;
  return 'Permaweb Journal';
}

function toImageUrl(thumbnail?: string) {
  if (!thumbnail) return BLOG_PLACEHOLDERS.grid;
  return `https://arweave.net/${thumbnail}`;
}

function stripHtml(text: string) {
  return text.replace(/<[^>]*>/g, '');
}

function decodeEntities(text: string) {
  if (typeof document === 'undefined') {
    return text.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
  }

  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

function normalizeText(text?: string) {
  if (!text) return '';
  return decodeEntities(stripHtml(text)).replace(/\s+/g, ' ').trim();
}

function estimateReadTime(content: string) {
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  if (wordCount === 0) return '1 min read';
  return `${Math.max(1, Math.ceil(wordCount / 220))} min read`;
}

function shouldInclude(entry: PermawebIndexEntry) {
  return entry.AssetType === 'blog-post' && entry.Metadata?.Status === 'published';
}

function mapIndexEntry(entry: PermawebIndexEntry, index: number) {
  const id = entry.Id ?? '';
  const slugBase = normalizeSlug(entry.Metadata?.Url, id || `${index}`);
  const slug = slugToId.has(slugBase) ? `${slugBase}-${id.slice(0, 8)}` : slugBase;

  if (!slug || !id) return null;

  slugToId.set(slug, id);

  return {
    slug,
    title: normalizeText(entry.Name) || 'Untitled',
    excerpt: normalizeText(entry.Metadata?.Description),
    publishedAt: formatDate(entry.Metadata?.ReleaseDate),
    author: toAuthorLabel(entry.Creator),
    category: PERMAWEB_JOURNAL_CATEGORY,
    readTime: '1 min read',
    imageUrl: toImageUrl(entry.Metadata?.Thumbnail),
    sections: [],
    __sortDate: parseEpochMs(entry.Metadata?.ReleaseDate),
  };
}

function buildSections(content: PermawebBlock[]) {
  const sections: BlogPostSection[] = [];
  let current: BlogPostSection = {
    heading: UNKNOWN_HEADING,
    paragraphs: [],
  };

  content.forEach((block) => {
    const text = normalizeText(block.Content);
    if (!text) return;

    const type = (block.Type ?? '').toLowerCase();
    const isHeader = type.startsWith('header');

    if (isHeader) {
      if (current.paragraphs.length > 0) {
        sections.push(current);
      }
      current = { heading: text, paragraphs: [] };
      return;
    }

    current.paragraphs.push(text);
  });

  if (current.paragraphs.length > 0 || sections.length === 0) {
    sections.push(current);
  }

  return sections;
}

function mapAssetToBlogPost(asset: PermawebAssetResponse, slug: string): BlogPost {
  const blocks = asset.Metadata?.Content ?? [];
  const sections = buildSections(blocks);
  const allText = sections.flatMap((section) => section.paragraphs).join(' ');

  return {
    slug,
    title: normalizeText(asset.Name) || 'Untitled',
    excerpt: normalizeText(asset.Metadata?.Description) || sections[0]?.paragraphs[0] || '',
    publishedAt: formatDate(asset.Metadata?.ReleaseDate),
    author: toAuthorLabel(asset.Creator),
    category: PERMAWEB_JOURNAL_CATEGORY,
    readTime: estimateReadTime(allText),
    imageUrl: toImageUrl(asset.Metadata?.Thumbnail),
    sections,
  };
}

export async function fetchPermawebBlogPosts() {
  if (cachedList) return cachedList;
  if (cachedListPromise) return cachedListPromise;

  cachedListPromise = (async () => {
    const response = await fetch(POSTS_INDEX_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch permaweb posts: ${response.status}`);
    }

    const data: PermawebPostsResponse = await response.json();
    const mapped = (data.Index ?? [])
      .filter(shouldInclude)
      .map(mapIndexEntry)
      .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
      .sort((a, b) => (b?.__sortDate ?? 0) - (a?.__sortDate ?? 0))
      .map(({ __sortDate, ...post }) => post as BlogPost);

    const posts = mapped;
    cachedList = posts;
    return posts;
  })();

  try {
    return await cachedListPromise;
  } finally {
    cachedListPromise = null;
  }
}

export async function getPermawebPostIdBySlug(slug: string) {
  if (!slug) return null;
  if (!slugToId.has(slug)) {
    await fetchPermawebBlogPosts();
  }

  return slugToId.get(slug) ?? null;
}

export async function fetchPermawebBlogPostBySlug(slug?: string) {
  if (!slug) return null;
  if (detailCache.has(slug)) {
    return detailCache.get(slug) ?? null;
  }

  const id = await getPermawebPostIdBySlug(slug);
  if (!id) return null;

  const response = await fetch(buildAssetUrl(id));
  if (!response.ok) {
    throw new Error(`Failed to fetch permaweb post ${id}: ${response.status}`);
  }

  const asset: PermawebAssetResponse = await response.json();
  const mapped = mapAssetToBlogPost(asset, slug);
  detailCache.set(slug, mapped);
  return mapped;
}
