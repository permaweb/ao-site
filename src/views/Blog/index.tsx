import React from 'react';

import { URLS } from 'helpers/config';
import { Footer } from 'navigation/footer';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { BLOG_POSTS, BlogPost } from './data';
import * as S from './styles';

const PINNED_POST_SLUG = 'legacynet-sunset-update';

export default function Blog() {
  const languageProvider = useLanguageProvider();
  const language = languageProvider.object[languageProvider.current];
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const allPosts = BLOG_POSTS;
  const pinnedPost = React.useMemo(
    () => allPosts.find((post) => post.slug === PINNED_POST_SLUG) ?? allPosts[0] ?? null,
    [allPosts]
  );
  const categories = React.useMemo(() => [...new Set(allPosts.map((p) => p.category))].sort(), [allPosts]);
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const filteredPosts = React.useMemo(() => {
    return allPosts.filter((post) => {
      if (pinnedPost?.slug && post.slug === pinnedPost.slug) return false;

      const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
      if (!matchesCategory) return false;
      if (!normalizedSearchQuery) return true;

      const searchable = [post.title, post.excerpt, post.author, post.category].join(' ').toLowerCase();
      return searchable.includes(normalizedSearchQuery);
    });
  }, [allPosts, normalizedSearchQuery, pinnedPost?.slug, selectedCategory]);

  return (
    <S.Wrapper>
      <S.Intro>
        <S.IntroTitle>{language.blog}</S.IntroTitle>
      </S.Intro>
      {pinnedPost && (
        <S.FeaturedSection>
          <S.FeaturedLabel>Pinned</S.FeaturedLabel>
          <S.FeaturedCardLink to={`${URLS.blog}${pinnedPost.slug}`}>
            <S.FeaturedImageWrapper>
              <img src={pinnedPost.imageUrl} alt="" />
            </S.FeaturedImageWrapper>
            <S.FeaturedCard>
              <S.FeaturedCardContent>
                <S.MetaLine>
                  <S.Category>{pinnedPost.category}</S.Category>
                  <S.Dot />
                  <S.PostMeta>{pinnedPost.publishedAt}</S.PostMeta>
                </S.MetaLine>
                <S.GridTitle>{pinnedPost.title}</S.GridTitle>
                <S.Excerpt>{pinnedPost.excerpt}</S.Excerpt>
              </S.FeaturedCardContent>
            </S.FeaturedCard>
          </S.FeaturedCardLink>
        </S.FeaturedSection>
      )}
      <S.ControlsRow>
        <S.FilterRow>
          <S.FilterButton $active={!selectedCategory} onClick={() => setSelectedCategory(null)} type="button">
            {language.all}
          </S.FilterButton>
          {categories.map((cat) => (
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
        <S.SearchWrapper>
          <S.SearchIcon aria-hidden="true">
            <span />
          </S.SearchIcon>
          <S.SearchInput
            aria-label="Search blog posts"
            placeholder="Search..."
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </S.SearchWrapper>
      </S.ControlsRow>
      {filteredPosts.length > 0 && (
        <S.Grid>
          {filteredPosts.map((post: BlogPost) => (
            <S.CardLink key={post.slug} to={`${URLS.blog}${post.slug}`}>
              <S.CardImageWrapper>
                <img src={post.imageUrl} alt="" />
              </S.CardImageWrapper>
              <S.Card>
                <S.CardContent>
                  <S.MetaLine>
                    <S.Category>{post.category}</S.Category>
                    <S.Dot />
                    <S.PostMeta>{post.publishedAt}</S.PostMeta>
                  </S.MetaLine>
                  <S.GridTitle>{post.title}</S.GridTitle>
                  <S.Excerpt>{post.excerpt}</S.Excerpt>
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
