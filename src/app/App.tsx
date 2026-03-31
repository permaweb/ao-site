import React, { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useTheme } from 'styled-components';

import { Loader } from 'components/atoms/Loader';
import { URLS } from 'helpers/config';
import { serviceWorkerManager } from 'helpers/serviceWorkerManager';
import { Header } from 'navigation/header';

import * as S from './styles';

const Landing = getLazyImport('Landing');
const Blog = getLazyImport('Blog');
const BlogPost = getLazyImport('BlogPost');
const Mint = getLazyImport('Mint');
const Delegate = getLazyImport('Delegate');
const NotFound = getLazyImport('NotFound');
const Policies = getLazyImport('Policies');

function getLazyImport(view: string) {
	return lazy(() =>
		import(`../views/${view}/index.tsx`).then((module) => ({
			default: module.default,
		}))
	);
}

export default function App() {
	const theme = useTheme();
	const location = useLocation();
	const routeLoadingMessage = React.useMemo(() => {
		if (location.pathname.startsWith(URLS.blog) || location.pathname.startsWith(URLS.read)) {
			return 'AO, the decentralized network is retrieving the latest updates happening in the ecosystem.';
		}
		return null;
	}, [location.pathname]);

	const hasInitializedServiceWorkerRef = React.useRef(false);

	React.useEffect(() => {
		if (!hasInitializedServiceWorkerRef.current) {
			hasInitializedServiceWorkerRef.current = true;
			(async () => {
				await serviceWorkerManager.register();
				await serviceWorkerManager.checkArNSUpdate();
			})();
		}
	}, []);

	React.useEffect(() => {
		document.body.style = '';
		const loader = document.getElementById('page-loader');
		if (loader) {
			loader.style.display = 'none';
		}
	}, []);

	React.useEffect(() => {
		const header = document.getElementById('navigation-header');
		if (!header) return;

		/* Restyle subroutes */
		if (location.pathname !== '/') {
			document.body.style.background = theme.colors.container.alt1.background;
			header.style.background = theme.colors.container.alt1.background;
		} else {
			document.body.style.background = theme.colors.view.background;
			header.style.background = theme.colors.view.background;
		}

		let lastScrollY = 0;
		let ticking = false;
		const borderColor = theme.colors.border.alt1;

		const handleScroll = () => {
			lastScrollY = window.scrollY;
			if (!ticking) {
				window.requestAnimationFrame(() => {
					const parts = window.location.href.split('/');
					const isEditorPage = parts.some((part) => part === 'post' || part === 'page');
					if (!isEditorPage) {
						header.style.borderBottom =
							lastScrollY > 0 ? `1px solid ${borderColor}` : '1px solid transparent';
					} else {
						const subheader = document.getElementById('toolbar-wrapper');
						if (!subheader) return;

						subheader.style.borderBottom =
							lastScrollY > 0 ? `1px solid ${borderColor}` : '1px solid transparent';
					}
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, [
		location.pathname,
		theme.colors.border.primary,
		theme.colors.container.alt1.background,
		theme.colors.view.background,
	]);

	return (
		<>
			<Header />
			<S.View>
				<Suspense
					fallback={
						routeLoadingMessage ? (
							<S.RouteLoadingState>
								<Loader relative noMargins />
								<S.RouteLoadingMessage>{routeLoadingMessage}</S.RouteLoadingMessage>
							</S.RouteLoadingState>
						) : (
							<S.RouteLoadingState>
								<Loader />
							</S.RouteLoadingState>
						)
					}
				>
					<Routes>
						<Route path={URLS.base} element={<Landing />} />
						<Route path={URLS.blog} element={<Blog />} />
						<Route path={`${URLS.blog}:slug`} element={<BlogPost />} />
						<Route path={URLS.mint} element={<Mint />} />
						<Route path={URLS.delegate} element={<Delegate />} />
						<Route path={URLS.policies} element={<Policies />} />
						<Route path={'*'} element={<NotFound />} />
					</Routes>
				</Suspense>
			</S.View>
		</>
	);
}
