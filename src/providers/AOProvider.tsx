import React from 'react';
import { cacheExchange, Client, fetchExchange, gql } from 'urql';

import { connect } from '@permaweb/aoconnect';

import { AO, AO_TOKEN_DENOMINATION, ENDPOINTS } from 'helpers/config';

export const afCu = connect({
	CU_URL: 'https://cu.ao-testnet.xyz',
});

export const goldsky = new Client({
	url: ENDPOINTS.goldsky,
	exchanges: [cacheExchange, fetchExchange],
});

enum AOPhase {
	Testnet = 'Testnet',
	MainnetEarly = 'Mainnet Early',
	Mainnet = 'Mainnet',
}
enum AONetworkStatus {
	Live = 'Live',
}

interface AOContextState {
	users: number | null;
	messages: number | null;
	processes: number | null;
	phase: AOPhase | null;
	status: AONetworkStatus | null;
	mintedSupply: number | null;
}

const DEFAULT_CONTEXT = {
	users: null,
	messages: null,
	processes: null,
	phase: null,
	status: null,
	mintedSupply: null,
};

const AOContext = React.createContext<AOContextState>(DEFAULT_CONTEXT);

export function useAOProvider(): AOContextState {
	return React.useContext(AOContext);
}

export function AOProvider(props: { children: React.ReactNode }) {
	const [mintedSupply, setMintedSupply] = React.useState<number | null>(null);
	const [users, setUsers] = React.useState<number | null>(null);
	const [messages, setMessages] = React.useState<number | null>(null);
	const [processes, setProcesses] = React.useState<number | null>(null);

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
				console.error('Error during afCu.dryrun:', error);
			}
		})();
	}, []);

	React.useEffect(() => {
		(async function () {
			try {
				const networkStats = await getNetworkStats();

				setUsers(networkStats?.[networkStats?.length - 1]?.active_users);
				setMessages(networkStats?.[networkStats?.length - 1]?.tx_count_rolling);
				setProcesses(networkStats?.[networkStats?.length - 1]?.processes_rolling);
			} catch (e: any) {
				console.error(e);
			}
		})();
	}, []);

	const messageFields = gql`
		fragment MessageFields on TransactionConnection {
			edges {
				cursor
				node {
					id
					ingested_at
					recipient
					block {
						timestamp
						height
					}
					tags {
						name
						value
					}
					data {
						size
					}
					owner {
						address
					}
				}
			}
		}
	`;

	const networkStatsQuery = gql`
		query {
			transactions(
				sort: HEIGHT_DESC
				first: 1
				owners: ["yqRGaljOLb2IvKkYVa87Wdcc8m_4w6FI58Gej05gorA"]
				recipients: ["vdpaKV_BQNISuDgtZpLDfDlMJinKHqM3d2NWd3bzeSk"]
				tags: [{ name: "Action", values: ["Update-Stats"] }]
			) {
				...MessageFields
			}
		}

		${messageFields}
	`;

	async function getNetworkStats(): Promise<any[]> {
		try {
			const result = await goldsky.query<any>(networkStatsQuery, {}).toPromise();
			if (!result.data) return [];

			const { edges } = result.data.transactions;
			const updateId = edges[0]?.node.id;

			const data = await fetch(ENDPOINTS.arTxEndpoint(updateId));
			const json = await data.json();

			return json as any[];
		} catch (error) {
			console.error(error);
			return [];
		}
	}

	return (
		<AOContext.Provider
			value={{
				users: users,
				messages: messages,
				processes: processes,
				phase: AOPhase.MainnetEarly,
				status: AONetworkStatus.Live,
				mintedSupply: mintedSupply,
			}}
		>
			{props.children}
		</AOContext.Provider>
	);
}
