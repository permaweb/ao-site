import { ENDPOINTS } from 'helpers/config';

const AO_CACHE_ROOT = (processId: string) => `https://app-1.forward.computer/${processId}~process@1.0/now/cache`;

type AoCacheSnapshot = Record<string, unknown> & { device?: string };

type AoCacheEntryMeta = {
  postId?: string;
  slug?: string;
  title?: string;
  subtitle?: string;
  author?: string;
  category?: string;
  blogId?: string;
  createdAt?: string;
  updatedAt?: string;
  latestTxId?: string;
  headerImageTxId?: string;
};

type AoCacheEntry = {
  key: string;
  txid?: string;
  meta?: AoCacheEntryMeta;
};

type AoCacheMetaResponse = AoCacheEntryMeta | { meta?: AoCacheEntryMeta };

type AoPostSummary = {
  key?: string;
  postId?: string;
  latestTxId?: string;
  title?: string;
  subtitle?: string;
  author?: string;
  category?: string;
  blogId?: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
  headerImageTxId?: string;
};

export type AoBlogPost = {
  postId: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  category: string;
  readTime: string;
  imageUrl: string;
  latestTxId: string;
  createdAtMs: number;
};

export type AoBlogPostBody = {
  markdown: string | null;
  html: string | null;
};

const FEED_CACHE_TTL_MS = 30_000;
const feedCache = new Map<string, { expiresAt: number; posts: AoBlogPost[]; pinnedPostId: string }>();

const formatPublishedAt = (iso?: string) => {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.valueOf())) return '';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

const estimateReadTime = (text: string) => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
};

const normalizeBlogId = (value: string) => value.trim().toLowerCase();
const normalizeSlug = (value: string) => value.trim().toLowerCase();

const extractKeysFromCacheSnapshot = (snapshot: AoCacheSnapshot) =>
  Object.keys(snapshot)
    .filter((key) => key.endsWith('+link') && key.startsWith('cw-'))
    .map((key) => key.slice(0, -'+link'.length));

const fetchCacheSnapshot = async (processId: string) => {
  const response = await fetch(`${AO_CACHE_ROOT(processId)}/cache/serialize~json@1.0`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`AO cache snapshot fetch failed: ${response.status}`);
  }
  return (await response.json()) as AoCacheSnapshot;
};

const fetchEntryAtPath = async (url: string) => {
  const response = await fetch(url, {
    cache: 'no-store',
  });
  return response;
};

const cleanText = (value?: unknown): string | null => {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
};

const parsePostBody = (raw: string): AoBlogPostBody => {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { markdown: null, html: null };
  }

  try {
    const parsed = JSON.parse(trimmed) as Record<string, unknown>;
    const markdown = cleanText(parsed.markdown) ?? cleanText(parsed.bodyMarkdown) ?? cleanText(parsed.body) ?? null;
    const html = cleanText(parsed.html) ?? cleanText(parsed.bodyHtml) ?? null;
    const content = cleanText(parsed.content) ?? null;
    const fallbackFromHtml = html
      ? html
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
      : null;
    const resolvedMarkdown = markdown ?? content ?? fallbackFromHtml;
    if (resolvedMarkdown || html) {
      return { markdown: resolvedMarkdown, html };
    }
  } catch (error) {
    // Not JSON; treat transaction body as markdown text.
  }

  return { markdown: trimmed, html: null };
};

const fetchEntry = async (processId: string, key: string) => {
  const primaryUrl = `${AO_CACHE_ROOT(processId)}/cache/${key}/serialize~json@1.0`;
  const legacyUrl = `${AO_CACHE_ROOT(processId)}/cache/cache/${key}/serialize~json@1.0`;
  const primaryResponse = await fetchEntryAtPath(primaryUrl);
  const response = primaryResponse.ok ? primaryResponse : await fetchEntryAtPath(legacyUrl);

  if (!response.ok) {
    throw new Error(`AO cache entry failed (${key}): ${response.status}`);
  }
  const data = (await response.json()) as AoCacheEntry | { entry?: AoCacheEntry };
  if ('entry' in data && data.entry) {
    return data.entry;
  }
  return data as AoCacheEntry;
};

