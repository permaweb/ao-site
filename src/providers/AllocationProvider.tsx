import React from 'react';

interface AllocationContextState {
	pi: number | null;
	ao: number | null;
	arweave: number | null;
}

const DEFAULT_CONTEXT = {
	pi: null,
	ao: null,
	arweave: null,
};

const AllocationContext = React.createContext<AllocationContextState>(DEFAULT_CONTEXT);

export function useAllocationProvider(): AllocationContextState {
	return React.useContext(AllocationContext);
}

export function AllocationProvider(props: { children: React.ReactNode }) {
	return (
		<AllocationContext.Provider value={{ pi: 0.3, ao: 0.54, arweave: 0.16 }}>
			{props.children}
		</AllocationContext.Provider>
	);
}
