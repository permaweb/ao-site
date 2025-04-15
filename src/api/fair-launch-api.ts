import { Tag } from 'arweave/web/lib/transaction';

import { createDataItemSigner, dryrun, message, result } from '@permaweb/aoconnect';

import { AO } from '../helpers/config';

/**
 * Flatten tags to a key value object
 */
export const flattenTags = (tags: Tag[]) =>
	tags.reduce((acc, tag) => {
		acc[tag.name] = tag.value;
		return acc;
	}, {} as Record<string, string>);

// -------- Factory Management --------

// Initialize
export async function initialize(processId: string): Promise<string> {
	const msgId = await message({
		process: processId,
		signer: createDataItemSigner(window.arweaveWallet),
		tags: [{ name: 'Action', value: 'Initialize' }],
	});
	return msgId;
}

// Info
export async function getInfo(processId: string): Promise<any> {
	const res = await dryrun({
		process: processId,
		tags: [{ name: 'Action', value: 'Info' }],
	});
	if (!res.Messages.length) throw new Error('No Info response');
	return res.Messages[0].Tags;
}

// -------- FLP Creation --------

export interface CreateFLPParams {
	Name: string;
	Deployer: string;
	Initializer: string;
	Treasury: string;
	'Starts-At-Timestamp': string;
	'Ends-At-Timestamp': string;
	'Short-Description'?: string;
	'Long-Description'?: string;
	// token
	'Token-Process': string;
	'Token-Supply': string;
	'Decay-Factor': string;
	'Token-Disclaimer': string;
	'Token-Ticker': string;
	'Token-Denomination': string;
	'Token-Logo': string;
	// socials
	'Twitter-Handle': string;
	'Website-URL': string;
	'Telegaram-Handle': string;
}

export async function createFLP(processId: string, params: CreateFLPParams): Promise<string> {
	const tags = [
		{ name: 'Action', value: 'Create-FLP' },
		{ name: 'Name', value: params.Name },
		{ name: 'Deployer', value: params.Deployer },
		{ name: 'Initializer', value: params.Initializer },
		{ name: 'Treasury', value: params.Treasury },
		{ name: 'Starts-At-Timestamp', value: params['Starts-At-Timestamp'] },
		{ name: 'Ends-At-Timestamp', value: params['Ends-At-Timestamp'] },
		{ name: 'Token-Process', value: params['Token-Process'] },
		{ name: 'Decay-Factor', value: params['Decay-Factor'] },
		{ name: 'Token-Disclaimer', value: params['Token-Disclaimer'] },
		{ name: 'Token-Ticker', value: params['Token-Ticker'] },
		{ name: 'Token-Denomination', value: params['Token-Denomination'] },
		{ name: 'Token-Logo', value: params['Token-Logo'] },
		{ name: 'Token-Supply', value: params['Token-Supply'] },
		{ name: 'Twitter-Handle', value: params['Twitter-Handle'] },
		{ name: 'Website-URL', value: params['Website-URL'] },
		{ name: 'Telegaram-Handle', value: params['Telegaram-Handle'] },
	];
	if (params['Short-Description']) {
		tags.push({ name: 'Short-Description', value: params['Short-Description'] });
	}
	if (params['Long-Description']) {
		tags.push({ name: 'Long-Description', value: params['Long-Description'] });
	}

	const msgId = await message({
		process: processId,
		signer: createDataItemSigner(window.arweaveWallet),
		tags,
	});

	const computedResult = await result({ message: msgId, process: processId });

	console.log('onRequestComputed', computedResult);

	if (computedResult.Messages.length === 0 && computedResult.Spawns.length === 0 && computedResult.Output.data) {
		throw new Error(computedResult.Output.data);
	}

	if (computedResult.Messages.length === 0 && computedResult.Spawns.length === 0 && computedResult.Error) {
		throw new Error(computedResult.Error);
	}

	return msgId;
}

export interface UpdateSocialsParams {
	FLPId: string;
	'Twitter-Handle': string;
	'Website-URL': string;
	'Telegaram-Handle': string;
}
export async function updateSocials(processId: string, params: UpdateSocialsParams): Promise<string> {
	const tags = [
		{ name: 'Action', value: 'Update-Socials' },
		{ name: 'FLP-Id', value: params.FLPId },
		{ name: 'Twitter-Handle', value: params['Twitter-Handle'] },
		{ name: 'Website-URL', value: params['Website-URL'] },
		{ name: 'Telegaram-Handle', value: params['Telegaram-Handle'] },
	];
	const msgId = await message({
		process: processId,
		signer: createDataItemSigner(window.arweaveWallet),
		tags,
	});

	const computedResult = await result({ message: msgId, process: processId });

	console.log('onRequestComputed', computedResult);

	if (computedResult.Messages.length === 0 && computedResult.Spawns.length === 0 && computedResult.Output.data) {
		throw new Error(computedResult.Output.data);
	}

	if (computedResult.Messages.length === 0 && computedResult.Spawns.length === 0 && computedResult.Error) {
		throw new Error(computedResult.Error);
	}
	return msgId;
}

