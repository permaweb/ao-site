import React from 'react';
import { cacheExchange, Client, fetchExchange, gql } from 'urql';

import { readHandler } from 'api';

import { AO, AO_TOKEN_DENOMINATION } from 'helpers/config';

export const goldsky = new Client({
	url: 'https://arweave-search.goldsky.com/graphql',
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
	messages: number | null;
	processes: number | null;
	nodes: string | null;
	phase: AOPhase | null;
	status: AONetworkStatus | null;
	mintedSupply: number | null;
}

const DEFAULT_CONTEXT = {
	messages: null,
	processes: null,
	nodes: null,
	phase: null,
	status: null,
	mintedSupply: null,
};

const AOContext = React.createContext<AOContextState>(DEFAULT_CONTEXT);

export function useAOProvider(): AOContextState {
	return React.useContext(AOContext);
}

// TODO: Nodes
export function AOProvider(props: { children: React.ReactNode }) {
	const [mintedSupply, setMintedSupply] = React.useState<number | null>(null);
	const [messages, setMessages] = React.useState<number | null>(null);
	const [processes, setProcesses] = React.useState<number | null>(null);

	React.useEffect(() => {
		(async function () {
			try {
				const aoSupplyFetch = await readHandler({
					processId: AO.tokenMirror,
					action: 'Minted-Supply',
				});

				if (aoSupplyFetch) setMintedSupply(aoSupplyFetch / AO_TOKEN_DENOMINATION);
			} catch (e: any) {
				console.error(e);
			}

			try {
				const networkStats = await getNetworkStats();

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

			const data = await fetch(`https://arweave.net/${updateId}`);
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
				messages: messages,
				processes: processes,
				nodes: '144',
				phase: AOPhase.MainnetEarly,
				status: AONetworkStatus.Live,
				mintedSupply: mintedSupply,
			}}
		>
			{props.children}
		</AOContext.Provider>
	);
}
