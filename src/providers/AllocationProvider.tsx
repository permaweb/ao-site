import React from 'react';

import { AllocationRecordType, AllocationTokenRecordType } from 'helpers/types';

interface AllocationContextState {
	records: AllocationRecordType[];
	addToken: (token: AllocationTokenRecordType) => void;
	removeToken: (token: AllocationTokenRecordType) => void;
}

const DEFAULT_CONTEXT: AllocationContextState = {
	records: [],
	addToken: () => {},
	removeToken: () => {},
};

const AllocationContext = React.createContext<AllocationContextState>(DEFAULT_CONTEXT);

export function useAllocationProvider(): AllocationContextState {
	const context = React.useContext(AllocationContext);
	if (!context) {
		throw new Error('useAllocationProvider must be used within an AllocationProvider');
	}
	return context;
}

export function AllocationProvider(props: { children: React.ReactNode }) {
	const [records, setRecords] = React.useState<any>([{ id: 'pi', label: 'Permaweb Index', value: 1 }]);

	const addToken = (token: AllocationTokenRecordType) => {
		const existingRecord = records.find((record: AllocationRecordType) => record.id === token.id);

		if (existingRecord) {
			console.error(`Token ${token.label} already exists.`);
			return;
		}

		const evenShare = 1 / (records.length + 1);
		const updatedRecords = records.map((record: AllocationRecordType) => ({ ...record, value: evenShare }));
		updatedRecords.push({ ...token, value: evenShare });
		setRecords(updatedRecords);
	};

	const removeToken = (token: AllocationTokenRecordType) => {
		if (records.length === 1) {
			console.error('Can not remove only token');
			return;
		}

		const existingRecord = records.find((record: AllocationRecordType) => record.id === token.id);

		if (!existingRecord) {
			console.error(`Token ${token.label} does not exist.`);
			return;
		}

		// Remove the specified token
		const updatedRecords = records.filter((record: AllocationRecordType) => record.id !== token.id);

		if (updatedRecords.length === 0) {
			// If no records remain, just clear the state
			setRecords([]);
			return;
		}

		// Redistribute the value of the removed token
		const evenShare = 1 / updatedRecords.length;
		const redistributedRecords = updatedRecords.map((record: AllocationRecordType) => ({
			...record,
			value: evenShare,
		}));

		setRecords(redistributedRecords);
	};

	return (
		<AllocationContext.Provider value={{ records, addToken, removeToken }}>{props.children}</AllocationContext.Provider>
	);
}
