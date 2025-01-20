import React from 'react';

import { readHandler } from 'api';

import { AO, AO_TOKEN_DENOMINATION } from 'helpers/config';

enum AOPhase {
	Testnet = 'Testnet',
	MainnetEarly = 'Mainnet Early',
	Mainnet = 'Mainnet',
}
enum AONetworkStatus {
	Live = 'Live',
}

interface AOContextState {
	messages: string | null;
	processes: string | null;
	nodes: string | null;
	deposits: string | null;
	phase: AOPhase | null;
	status: AONetworkStatus | null;
	mintedSupply: number | null;
}

const DEFAULT_CONTEXT = {
	messages: null,
	processes: null,
	nodes: null,
	deposits: null,
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

	React.useEffect(() => {
		(async function () {
			try {
				let aoSupplyFetch: number;
				aoSupplyFetch = await readHandler({
					processId: AO.tokenMirror,
					action: 'Minted-Supply',
				});

				if (aoSupplyFetch) {
					setMintedSupply(aoSupplyFetch / AO_TOKEN_DENOMINATION);
				}
			} catch (e: any) {
				console.error(e);
			}
		})();
	}, []);

	return (
		<AOContext.Provider
			value={{
				messages: '1345123987',
				processes: '129830',
				nodes: '144',
				deposits: '529830732',
				phase: AOPhase.MainnetEarly,
				status: AONetworkStatus.Live,
				mintedSupply: mintedSupply,
			}}
		>
			{props.children}
		</AOContext.Provider>
	);
}
