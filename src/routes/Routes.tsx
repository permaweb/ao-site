import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { URLS } from 'helpers/config';

const Home = getLazyImport('Home');
const Spec = getLazyImport('Spec');
const Mint = getLazyImport('Mint');

export default function _Routes() {
	return (
		<Suspense fallback={null}>
			<Routes>
				<Route path={URLS.base} element={<Home />} />
				<Route path={URLS.spec} element={<Spec />} />
				<Route path={URLS.mint} element={<Mint />} />
				<Route path={`${URLS.mint}:active`} element={<Mint />} />
			</Routes>
		</Suspense>
	);
}

function getLazyImport(view: string) {
	return lazy(() =>
		import(`../views/${view}/index.tsx`).then((module) => ({
			default: module.default,
		}))
	);
}
