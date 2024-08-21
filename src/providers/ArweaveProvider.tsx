import React from 'react';

import { ArweaveWebWallet } from 'arweave-wallet-connector';

import { Modal } from 'components/molecules/Modal';
import { AR_WALLETS, ASSETS, WALLET_PERMISSIONS } from 'helpers/config';
import { getARBalanceEndpoint } from 'helpers/endpoints';
import { ArWalletEnum } from 'helpers/types';
import Othent from 'helpers/wallet';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

interface ArweaveContextState {
	wallets: { type: ArWalletEnum; logo: string }[];
	wallet: any;
	walletAddress: string | null;
	walletType: ArWalletEnum | null;
	balance: number | string | null;
	handleConnect: any;
	handleDisconnect: () => void;
	walletModalVisible: boolean;
	setWalletModalVisible: (open: boolean) => void;
}

interface ArweaveProviderProps {
	children: React.ReactNode;
}

const DEFAULT_CONTEXT = {
	wallets: [],
	wallet: null,
	walletAddress: null,
	walletType: null,
	balance: null,
	handleConnect() {},
	handleDisconnect() {},
	walletModalVisible: false,
	setWalletModalVisible(_open: boolean) {},
	profile: null,
	toggleProfileUpdate: false,
	setToggleProfileUpdate(_toggleUpdate: boolean) {},
};

const ARContext = React.createContext<ArweaveContextState>(DEFAULT_CONTEXT);

export function useArweaveProvider(): ArweaveContextState {
	return React.useContext(ARContext);
}

function WalletList(props: { handleConnect: any }) {
	return (
		<S.WalletListContainer>
			{AR_WALLETS.map((wallet: any, index: number) => (
				<S.WalletListItem
					key={index}
					onClick={() => props.handleConnect(wallet.type)}
					className={'border-wrapper-alt2'}
				>
					{wallet.logo && <img src={`${wallet.logo}`} alt={''} />}
					<span>{wallet.type.charAt(0).toUpperCase() + wallet.type.slice(1)}</span>
				</S.WalletListItem>
			))}
		</S.WalletListContainer>
	);
}

export function ArweaveProvider(props: ArweaveProviderProps) {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const wallets = AR_WALLETS;

	const [wallet, setWallet] = React.useState<any>(null);
	const [walletType, setWalletType] = React.useState<ArWalletEnum | null>(null);
	const [walletModalVisible, setWalletModalVisible] = React.useState<boolean>(false);
	const [walletAddress, setWalletAddress] = React.useState<string | null>(null);

	const [balance, setBalance] = React.useState<number | string | null>(null);

	React.useEffect(() => {
		(async function () {
			await handleWallet();
		})();
	}, []);

	React.useEffect(() => {
		handleWallet();

		window.addEventListener('arweaveWalletLoaded', handleWallet);

		return () => {
			window.removeEventListener('arweaveWalletLoaded', handleWallet);
		};
	}, [walletType]);

	React.useEffect(() => {
		(async function () {
			if (walletAddress) {
				try {
					setBalance(await getARBalance(walletAddress));
				} catch (e: any) {
					console.error(e);
				}
			}
		})();
	}, [walletAddress]);

	async function handleWallet() {
		if (localStorage.getItem('walletType')) {
			try {
				await handleConnect(localStorage.getItem('walletType') as any);
			} catch (e: any) {
				console.error(e);
			}
		}
	}

	async function handleConnect(walletType: ArWalletEnum.arConnect | ArWalletEnum.othent | ArWalletEnum.arweaveApp) {
		let walletObj: any = null;
		switch (walletType) {
			case ArWalletEnum.arConnect:
				handleArConnect();
				break;
			case ArWalletEnum.othent:
				handleOthent();
				break;
			case ArWalletEnum.arweaveApp:
				handleArweaveApp();
				break;
			default:
				if (window.arweaveWallet || walletType === ArWalletEnum.arConnect) {
					handleArConnect();
					break;
				}
		}
		setWalletModalVisible(false);
		return walletObj;
	}

	async function handleArConnect() {
		if (!walletAddress) {
			if (window.arweaveWallet) {
				try {
					await global.window?.arweaveWallet?.connect(WALLET_PERMISSIONS as any);
					setWalletAddress(await global.window.arweaveWallet.getActiveAddress());
					setWallet(window.arweaveWallet);
					setWalletType(ArWalletEnum.arConnect);
					setWalletModalVisible(false);
					localStorage.setItem('walletType', ArWalletEnum.arConnect);
				} catch (e: any) {
					console.error(e);
				}
			}
		}
	}

	async function handleOthent() {
		Othent.init();
		await window.arweaveWallet.connect(WALLET_PERMISSIONS as any);
		setWallet(window.arweaveWallet);
		setWalletAddress(Othent.getUserInfo().walletAddress);
		setWalletType(ArWalletEnum.othent);
		localStorage.setItem('walletType', ArWalletEnum.othent);
	}

	async function handleArweaveApp() {
		try {
			const wallet = new ArweaveWebWallet({
				name: language.appName,
				logo: ASSETS.arweaveApp,
			});
			wallet.setUrl(ArWalletEnum.arweaveApp);
			await wallet.connect();
			wallet.on('disconnect', () => {
				setWallet(null);
				setWalletAddress(null);
				if (localStorage.getItem('walletType')) localStorage.removeItem('walletType');
			});
			setWalletAddress(await global.window.arweaveWallet.getActiveAddress());
			setWallet(wallet);
			setWalletType(ArWalletEnum.arweaveApp);
			localStorage.setItem('walletType', ArWalletEnum.arweaveApp);
		} catch (e: any) {
			console.error('Arweave.app connection failure', e);
		}
	}

	async function handleDisconnect() {
		try {
			setWallet(null);
			setWalletAddress(null);
			if (localStorage.getItem('walletType')) localStorage.removeItem('walletType');
			await global.window?.arweaveWallet?.disconnect();
		} catch (e: any) {
			console.error('ArweaveProvider disconnect error', e);
		}
	}

	async function getARBalance(walletAddress: string) {
		try {
			const rawBalance = await fetch(getARBalanceEndpoint(walletAddress));
			const jsonBalance = await rawBalance.json();
			return jsonBalance / 1e12;
		} catch (e: any) {
			return 'Error';
		}
	}

	return (
		<>
			{walletModalVisible && (
				<Modal header={language.connectWallet} handleClose={() => setWalletModalVisible(false)}>
					<WalletList handleConnect={handleConnect} />
				</Modal>
			)}
			<ARContext.Provider
				value={{
					wallet,
					walletAddress,
					walletType,
					balance,
					handleConnect,
					handleDisconnect,
					wallets,
					walletModalVisible,
					setWalletModalVisible,
				}}
			>
				{props.children}
			</ARContext.Provider>
		</>
	);
}
