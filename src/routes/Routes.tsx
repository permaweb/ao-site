import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { URLS } from 'helpers/config';

const Landing = getLazyImport('Landing');
const Mint = getLazyImport('Mint');
const Read = getLazyImport('Read');
const NotFound = getLazyImport('NotFound');

export default function _Routes() {
	return (
		<Suspense fallback={null}>
			<Routes>
				<Route path={URLS.base} element={<Landing />} />
				<Route path={URLS.mint} element={<Mint />} />
				<Route path={`${URLS.mint}:active`} element={<Mint />} />
				<Route path={URLS.read} element={<Read />} />
				<Route path={'*'} element={<NotFound />} />
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
