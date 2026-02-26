import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

import { Loader } from 'components/atoms/Loader';
import { AO, ENDPOINTS, URLS } from 'helpers/config';
import { Footer } from 'navigation/footer';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { AoBlogPost, AoBlogPostBody, fetchAoBlogPostBody, fetchAoBlogPostBySlug } from '../Blog/aoFeed';

import * as S from './styles';

const BLOG_ID = 'aodevblog';

export default function BlogPost() {
	const { slug } = useParams();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];
	const [post, setPost] = React.useState<AoBlogPost | null>(null);
	const [postBody, setPostBody] = React.useState<AoBlogPostBody>({ markdown: null, html: null });
	const [isLoading, setIsLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		let isMounted = true;

		const loadPost = async () => {
			try {
				const processId = AO.blogIndexProcessId;
				if (!processId || !slug) {
					throw new Error('Missing blog post identifier.');
				}

				const match = await fetchAoBlogPostBySlug(processId, BLOG_ID, slug);
				if (isMounted) {
					setPost(match);
					setError(match ? null : 'Post not found.');
					setIsLoading(false);
				}

				if (match?.latestTxId) {
					const postBodyUrl = ENDPOINTS.arTxEndpoint(match.latestTxId);
					console.info('[AO Blog] Hydrating post body from tx:', postBodyUrl);
					const body = await fetchAoBlogPostBody(match.latestTxId);
					if (isMounted) {
						setPostBody(body);
					}
				} else if (isMounted) {
					console.info('[AO Blog] No latestTxId found for post slug:', slug);
					setPostBody({ markdown: null, html: null });
				}
			} catch (err) {
				if (isMounted) {
					setError(err instanceof Error ? err.message : 'Failed to load post.');
					setIsLoading(false);
				}
			}
		};

		loadPost();

		return () => {
			isMounted = false;
		};
	}, [slug]);

	if (isLoading) {
		return <Loader />;
	}

	if (error || !post) {
		return (
			<S.Wrapper>
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
		<S.Wrapper>
			<S.Article>
				<S.KickerRow>
					<S.Kicker>{post.category}</S.Kicker>
					<S.AuthorIcon />
					<S.MetaSecondary>{post.publishedAt}</S.MetaSecondary>
				</S.KickerRow>
				<S.Title>{post.title}</S.Title>
				<S.Subtitle>{post.excerpt}</S.Subtitle>
				<S.HeroImageWrapper>
					<img src={post.imageUrl} alt="" />
				</S.HeroImageWrapper>
				<S.MetaRow>
					<S.AuthorName>{post.author}</S.AuthorName>
					<S.AuthorIcon />
					<S.MetaSecondary>{post.readTime}</S.MetaSecondary>
				</S.MetaRow>
				<S.Section>
					{postBody.markdown && (
						<S.MarkdownBody>
							<ReactMarkdown>{postBody.markdown}</ReactMarkdown>
						</S.MarkdownBody>
					)}
					{!postBody.markdown && !postBody.html && <S.Paragraph>{post.excerpt}</S.Paragraph>}
				</S.Section>
				<S.BackLinkWrapper>
					<S.BackLink to={URLS.blog}>{language.backToRead}</S.BackLink>
				</S.BackLinkWrapper>
			</S.Article>
			<S.FooterWrapper>
				<Footer />
			</S.FooterWrapper>
		</S.Wrapper>
	);
}