// -------- Read Queries --------

export async function getFlpId(processId: string, requestId: string): Promise<string> {
	const res = await dryrun({
		process: processId,
		tags: [
			{ name: 'Action', value: 'Get-FLP-Id' },
			{ name: 'Request-Id', value: requestId },
		],
	});
	if (!res.Messages.length) throw new Error('No FLP-Id found');
	const data = JSON.parse(res.Messages[0].Data);
	if (!data['FLP-Id']) throw new Error('No FLP-Id found');
	return data['FLP-Id'];
}

export async function getFlp(processId: string, id: string): Promise<any> {
	try {
		const res = await dryrun({
			process: processId,
			tags: [
				{ name: 'Action', value: 'Get-FLP' },
				{ name: 'Id', value: id },
			],
		});
		if (!res.Messages.length) throw new Error('No FLP found');
		const data = JSON.parse(res.Messages[0].Data);
		if (!data) throw new Error('No FLP found');
		return data;
	} catch (error) {
		console.error('Error fetching FLP:', error);
		throw error;
	}
}

export async function getFlpInfo(processId: string): Promise<any> {
	try {
		const res = await dryrun({
			process: processId,
			tags: [{ name: 'Action', value: 'Info' }],
		});
		if (!res.Messages.length) throw new Error('No FLP Info found');
		const data = flattenTags(res.Messages[0].Tags);
		if (!data) throw new Error('No FLP Info found');
		return data;
	} catch (error) {
		console.error('Error fetching FLP info:', error);
		throw error;
	}
}

export interface DistributionTick {
	AoKept: string;
	AoReceived: string;
	Nonce: number;
	PiReceived: string;
	Timestamp: number;
	TokenPriceInAo: string;
	TokensDistributed: string;
	TriggerMintReportIds: string[];
}

export async function getFlpTickHistory(processId: string): Promise<DistributionTick[]> {
	try {
		const res = await dryrun({
			process: processId,
			tags: [{ name: 'Action', value: 'Get-Yield-Tick-History' }],
		});
		if (!res.Messages.length) throw new Error('No FLP Get-Yield-Tick-History found');
		const data = JSON.parse(res.Messages[0].Data);
		if (!data) throw new Error('No FLP Get-Yield-Tick-History found');

		// Filter out legacy entries (those with YieldCycle field instead of Nonce)
		return data.filter((entry: any) => 'Nonce' in entry && !('YieldCycle' in entry));
	} catch (error) {
		console.error('Error fetching FLP tick history:', error);
		throw error;
	}
}

export async function getFlps(processId: string, statusFilter?: string): Promise<any[]> {
	try {
		const tags = [{ name: 'Action', value: 'Get-FLPs' }];
		if (statusFilter) tags.push({ name: 'Status-Filter', value: statusFilter });
		const res = await dryrun({ process: processId, tags });
		const list = res.Messages.length ? JSON.parse(res.Messages[0].Data) : [];
		console.log('onFlps', list);
		return list;
	} catch (error) {
		console.error('Error fetching FLPs:', error);
		throw error;
	}
}

export async function getRankedFlps(
	processId: string,
	sortBy: string = 'created_at_ts',
	statusFilter?: string,
	limit: number = 10
): Promise<any[]> {
	const tags = [
		{ name: 'Action', value: 'Get-Ranked-FLPs' },
		{ name: 'Sort-By', value: sortBy },
		{ name: 'Limit', value: limit.toString() },
	];
	if (statusFilter) tags.push({ name: 'Status-Filter', value: statusFilter });
	const res = await dryrun({ process: processId, tags });
	const list = res.Messages.length ? JSON.parse(res.Messages[0].Data) : [];
	console.log('onRankedFlps', list);
	return list;
}

export async function getAggregatedStats(processId: string): Promise<any> {
	const res = await dryrun({
		process: processId,
		tags: [{ name: 'Action', value: 'Get-Aggregated-Stats' }],
	});
	if (!res.Messages.length) return null;
	const data = JSON.parse(res.Messages[0].Data);
	console.log('onStats', data);
	return data;
}

interface LastDelegationRecord {
	delegations: Array<{
		Timestamp: number;
		approximateProjectPiYields: Record<string, string>;
		projectYields: Record<string, string>;
		Nonce: string;
	}>;
	summary?: {
		Timestamp: number;
		Nonce: string;
		Data: {
			totalDelegatedAO: string;
			totalPiDelegatedAO: string;
			totalDelegators: string;
			totalDirectDelegators: string;
			totalDirectDelegatedAO: string;
			totalPiDelegators: string;
		};
	};
}

