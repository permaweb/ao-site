import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { formatEther } from '@ethersproject/units';
import coinbaseWalletModule from '@web3-onboard/coinbase';
import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
// import portisModule from '@web3-onboard/portis';
import torusModule from '@web3-onboard/torus';
import trezorModule from '@web3-onboard/trezor';
import trustModule from '@web3-onboard/trust';
import walletConnectModule from '@web3-onboard/walletconnect';

import gnosisModule from './ethereum/customGnosis';
import { customBrave } from './ethereum/customInjected';

const injected = injectedModule();
const trust = trustModule();
const torus = torusModule();
const coinbaseWalletSdk = coinbaseWalletModule();
const trezor = trezorModule({
	email: '<EMAIL_CONTACT>', // TODO
	appUrl: 'https://ao.arweave.dev',
});
const gnosisSafe = gnosisModule();
const walletConnect = walletConnectModule({
	projectId: '1854ae39b9f92e1c56b858cb425e9a7e',
});
const brave = () => customBrave;
// const portis = portisModule({
// 	apiKey: '<API_KEY>', // TODO
// });

const wallets = [
	injected,
	trust,
	coinbaseWalletSdk,
	torus,
	walletConnect,
	trezor,
	gnosisSafe,
	brave,
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
		recommendedInjectedWallets: [
			{ name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
			{ name: 'MetaMask', url: 'https://metamask.io' },
			{ name: 'Brave Wallet', url: 'https://brave.com/wallet/' },
		],
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

	// Subscribe to wallet address changes
	useEffect(() => {
		if (walletAddress === null) return;

		const wallets = onboard.state.select('wallets');
		const { unsubscribe } = wallets.subscribe(async (update) => {
			const [primaryWallet] = update;
			if (primaryWallet) {
				const success = await onboard.setChain({ chainId: '0x1' });
				if (!success) return;

				const provider = new Web3Provider(primaryWallet.provider);
				const signer = provider.getSigner();
				const address = await signer.getAddress();
				setWalletAddress(address);

				const balance = await signer.getBalance();
				setBalance(formatEther(balance));
			} else {
				setWalletAddress(null);
				setBalance(null);
			}
		});

		return () => {
			try {
				unsubscribe();
			} catch {}
		};
	}, [walletAddress]);

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