const fetchEntryMeta = async (processId: string, key: string) => {
  const primaryUrl = `${AO_CACHE_ROOT(processId)}/cache/${key}/meta/serialize~json@1.0`;
  const legacyUrl = `${AO_CACHE_ROOT(processId)}/cache/cache/${key}/meta/serialize~json@1.0`;
  const primaryResponse = await fetchEntryAtPath(primaryUrl);
  const response = primaryResponse.ok ? primaryResponse : await fetchEntryAtPath(legacyUrl);

  if (!response.ok) {
    return {};
  }
  const data = (await response.json()) as AoCacheMetaResponse;
  if ('meta' in data && data.meta) {
    return data.meta;
  }
  return data as AoCacheEntryMeta;
};

const mapPost = (input: {
  key?: string;
  txid?: string;
  meta?: AoCacheEntryMeta;
  fallbackSlug?: string;
}): AoBlogPost | null => {
  const meta = input.meta ?? {};
  const postId = meta.postId || input.key || '';
  const slug = meta.slug || meta.postId || input.fallbackSlug || input.key || '';
  const title = meta.title || '';
  if (!slug || !title) return null;

  const excerpt = meta.subtitle || '';
  const author = meta.author || '';
  const category = meta.category || '';
  const publishedAt = formatPublishedAt(meta.createdAt);
  const createdAtMs = meta.createdAt ? Date.parse(meta.createdAt) : 0;
  const imageUrl = meta.headerImageTxId ? `https://ardrive.net/${meta.headerImageTxId}` : '';
  const latestTxId = meta.latestTxId || input.txid || '';

  return {
    postId,
    slug,
    title,
    excerpt,
    publishedAt,
    author,
    category,
    readTime: estimateReadTime(excerpt),
    imageUrl,
    latestTxId,
    createdAtMs,
  };
};

const fetchPinnedByBlog = async (processId: string) => {
  const response = await fetch(`${AO_CACHE_ROOT(processId)}/pinned_by_blog/serialize~json@1.0`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`AO pinned_by_blog fetch failed: ${response.status}`);
  }
  return (await response.json()) as Record<string, unknown>;
};

const resolvePinnedPostId = (raw: unknown, blogId: string) => {
  if (!raw || typeof raw !== 'object') return '';
  const normalizedBlogId = normalizeBlogId(blogId);
  const map = raw as Record<string, unknown>;
  const direct = map[blogId];
  if (typeof direct === 'string' && direct.trim()) return direct.trim();
  const normalized = map[normalizedBlogId];
  if (typeof normalized === 'string' && normalized.trim()) return normalized.trim();
  return '';
};

const fetchBlogCards = async (processId: string, blogId: string) => {
  const response = await fetch(`${AO_CACHE_ROOT(processId)}/blog_cards_json/serialize~json@1.0`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`AO blog_cards_json fetch failed: ${response.status}`);
  }

  const payload = (await response.json()) as Record<string, unknown>;
  const raw = payload[blogId];
  if (typeof raw !== 'string' || !raw.trim()) {
    return [] as AoPostSummary[];
  }

  const parsed = JSON.parse(raw) as unknown;
  if (!Array.isArray(parsed)) {
    return [] as AoPostSummary[];
  }
  return parsed as AoPostSummary[];
};

const fetchSlugCardsByBlog = async (processId: string, blogId: string) => {
  const response = await fetch(
    `${AO_CACHE_ROOT(processId)}/slug_cards_by_blog/${encodeURIComponent(blogId)}/serialize~json@1.0`,
    {
      cache: 'no-store',
    }
  );
  if (!response.ok) {
    throw new Error(`AO slug_cards_by_blog fetch failed: ${response.status}`);
  }
  return (await response.json()) as Record<string, unknown>;
};

const fetchAoBlogPostsLegacy = async (processId: string, blogId: string) => {
  const cacheSnapshot = await fetchCacheSnapshot(processId);
  const keys = extractKeysFromCacheSnapshot(cacheSnapshot);
  console.info('[AO Blog] fallback cache keys discovered:', keys.length, keys);

  if (!keys.length) {
    console.error('[AO Blog] fallback discovered 0 cache keys:', cacheSnapshot);
    return [];
  }

  const results = await Promise.allSettled(
    keys.map(async (key) => {
      const [entry, meta] = await Promise.all([fetchEntry(processId, key), fetchEntryMeta(processId, key)]);
      return {
        ...entry,
        meta: {
          ...(entry.meta ?? {}),
          ...meta,
        },
      } as AoCacheEntry;
    })
  );

  const entries = results
    .filter((result): result is PromiseFulfilledResult<AoCacheEntry> => result.status === 'fulfilled')
    .map((result) => result.value);

  return entries
    .map((entry) => {
      const meta = entry.meta ?? {};
      if (meta.blogId && normalizeBlogId(meta.blogId) !== normalizeBlogId(blogId)) return null;
      return mapPost({ key: entry.key, txid: entry.txid, meta, fallbackSlug: entry.key });
    })
    .filter((post): post is AoBlogPost => Boolean(post))
    .sort((a, b) => b.createdAtMs - a.createdAtMs);
};

