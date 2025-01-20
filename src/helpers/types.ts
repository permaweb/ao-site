import React from 'react';

export type AllocationTokenType = 'pi' | 'ao' | 'arweave';

export type AllocationTokenSummaryType = { label: string; value: number | null };

export type TokenEarningsType = 'arweave' | 'stEth' | 'dai';

export type TokenBigIntType = { value: bigint | null; display: string | null };

export type TokenDepositType = {
	balance: TokenBigIntType;
	deposited: TokenBigIntType;
};

export type EthTotalDepositedType = {
	stEth: TokenBigIntType;
	dai: TokenBigIntType;
};

export type EthTokensType = {
	stEth: TokenDepositType;
	dai: TokenDepositType;
};

export type EthTokensYieldProjectionsType = {
	stEth: {
		monthly: TokenProjectionType;
		yearly: TokenProjectionType;
	};
	dai: {
		monthly: TokenProjectionType;
		yearly: TokenProjectionType;
	};
};

export type TokenProjectionType = { amount: number; ratio: number };

export type TokenYieldProjectionsType = {
	monthly: TokenProjectionType;
	yearly: TokenProjectionType;
};

export enum ArWalletEnum {
	arConnect = 'arConnect',
	othent = 'othent',
	arweaveApp = 'arweave.app',
}

export enum EthWalletEnum {
	metamask = 'MetaMask',
	walletConnect = 'WalletConnect',
	rabby = 'Rabby',
}

export type SelectOptionType = { id: string; label: string; icon?: React.ReactNode };

export type FormFieldType = 'number' | 'password';

export type ValidationType = {
	status: boolean;
	message: string | null;
};

export type TagType = { name: string; value: string };

export type ButtonType = 'primary' | 'alt1' | 'alt2' | 'alt3' | 'alt4' | 'indicator' | 'warning';
