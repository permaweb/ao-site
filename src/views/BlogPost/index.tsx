import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { LinkPreview, prefetchLinksFromMarkdown } from 'components/atoms/LinkPreview';
import { Loader } from 'components/atoms/Loader';
import { ENDPOINTS, URLS } from 'helpers/config';
import { Footer } from 'navigation/footer';
import { useLanguageProvider } from 'providers/LanguageProvider';

import {
	AoBlogPost,
	AoBlogPostBody,
	fetchAoBlogPostBody,
	fetchAoBlogPostBySlug,
	fetchAoBlogPosts,
	filterDisplayablePosts,
} from '../Blog/aoFeed';

import * as S from './styles';

const LIGHTBOX_CLOSE_MS = 180;
const WORDS_PER_MINUTE = 200;
const COMMAND_PREFIX_RE = /^(curl|npm|npx|yarn|pnpm|node|bun|git|docker|lua>|aos>|python|python3|pip)\b/i;

const decodeHtmlEntities = (value: string) =>
	value
		.replaceAll('&lt;', '<')
		.replaceAll('&gt;', '>')
		.replaceAll('&amp;', '&')
		.replaceAll('&quot;', '"')
		.replaceAll('&#39;', "'");

const normalizeMarkdownForRendering = (markdown: string) => {
	const htmlCodeParagraphNormalized = markdown.replace(
		/<p>\s*<code>([\s\S]*?)<\/code>\s*<\/p>/gi,
		(_, rawCode: string) => {
			const code = decodeHtmlEntities(rawCode).trim();
			if (!code) return '';
			return `\n\`\`\`bash\n${code}\n\`\`\`\n`;
		}
	);

	const lines = htmlCodeParagraphNormalized.split('\n');
	const normalizedLines: string[] = [];
	let commandBlockBuffer: string[] = [];

	const flushCommandBlock = () => {
		if (!commandBlockBuffer.length) return;
		normalizedLines.push('```bash', ...commandBlockBuffer, '```');
		commandBlockBuffer = [];
	};

	for (const line of lines) {
		const trimmed = line.trim();
		const inlineOnlyMatch = trimmed.match(/^`([^`]+)`$/);
		const inlineOnlyCode = inlineOnlyMatch ? inlineOnlyMatch[1].trim() : null;
		const candidate = inlineOnlyCode ?? trimmed;
		const isCommandLikeCode = Boolean(candidate) && COMMAND_PREFIX_RE.test(candidate);

		if (isCommandLikeCode) {
			if (!commandBlockBuffer.length && normalizedLines.at(-1) !== '') {
				normalizedLines.push('');
			}
			commandBlockBuffer.push(candidate);
			continue;
		}

		flushCommandBlock();
		normalizedLines.push(line);
	}

	flushCommandBlock();
	return normalizedLines
		.join('\n')
		.replace(/\n{3,}/g, '\n\n')
		.trim();
};

const estimateReadTimeFromBody = (body: string | null) => {
	if (!body) return null;

	const plainText = body
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/`[^`]*`/g, ' ')
		.replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/<[^>]+>/g, ' ')
		.replace(/[#>*_~`-]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

	if (!plainText) return null;

	const words = plainText.split(/\s+/).filter(Boolean).length;
	const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
	return `${minutes} min read`;
};

export default function BlogPost() {
	const { slug } = useParams();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];
	const [post, setPost] = React.useState<AoBlogPost | null>(null);
	const [postBody, setPostBody] = React.useState<AoBlogPostBody>({ markdown: null, html: null });
	const [suggestedPosts, setSuggestedPosts] = React.useState<AoBlogPost[]>([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [isBodyLoading, setIsBodyLoading] = React.useState(false);
	const [isImageLoaded, setIsImageLoaded] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);
	const [expandedImage, setExpandedImage] = React.useState<{ src: string; alt: string; description: string } | null>(
		null
	);
	const [isLightboxClosing, setIsLightboxClosing] = React.useState(false);
	const closeLightboxTimeoutRef = React.useRef<number | null>(null);
	const linkIndexRef = React.useRef(0);
	const normalizedMarkdown = React.useMemo(() => {
		if (!postBody.markdown) return null;
		return normalizeMarkdownForRendering(postBody.markdown);
	}, [postBody.markdown]);
	const computedReadTime = React.useMemo(() => {
		return estimateReadTimeFromBody(normalizedMarkdown ?? postBody.markdown ?? postBody.html);
	}, [normalizedMarkdown, postBody.html, postBody.markdown]);

	const openExpandedImage = React.useCallback((src?: string, alt?: string, description?: string) => {
		if (!src) return;
		if (closeLightboxTimeoutRef.current) {
			window.clearTimeout(closeLightboxTimeoutRef.current);
			closeLightboxTimeoutRef.current = null;
		}
		setIsLightboxClosing(false);
		const resolvedAlt = alt || '';
		setExpandedImage({
			src,
			alt: resolvedAlt,
			description: description || resolvedAlt,
		});
	}, []);

	const closeExpandedImage = React.useCallback(() => {
		if (!expandedImage || isLightboxClosing) return;
		setIsLightboxClosing(true);
		closeLightboxTimeoutRef.current = window.setTimeout(() => {
			setExpandedImage(null);
			setIsLightboxClosing(false);
			closeLightboxTimeoutRef.current = null;
		}, LIGHTBOX_CLOSE_MS);
	}, [expandedImage, isLightboxClosing]);

	React.useEffect(() => {
		return () => {
			if (closeLightboxTimeoutRef.current) {
				window.clearTimeout(closeLightboxTimeoutRef.current);
			}
		};
	}, []);

	React.useEffect(() => {
		if (!expandedImage) return;
		const { overflow } = document.body.style;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = overflow;
		};
	}, [expandedImage]);

	React.useEffect(() => {
		let isMounted = true;

		const loadPost = async () => {
			try {
				if (!slug) {
					throw new Error('Missing blog post identifier.');
				}

				const effectiveMatch = await fetchAoBlogPostBySlug('', '', slug);

				if (isMounted) {
					setPost(effectiveMatch);
					setSuggestedPosts([]);
					setError(effectiveMatch ? null : 'Post not found.');
					setIsLoading(false);
				}

				if (effectiveMatch) {
					const allPosts = filterDisplayablePosts(await fetchAoBlogPosts()).slice(0, 1);
					if (isMounted) {
						setSuggestedPosts(allPosts.filter((entry) => entry.slug !== effectiveMatch.slug).slice(0, 3));
					}
				}

				if (effectiveMatch?.latestTxId) {
					if (isMounted) {
						setIsBodyLoading(true);
					}
					const postBodyUrl = ENDPOINTS.arTxEndpoint(effectiveMatch.latestTxId);
					console.info('[AO Blog] Hydrating post body from tx:', postBodyUrl);
					const body = await fetchAoBlogPostBody(effectiveMatch.latestTxId);
					if (isMounted) {
						setPostBody(body);
						setIsBodyLoading(false);
					}
				} else if (isMounted) {
					console.info('[AO Blog] No latestTxId found for post slug:', slug);
					setPostBody({ markdown: null, html: null });
					setIsBodyLoading(false);
				}
			} catch (err) {
				if (isMounted) {
					setError(err instanceof Error ? err.message : 'Failed to load post.');
					setIsLoading(false);
					setIsBodyLoading(false);
				}
			}
		};

		loadPost();

		return () => {
			isMounted = false;
		};
	}, [slug]);

	React.useEffect(() => {
		setIsImageLoaded(false);
	}, [post?.imageUrl]);

	React.useEffect(() => {
		if (normalizedMarkdown) prefetchLinksFromMarkdown(normalizedMarkdown);
	}, [normalizedMarkdown]);

	if (isLoading) {
		return (
			<S.Wrapper>
				<S.LoadingState>
					<Loader relative noMargins />
					<S.LoadingMessage>
						AO, the decentralized network is retrieving the latest updates happening in the ecosystem.
					</S.LoadingMessage>
				</S.LoadingState>
			</S.Wrapper>
		);
	}

	if (error || !post) {
		return (
			<S.Wrapper className={'fade-in'}>
				<S.NotFound>
					<p>{error || language.pageNotFound}</p>
					<S.NotFoundLink to={URLS.blog}>{language.backToRead}</S.NotFoundLink>
				</S.NotFound>
				<S.FooterWrapper>
					<Footer />
				</S.FooterWrapper>
			</S.Wrapper>
		);
	}

	return (
		<S.Wrapper className={'fade-in'}>
			<S.Article>
				<S.KickerRow>
					<S.Kicker>{post.category}</S.Kicker>
					<S.AuthorIcon />
					<S.MetaSecondary>{post.publishedAt}</S.MetaSecondary>
				</S.KickerRow>
				<S.Title>{post.title}</S.Title>
				<S.Subtitle>{post.excerpt}</S.Subtitle>
				<S.HeroImageWrapper>
					<img
						src={post.imageUrl}
						alt=""
						className={isImageLoaded ? 'fade-in' : undefined}
						onLoad={() => setIsImageLoaded(true)}
						onClick={() => openExpandedImage(post.imageUrl, post.title, post.excerpt)}
					/>
					<S.ImageZoomIndicator aria-hidden="true">
						<span />
					</S.ImageZoomIndicator>
				</S.HeroImageWrapper>
				<S.MetaRow>
					<S.AuthorName>{post.author}</S.AuthorName>
					<S.AuthorIcon />
					<S.MetaSecondary>{computedReadTime ?? post.readTime}</S.MetaSecondary>
				</S.MetaRow>
				<S.Section>
					{normalizedMarkdown &&
						(() => {
							linkIndexRef.current = 0;
							return (
								<S.MarkdownBody className={'fade-in'}>
									<ReactMarkdown
										components={{
											pre({ children }) {
												const child = React.Children.toArray(children)[0] as
													| React.ReactElement<{
															className?: string;
															children?: React.ReactNode;
													  }>
													| undefined;
												const className = child?.props?.className || '';
												const match = /language-(\w+)/.exec(className);
												const codeString = String(child?.props?.children ?? '').replace(
													/\n$/,
													''
												);

												return (
													<S.CodeBlock>
														<SyntaxHighlighter
															style={oneLight}
															language={match?.[1] || 'text'}
															PreTag="div"
															customStyle={{ margin: 0, border: 'none', borderRadius: 0 }}
															codeTagProps={{ style: { border: 'none' } }}
														>
															{codeString}
														</SyntaxHighlighter>
													</S.CodeBlock>
												);
											},
											img({ src, alt }) {
												if (!src) return null;
												return (
													<S.MarkdownImageFrame
														data-article-image
														role="button"
														tabIndex={0}
														onClick={(event) => {
															event.preventDefault();
															event.stopPropagation();
															const paragraph = event.currentTarget.closest('p');
															const caption =
																paragraph?.querySelector('em')?.textContent?.trim() ||
																'';
															openExpandedImage(src, alt, caption);
														}}
														onKeyDown={(event) => {
															if (event.key === 'Enter' || event.key === ' ') {
																event.preventDefault();
																event.stopPropagation();
																const paragraph = event.currentTarget.closest('p');
																const caption =
																	paragraph
																		?.querySelector('em')
																		?.textContent?.trim() || '';
																openExpandedImage(src, alt, caption);
															}
														}}
														aria-label="Expand article image"
													>
														<img src={src} alt={alt || ''} loading="lazy" />
														<S.ImageZoomIndicator aria-hidden="true">
															<span />
														</S.ImageZoomIndicator>
													</S.MarkdownImageFrame>
												);
											},
											code({ className, children, ...rest }) {
												return (
													<code className={className} {...rest}>
														{children}
													</code>
												);
											},
											a({ href, children, ...rest }) {
												if (!href) return <>{children}</>;
												const index = linkIndexRef.current++;
												const colorIndex = index % 4;
												return (
													<LinkPreview href={href}>
														<a href={href} data-link-index={colorIndex} {...rest}>
															{children}
														</a>
													</LinkPreview>
												);
											},
										}}
									>
										{normalizedMarkdown}
									</ReactMarkdown>
								</S.MarkdownBody>
							);
						})()}
					{!postBody.markdown && !postBody.html && (
						<S.Paragraph className={'fade-in'}>{post.excerpt}</S.Paragraph>
					)}
				</S.Section>
				{/* Suggested reading – commented out for now
				{!isBodyLoading && suggestedPosts.length > 0 && (
					<S.SuggestedSection className={'fade-in'}>
						<S.SuggestedHeading>Suggested Reading</S.SuggestedHeading>
						<S.SuggestedList>
							{suggestedPosts.map((suggestedPost) => (
								<S.SuggestedCard key={suggestedPost.slug} to={`${URLS.blog}${suggestedPost.slug}`}>
									<S.SuggestedImage hasImage={Boolean(suggestedPost.imageUrl)}>
										{suggestedPost.imageUrl && <img src={suggestedPost.imageUrl} alt="" />}
									</S.SuggestedImage>
									<S.SuggestedContent>
										<S.SuggestedType>{suggestedPost.category || 'Article'}</S.SuggestedType>
										<S.SuggestedTitle>{suggestedPost.title}</S.SuggestedTitle>
									</S.SuggestedContent>
									<S.SuggestedDate>{suggestedPost.publishedAt || '-'}</S.SuggestedDate>
								</S.SuggestedCard>
							))}
						</S.SuggestedList>
					</S.SuggestedSection>
				)}
				*/}
				{!isBodyLoading && (
					<S.BackLinkWrapper>
						<S.BackLink to={URLS.blog}>{'< View All'}</S.BackLink>
					</S.BackLinkWrapper>
				)}
			</S.Article>
			{!isBodyLoading && (
				<S.FooterWrapper>
					<Footer />
				</S.FooterWrapper>
			)}
			{expandedImage && (
				<S.ImageLightbox type="button" onClick={closeExpandedImage} $closing={isLightboxClosing}>
					<S.ImageLightboxContent>
						<S.ImageLightboxCloseIndicator aria-hidden="true">
							<span />
						</S.ImageLightboxCloseIndicator>
						<S.ImageLightboxImage
							src={expandedImage.src}
							alt={expandedImage.alt}
							$closing={isLightboxClosing}
						/>
						{expandedImage.description && (
							<S.ImageLightboxCaption>{expandedImage.description}</S.ImageLightboxCaption>
						)}
					</S.ImageLightboxContent>
				</S.ImageLightbox>
			)}
		</S.Wrapper>
	);
}
