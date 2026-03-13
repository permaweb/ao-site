import React from 'react';
import { createPortal } from 'react-dom';
import { ReactSVG } from 'react-svg';

import { ASSETS } from 'helpers/config';

import * as S from './styles';

const HOVER_DELAY_MS = 400;
const MICROLINK_API = 'https://api.microlink.io';
const MAX_URL_DISPLAY = 50;

interface MicrolinkResponse {
	status: 'success' | 'error';
	data?: {
		title?: string;
		description?: string;
		url?: string;
	};
}

const metaCache = new Map<string, MicrolinkResponse['data']>();

/** Extract unique http(s) URLs from markdown for prefetching */
export function extractLinksFromMarkdown(markdown: string): string[] {
	const urls = new Set<string>();
	const mdLinkRe = /\[([^\]]*)\]\((https?:\/\/[^)]+)\)/gi;
	const htmlLinkRe = /<a[^>]+href=["'](https?:\/\/[^"']+)["']/gi;
	let m: RegExpExecArray | null;
	while ((m = mdLinkRe.exec(markdown))) urls.add(m[2]);
	while ((m = htmlLinkRe.exec(markdown))) urls.add(m[1]);
	return [...urls];
}

/** Prefetch metadata for URLs in the background (populates cache for instant hover) */
export function prefetchLinksFromMarkdown(markdown: string): void {
	const urls = extractLinksFromMarkdown(markdown);
	urls.forEach((url) => {
		if (!metaCache.has(url)) fetchLinkMeta(url);
	});
}

async function fetchLinkMeta(targetUrl: string): Promise<MicrolinkResponse['data'] | null> {
	const cached = metaCache.get(targetUrl);
	if (cached) return cached;

	try {
		const params = new URLSearchParams({
			url: targetUrl,
		});
		const res = await fetch(`${MICROLINK_API}/?${params}`, {
			signal: AbortSignal.timeout(5000),
		});
		const json: MicrolinkResponse = await res.json();
		if (json.status === 'success' && json.data) {
			metaCache.set(targetUrl, json.data);
			return json.data;
		}
	} catch {
		// Ignore fetch errors
	}
	return null;
}

function getResolvedUrl(href: string): string | null {
	try {
		if (!href || href.startsWith('#') || href.startsWith('mailto:')) return null;
		return new URL(href, window.location.origin).href;
	} catch {
		return null;
	}
}

function getFallbackPreview(href: string, linkText?: string): { title: string; description: string } {
	try {
		const url = new URL(href, window.location.origin);
		const host = url.hostname.replace(/^www\./, '');
		const displayUrl = url.href.length > MAX_URL_DISPLAY ? url.href.slice(0, MAX_URL_DISPLAY) + '…' : url.href;
		return {
			title: linkText || host || 'Link',
			description: displayUrl,
		};
	} catch {
		return { title: linkText || 'Link', description: href };
	}
}

function isGitHubUrl(url: string | null): boolean {
	if (!url) return false;
	try {
		const host = new URL(url).hostname.replace(/^www\./, '');
		return host === 'github.com' || host.endsWith('.github.com');
	} catch {
		return false;
	}
}

export interface LinkPreviewProps {
	href: string;
	children: React.ReactNode;
}

export function LinkPreview({ href, children }: LinkPreviewProps) {
	const [show, setShow] = React.useState(false);
	const [coords, setCoords] = React.useState({ x: 0, y: 0 });
	const [preview, setPreview] = React.useState<{
		title: string;
		description: string;
	} | null>(null);
	const timeoutRef = React.useRef<number | null>(null);
	const wrapperRef = React.useRef<HTMLSpanElement>(null);
	const abortRef = React.useRef<boolean>(false);

	const resolvedUrl = React.useMemo(() => getResolvedUrl(href), [href]);
	const linkText = typeof children === 'string' ? children : undefined;
	const fallback = getFallbackPreview(href, linkText);

	const handleMouseEnter = React.useCallback(() => {
		abortRef.current = false;
		timeoutRef.current = window.setTimeout(() => {
			setShow(true);
			const el = wrapperRef.current;
			if (el) {
				const rect = el.getBoundingClientRect();
				setCoords({
					x: rect.left + rect.width / 2,
					y: rect.top,
				});
			}

			if (!resolvedUrl || !resolvedUrl.startsWith('http')) {
				setPreview(null);
				return;
			}

			const cached = metaCache.get(resolvedUrl);
			if (cached) {
				setPreview({
					title: cached.title || fallback.title,
					description: cached.description || cached.url || fallback.description,
				});
				return;
			}

			setPreview(null);
			fetchLinkMeta(resolvedUrl).then((data) => {
				if (abortRef.current) return;
				if (data) {
					setPreview({
						title: data.title || fallback.title,
						description: data.description || data.url || fallback.description,
					});
				} else {
					setPreview(null);
				}
			});
		}, HOVER_DELAY_MS);
	}, [resolvedUrl, fallback.title, fallback.description]);

	const handleMouseLeave = React.useCallback(() => {
		abortRef.current = true;
		if (timeoutRef.current) {
			window.clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
		setShow(false);
		setPreview(null);
	}, []);

	React.useEffect(() => {
		return () => {
			abortRef.current = true;
			if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
		};
	}, []);

	const title = preview?.title ?? fallback.title;
	const description = preview?.description ?? fallback.description;

	return (
		<S.Wrapper ref={wrapperRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			{children}
			{show &&
				createPortal(
					<S.PreviewContainer $x={coords.x} $y={coords.y}>
						<S.PreviewContent>
							<S.IconContainer aria-hidden>
								<ReactSVG
									src={isGitHubUrl(resolvedUrl) ? ASSETS.github : ASSETS.website}
									className="link-preview-icon"
								/>
							</S.IconContainer>
							<S.PreviewText>
								<S.PreviewTitle>{title}</S.PreviewTitle>
								{description && <S.PreviewDescription>{description}</S.PreviewDescription>}
							</S.PreviewText>
						</S.PreviewContent>
					</S.PreviewContainer>,
					document.body
				)}
		</S.Wrapper>
	);
}
