import React from 'react';

export type AllocationTokenType = 'pi' | 'ao' | 'arweave';

export type DefaultTokenEarningsType = 'ao' | 'arweave';

export type BridgeTokenEarningsType = EthTokenEnum.StEth | EthTokenEnum.DAI | EthTokenEnum.USDS;

export enum EthTokenEnum {
	StEth = 'stEth',
	DAI = 'dai',
	USDS = 'usds',
}

export type EthExchangeType = 'convert' | 'deposit' | 'withdraw';

export type TokenBigIntType = { value: bigint | null; display: string | null };

export type TokenDepositType = {
	balance: TokenBigIntType;
	deposited: TokenBigIntType & { lastStake: bigint };
};

export type EthTotalDepositedType = {
	[EthTokenEnum.StEth]: TokenBigIntType;
	[EthTokenEnum.DAI]: TokenBigIntType;
	[EthTokenEnum.USDS]: TokenBigIntType;
	usdTotal: TokenBigIntType;
};

export type EthTokensType = {
	[EthTokenEnum.StEth]: TokenDepositType;
	[EthTokenEnum.DAI]: TokenDepositType;
	[EthTokenEnum.USDS]: TokenDepositType;
};

export type EthTokensYieldProjectionsType = {
	[EthTokenEnum.StEth]: {
		price: number;
		monthly: TokenProjectionType;
		yearly: TokenProjectionType;
	};
	[EthTokenEnum.DAI]: {
		price: number;
		monthly: TokenProjectionType;
		yearly: TokenProjectionType;
	};
	[EthTokenEnum.USDS]: {
		price: number;
		monthly: TokenProjectionType;
		yearly: TokenProjectionType;
	};
};

export type TokenProjectionType = { amount: number; ratio: number };

export type TokenYieldProjectionsType = {
	monthly: TokenProjectionType;
	yearly: TokenProjectionType;
};

export type AllocationTokenRecordType = {
	id: string;
	label: string;
};

export type AllocationRecordType = AllocationTokenRecordType & { value: number };

export enum ArWalletEnum {
	arConnect = 'arConnect',
	othent = 'othent',
	arweaveApp = 'arweave.app',
	wander = 'wander',
}

export type SelectOptionType = { id: string; label: string; icon?: React.ReactNode };

export type FormFieldType = 'number' | 'password';

export type ValidationType = {
	status: boolean;
	message: string | null;
};

export type TagType = { name: string; value: string };

export type ButtonType = 'primary' | 'alt1' | 'alt2' | 'alt3' | 'alt4' | 'indicator' | 'warning';

export type NotificationType = { message: string | null; status: 'success' | 'warning' };

export type MetricDataPoint = {
	active_processes_over_blocks: number;
	active_users_over_blocks: number;
	day: string;
	evals: number;
	modules_roll: number;
	new_modules_over_blocks: number;
	new_processes_over_blocks: number;
	processed_blocks: number;
	processes_roll: number;
	transfers: number;
	txs: number;
	txs_roll: number;
};

export enum AOPhase {
	Testnet = 'Testnet',
	MainnetEarly = 'Mainnet Early',
	Mainnet = 'Mainnet',
}

export enum AONetworkStatus {
	Live = 'Live',
}
