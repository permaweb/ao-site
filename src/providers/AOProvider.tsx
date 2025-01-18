import React from 'react';

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
}

const DEFAULT_CONTEXT = {
	messages: null,
	processes: null,
	nodes: null,
	deposits: null,
	phase: null,
	status: null,
};

const AOContext = React.createContext<AOContextState>(DEFAULT_CONTEXT);

export function useAOProvider(): AOContextState {
	return React.useContext(AOContext);
}

export function AOProvider(props: { children: React.ReactNode }) {
	return (
		<AOContext.Provider
			value={{
				messages: '1345123987',
				processes: '129830',
				nodes: '144',
				deposits: '529830732',
				phase: AOPhase.MainnetEarly,
				status: AONetworkStatus.Live,
			}}
		>
			{props.children}
		</AOContext.Provider>
	);
}
