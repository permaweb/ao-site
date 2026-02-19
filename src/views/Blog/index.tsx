import React from 'react';

import { ViewHeader } from 'components/atoms/ViewHeader';
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

  const filteredPosts = selectedCategory ? allPosts.filter((p) => p.category === selectedCategory) : allPosts;

  return (
    <S.Wrapper>
      <ViewHeader header={language.blog} />
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
      {filteredPosts.length > 0 && (
        <S.Grid>
          {filteredPosts.map((post: BlogPost) => (
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
