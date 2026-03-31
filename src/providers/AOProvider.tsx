import React from 'react';

import { connect, createSigner } from '@permaweb/aoconnect';

import { AO, AO_TOKEN_DENOMINATION, ENDPOINTS } from 'helpers/config';
import { AONetworkStatus, AOPhase, MetricDataPoint, TagType } from 'helpers/types';

import { useArweaveProvider } from './ArweaveProvider';

const METRICS_CACHE_DURATION = 24 * 60 * 60 * 1000;
const SUPPLY_CACHE_DURATION = 24 * 60 * 60 * 1000;

export const cu: any = connect({
	MODE: 'legacy',
	CU_URL: 'https://cu.ao-testnet.xyz',
});

export const flpCu: any = connect({
	MODE: 'legacy',
	CU_URL: 'https://cu.ao-testnet.xyz',
});

interface AOContextState {
	metrics: MetricDataPoint[] | null;
	phase: AOPhase | null;
	status: AONetworkStatus | null;
	mintedSupply: number | null;
	read: any;
	aoMainnet: any;
	validateOperatorStakeContext: (args: {
		reference: string;
		prefix: string;
		peers: string[];
	}) => Promise<{ isValid: boolean; message?: string }>;
}

const DEFAULT_CONTEXT = {
	metrics: null,
	phase: null,
	status: null,
	mintedSupply: null,
	read: null,
	aoMainnet: null,
	validateOperatorStakeContext: async () => ({ isValid: true }),
};

const AOContext = React.createContext<AOContextState>(DEFAULT_CONTEXT);

export function useAOProvider(): AOContextState {
	return React.useContext(AOContext);
}

export function AOProvider(props: { children: React.ReactNode }) {
	const arProvider = useArweaveProvider();
	const [metrics, setMetrics] = React.useState<MetricDataPoint[] | null>(null);
	const [mintedSupply, setMintedSupply] = React.useState<number | null>(null);

	const aoMainnet = React.useMemo(() => {
		const config: any = {
			MODE: 'mainnet',
			URL: 'http://localhost:8734',
			SCHEDULER: 'Fe27-MhE0X0CH9mWMKoOlbuRAR8ThTz9a-9m1ZivwtI',
		};
		if (arProvider.wallet) {
			config.signer = createSigner(arProvider.wallet);
		}
		return connect(config);
	}, [arProvider.wallet]);

	React.useEffect(() => {
		const CACHE_KEY = 'mintedSupply';
		const TIMESTAMP_KEY = 'mintedSupplyTimestamp';

		const cachedValue = localStorage.getItem(CACHE_KEY);
		const cachedTimestamp = localStorage.getItem(TIMESTAMP_KEY);
		const now = Date.now();

		if (
			!isNaN(Number(cachedValue)) &&
			cachedTimestamp &&
			now - parseInt(cachedTimestamp, 10) < SUPPLY_CACHE_DURATION
		) {
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

					if (now - timestamp < METRICS_CACHE_DURATION) {
						setMetrics(data);
						return;
					}
				}

				const responseMainnet = await fetch(ENDPOINTS.metrics(30));
				const dataMainnet = await responseMainnet.json();

				const responseLegacy = await fetch(ENDPOINTS.metricsLegacy(30));
				const dataLegacy = await responseLegacy.json();

				let mergedData = [];

				if (dataMainnet?.length > 0) {
					for (const elementMainnet of dataMainnet) {
						const dayLegacy = dataLegacy?.find(
							(elementLegacy: any) => elementLegacy.day === elementMainnet.day
						);

						if (dayLegacy) {
							mergedData.push({
								active_processes_over_blocks:
									(elementMainnet.active_processes_over_blocks ?? 0) +
									(dayLegacy.active_processes_over_blocks ?? 0),
								active_users_over_blocks:
									(elementMainnet.active_users_over_blocks ?? 0) +
									(dayLegacy.active_users_over_blocks ?? 0),
								day: elementMainnet.day,
								evals: (elementMainnet.evals ?? 0) + (dayLegacy.evals ?? 0),
								modules_roll: (elementMainnet.modules_roll ?? 0) + (dayLegacy.modules_roll ?? 0),
								new_modules_over_blocks:
									(elementMainnet.new_modules_over_blocks ?? 0) +
									(dayLegacy.new_modules_over_blocks ?? 0),
								processed_blocks:
									(elementMainnet.processed_blocks ?? 0) + (dayLegacy.processed_blocks ?? 0),
								processes_roll: (elementMainnet.processes_roll ?? 0) + (dayLegacy.processes_roll ?? 0),
								transfers: (elementMainnet.transfers ?? 0) + (dayLegacy.transfers ?? 0),
								txs: (elementMainnet.txs ?? 0) + (dayLegacy.txs ?? 0),
								txs_roll: (elementMainnet.txs_roll ?? 0) + (dayLegacy.txs_roll ?? 0),
							});
						} else {
							mergedData.push(elementMainnet);
						}
					}
				}

				localStorage.setItem(
					cacheKey,
					JSON.stringify({
						data: mergedData,
						timestamp: Date.now(),
					})
				);

				setMetrics(mergedData);
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
					return msg.Tags.some(
						(tag: any) => tag.name === args.replyTag.name && tag.value === args.replyTag.value
					);
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

	async function validateOperatorStakeContext(_args: {
		reference: string;
		prefix: string;
		peers: string[];
	}): Promise<{ isValid: boolean; message?: string }> {
		// Placeholder for future AO process validation.
		return { isValid: true };
	}

	return (
		<AOContext.Provider
			value={{
				metrics: metrics,
				phase: AOPhase.MainnetEarly,
				status: AONetworkStatus.Live,
				mintedSupply: mintedSupply,
				read: read,
				aoMainnet: aoMainnet,
				validateOperatorStakeContext: validateOperatorStakeContext,
			}}
		>
			{props.children}
		</AOContext.Provider>
	);
}
