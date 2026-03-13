import React from 'react';
import { ReactSVG } from 'react-svg';

import { RgbCycleText } from 'components/atoms/RgbCycleText';
import { AO, ASSETS, URLS } from 'helpers/config';
import { Footer } from 'navigation/footer';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { AoBlogPost, fetchAoBlogPosts, filterDisplayablePosts } from './aoFeed';
import * as S from './styles';

const BLOG_ID = 'aodevblog';
const FEATURED_POST_PATTERN = 'unlocking trust-minimized arweave gateways with hyperbeam';
const SKELETON_CARD_COUNT = 6;

function FadeInImage(props: { src: string; alt: string; loading?: 'eager' | 'lazy' }) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <img
      src={props.src}
      alt={props.alt}
      loading={props.loading ?? 'lazy'}
      className={isLoaded ? 'is-loaded' : undefined}
      onLoad={() => setIsLoaded(true)}
    />
  );
}

export default function Blog() {
  const languageProvider = useLanguageProvider();
  const language = languageProvider.object[languageProvider.current];
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [allPosts, setAllPosts] = React.useState<AoBlogPost[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      try {
        const processId = AO.blogIndexProcessId;
        if (!processId) {
          throw new Error('Missing AO blog process id.');
        }
        const posts = await fetchAoBlogPosts(processId, BLOG_ID);
        if (isMounted) {
          const filtered = filterDisplayablePosts(posts);
          const featuredOnly = filtered.filter((p) => p.title.toLowerCase().includes(FEATURED_POST_PATTERN));
          setAllPosts(featuredOnly);
          setError(posts.length ? null : 'AO feed returned 0 posts. Check browser console for [AO Blog] logs.');
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load posts.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayedPosts = allPosts;
  const pinnedPost = React.useMemo(() => displayedPosts[0] ?? null, [displayedPosts]);
  const categories = React.useMemo(() => [...new Set(displayedPosts.map((p) => p.category))].sort(), [displayedPosts]);
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const filteredPosts = React.useMemo(() => {
    return displayedPosts.filter((post) => {
      if (pinnedPost?.slug && post.slug === pinnedPost.slug) return false;

      const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
      if (!matchesCategory) return false;
      if (!normalizedSearchQuery) return true;

      const searchable = [post.title, post.excerpt, post.author, post.category].join(' ').toLowerCase();
      return searchable.includes(normalizedSearchQuery);
    });
  }, [displayedPosts, normalizedSearchQuery, pinnedPost?.slug, selectedCategory]);

  return (
    <S.Wrapper>
      {isLoading ? (
        <S.Content>
          <S.FeaturedSection>
            <S.SkeletonLabel />
            <S.FeaturedSkeletonLayout>
              <S.SkeletonImage $featured />
              <S.SkeletonFeaturedCard>
                <S.SkeletonMetaLine>
                  <S.SkeletonCategory />
                  <S.SkeletonDot />
                  <S.SkeletonMeta />
                </S.SkeletonMetaLine>
                <S.SkeletonTitle $featured />
                <S.SkeletonLine width={'88%'} />
                <S.SkeletonLine width={'80%'} />
                <S.SkeletonLine width={'62%'} />
              </S.SkeletonFeaturedCard>
            </S.FeaturedSkeletonLayout>
          </S.FeaturedSection>
          <S.ControlsRow>
            <S.SkeletonFilterRow>
              <S.SkeletonChip />
              <S.SkeletonChip />
              <S.SkeletonChip />
              <S.SkeletonChip />
            </S.SkeletonFilterRow>
            <S.SkeletonSearch />
          </S.ControlsRow>
          <S.Grid>
            {Array.from({ length: SKELETON_CARD_COUNT }).map((_, index) => (
              <S.SkeletonCard key={`blog-skeleton-card-${index}`}>
                <S.SkeletonImage />
                <S.SkeletonCardContent>
                  <S.SkeletonMetaLine>
                    <S.SkeletonCategory />
                    <S.SkeletonDot />
                    <S.SkeletonMeta />
                  </S.SkeletonMetaLine>
                  <S.SkeletonTitle />
                  <S.SkeletonLine width={'86%'} />
                  <S.SkeletonLine width={'74%'} />
                </S.SkeletonCardContent>
              </S.SkeletonCard>
            ))}
          </S.Grid>
        </S.Content>
      ) : (
        <S.Content className={'fade-in'}>
          {error && (
            <S.Status>
              <S.StatusMessage>{error}</S.StatusMessage>
            </S.Status>
          )}
          {pinnedPost && (
            <S.FeaturedSection>
              <S.FeaturedLabel>
                <RgbCycleText text="PINNED" />
              </S.FeaturedLabel>
              <S.FeaturedCardLink to={`${URLS.blog}${pinnedPost.slug}`}>
                <S.FeaturedImageWrapper>
                  <FadeInImage src={pinnedPost.imageUrl} alt="" loading={'eager'} />
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
              {filteredPosts.map((post: AoBlogPost) => (
                <S.CardLink key={post.slug} to={`${URLS.blog}${post.slug}`}>
                  <S.CardImageWrapper>
                    <FadeInImage src={post.imageUrl} alt="" />
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
          {!error && filteredPosts.length === 0 && (
            <S.Status>
              <S.StatusMessage>
                {displayedPosts.length === 1 ? (
                  <>
                    <S.HammerIcon aria-hidden="true">
                      <ReactSVG src={ASSETS.hammer} />
                    </S.HammerIcon>
                    More coming soon, building is in progress.
                  </>
                ) : (
                  'No posts found.'
                )}
              </S.StatusMessage>
            </S.Status>
          )}
        </S.Content>
      )}
      {!isLoading && <Footer />}
    </S.Wrapper>
  );
}
