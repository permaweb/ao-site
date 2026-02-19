import React from 'react';

import { URLS } from 'helpers/config';
import { Footer } from 'navigation/footer';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { BLOG_POSTS, BlogPost } from './data';
import { fetchPermawebBlogPosts } from './permaweb';
import * as S from './styles';

export default function Blog() {
  const languageProvider = useLanguageProvider();
  const language = languageProvider.object[languageProvider.current];
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [permawebPosts, setPermawebPosts] = React.useState<BlogPost[]>([]);

  React.useEffect(() => {
    let cancelled = false;

    (async function () {
      try {
        const dynamicPosts = await fetchPermawebBlogPosts();
        if (!cancelled) {
          setPermawebPosts(dynamicPosts);
        }
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const allPosts = React.useMemo(() => [...BLOG_POSTS, ...permawebPosts], [permawebPosts]);
  const categories = React.useMemo(() => [...new Set(allPosts.map((p) => p.category))].sort(), [allPosts]);
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const filteredPosts = React.useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
      if (!matchesCategory) return false;
      if (!normalizedSearchQuery) return true;

      const searchable = [post.title, post.excerpt, post.author, post.category].join(' ').toLowerCase();
      return searchable.includes(normalizedSearchQuery);
    });
  }, [allPosts, normalizedSearchQuery, selectedCategory]);

  return (
    <S.Wrapper>
      <S.Intro>
        <S.IntroTitle>{language.blog}</S.IntroTitle>
      </S.Intro>
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