interface DelegationRecord {
	delegations: {
		Data: {
			Nonce: string;
			projectYields: Record<string, string>;
			projectBps: Record<string, string>;
			delegationTable: Record<string, string>;
		};
		Timestamp: number;
		Nonce: string;
	};
	summary?: {
		Timestamp: number;
		Nonce: string;
		Data: {
			totalDelegatedAO: string;
			totalPiDelegatedAO: string;
			totalDelegators: string;
			totalDirectDelegators: string;
			totalDirectDelegatedAO: string;
			totalPiDelegators: string;
		};
	};
}

export async function getLastDelegationRecord(): Promise<LastDelegationRecord | null> {
	const res = await dryrun({
		process: AO.yieldHistorian,
		tags: [{ name: 'Action', value: 'Get-Last-Record' }],
	});
	if (!res.Messages.length) return null;
	const data = JSON.parse(res.Messages[0].Data);
	console.log('onLastDelegationRecord', data);
	return data;
}

export async function getDelegationRecords(): Promise<DelegationRecord[]> {
	const res = await dryrun({
		process: AO.yieldHistorian,
		tags: [
			{ name: 'Action', value: 'Get-Last-N-Records' },
			{ name: 'N', value: '100' },
		],
	});
	if (!res.Messages.length) return null;
	const data = JSON.parse(res.Messages[0].Data);
	console.log('onDelegationRecords', data);
	return data;
}

export interface DelegationPreference {
	walletTo: string;
	factor: number;
}

export interface UserDelegationResponse {
	delegationPrefs: DelegationPreference[];
	lastUpdate: number;
	wallet: string;
	totalFactor: string;
}

export async function getUserDelegations(walletAddress: string): Promise<UserDelegationResponse | null> {
	const res = await dryrun({
		process: AO.delegationOracle,
		tags: [
			{ name: 'Action', value: 'Get-Delegations' },
			{ name: 'Wallet', value: walletAddress },
		],
	});
	if (!res.Messages.length) return null;
	const data = JSON.parse(res.Messages[0].Data);
	console.log('onUserDelegations', data);
	return data;
}

export interface SetDelegationParams {
	walletFrom: string;
	walletTo: string;
	factor: number;
}

export async function setDelegation(params: SetDelegationParams): Promise<string> {
	console.log('Update delegation', params);
	const data = JSON.stringify({
		walletFrom: params.walletFrom,
		walletTo: params.walletTo,
		factor: params.factor,
	});

	const msgId = await message({
		process: AO.delegationOracle,
		signer: createDataItemSigner(window.arweaveWallet),
		data,
		tags: [{ name: 'Action', value: 'Set-Delegation' }],
	});
	console.log('Update delegation msgId', msgId);
	const computedResult = await result({ message: msgId, process: AO.delegationOracle });

	console.log('Update delegation result', computedResult);

	if (computedResult.Messages.length === 0 && computedResult.Spawns.length === 0 && computedResult.Output.data) {
		throw new Error(computedResult.Output.data);
	}

	if (computedResult.Messages.length === 0 && computedResult.Spawns.length === 0 && computedResult.Error) {
		throw new Error(computedResult.Error);
	}

	return msgId;
}

export async function getClaimableBalance(walletAddress: string, flpId: string): Promise<string | null> {
	const res = await dryrun({
		process: flpId,
		tags: [
			{ name: 'Action', value: 'Get-Claimable-Balance' },
			{ name: 'Recipient', value: walletAddress },
		],
	});
	if (!res.Messages.length) return null;
	const data = res.Messages[0].Data;
	console.log('onGetClaimableBalance', data);
	return data;
}

export async function withdrawFLPToken(flpId: string): Promise<string> {
	console.log('Claim rewards', flpId);
	const msgId = await message({
		process: flpId,
		signer: createDataItemSigner(window.arweaveWallet),
		tags: [{ name: 'Action', value: 'Withdraw-FLP-Token' }],
	});
	console.log('Claim rewards msgId', msgId);
	const computedResult = await result({ message: msgId, process: flpId });

	console.log('Claim rewards result', computedResult);

	if (computedResult.Messages.length === 0 && computedResult.Spawns.length === 0 && computedResult.Output.data) {
		throw new Error(computedResult.Output.data);
	}

	if (computedResult.Messages.length === 0 && computedResult.Spawns.length === 0 && computedResult.Error) {
		throw new Error(computedResult.Error);
	}

	const reponseMsg = computedResult.Messages[0];
	const responseStatus = reponseMsg.Tags.find((tag: any) => tag.name === 'Status');

	if (responseStatus?.value === 'Error')
		throw new Error(reponseMsg.Tags.find((tag: any) => tag.name === 'Reason')?.value || reponseMsg.Data);

	return msgId;
}
