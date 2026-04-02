import { AO, ASSETS, ENDPOINTS } from 'helpers/config';

export type AoBlogPost = {
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

type ManifestFrontmatter = {
	desc?: string;
	description?: string;
	excerpt?: string;
	date?: string;
	author?: string;
	category?: string;
	tags?: string[];
	categories?: string[];
};

type ManifestPost = {
	slug?: string;
	title?: string;
	description?: string;
	excerpt?: string;
	postTxId?: string;
	bannerTxId?: string;
	publishedAt?: string;
	updated?: string;
	frontmatter?: ManifestFrontmatter;
};

type ManifestResponse = {
	posts?: ManifestPost[];
};

type FeedCacheEntry = {
	expiresAt: number;
	manifestId: string;
	posts: AoBlogPost[];
};

type PostBodyCacheEntry = {
	expiresAt: number;
	body: AoBlogPostBody;
};

const FEED_CACHE_TTL_MS = 120_000;
const MANIFEST_ID_CACHE_TTL_MS = 90_000;
const POST_BODY_CACHE_TTL_MS = 180_000;

const feedCache = new Map<string, FeedCacheEntry>();
const manifestPostsCache = new Map<string, ManifestPost[]>();
const postBodyCache = new Map<string, PostBodyCacheEntry>();
const prefetchedImageUrls = new Set<string>();

let manifestIdCache: { expiresAt: number; manifestId: string } | null = null;

const AO_BLOG_NODE = 'https://push-1.forward.computer';
const FALLBACK_MANIFEST_TX_ID = 'J-hPlH_meqww0UKHaF71S1s0GrUgVPyNnmLwz7Xvifg';

const FRONTMATTER_PATTERN = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/;

const isExcludedPost = (_post: AoBlogPost): boolean => false;

export const filterDisplayablePosts = (posts: AoBlogPost[]): AoBlogPost[] => posts;

export { isExcludedPost };

const normalizeValue = (value?: string) => value?.trim().toLowerCase() || '';
const normalizeSlug = (value: string) => normalizeValue(value).replace(/\s+/g, '-');

const cleanText = (value?: unknown): string | null => {
	if (typeof value !== 'string') return null;
	const trimmed = value.trim();
	return trimmed ? trimmed : null;
};

const isArweaveId = (value: string) => /^[a-zA-Z0-9_-]{43}$/.test(value);

const asObject = (value: unknown): Record<string, unknown> | null =>
	typeof value === 'object' && value !== null ? (value as Record<string, unknown>) : null;

const asString = (value: unknown): string | null => (typeof value === 'string' && value.length > 0 ? value : null);

const parseTimestampMs = (value?: string | null): number => {
	if (!value) return 0;
	if (/^\d+$/.test(value)) {
		const parsed = Number(value);
		return Number.isFinite(parsed) ? parsed : 0;
	}
	const parsed = Date.parse(value);
	return Number.isNaN(parsed) ? 0 : parsed;
};

const formatPublishedAt = (timestampMs: number) => {
	if (!timestampMs) return '';
	const date = new Date(timestampMs);
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

const resolveImageUrl = (bannerTxId?: string | null): string => {
	const raw = cleanText(bannerTxId) || '';
	if (!raw) return ASSETS.landingGraphicPlaceholder;
	if (/^https?:\/\//i.test(raw)) return raw;
	if (isArweaveId(raw)) return ENDPOINTS.tx(raw);
	return ASSETS.landingGraphicPlaceholder;
};

const prefetchPostImages = (posts: AoBlogPost[]) => {
	if (typeof window === 'undefined') return;

	for (const post of posts) {
		const url = post.imageUrl;
		if (!url || url === ASSETS.landingGraphicPlaceholder || prefetchedImageUrls.has(url)) continue;
		prefetchedImageUrls.add(url);
		const img = new Image();
		img.src = url;
	}
};

const getLatestManifestIdFromAo = async (): Promise<string | null> => {
	try {
		const processId = AO.blogIndexProcessId;
		if (!processId) return null;

		const response = await fetch(
			`${AO_BLOG_NODE}/${processId}~process@1.0/compute?Action=Get&require-codec=application/json&accept-bundle=true`,
			{
				cache: 'no-store',
			}
		);
		if (!response.ok) return null;

		const payload = (await response.json()) as unknown;
		const outbox = asObject(asObject(payload)?.results)?.outbox;
		const outboxRecord = asObject(outbox);

		if (outboxRecord) {
			for (const message of Object.values(outboxRecord)) {
				const msg = asObject(message);
				const direct = asString(msg?.LatestManifestId);
				if (direct) return direct;

				const tags = Array.isArray(msg?.Tags) ? (msg?.Tags as unknown[]) : [];
				for (const tag of tags) {
					const tagObject = asObject(tag);
					const name = asString(tagObject?.name) ?? asString(tagObject?.Name);
					const value = asString(tagObject?.value) ?? asString(tagObject?.Value);
					if (name === 'LatestManifestId' && value) return value;
				}
			}
		}

		const rawMessages = asObject(asObject(asObject(payload)?.results)?.raw)?.Messages;
		if (Array.isArray(rawMessages)) {
			for (const message of rawMessages) {
				const msg = asObject(message);
				const tags = Array.isArray(msg?.Tags) ? (msg?.Tags as unknown[]) : [];
				for (const tag of tags) {
					const tagObject = asObject(tag);
					const name = asString(tagObject?.name) ?? asString(tagObject?.Name);
					const value = asString(tagObject?.value) ?? asString(tagObject?.Value);
					if (name === 'LatestManifestId' && value) return value;
				}
			}
		}

		return null;
	} catch {
		return null;
	}
};

const resolveManifestId = async (): Promise<string> => {
	const now = Date.now();
	if (manifestIdCache && manifestIdCache.expiresAt > now) {
		console.info('[AO Blog] Using cached manifest id:', manifestIdCache.manifestId);
		return manifestIdCache.manifestId;
	}

	const aoManifestId = await getLatestManifestIdFromAo();
	let manifestId = aoManifestId || FALLBACK_MANIFEST_TX_ID;
	let manifestSource: 'ao' | 'fallback' | 'fallback-newer' = aoManifestId ? 'ao' : 'fallback';

	if (aoManifestId && aoManifestId !== FALLBACK_MANIFEST_TX_ID) {
		const [aoFreshness, fallbackFreshness] = await Promise.all([
			getManifestFreshnessMs(aoManifestId),
			getManifestFreshnessMs(FALLBACK_MANIFEST_TX_ID),
		]);
		if (fallbackFreshness > aoFreshness) {
			manifestId = FALLBACK_MANIFEST_TX_ID;
			manifestSource = 'fallback-newer';
		}

		console.info(
			'[AO Blog] Manifest freshness (ms):',
			`ao=${aoFreshness}`,
			`fallback=${fallbackFreshness}`,
			`selected=${manifestSource}`
		);
	}

	console.info('[AO Blog] Manifest source:', manifestSource, '| id:', manifestId);

	manifestIdCache = {
		expiresAt: now + MANIFEST_ID_CACHE_TTL_MS,
		manifestId,
	};
	return manifestId;
};

const fetchManifestPosts = async (manifestId: string): Promise<ManifestPost[]> => {
	const cached = manifestPostsCache.get(manifestId);
	if (cached) return cached;

	const response = await fetch(ENDPOINTS.arTxEndpoint(manifestId), {
		cache: 'force-cache',
	});
	if (!response.ok) {
		throw new Error(`Manifest fetch failed: ${response.status}`);
	}

	const payload = (await response.json()) as ManifestResponse;
	const posts = Array.isArray(payload.posts) ? payload.posts : [];
	manifestPostsCache.set(manifestId, posts);
	return posts;
};

const getManifestFreshnessMs = async (manifestId: string): Promise<number> => {
	try {
		const posts = await fetchManifestPosts(manifestId);
		return posts.reduce((newest, post) => {
			const candidate =
				parseTimestampMs(post.frontmatter?.date) ||
				parseTimestampMs(post.updated) ||
				parseTimestampMs(post.publishedAt);
			return candidate > newest ? candidate : newest;
		}, 0);
	} catch {
		return 0;
	}
};

const mapManifestPost = (post: ManifestPost): AoBlogPost | null => {
	const slugSource = cleanText(post.slug) || cleanText(post.title) || '';
	const slug = normalizeSlug(slugSource);
	const latestTxId = cleanText(post.postTxId) || '';
	if (!slug || !latestTxId) return null;

	const title = cleanText(post.title) || 'Untitled';
	const excerpt =
		cleanText(post.frontmatter?.desc) ||
		cleanText(post.frontmatter?.description) ||
		cleanText(post.frontmatter?.excerpt) ||
		cleanText(post.description) ||
		cleanText(post.excerpt) ||
		'';

	const category =
		cleanText(post.frontmatter?.category) ||
		cleanText(post.frontmatter?.categories?.[0]) ||
		cleanText(post.frontmatter?.tags?.[0]) ||
		'Article';

	const author = cleanText(post.frontmatter?.author) || 'AO Team';
	const createdAtMs = parseTimestampMs(post.frontmatter?.date) || parseTimestampMs(post.publishedAt) || 0;

	return {
		slug,
		title,
		excerpt,
		publishedAt: formatPublishedAt(createdAtMs),
		author,
		category,
		readTime: estimateReadTime(excerpt || title),
		imageUrl: resolveImageUrl(cleanText(post.bannerTxId)),
		latestTxId,
		createdAtMs,
	};
};

export const fetchAoBlogPosts = async (_publicationId?: string, _blogId?: string) => {
	const cacheKey = 'manifest-feed';
	const manifestId = await resolveManifestId();
	const cached = feedCache.get(cacheKey);
	if (cached && cached.expiresAt > Date.now() && cached.manifestId === manifestId) {
		return cached.posts;
	}

	const posts = (await fetchManifestPosts(manifestId))
		.map((entry) => mapManifestPost(entry))
		.filter((entry): entry is AoBlogPost => Boolean(entry))
		.sort((a, b) => b.createdAtMs - a.createdAtMs);

	feedCache.set(cacheKey, {
		expiresAt: Date.now() + FEED_CACHE_TTL_MS,
		manifestId,
		posts,
	});

	prefetchPostImages(posts.slice(0, 8));
	return posts;
};

export const fetchAoBlogPostBySlug = async (_publicationId: string, _blogId: string, slug: string) => {
	const normalizedSlug = normalizeSlug(slug);
	if (!normalizedSlug) return null;

	const cached = feedCache.get('manifest-feed');
	if (cached && cached.expiresAt > Date.now()) {
		const cachedPost = cached.posts.find((post) => normalizeSlug(post.slug) === normalizedSlug) ?? null;
		if (cachedPost) return cachedPost;
	}

	const posts = await fetchAoBlogPosts();
	return posts.find((post) => normalizeSlug(post.slug) === normalizedSlug) ?? null;
};

const stripFrontmatter = (markdown: string): string => {
	const match = markdown.match(FRONTMATTER_PATTERN);
	if (!match) return markdown;
	return markdown.slice(match[0].length);
};

export const fetchAoBlogPostBody = async (assetId: string): Promise<AoBlogPostBody> => {
	if (!assetId) {
		return { markdown: null, html: null };
	}

	const cached = postBodyCache.get(assetId);
	if (cached && cached.expiresAt > Date.now()) {
		return cached.body;
	}

	const response = await fetch(ENDPOINTS.arTxEndpoint(assetId), {
		cache: 'force-cache',
	});
	if (!response.ok) {
		throw new Error(`Post body fetch failed: ${response.status}`);
	}

	const markdown = stripFrontmatter(await response.text()).trim();
	const body = {
		markdown: markdown || null,
		html: null,
	};

	postBodyCache.set(assetId, {
		expiresAt: Date.now() + POST_BODY_CACHE_TTL_MS,
		body,
	});

	return body;
};
