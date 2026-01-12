import _ from 'lodash';
import React from 'react';

import { createDataItemSigner, message, result } from '@permaweb/aoconnect';

import { Notification } from 'components/atoms/Notification';
import { AO } from 'helpers/config';
import { AllocationRecordType, AllocationTokenRecordType, NotificationType } from 'helpers/types';

import { flpCu } from './AOProvider';
import { useArweaveProvider } from './ArweaveProvider';
import { useLanguageProvider } from './LanguageProvider';

interface AllocationContextState {
	records: AllocationRecordType[] | null;
	addToken: (token: AllocationTokenRecordType) => void;
	addFullToken: (token: AllocationTokenRecordType) => void;
	updateToken: (token: AllocationRecordType, multiplier: number | 'max') => void;
	removeToken: (token: AllocationTokenRecordType) => void;
	fetchingSetup: boolean;
	showSetup: boolean;
	savePreferences: (initialSave?: boolean) => Promise<void>;
	loading: boolean;
	isTokenDisabled: (token: AllocationTokenRecordType) => boolean;
	unsavedChanges: boolean;
	projects: any[];
	totalDelegated: any;
}

const DEFAULT_CONTEXT: AllocationContextState = {
	records: null,
	addToken: () => {},
	addFullToken: () => {},
	updateToken: () => {},
	removeToken: () => {},
	fetchingSetup: false,
	showSetup: false,
	savePreferences: async () => {},
	loading: false,
	isTokenDisabled: () => false,
	unsavedChanges: false,
	projects: [],
	totalDelegated: null,
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
	const arProvider = useArweaveProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [fetchingSetup, setFetchingSetup] = React.useState<boolean>(false);
	const [showSetup, setShowSetup] = React.useState<boolean>(false);
	const [originalRecords, setOriginalRecords] = React.useState<AllocationRecordType[]>([]);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [response, setResponse] = React.useState<NotificationType | null>(null);
	const [unsavedChanges, setUnsavedChanges] = React.useState<boolean>(false);

	const [projects, setProjects] = React.useState<any>(null);
	const [totalDelegated, setTotalDelegated] = React.useState<any>(null);
	const [records, setRecords] = React.useState<AllocationRecordType[] | null>(null);

	React.useEffect(() => {
		(async function () {
			try {
				const response = await flpCu.dryrun({
					process: AO.flpFactory,
					tags: [{ name: 'Action', value: 'Get-FLPs' }],
				});

				if (response?.Messages?.[0]?.Data) {
					setProjects(JSON.parse(response.Messages[0].Data));
				}
			} catch (e: any) {
				setProjects([]);
			}
		})();
	}, []);

	React.useEffect(() => {
		(async function () {
			try {
				const response = await flpCu.dryrun({
					process: AO.yieldHistorian,
					tags: [{ name: 'Action', value: 'Get-Total-Delegated-AO-By-Project' }],
				});

				if (response?.Messages?.[0]?.Data) {
					setTotalDelegated(JSON.parse(response.Messages[0].Data));
				}
			} catch (e: any) {
				console.error(e);
			}
		})();
	}, []);

	React.useEffect(() => {
		if (arProvider.walletAddress && projects) {
			const cached = getCachedRecords();
			if (cached && cached.length > 0) {
				setRecords(cached);
				setOriginalRecords(cached);
				setShowSetup(false);
			}
			fetchSetup();
		} else {
			setShowSetup(true);
		}
	}, [arProvider.walletAddress, projects]);

	React.useEffect(() => {
		const normalizeRecords = (arr: AllocationRecordType[]) =>
			_.sortBy(arr, ['id']).map((record) => ({
				...record,
				value: parseFloat(record.value.toFixed(10)),
			}));

		if (_.isEqual(normalizeRecords(records), normalizeRecords(originalRecords))) {
			setUnsavedChanges(false);
		} else {
			setUnsavedChanges(true);
		}
	}, [records, originalRecords]);

	const fetchSetup = async () => {
		setFetchingSetup(true);
		try {
			const response = await flpCu.dryrun({
				process: AO.delegationOracle,
				tags: [
					{ name: 'Action', value: 'Get-Delegations' },
					{ name: 'Wallet', value: arProvider.walletAddress },
				],
			});

			if (response?.Messages?.[0]?.Data) {
				const remoteRecords = JSON.parse(response.Messages[0].Data).delegationPrefs;

				if (remoteRecords?.length > 0) {
					const parsedRecords = remoteRecords.map((record) => {
						let label: string;
						if (record.walletTo === AO.piProcess) {
							label = 'PI';
						} else if (record.walletTo === arProvider.walletAddress) {
							label = 'AO';
						} else {
							label = projects.find((project) => project.id === record.walletTo).flp_token_ticker;
						}
						return {
							id: record.walletTo ?? '-',
							label: label,
							value: parseInt(record.factor ?? '0', 10) / 10000,
						};
					});

					setRecords(parsedRecords);
					setOriginalRecords(parsedRecords);
					setCachedRecords(parsedRecords);

					setShowSetup(false);
					setUnsavedChanges(false);
				} else {
					setShowSetup(true);
					setRecords([]);
				}
			} else {
				setShowSetup(true);
			}
		} catch (e: any) {
			console.error(e);
			setShowSetup(true);
		}
		setFetchingSetup(false);
	};

	const getCacheKey = () => {
		return arProvider.walletAddress ? `allocation_${arProvider.walletAddress}` : null;
	};

	const getCachedRecords = (): AllocationRecordType[] | null => {
		const key = getCacheKey();
		if (key) {
			const cached = localStorage.getItem(key);
			if (cached) {
				try {
					return JSON.parse(cached);
				} catch (e) {
					console.error('Error parsing cached records:', e);
				}
			}
		}
		return null;
	};

	const setCachedRecords = (records: AllocationRecordType[]) => {
		const key = getCacheKey();
		if (key) {
			localStorage.setItem(key, JSON.stringify(records));
		}
	};

	const updateRecords = (newRecords: AllocationRecordType[]) => {
		setRecords(newRecords);
		setCachedRecords(newRecords);
	};

	const addToken = (token: AllocationTokenRecordType) => {
		const existingRecord = records.find((record: AllocationRecordType) => record.id === token.id);

		if (existingRecord) {
			console.error(`Token ${token.label} already exists.`);
			return;
		}

		const evenShare = 1 / (records.length + 1);
		const updatedRecords = records.map((record: AllocationRecordType) => ({
			...record,
			value: evenShare,
		}));
		updatedRecords.push({ ...token, value: evenShare });

		updateRecords(updatedRecords);
	};

	const addFullToken = (token: AllocationTokenRecordType) => {
		updateRecords([{ ...token, value: 1 }]);
	};

	const updateToken = (token: AllocationRecordType, multiplier: number | 'max') => {
		if (token.value === undefined || token.value === null) {
			console.error('No value provided');
			return;
		}

		let newAmount: number;
		if (multiplier === 'max') newAmount = 1;
		else newAmount = token.value * multiplier;

		if (newAmount < 0 || newAmount > 1) {
			console.error('Invalid amount provided, must be between 0 and 1');
			return;
		}

		const totalTokens = records.length;
		if (totalTokens === 1) {
			updateRecords([{ ...token, value: 1 }]);
			return;
		}

		const remainingAmount = 1 - newAmount;
		const newShareForOthers = remainingAmount / (totalTokens - 1);

		const updatedRecords = records
			.map((record) => {
				if (token.id === record.id) {
					return { ...record, value: newAmount };
				} else {
					return { ...record, value: newShareForOthers };
				}
			})
			.filter((record: AllocationRecordType) => record.value > 0);

		updateRecords(updatedRecords);
	};

	const removeToken = (token: AllocationTokenRecordType) => {
		if (records.length === 1) {
			console.error('Cannot remove the only token');
			return;
		}

		const existingRecord = records.find((record: AllocationRecordType) => record.id === token.id);

		if (!existingRecord) {
			console.error(`Token ${token.label} does not exist.`);
			return;
		}

		const updatedRecords = records.filter((record: AllocationRecordType) => record.id !== token.id);

		if (updatedRecords.length > 0) {
			const evenShare = 1 / updatedRecords.length;
			const redistributedRecords = updatedRecords.map((record: AllocationRecordType) => ({
				...record,
				value: evenShare,
			}));
			updateRecords(redistributedRecords);
		} else {
			updateRecords([]);
		}
	};

	const isTokenDisabled = (token: AllocationRecordType) => {
		const existingRecord = records.find((record: AllocationRecordType) => record.id === token.id);
		if (!existingRecord) return false;
		if (records.length === 1) return true;
	};

	const savePreferences = async (initialSave?: boolean) => {
		if (arProvider.walletAddress) {
			setLoading(true);
			setResponse(null);
			try {
				const messages = [];

				const createMessage = (id, factor) => ({
					process: AO.delegationOracle,
					signer: createDataItemSigner(arProvider.wallet),
					tags: [{ name: 'Action', value: 'Set-Delegation' }],
					data: JSON.stringify({
						walletFrom: arProvider.walletAddress,
						walletTo: id,
						factor: factor,
					}),
				});

				const newIds = records.map((record) => record.id);

				originalRecords.forEach((originalRecord) => {
					if (!newIds.includes(originalRecord.id)) {
						messages.push(createMessage(originalRecord.id, 0));
					}
				});

				records.forEach((newRecord) => {
					const factor = Math.floor((newRecord.value ?? 0) * 10000);
					messages.push(createMessage(newRecord.id, factor));
				});

				messages.sort((a, b) => {
					const factorA = JSON.parse(a.data).factor;
					const factorB = JSON.parse(b.data).factor;

					if (factorA === 0 && factorB !== 0) return -1;
					if (factorA !== 0 && factorB === 0) return 1;
					return factorA - factorB;
				});

				for (const messageToSend of messages) {
					const factor = JSON.parse(messageToSend.data).factor;
					if (factor > 0 && factor < 500) {
						setResponse({ status: 'warning', message: language.allocationTooLow });
						setLoading(false);
						return;
					}
				}

				for (const messageToSend of messages) {
					console.log(messageToSend);
					const response = await message(messageToSend);
					const updateResult = await result({
						process: AO.delegationOracle,
						message: response,
					});
					console.log(updateResult);
				}

				setResponse({ status: 'success', message: `${language.preferencesUpdated}!` });

				if (initialSave) await fetchSetup();
			} catch (e: any) {
				setResponse({
					status: 'warning',
					message: e.message ?? language.errorSavingPreferences,
				});
			}
			setLoading(false);
		}
	};

	return (
		<>
			<AllocationContext.Provider
				value={{
					records,
					addToken,
					addFullToken,
					updateToken,
					removeToken,
					fetchingSetup,
					showSetup,
					savePreferences,
					loading,
					isTokenDisabled,
					unsavedChanges,
					projects,
					totalDelegated,
				}}
			>
				{props.children}
			</AllocationContext.Provider>
			{response && (
				<Notification message={response.message} type={response.status} callback={() => setResponse(null)} />
			)}
		</>
	);
}
