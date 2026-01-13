import React from 'react';

import { connect } from '@permaweb/aoconnect';

import { AO, AO_TOKEN_DENOMINATION, ENDPOINTS } from 'helpers/config';
import { AONetworkStatus, AOPhase, MetricDataPoint, TagType } from 'helpers/types';

const CACHE_DURATION = 6 * 60 * 60 * 1000;

export const cu: any = connect({
	MODE: 'legacy',
	CU_URL: 'https://cu.ao-testnet.xyz',
});

export const flpCu: any = connect({
	MODE: 'legacy',
	CU_URL: 'https://cu-af.dataos.so',
});

interface AOContextState {
	metrics: MetricDataPoint[] | null;
	phase: AOPhase | null;
	status: AONetworkStatus | null;
	mintedSupply: number | null;
	read: any;
}

const DEFAULT_CONTEXT = {
	metrics: null,
	phase: null,
	status: null,
	mintedSupply: null,
	read: null,
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

	async function read(args: {
		processId: string;
		action: string;
		tags?: TagType[];
		data?: any;
		replyTag?: TagType;
		ignoreDataResponse?: boolean;
	}): Promise<any> {
		const tags = [{ name: 'Action', value: args.action }];
		if (args.tags) tags.push(...args.tags);

		const response = await cu.dryrun({
			process: args.processId,
			tags: tags,
			data: JSON.stringify(args.data || {}),
		});

		if (response.Messages && response.Messages.length) {
			let message = response.Messages[0];
			if (args.replyTag) {
				message = response.Messages.find((msg: any) => {
					return msg.Tags.some((tag: any) => tag.name === args.replyTag.name && tag.value === args.replyTag.value);
				});
			}

			if (message.Data && !args.ignoreDataResponse) {
				return JSON.parse(message.Data);
			} else {
				if (message.Tags) {
					return message.Tags.reduce((acc: any, item: any) => {
						acc[item.name] = item.value;
						return acc;
					}, {});
				}
			}
		}
	}

	return (
		<AOContext.Provider
			value={{
				metrics: metrics,
				phase: AOPhase.MainnetEarly,
				status: AONetworkStatus.Live,
				mintedSupply: mintedSupply,
				read: read,
			}}
		>
			{props.children}
		</AOContext.Provider>
	);
}
