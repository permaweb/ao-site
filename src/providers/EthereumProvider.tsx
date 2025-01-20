import React from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { formatEther } from '@ethersproject/units';
import coinbaseWalletModule from '@web3-onboard/coinbase';
import Onboard, { EIP1193Provider } from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import torusModule from '@web3-onboard/torus';
import trezorModule from '@web3-onboard/trezor';
import trustModule from '@web3-onboard/trust';
import walletConnectModule from '@web3-onboard/walletconnect';
import Web3 from 'web3';

import { readHandler } from 'api';

import {
	AO,
	ASSETS,
	DaiBridge_ABI,
	ENDPOINTS,
	Erc20_ABI,
	ETH_CONTRACTS,
	ETH_TOKEN_DENOMINATION,
	StEthBridge_ABI,
} from 'helpers/config';
import gnosisModule from 'helpers/customGnosis';
import { customBrave } from 'helpers/customInjected';
import { EthTokensType, EthTokensYieldProjectionsType, EthTotalDepositedType } from 'helpers/types';
import { formatDisplayAmount, getDaiReward, getEthReward } from 'helpers/utils';

import { useAOProvider } from './AOProvider';

const injected = injectedModule();
const trust = trustModule();
const torus = torusModule();
const coinbaseWalletSdk = coinbaseWalletModule();
const trezor = trezorModule({
	email: 'team@arweave.org',
	appUrl: 'https://ao.arweave.net',
});
const gnosisSafe = gnosisModule();
const walletConnect = walletConnectModule({
	projectId: '1854ae39b9f92e1c56b858cb425e9a7e',
});
const brave = () => customBrave;

const wallets = [injected, trust, coinbaseWalletSdk, torus, walletConnect, trezor, gnosisSafe, brave];

