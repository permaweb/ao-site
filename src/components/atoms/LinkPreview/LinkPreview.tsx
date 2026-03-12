import React from 'react';

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

const GitHubIcon = () => (
  <S.IconWrapper viewBox="0 0 24 24" aria-hidden>
    <path
      fill="currentColor"
      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
    />
  </S.IconWrapper>
);

const WebsiteIcon = () => (
  <S.IconWrapper viewBox="0 0 24 24" aria-hidden>
    <path
      fill="currentColor"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
    />
  </S.IconWrapper>
);

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
  const [loading, setLoading] = React.useState(false);
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
        setLoading(false);
        return;
      }

      const cached = metaCache.get(resolvedUrl);
      if (cached) {
        setPreview({
          title: cached.title || fallback.title,
          description: cached.description || cached.url || fallback.description,
        });
        setLoading(false);
        return;
      }

      setPreview(null);
      setLoading(true);
      fetchLinkMeta(resolvedUrl).then((data) => {
        if (abortRef.current) return;
        setLoading(false);
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
    setLoading(false);
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
      {show && (
        <S.PreviewContainer $x={coords.x} $y={coords.y}>
          <S.PreviewContent>
            {isGitHubUrl(resolvedUrl) ? <GitHubIcon /> : <WebsiteIcon />}
            <S.PreviewText>
              <S.PreviewTitle>{title}</S.PreviewTitle>
              {description && <S.PreviewDescription>{description}</S.PreviewDescription>}
            </S.PreviewText>
          </S.PreviewContent>
        </S.PreviewContainer>
      )}
    </S.Wrapper>
  );
}
