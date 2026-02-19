import React from 'react';
import { useParams } from 'react-router-dom';

import { URLS } from 'helpers/config';
import { Footer } from 'navigation/footer';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { getBlogPostBySlug } from '../Blog/data';

import * as S from './styles';

export default function BlogPost() {
  const { slug } = useParams();
  const languageProvider = useLanguageProvider();
  const language = languageProvider.object[languageProvider.current];
  const post = React.useMemo(() => getBlogPostBySlug(slug), [slug]);

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