export const fetchAoBlogPosts = async (
  processId: string,
  blogId: string
): Promise<{ posts: AoBlogPost[]; pinnedPostId: string }> => {
  const cacheKey = normalizeBlogId(blogId);
  const cached = feedCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return cached;
  }

  try {
    const [summaries, pinnedMap] = await Promise.all([
      fetchBlogCards(processId, blogId),
      fetchPinnedByBlog(processId).catch(() => ({})),
    ]);

    const posts = summaries
      .map((summary) => {
        return mapPost({
          key: summary.key,
          txid: summary.latestTxId,
          meta: {
            postId: summary.postId,
            slug: summary.slug,
            title: summary.title,
            subtitle: summary.subtitle,
            author: summary.author,
            category: summary.category,
            blogId: summary.blogId,
            createdAt: summary.createdAt,
            updatedAt: summary.updatedAt,
            latestTxId: summary.latestTxId,
            headerImageTxId: summary.headerImageTxId,
          },
          fallbackSlug: summary.key,
        });
      })
      .filter((post): post is AoBlogPost => Boolean(post))
      .sort((a, b) => b.createdAtMs - a.createdAtMs);

    const pinnedPostId = resolvePinnedPostId(pinnedMap, blogId);
    feedCache.set(cacheKey, {
      expiresAt: Date.now() + FEED_CACHE_TTL_MS,
      posts,
      pinnedPostId,
    });

    return { posts, pinnedPostId };
  } catch (error) {
    console.warn('[AO Blog] fast summaries path failed, falling back to legacy crawl:', error);
    const [posts, pinnedMap] = await Promise.all([
      fetchAoBlogPostsLegacy(processId, blogId),
      fetchPinnedByBlog(processId).catch(() => ({})),
    ]);
    const pinnedPostId = resolvePinnedPostId(pinnedMap, blogId);
    feedCache.set(cacheKey, {
      expiresAt: Date.now() + FEED_CACHE_TTL_MS,
      posts,
      pinnedPostId,
    });
    return { posts, pinnedPostId };
  }
};

export const fetchAoBlogPostBySlug = async (processId: string, blogId: string, slug: string) => {
  const normalizedSlug = normalizeSlug(slug);
  if (!normalizedSlug) return null;

  const cached = feedCache.get(normalizeBlogId(blogId));
  if (cached && cached.expiresAt > Date.now()) {
    const cachedPost = cached.posts.find((post) => normalizeSlug(post.slug) === normalizedSlug) ?? null;
    if (cachedPost) {
      return cachedPost;
    }
  }

  try {
    const slugMap = await fetchSlugCardsByBlog(processId, blogId);
    const raw = slugMap[normalizedSlug];
    if (typeof raw !== 'string' || !raw.trim()) {
      return null;
    }
    const summary = JSON.parse(raw) as AoPostSummary;
    return mapPost({
      key: summary.key,
      txid: summary.latestTxId,
      meta: {
        postId: summary.postId,
        slug: summary.slug,
        title: summary.title,
        subtitle: summary.subtitle,
        author: summary.author,
        category: summary.category,
        blogId: summary.blogId,
        createdAt: summary.createdAt,
        updatedAt: summary.updatedAt,
        latestTxId: summary.latestTxId,
        headerImageTxId: summary.headerImageTxId,
      },
      fallbackSlug: normalizedSlug,
    });
  } catch (error) {
    console.warn('[AO Blog] slug index path failed, falling back to list lookup:', error);
    const { posts } = await fetchAoBlogPosts(processId, blogId);
    return posts.find((post) => normalizeSlug(post.slug) === normalizedSlug) ?? null;
  }
};

export const fetchAoBlogPostBody = async (txId: string): Promise<AoBlogPostBody> => {
  if (!txId) {
    return { markdown: null, html: null };
  }
  const response = await fetch(ENDPOINTS.arTxEndpoint(txId), {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`Post content fetch failed: ${response.status}`);
  }
  const raw = await response.text();
  return parsePostBody(raw);
};
