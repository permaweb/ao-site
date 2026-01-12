import React from 'react';

import { connect } from '@permaweb/aoconnect';

import { AO, AO_TOKEN_DENOMINATION, ENDPOINTS } from 'helpers/config';
import { AONetworkStatus, AOPhase, MetricDataPoint } from 'helpers/types';

const CACHE_DURATION = 6 * 60 * 60 * 1000;

export const cu = connect({
	MODE: 'legacy',
	CU_URL: 'https://cu.ao-testnet.xyz',
});

export const flpCu = connect({
	MODE: 'legacy',
	CU_URL: 'https://cu-af.dataos.so',
});

interface AOContextState {
	metrics: MetricDataPoint[] | null;
	phase: AOPhase | null;
	status: AONetworkStatus | null;
	mintedSupply: number | null;
}

const DEFAULT_CONTEXT = {
	users: null,
	messages: null,
	processes: null,
	metrics: null,
	phase: null,
	status: null,
	mintedSupply: null,
};

const AOContext = React.createContext<AOContextState>(DEFAULT_CONTEXT);

export function useAOProvider(): AOContextState {
	return React.useContext(AOContext);
}

export function AOProvider(props: { children: React.ReactNode }) {
	const [metrics, setMetrics] = React.useState<MetricDataPoint[] | null>(null);
	const [mintedSupply, setMintedSupply] = React.useState<number | null>(null);

	React.useEffect(() => {
		const CACHE_KEY = 'mintedSupply';
		const TIMESTAMP_KEY = 'mintedSupplyTimestamp';
		const CACHE_DURATION = 24 * 60 * 60 * 1000;

		const cachedValue = localStorage.getItem(CACHE_KEY);
		const cachedTimestamp = localStorage.getItem(TIMESTAMP_KEY);
		const now = Date.now();

		if (!isNaN(Number(cachedValue)) && cachedTimestamp && now - parseInt(cachedTimestamp, 10) < CACHE_DURATION) {
			setMintedSupply(Number(cachedValue));
			return;
		}

		(async function () {
			try {
				const res = await fetch(`${ENDPOINTS.aoStateNode(AO.token)}compute/token-info/supply`);
				const supply = await res.text();

				const value = Number(supply) / AO_TOKEN_DENOMINATION;
				if (isNaN(value)) throw new Error('Invalid minted supply value');
				setMintedSupply(value);

				localStorage.setItem(CACHE_KEY, value.toString());
				localStorage.setItem(TIMESTAMP_KEY, now.toString());
			} catch (error) {
				console.error('Error:', error);
			}
		})();
	}, []);

	React.useEffect(() => {
		(async function () {
			try {
				const cacheKey = `aoMetricsCacheMainnet`;
				const cachedData = localStorage.getItem(cacheKey);

				if (cachedData) {
					const { data, timestamp } = JSON.parse(cachedData);
					const now = Date.now();

					if (now - timestamp < CACHE_DURATION) {
						setMetrics(data);
						return;
					}
				}

				const response = await fetch(ENDPOINTS.metrics(30));
				const data = await response.json();
				const reversedData = data.reverse();

				localStorage.setItem(
					cacheKey,
					JSON.stringify({
						data: reversedData,
						timestamp: Date.now(),
					})
				);

				setMetrics(reversedData);
			} catch (e: any) {
				console.error(e);
			}
		})();
	}, []);

	return (
		<AOContext.Provider
			value={{
				metrics: metrics,
				phase: AOPhase.MainnetEarly,
				status: AONetworkStatus.Live,
				mintedSupply: mintedSupply,
			}}
		>
			{props.children}
		</AOContext.Provider>
	);
}
