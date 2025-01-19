import React from 'react';

export type AllocationTokenType = 'pi' | 'ao' | 'arweave';

export type AllocationTokenSummaryType = { label: string; value: number | null };

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
