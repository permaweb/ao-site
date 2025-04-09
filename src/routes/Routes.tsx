import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Loader } from 'components/atoms/Loader';
import { URLS } from 'helpers/config';

const Landing = getLazyImport('Landing');
const Mint = getLazyImport('Mint');
const NotFound = getLazyImport('NotFound');
const Policies = getLazyImport('Policies');
const Fund = getLazyImport('Fund');
const FundDashboard = getLazyImport('Fund/Dashboard');

export default function _Routes() {
	return (
		<Suspense fallback={<Loader />}>
			<Routes>
				<Route path={URLS.base} element={<Landing />} />
				<Route path={URLS.mint} element={<Mint />} />
				<Route path={URLS.policies} element={<Policies />} />
				<Route path={URLS.fund} element={<Fund />} />
				<Route path={URLS.fundDashboard} element={<FundDashboard />} />
				<Route path={`${URLS.mint}:active`} element={<Mint />} />
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
