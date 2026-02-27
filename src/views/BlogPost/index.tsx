import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

import { Loader } from 'components/atoms/Loader';
import { AO, ENDPOINTS, URLS } from 'helpers/config';
import { Footer } from 'navigation/footer';
import { useLanguageProvider } from 'providers/LanguageProvider';

import {
  AoBlogPost,
  AoBlogPostBody,
  fetchAoBlogPostBody,
  fetchAoBlogPostBySlug,
  fetchAoBlogPosts,
} from '../Blog/aoFeed';

import * as S from './styles';

const BLOG_ID = 'aodevblog';

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
          setSuggestedPosts([]);
          setError(match ? null : 'Post not found.');
          setIsLoading(false);
        }

        if (match) {
          const { posts: allPosts } = await fetchAoBlogPosts(processId, BLOG_ID);
          if (isMounted) {
            setSuggestedPosts(allPosts.filter((entry) => entry.slug !== match.slug).slice(0, 3));
          }
        }

        if (match?.latestTxId) {
          if (isMounted) {
            setIsBodyLoading(true);
          }
          const postBodyUrl = ENDPOINTS.arTxEndpoint(match.latestTxId);
          console.info('[AO Blog] Hydrating post body from tx:', postBodyUrl);
          const body = await fetchAoBlogPostBody(match.latestTxId);
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
          />
        </S.HeroImageWrapper>
        <S.MetaRow>
          <S.AuthorName>{post.author}</S.AuthorName>
          <S.AuthorIcon />
          <S.MetaSecondary>{post.readTime}</S.MetaSecondary>
        </S.MetaRow>
        <S.Section>
          {postBody.markdown && (
            <S.MarkdownBody className={'fade-in'}>
              <ReactMarkdown>{postBody.markdown}</ReactMarkdown>
            </S.MarkdownBody>
          )}
          {!postBody.markdown && !postBody.html && <S.Paragraph className={'fade-in'}>{post.excerpt}</S.Paragraph>}
        </S.Section>
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
    </S.Wrapper>
  );
}
