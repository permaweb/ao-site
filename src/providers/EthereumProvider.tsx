import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { formatEther } from '@ethersproject/units';
import coinbaseWalletModule from '@web3-onboard/coinbase';
import Onboard from '@web3-onboard/core';
// import gnosisSafeModule from '@web3-onboard/gnosis';
import injectedModule from '@web3-onboard/injected-wallets';
// import portisModule from '@web3-onboard/portis';
import torusModule from '@web3-onboard/torus';
// import trezorModule from '@web3-onboard/trezor';
import trustModule from '@web3-onboard/trust';
// import walletConnectModule from '@web3-onboard/walletconnect';

const injected = injectedModule();
const trust = trustModule();
const torus = torusModule();
const coinbaseWalletSdk = coinbaseWalletModule();
// const walletConnect = walletConnectModule({
// 	projectId: '<PROJECT_ID>', // TODO
// });
// const trezor = trezorModule({
// 	email: '<EMAIL_CONTACT>', // TODO
// 	appUrl: '<APP_URL>', // TODO
// });
// const gnosisSafe = gnosisSafeModule({
// 	whitelistedDomains: [new RegExp('^http://localhost:3000$')], // TODO
// });
// const portis = portisModule({
// 	apiKey: '<API_KEY>', // TODO
// });

const wallets = [
	injected,
	trust,
	coinbaseWalletSdk,
	torus,
	// walletConnect,
	// trezor,
	// gnosisSafe,
	// portis,
];

const onboard = Onboard({
	wallets,
	chains: [
		{
			id: '0x1', // Chain ID in hexadecimal for Ethereum Mainnet
			token: 'ETH',
			label: 'Ethereum Mainnet',
			// rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID', // Replace with your Infura project ID or use a public RPC URL
		},
	],
	appMetadata: {
		name: 'AO',
		icon: '/images/ao_black.svg',
		logo: '/images/ao_black.svg',
		description: 'AO Staking',
	},
	connect: {
		autoConnectLastWallet: true,
	},
	accountCenter: {
		desktop: {
			enabled: false,
		},
		mobile: {
			enabled: false,
		},
	},
});

interface EthereumContextState {
	walletAddress: string | null;
	balance: string | null;
	handleConnect: (walletType: string) => void;
	handleDisconnect: () => void;
	walletModalVisible: boolean;
	setWalletModalVisible: (open: boolean) => void;
	errorMessage: string | null;
}

interface EthereumProviderProps {
	children: React.ReactNode;
}

const DEFAULT_CONTEXT: EthereumContextState = {
	walletAddress: null,
	balance: null,
	handleConnect: () => {},
	handleDisconnect: () => {},
	walletModalVisible: false,
	setWalletModalVisible: () => {},
	errorMessage: null,
};

const EthereumContext = createContext<EthereumContextState>(DEFAULT_CONTEXT);

export const useEthereumProvider = () => useContext(EthereumContext);

export function EthereumProvider({ children }: EthereumProviderProps) {
	const [walletAddress, setWalletAddress] = useState<string | null>(null);
	const [balance, setBalance] = useState<string | null>(null);
	const [walletModalVisible, setWalletModalVisible] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const recoverConnection = useCallback(async () => {
		const [primaryWallet] = onboard.state.get().wallets;
		if (primaryWallet) {
			const success = await onboard.setChain({ chainId: '0x1' });
			if (!success) return;

			const provider = new Web3Provider(primaryWallet.provider);
			const signer = provider.getSigner();
			const address = await signer.getAddress();
			setWalletAddress(address);

			const balance = await signer.getBalance();
			setBalance(formatEther(balance));
		}
	}, []);

	useEffect(() => {
		recoverConnection();
	}, []);

	const handleConnect = async () => {
		try {
			const [primaryWallet] = await onboard.connectWallet();
			if (!primaryWallet) throw new Error('No wallet selected');

			const success = await onboard.setChain({ chainId: '0x1' });
			if (!success) throw new Error('Please switch to Ethereum Mainnet');

			const provider = new Web3Provider(primaryWallet.provider);
			const signer = provider.getSigner();
			const address = await signer.getAddress();
			setWalletAddress(address);

			const balance = await signer.getBalance();
			setBalance(formatEther(balance));

			setWalletModalVisible(false);
		} catch (error) {
			setErrorMessage(error.message);
			setWalletAddress(null);
			setBalance(null);
		}

		setWalletModalVisible(false);
	};

	const handleDisconnect = async () => {
		const [primaryWallet] = onboard.state.get().wallets;
		if (primaryWallet) {
			try {
				await onboard.disconnectWallet({ label: primaryWallet.label });
			} finally {
				setWalletAddress(null);
				setBalance(null);
			}
		}
	};

	useEffect(() => {
		if (walletModalVisible) {
			handleConnect();
		}
	}, [walletModalVisible]);

	return (
		<>
			<EthereumContext.Provider
				value={{
					walletAddress,
					balance,
					handleConnect,
					handleDisconnect,
					walletModalVisible,
					setWalletModalVisible,
					errorMessage,
				}}
			>
				{children}
			</EthereumContext.Provider>
		</>
	);
}
