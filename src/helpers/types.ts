import React from 'react';

export type AllocationTokenType = 'pi' | 'ao' | 'arweave';

export type TokenEarningsType = 'ao' | 'arweave' | EthTokenEnum.StEth | EthTokenEnum.DAI;

export enum EthTokenEnum {
	StEth = 'stEth',
	DAI = 'dai',
}

export type EthExchangeType = 'deposit' | 'withdraw';

export type TokenBigIntType = { value: bigint | null; display: string | null };

export type TokenDepositType = {
	balance: TokenBigIntType;
	deposited: TokenBigIntType & { lastStake: bigint };
};

export type EthTotalDepositedType = {
	[EthTokenEnum.StEth]: TokenBigIntType;
	[EthTokenEnum.DAI]: TokenBigIntType;
	usdTotal: TokenBigIntType;
};

export type EthTokensType = {
	[EthTokenEnum.StEth]: TokenDepositType;
	[EthTokenEnum.DAI]: TokenDepositType;
};

export type EthTokensYieldProjectionsType = {
	[EthTokenEnum.StEth]: {
		monthly: TokenProjectionType;
		yearly: TokenProjectionType;
	};
	[EthTokenEnum.DAI]: {
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
