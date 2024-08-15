import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { URLS } from 'helpers/config';

const Home = getLazyImport('Home');
const Spec = getLazyImport('Spec');
const Mint = getLazyImport('Mint');
const Deposit = getLazyImport('Deposit');

export default function _Routes() {
	return (
		<Suspense fallback={null}>
			<Routes>
				<Route path={URLS.base} element={<Home />} />
				<Route path={URLS.read} element={<Spec />} />
				<Route path={URLS.mint} element={<Mint />} />
				<Route path={URLS.deposit} element={<Deposit />} />
				<Route path={URLS.withdraw} element={<Mint />} />
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
