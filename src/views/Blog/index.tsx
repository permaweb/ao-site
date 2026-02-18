import React from 'react';

import { ViewHeader } from 'components/atoms/ViewHeader';
import { URLS } from 'helpers/config';
import { Footer } from 'navigation/footer';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { BLOG_POSTS, BlogPost } from './data';
import * as S from './styles';

const CATEGORIES = [...new Set(BLOG_POSTS.map((p) => p.category))].sort();

export default function Blog() {
  const languageProvider = useLanguageProvider();
  const language = languageProvider.object[languageProvider.current];
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const filteredPosts = selectedCategory ? BLOG_POSTS.filter((p) => p.category === selectedCategory) : BLOG_POSTS;
  const [featured, ...rest] = filteredPosts;

  return (
    <S.Wrapper>
      <ViewHeader header={language.blog} />
      <S.FilterRow>
        <S.FilterButton $active={!selectedCategory} onClick={() => setSelectedCategory(null)} type="button">
          {language.all}
        </S.FilterButton>
        {CATEGORIES.map((cat) => (
          <S.FilterButton
            key={cat}
            $active={selectedCategory === cat}
            onClick={() => setSelectedCategory(cat)}
            type="button"
          >
            {cat}
          </S.FilterButton>
        ))}
      </S.FilterRow>
      {featured && (
        <S.FeaturedLink to={`${URLS.blog}${featured.slug}`}>
          <S.FeaturedCard>
            <S.FeaturedImageWrapper>
              <img src={featured.imageUrl} alt="" />
            </S.FeaturedImageWrapper>
            <S.FeaturedContent>
              <S.Category>{featured.category}</S.Category>
              <S.FeaturedTitle>{featured.title}</S.FeaturedTitle>
              <S.Excerpt>{featured.excerpt}</S.Excerpt>
              <S.Author>By {featured.author}</S.Author>
              <S.PostMeta>{featured.publishedAt}</S.PostMeta>
            </S.FeaturedContent>
          </S.FeaturedCard>
        </S.FeaturedLink>
      )}
      {rest.length > 0 && (
        <S.Grid>
          {rest.map((post: BlogPost) => (
            <S.CardLink key={post.slug} to={`${URLS.blog}${post.slug}`}>
              <S.Card>
                <S.CardImageWrapper>
                  <img src={post.imageUrl} alt="" />
                </S.CardImageWrapper>
                <S.CardContent>
                  <S.Category>{post.category}</S.Category>
                  <S.GridTitle>{post.title}</S.GridTitle>
                  <S.Excerpt>{post.excerpt}</S.Excerpt>
                  <S.Author>By {post.author}</S.Author>
                  <S.PostMeta>{post.publishedAt}</S.PostMeta>
                </S.CardContent>
              </S.Card>
            </S.CardLink>
          ))}
        </S.Grid>
      )}
      <Footer />
    </S.Wrapper>
  );
}