const onboard = Onboard({
	wallets,
	chains: [
		{
			id: '0x1',
			token: 'ETH',
			label: 'Ethereum Mainnet',
			rpcUrl: ENDPOINTS.mainnetRpc,
		},
	],
	appMetadata: {
		name: 'AO',
		icon: ASSETS.ao,
		logo: ASSETS.ao,
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
	tokens: EthTokensType | null;
	projections: EthTokensYieldProjectionsType | null;
	totalDeposited: EthTotalDepositedType | null;
	handleConnect: (walletType: string) => void;
	handleDisconnect: () => void;
	walletModalVisible: boolean;
	setWalletModalVisible: (open: boolean) => void;
	errorMessage: string | null;
	web3Provider: EIP1193Provider | null;
	ensureMainnet: () => Promise<void>;
}

interface EthereumProviderProps {
	children: React.ReactNode;
}

const DEFAULT_CONTEXT: EthereumContextState = {
	walletAddress: null,
	balance: null,
	tokens: null,
	projections: null,
	totalDeposited: null,
	handleConnect: () => {},
	handleDisconnect: () => {},
	walletModalVisible: false,
	setWalletModalVisible: () => {},
	errorMessage: null,
	web3Provider: null,
	ensureMainnet: () => Promise.resolve(),
};

const EthereumContext = React.createContext<EthereumContextState>(DEFAULT_CONTEXT);

export const useEthereumProvider = () => React.useContext(EthereumContext);

export function EthereumProvider(props: EthereumProviderProps) {
	const aoProvider = useAOProvider();

	const [walletAddress, setWalletAddress] = React.useState<string | null>(null);
	const [balance, setBalance] = React.useState<string | null>(null);
	const [projections, setProjections] = React.useState<EthTokensYieldProjectionsType | null>(null);
	const [tokens, setTokens] = React.useState<EthTokensType | null>(null);
	const [totalDeposited, setTotalDeposited] = React.useState<EthTotalDepositedType | null>(null);
	const [walletModalVisible, setWalletModalVisible] = React.useState<boolean>(false);
	const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
	const [web3Provider, setWeb3Provider] = React.useState<EIP1193Provider | null>(null);

	React.useEffect(() => {
		setTimeout(() => {
			recoverConnection();
		}, 500);
	}, []);

	React.useEffect(() => {
		if (walletModalVisible) {
			handleConnect();
		}
	}, [walletModalVisible]);

	// Subscribe to wallet address changes
	React.useEffect(() => {
		if (walletAddress === null) return;

		const wallets = onboard.state.select('wallets');
		const { unsubscribe } = wallets.subscribe(async (update) => {
			const [primaryWallet] = update;
			if (primaryWallet) {
				const success = await onboard.setChain({ chainId: '0x1' });
				if (!success) return;

				setWeb3Provider(primaryWallet.provider);
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

	/* StETH - DAI Total Deposited */
	React.useEffect(() => {
		(async function () {
			try {
				const web3 = new Web3(ENDPOINTS.mainnetRpc);
				const stEthBridgeContract = new web3.eth.Contract(StEthBridge_ABI, ETH_CONTRACTS.stEthBridge);
				const daiBridgeContract = new web3.eth.Contract(DaiBridge_ABI, ETH_CONTRACTS.daiBridge);

				let [totalStEthDeposited, totalDaiDeposited] = await Promise.all([
					stEthBridgeContract.methods.totalDepositedInPublicPools().call() as any,
					daiBridgeContract.methods.totalDepositedInPublicPools().call() as any,
				]);

				totalStEthDeposited = Number(totalStEthDeposited) / Math.pow(10, 18);
				totalDaiDeposited = Number(totalDaiDeposited) / Math.pow(10, 18);

				if (isNaN(totalStEthDeposited)) throw new Error('Invalid totalStEthDeposited');
				if (isNaN(totalDaiDeposited)) throw new Error('Invalid totalDaiDeposited');

				setTotalDeposited({
					stEth: { value: totalStEthDeposited, display: formatDisplayAmount(totalStEthDeposited.toFixed(2)) },
					dai: { value: totalDaiDeposited, display: formatDisplayAmount(totalDaiDeposited.toFixed(2)) },
				});
			} catch (e: any) {
				console.error(e);
			}
		})();
	}, []);

	/* StETH - DAI Balance and Deposited */
	React.useEffect(() => {
		(async function () {
			if (walletAddress && web3Provider) {
				try {
					const web3 = new Web3(web3Provider);

					const stEthContract = new web3.eth.Contract(Erc20_ABI, ETH_CONTRACTS.stEth);
					const stEthBridgeContract = new web3.eth.Contract(StEthBridge_ABI, ETH_CONTRACTS.stEthBridge);

					const daiContract = new web3.eth.Contract(Erc20_ABI, ETH_CONTRACTS.dai);
					const daiBridgeContract = new web3.eth.Contract(DaiBridge_ABI, ETH_CONTRACTS.daiBridge);

					const stEthBalanceOf = (await stEthContract.methods.balanceOf(walletAddress).call()) as any as bigint;
					const stEthUsersData = ((await stEthBridgeContract.methods.usersData(walletAddress, 0).call()) as any)
						.deposited as bigint;

					const daiBalanceOf = (await daiContract.methods.balanceOf(walletAddress).call()) as any as bigint;
					const daiUsersData = ((await daiBridgeContract.methods.usersData(walletAddress, 0).call()) as any)
						.deposited as bigint;

					setTokens((prev) => ({
						...prev,
						stEth: {
							balance: {
								value: stEthBalanceOf,
								display: formatDisplayAmount(Web3.utils.fromWei(stEthBalanceOf, 'ether')),
							},
							deposited: {
								value: stEthUsersData,
								display: formatDisplayAmount(Web3.utils.fromWei(stEthUsersData, 'ether')),
							},
						},
						dai: {
							balance: {
								value: daiBalanceOf,
								display: formatDisplayAmount(Web3.utils.fromWei(daiBalanceOf, 'ether')),
							},
							deposited: {
								value: daiUsersData,
								display: formatDisplayAmount(Web3.utils.fromWei(daiUsersData, 'ether')),
							},
						},
					}));
				} catch (e: any) {
					console.error(e);
				}
			}
		})();
	}, [walletAddress, web3Provider, totalDeposited]);

	React.useEffect(() => {
		(async function () {
			if (walletAddress && balance && tokens && totalDeposited && aoProvider.mintedSupply && web3Provider) {
				try {
					const [daiResp, stEthResp] = await Promise.all([
						readHandler({
							processId: AO.daiPriceOracle,
							action: 'Info',
						}),
						readHandler({
							processId: AO.stEthPriceOracle,
							action: 'Info',
						}),
					]);

					const daiPrice = Number(daiResp.LastPrice) / 10000;
					const daiYield = Number(daiResp.LastYield) / 10000;
					const stEthPrice = Number(stEthResp.LastPrice) / 10000;
					const stEthYield = Number(stEthResp.LastYield) / 10000;

					const totalDepositedSteth = Number(totalDeposited?.stEth?.value ?? BigInt(0));
					const totalDepositedDai = Number(totalDeposited?.dai?.value ?? BigInt(0));

					const ethReward = (days: number, amount: number) => {
						return getEthReward(
							days,
							amount,
							aoProvider.mintedSupply,
							totalDepositedSteth,
							totalDepositedDai,
							stEthPrice,
							stEthYield,
							daiPrice,
							daiYield
						);
					};

					const daiReward = (days: number, amount: number) => {
						return getDaiReward(
							days,
							amount,
							aoProvider.mintedSupply,
							totalDepositedSteth,
							totalDepositedDai,
							stEthPrice,
							stEthYield,
							daiPrice,
							daiYield
						);
					};

					setProjections({
						stEth: {
							monthly: {
								amount: ethReward(30, Number(tokens.stEth?.deposited?.value ?? BigInt(0)) / ETH_TOKEN_DENOMINATION),
								ratio: ethReward(30, 1),
							},
							yearly: {
								amount: ethReward(365, Number(tokens.stEth?.deposited?.value ?? BigInt(0)) / ETH_TOKEN_DENOMINATION),
								ratio: ethReward(365, 1),
							},
						},
						dai: {
							monthly: {
								amount: daiReward(30, Number(tokens.dai?.deposited?.value ?? BigInt(0)) / ETH_TOKEN_DENOMINATION),
								ratio: daiReward(30, 1),
							},
							yearly: {
								amount: daiReward(365, Number(tokens.dai?.deposited?.value ?? BigInt(0)) / ETH_TOKEN_DENOMINATION),
								ratio: daiReward(365, 1),
							},
						},
					});
				} catch (e: any) {
					console.error(e);
				}
			}
		})();
	}, [walletAddress, balance, tokens, totalDeposited, aoProvider.mintedSupply, web3Provider]);

	const handleConnect = async () => {
		try {
			const [primaryWallet] = await onboard.connectWallet();
			if (!primaryWallet) throw new Error('No wallet selected');

			const success = await onboard.setChain({ chainId: '0x1' });
			if (!success) throw new Error('Please switch to Ethereum Mainnet');

			setWeb3Provider(primaryWallet.provider);
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

	const recoverConnection = React.useCallback(async () => {
		const [primaryWallet] = onboard.state.get().wallets;
		if (primaryWallet) {
			const success = await onboard.setChain({ chainId: '0x1' });
			if (!success) return;

			setWeb3Provider(primaryWallet.provider);
			const provider = new Web3Provider(primaryWallet.provider);
			const signer = provider.getSigner();
			const address = await signer.getAddress();
			setWalletAddress(address);

			const balance = await signer.getBalance();
			setBalance(formatEther(balance));
		}
	}, []);

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

	const ensureMainnet = React.useCallback(async () => {
		const [primaryWallet] = onboard.state.get().wallets;
		if (primaryWallet) {
			const success = await onboard.setChain({ chainId: '0x1' });
			if (!success) throw new Error('Please switch to Ethereum Mainnet');
		}
	}, []);

	return (
		<>
			<EthereumContext.Provider
				value={{
					walletAddress,
					balance,
					tokens,
					projections,
					totalDeposited,
					handleConnect,
					handleDisconnect,
					walletModalVisible,
					setWalletModalVisible,
					errorMessage,
					web3Provider,
					ensureMainnet,
				}}
			>
				{props.children}
			</EthereumContext.Provider>
		</>
	);
}
