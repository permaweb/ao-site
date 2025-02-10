import React from 'react';

// import localforage from 'localforage';
// import { Loader } from 'components/atoms/Loader';
// import { ASSETS } from 'helpers/config';
import { Header } from 'navigation/header';
import { Routes } from 'routes';

import AsciiArt from './AsciiArt';
import * as S from './styles';

export default function App() {
	// const [loading, setLoading] = React.useState<boolean>(true);

	React.useEffect(() => {
		AsciiArt();
	}, []);

	// React.useEffect(() => {
	// 	preloadAssets().then(() => setLoading(false));
	// }, []);

	// function blobToDataURL(blob: Blob): Promise<string> {
	// 	return new Promise((resolve, reject) => {
	// 		const reader = new FileReader();
	// 		reader.onloadend = () => resolve(reader.result as string);
	// 		reader.onerror = reject;
	// 		reader.readAsDataURL(blob);
	// 	});
	// }

	// async function preloadAssets(): Promise<void> {
	// 	const cacheKey = 'ASSET_CACHE';
	// 	const cachedAssets = await localforage.getItem<{ [key: string]: string }>(cacheKey);
	// 	if (cachedAssets) {
	// 		Object.assign(ASSETS, cachedAssets);
	// 		return;
	// 	}

	// 	const assetCache: { [key: string]: string } = {};
	// 	const assetEntries = Object.entries(ASSETS);

	// 	await Promise.all(
	// 		assetEntries.map(async ([key, url]) => {
	// 			try {
	// 				const response = await fetch(url);
	// 				if (!response.ok) {
	// 					throw new Error(`Failed to load ${key} from ${url}`);
	// 				}
	// 				const isSVG = url.toLowerCase().endsWith('.svg');
	// 				const content = isSVG ? await response.text() : await blobToDataURL(await response.blob());
	// 				assetCache[key] = content;
	// 			} catch (error) {
	// 				console.error(`Error loading asset "${key}":`, error);
	// 			}
	// 		})
	// 	);

	// 	Object.assign(ASSETS, assetCache);
	// 	try {
	// 		await localforage.setItem(cacheKey, assetCache);
	// 	} catch (error) {
	// 		console.warn('Could not save asset cache:', error);
	// 	}
	// }

	// if (loading) return <Loader />;

	return (
		<>
			<Header />
			<S.View>
				<Routes />
			</S.View>
		</>
	);
}
