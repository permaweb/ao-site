import React from 'react';

import { Loader } from 'components/atoms/Loader';
import { AO, URLS } from 'helpers/config';
import { Footer } from 'navigation/footer';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { AoBlogPost, fetchAoBlogPosts } from './aoFeed';
import * as S from './styles';

const PINNED_POST_SLUG = 'legacynet-sunset';
const BLOG_ID = 'aodevblog';

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
					setAllPosts(posts);
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

	if (isLoading) {
		return <Loader />;
	}

	return (
		<S.Wrapper>
			<S.Intro>
				<S.IntroTitle>{language.blog}</S.IntroTitle>
			</S.Intro>
			{error && (
				<S.Status>
					<S.StatusMessage>{error}</S.StatusMessage>
				</S.Status>
			)}
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
					{filteredPosts.map((post: AoBlogPost) => (
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
			{!error && filteredPosts.length === 0 && (
				<S.Status>
					<S.StatusMessage>No posts found.</S.StatusMessage>
				</S.Status>
			)}
			<Footer />
		</S.Wrapper>
	);
}
