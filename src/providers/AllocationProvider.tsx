import React, { createContext, useContext, useState } from 'react';

interface AllocationContextState {
	records: Record<string, number>;
	handleUpdate: (token: string, amount?: number) => void;
	addToken: (token: string, initialAmount?: number) => void;
	removeToken: (token: string) => void;
}

const DEFAULT_CONTEXT: AllocationContextState = {
	records: {},
	handleUpdate: () => {},
	addToken: () => {},
	removeToken: () => {},
};

const AllocationContext = createContext<AllocationContextState>(DEFAULT_CONTEXT);

export function useAllocationProvider(): AllocationContextState {
	const context = useContext(AllocationContext);
	if (!context) {
		throw new Error('useAllocationProvider must be used within an AllocationProvider');
	}
	return context;
}

export function AllocationProvider(props: { children: React.ReactNode }) {
	const [records, setRecords] = useState<Record<string, number>>({
		pi: 1,
		ao: 0,
		arweave: 0,
	});

	const handleUpdate = (token: string, amount?: number) => {
		const currentTotal = Object.values(records).reduce((sum, value) => sum + value, 0);
		if (amount !== undefined) {
			// Ensure the new total does not exceed 1
			const cappedAmount = Math.min(amount, 1);
			const remaining = 1 - cappedAmount;

			const otherTokens = Object.keys(records).filter((key) => key !== token);
			const otherTotal = otherTokens.reduce((sum, key) => sum + records[key], 0);

			const updatedAllocations = { ...records, [token]: cappedAmount };

			// Redistribute the remaining percentage proportionally among other tokens
			otherTokens.forEach((key) => {
				updatedAllocations[key] =
					otherTotal > 0 ? (records[key] / otherTotal) * remaining : remaining / otherTokens.length;
			});

			setRecords(updatedAllocations);
		} else {
			// Filter records to include only tokens with values > 0
			const activeTokens = Object.keys(records).filter((key) => records[key] > 0);

			// If only one token is active, split equally between it and the selected token
			if (activeTokens.length === 1) {
				const activeToken = activeTokens[0];
				const updatedRecords = Object.fromEntries(
					Object.keys(records).map((key) => (key === activeToken || key === token ? [key, 0.5] : [key, 0]))
				);
				setRecords(updatedRecords);
			} else {
				// Calculate the even share for active tokens including the selected token
				const evenShare = 1 / (activeTokens.length + 1);

				// Redistribute values equally among the active tokens and the selected token
				const updatedRecords = Object.fromEntries(
					Object.keys(records).map((key) => (activeTokens.includes(key) || key === token ? [key, evenShare] : [key, 0]))
				);
				setRecords(updatedRecords);
			}
		}
	};

	const addToken = (token: string, initialAmount: number = 0) => {
		if (records[token] !== undefined) {
			console.warn(`Token ${token} already exists.`);
			return;
		}

		const currentTotal = Object.values(records).reduce((sum, value) => sum + value, 0);

		console.log(currentTotal);

		const updatedAllocations = { ...records, [token]: initialAmount };

		// Redistribute proportions to maintain total ≤ 1
		if (currentTotal + initialAmount > 1) {
			const remaining = 1 - initialAmount;
			const scalingFactor = remaining / currentTotal;

			Object.keys(records).forEach((key) => {
				updatedAllocations[key] *= scalingFactor;
			});
		}

		// setRecords(updatedAllocations);
	};

	const removeToken = (token: string) => {
		if (!records[token]) {
			console.warn(`Token ${token} does not exist.`);
			return;
		}

		const { [token]: removed, ...remainingAllocations } = records;
		const remainingTotal = Object.values(remainingAllocations).reduce((sum, value) => sum + value, 0);

		// Redistribute the removed token's proportion to the remaining tokens
		const updatedAllocations = Object.fromEntries(
			Object.entries(remainingAllocations).map(([key, value]) => [key, value / remainingTotal])
		);

		setRecords(updatedAllocations);
	};

	return (
		<AllocationContext.Provider value={{ records, handleUpdate, addToken, removeToken }}>
			{props.children}
		</AllocationContext.Provider>
	);
}
