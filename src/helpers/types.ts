export enum ArWalletEnum {
	arConnect = 'arconnect',
	othent = 'othent',
	arweaveApp = 'arweave.app',
}

export enum EthWalletEnum {
	metamask = 'MetaMask',
	walletConnect = 'WalletConnect',
	rabby = 'Rabby',
}

export type SelectOptionType = { id: string; label: string };

export type FormFieldType = 'number' | 'password';

export type ValidationType = {
	status: boolean;
	message: string | null;
};

export type TagType = { name: string; value: string };
