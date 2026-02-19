import React from 'react';
import { useParams } from 'react-router-dom';

import { URLS } from 'helpers/config';
import { Footer } from 'navigation/footer';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { BlogPost as BlogPostType, getBlogPostBySlug } from '../Blog/data';
import { fetchPermawebBlogPostBySlug } from '../Blog/permaweb';

import * as S from './styles';

export default function BlogPost() {
  const { slug } = useParams();
  const languageProvider = useLanguageProvider();
  const language = languageProvider.object[languageProvider.current];
  const staticPost = getBlogPostBySlug(slug);
  const [post, setPost] = React.useState<BlogPostType | null>(staticPost);
  const [loading, setLoading] = React.useState(!staticPost);

  React.useEffect(() => {
    if (!slug) {
      setPost(null);
      setLoading(false);
      return;
    }

    const nextStaticPost = getBlogPostBySlug(slug);
    if (nextStaticPost) {
      setPost(nextStaticPost);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    (async function () {
      try {
        const permawebPost = await fetchPermawebBlogPostBySlug(slug);
        if (!cancelled) {
          setPost(permawebPost);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setPost(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <S.Wrapper>
        <S.NotFound>
          <p>Loading post...</p>
        </S.NotFound>
        <S.FooterWrapper>
          <Footer />
        </S.FooterWrapper>
      </S.Wrapper>
    );
  }

  if (!post) {
    return (
      <S.Wrapper>
        <S.NotFound>
          <p>{language.pageNotFound}</p>
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
      <S.HeroWrapper>
        <S.HeroImageWrapper>
          <img src={post.imageUrl} alt="" />
        </S.HeroImageWrapper>
      </S.HeroWrapper>
      <S.Article>
        <S.Title>{post.title}</S.Title>
        <S.Subtitle>{post.excerpt}</S.Subtitle>
        <S.MetaRow>
          <S.AuthorIcon />
          <S.AuthorName>{post.author}</S.AuthorName>
          <S.MetaSecondary>{post.publishedAt}</S.MetaSecondary>
        </S.MetaRow>
        {post.sections.map((section) => (
          <S.Section key={section.heading}>
            <S.SectionHeading>{section.heading}</S.SectionHeading>
            {section.paragraphs.map((paragraph: string, index: number) => (
              <S.Paragraph key={`${section.heading}-${index}`}>{paragraph}</S.Paragraph>
            ))}
          </S.Section>
        ))}
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
