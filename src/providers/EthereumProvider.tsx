import { Web3Provider } from '@ethersproject/providers';
import { formatEther } from '@ethersproject/units';
import coinbaseWalletModule from '@web3-onboard/coinbase';
import Onboard, { EIP1193Provider } from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import torusModule from '@web3-onboard/torus';
import trezorModule from '@web3-onboard/trezor';
import trustModule from '@web3-onboard/trust';
import walletConnectModule from '@web3-onboard/walletconnect';
import { readProcess } from 'api';
import React from 'react';
import Web3, { EventLog } from 'web3';

import {
  ASSETS,
  DaiBridge_ABI,
  ENDPOINTS,
  Erc20_ABI,
  ETH_CONTRACTS,
  ETH_TOKEN_DENOMINATION,
  HB,
  PATCH_MAP,
  PRICE_FEED_ABI,
  StEthBridge_ABI,
  UsdsBridge_ABI,
} from 'helpers/config';
import gnosisModule from 'helpers/customGnosis';
import { customBrave } from 'helpers/customInjected';
import { EthTokensType, EthTokensYieldProjectionsType, EthTotalDepositedType } from 'helpers/types';
import {
  checkValidAddress,
  evmBytesToArweaveAddress,
  formatDisplayAmount,
  formatUSDAmount,
  getAoPrice,
  getDaiReward,
  getEthReward,
  getUsdsReward,
} from 'helpers/utils';

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
  connecting: boolean;
  balance: string | null;
  tokens: EthTokensType | null;
  refreshTokens: () => void;
  projections: EthTokensYieldProjectionsType | null;
  totalDeposited: EthTotalDepositedType | null;
  handleConnect: (walletType: string) => void;
  handleDisconnect: () => void;
  walletModalVisible: boolean;
  setWalletModalVisible: (open: boolean) => void;
  errorMessage: string | null;
  web3Provider: EIP1193Provider | null;
  ensureMainnet: () => Promise<void>;
  aoPrice: number | null;
  lastArweaveAddress: string | null;
}

interface EthereumProviderProps {
  children: React.ReactNode;
}

const DEFAULT_CONTEXT: EthereumContextState = {
  walletAddress: null,
  connecting: false,
  balance: null,
  tokens: null,
  refreshTokens: () => {},
  projections: null,
  totalDeposited: null,
  handleConnect: () => {},
  handleDisconnect: () => {},
  walletModalVisible: false,
  setWalletModalVisible: () => {},
  errorMessage: null,
  web3Provider: null,
  ensureMainnet: () => Promise.resolve(),
  aoPrice: null,
  lastArweaveAddress: null,
};

const EthereumContext = React.createContext<EthereumContextState>(DEFAULT_CONTEXT);

export const useEthereumProvider = () => React.useContext(EthereumContext);

export function EthereumProvider(props: EthereumProviderProps) {
  const aoProvider = useAOProvider();

  // Suppress ENS reverse lookup errors from Web3-Onboard
  React.useEffect(() => {
    const originalError = console.error;
    console.error = (...args: any[]) => {
      const errorMessage = args[0]?.toString() || '';
      // Filter out ENS reverse lookup errors
      if (
        errorMessage.includes('ContractFunctionExecutionError') &&
        errorMessage.includes('reverse') &&
        errorMessage.includes('Internal error')
      ) {
        return; // Suppress this specific error
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  const [walletAddress, setWalletAddress] = React.useState<string | null>(null);
  const [balance, setBalance] = React.useState<string | null>(null);
  const [projections, setProjections] = React.useState<EthTokensYieldProjectionsType | null>(null);
  const [tokens, setTokens] = React.useState<EthTokensType | null>(null);
  const [tokenRefreshTrigger, setTokenRefreshTrigger] = React.useState<boolean | null>(null);
  const [totalDeposited, setTotalDeposited] = React.useState<EthTotalDepositedType | null>(null);
  const [walletModalVisible, setWalletModalVisible] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [web3Provider, setWeb3Provider] = React.useState<EIP1193Provider | null>(null);
  const [aoPrice, setAoPrice] = React.useState<number | null>(null);
  const [lastArweaveAddress, setLastArweaveAddress] = React.useState<string | null>(null);

  const [connecting, setConnecting] = React.useState<boolean>(false);
  const [disconnected, setDisconnected] = React.useState(false);

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

  /* Subscribe to wallet address changes */
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

  /* StETH - DAI - USDS Total Deposited */
  React.useEffect(() => {
    (async function () {
      try {
        const web3 = new Web3(ENDPOINTS.mainnetRpc);
        const stEthBridgeContract = new web3.eth.Contract(StEthBridge_ABI, ETH_CONTRACTS.stEthBridge);
        const daiBridgeContract = new web3.eth.Contract(DaiBridge_ABI, ETH_CONTRACTS.daiBridge);
        const usdsBridgeContract = new web3.eth.Contract(UsdsBridge_ABI, ETH_CONTRACTS.usdsBridge);

        let [totalStEthDeposited, totalDaiDeposited, totalUsdsDeposited] = await Promise.all([
          stEthBridgeContract.methods.totalDepositedInPublicPools().call() as any,
          daiBridgeContract.methods.totalDepositedInPublicPools().call() as any,
          usdsBridgeContract.methods.totalDepositedInVault().call() as any,
        ]);

        totalStEthDeposited = Number(totalStEthDeposited) / Math.pow(10, 18);
        totalDaiDeposited = Number(totalDaiDeposited) / Math.pow(10, 18);
        totalUsdsDeposited = Number(totalUsdsDeposited) / Math.pow(10, 18);

        if (isNaN(totalStEthDeposited)) throw new Error('Invalid totalStEthDeposited');
        if (isNaN(totalDaiDeposited)) throw new Error('Invalid totalDaiDeposited');
        if (isNaN(totalUsdsDeposited)) throw new Error('Invalid totalUsdsDeposited');

        const ethUsdFeed = new web3.eth.Contract(PRICE_FEED_ABI, ETH_CONTRACTS.ethUsdPriceFeed);

        const ethUsdPriceData = await ethUsdFeed.methods.latestRoundData().call();

        const ethUsdPrice = (ethUsdPriceData as any).answer / BigInt(Math.pow(10, 8));
        const daiUsdPrice = 1;
        const usdsUsdPrice = 1;

        const usdStEthValue = BigInt(Math.floor(totalStEthDeposited)) * BigInt(ethUsdPrice);
        const usdDaiValue = BigInt(Math.floor(totalDaiDeposited)) * BigInt(daiUsdPrice);
        const usdUsdsValue = BigInt(Math.floor(totalUsdsDeposited)) * BigInt(usdsUsdPrice);
        const usdTotal = usdStEthValue + usdDaiValue + usdUsdsValue;

        setTotalDeposited({
          stEth: { value: totalStEthDeposited, display: formatDisplayAmount(totalStEthDeposited, 2) },
          dai: { value: totalDaiDeposited, display: formatDisplayAmount(totalDaiDeposited, 2) },
          usds: { value: totalUsdsDeposited, display: formatDisplayAmount(totalUsdsDeposited, 2) },
          usdTotal: { value: usdTotal, display: formatUSDAmount(usdTotal.toString()) },
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

          const usdsContract = new web3.eth.Contract(Erc20_ABI, ETH_CONTRACTS.usds);
          const usdsBridgeContract = new web3.eth.Contract(UsdsBridge_ABI, ETH_CONTRACTS.usdsBridge);

          const stEthBalanceOf = (await stEthContract.methods.balanceOf(walletAddress).call()) as any as bigint;
          const stEthUsersData = (await stEthBridgeContract.methods.usersData(walletAddress, 0).call()) as any;

          const daiBalanceOf = (await daiContract.methods.balanceOf(walletAddress).call()) as any as bigint;
          const daiUsersData = (await daiBridgeContract.methods.usersData(walletAddress, 0).call()) as any;

          const usdsBalanceOf = (await usdsContract.methods.balanceOf(walletAddress).call()) as any as bigint;
          const usdsUsersData = (await usdsBridgeContract.methods.usersData(walletAddress).call()) as any;

          setTokens((prev) => ({
            ...prev,
            stEth: {
              balance: {
                value: stEthBalanceOf,
                display: getBalanceDisplay(stEthBalanceOf),
              },
              deposited: {
                value: stEthUsersData.deposited,
                display: getBalanceDisplay(stEthUsersData.deposited),
                lastStake: stEthUsersData.lastStake,
              },
            },
            dai: {
              balance: {
                value: daiBalanceOf,
                display: getBalanceDisplay(daiBalanceOf),
              },
              deposited: {
                value: daiUsersData.deposited,
                display: getBalanceDisplay(daiUsersData.deposited),
                lastStake: daiUsersData.lastStake,
              },
            },
            usds: {
              balance: {
                value: usdsBalanceOf,
                display: getBalanceDisplay(usdsBalanceOf),
              },
              deposited: {
                value: usdsUsersData.deposited,
                display: getBalanceDisplay(usdsUsersData.deposited),
                lastStake: usdsUsersData.lastStake,
              },
            },
          }));

          // Find the arweave address from the last staked event
          const [stEthEvents, daiEvents, usdsEvents] = await Promise.all([
            stEthBridgeContract.getPastEvents('UserStaked' as any, {
              fromBlock: 0,
              toBlock: 'latest',
              filter: { user: walletAddress },
            }),
            daiBridgeContract.getPastEvents('UserStaked' as any, {
              fromBlock: 0,
              toBlock: 'latest',
              filter: { user: walletAddress },
            }),
            usdsBridgeContract.getPastEvents('UserStaked' as any, {
              fromBlock: 0,
              toBlock: 'latest',
              filter: { user: walletAddress },
            }),
          ]);

          const allEvents = [...stEthEvents, ...daiEvents, ...usdsEvents] as EventLog[];

          allEvents.sort((a, b) => {
            const blockB = BigInt(b.blockNumber || 0);
            const blockA = BigInt(a.blockNumber || 0);

            if (blockA < blockB) return 1;
            if (blockA > blockB) return -1;

            const indexB = BigInt(b.transactionIndex || 0);
            const indexA = BigInt(a.transactionIndex || 0);

            if (indexA < indexB) return 1;
            if (indexA > indexB) return -1;

            return 0;
          });

          if (allEvents.length > 0) {
            const latestEvent = allEvents[0];
            if (latestEvent.returnValues && latestEvent.returnValues.arweaveAddress) {
              const arweaveAddressBytes32 = latestEvent.returnValues.arweaveAddress as string;
              try {
                const convertedArweaveAddress = evmBytesToArweaveAddress(arweaveAddressBytes32);
                if (convertedArweaveAddress && checkValidAddress(convertedArweaveAddress)) {
                  setLastArweaveAddress(convertedArweaveAddress);
                } else {
                  console.warn(
                    'Failed to convert or validate arweaveAddress from event:',
                    arweaveAddressBytes32,
                    'Converted:',
                    convertedArweaveAddress
                  );
                  setLastArweaveAddress(null);
                }
              } catch (e) {
                console.error('Error during evmBytesToArweaveAddress conversion:', e);
                setLastArweaveAddress(null);
              }
            }
          }
        } catch (e: any) {
          console.error(e);
        }
      } else {
        setTokens({
          stEth: {
            balance: { value: null, display: getBalanceDisplay(null) },
            deposited: { value: null, display: getBalanceDisplay(null), lastStake: null },
          },
          dai: {
            balance: { value: null, display: getBalanceDisplay(null) },
            deposited: { value: null, display: getBalanceDisplay(null), lastStake: null },
          },
          usds: {
            balance: { value: null, display: getBalanceDisplay(null) },
            deposited: { value: null, display: getBalanceDisplay(null), lastStake: null },
          },
        });
        setLastArweaveAddress(null);
      }
    })();
  }, [walletAddress, tokenRefreshTrigger, web3Provider]);

  React.useEffect(() => {
    (async function () {
      if (tokens && totalDeposited && aoProvider.mintedSupply) {
        try {
          const currentNode = HB.app1;

          const [daiResp, stEthResp, usdsResp] = await Promise.all([
            readProcess({
              processId: PATCH_MAP.dai.processId,
              node: { url: currentNode },
              path: `price-data`,
              appendPath: true,
            }),
            readProcess({
              processId: PATCH_MAP.stEth.processId,
              node: { url: currentNode },
              path: `price-data`,
              appendPath: true,
            }),
            readProcess({
              processId: PATCH_MAP.usds.processId,
              node: { url: currentNode },
              path: `price-data`,
              appendPath: true,
            }),
          ]);

          const daiPrice = Number(daiResp?.price?.usd ?? 0);
          const daiYield = Number(daiResp?.yield?.bps ?? 0);

          const stEthPrice = Number(stEthResp?.price?.usd ?? 0);
          const stEthYield = Number(stEthResp?.yield?.bps ?? 0);

          const usdsPrice = Number(usdsResp?.price?.usd ?? 0);
          const usdsYield = Number(usdsResp?.yield?.bps ?? 0);

          const totalDepositedSteth = Number(totalDeposited?.stEth?.value ?? BigInt(0));
          const totalDepositedDai = Number(totalDeposited?.dai?.value ?? BigInt(0));
          const totalDepositedUsds = Number(totalDeposited?.usds?.value ?? BigInt(0));

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
              daiYield,
              totalDepositedUsds,
              usdsPrice,
              usdsYield
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
              daiYield,
              totalDepositedUsds,
              usdsPrice,
              usdsYield
            );
          };

          const usdsReward = (days: number, amount: number) => {
            return getUsdsReward(
              days,
              amount,
              aoProvider.mintedSupply,
              totalDepositedSteth,
              totalDepositedDai,
              totalDepositedUsds,
              stEthPrice,
              stEthYield,
              daiPrice,
              daiYield,
              usdsPrice,
              usdsYield
            );
          };

          setProjections({
            stEth: {
              price: stEthPrice,
              monthly: {
                amount: ethReward(30.44, Number(tokens.stEth?.deposited?.value ?? BigInt(0)) / ETH_TOKEN_DENOMINATION),
                ratio: ethReward(30.44, 1),
              },
              yearly: {
                amount: ethReward(365, Number(tokens.stEth?.deposited?.value ?? BigInt(0)) / ETH_TOKEN_DENOMINATION),
                ratio: ethReward(365, 1),
              },
            },
            dai: {
              price: daiPrice,
              monthly: {
                amount: daiReward(30.44, Number(tokens.dai?.deposited?.value ?? BigInt(0)) / ETH_TOKEN_DENOMINATION),
                ratio: daiReward(30.44, 1),
              },
              yearly: {
                amount: daiReward(365, Number(tokens.dai?.deposited?.value ?? BigInt(0)) / ETH_TOKEN_DENOMINATION),
                ratio: daiReward(365, 1),
              },
            },
            usds: {
              price: usdsPrice,
              monthly: {
                amount: usdsReward(30.44, Number(tokens.usds?.deposited?.value ?? BigInt(0)) / ETH_TOKEN_DENOMINATION),
                ratio: usdsReward(30.44, 1),
              },
              yearly: {
                amount: usdsReward(365, Number(tokens.usds?.deposited?.value ?? BigInt(0)) / ETH_TOKEN_DENOMINATION),
                ratio: usdsReward(365, 1),
              },
            },
          });
        } catch (e: any) {
          console.error(e);
        }
      } else {
        setProjections(null);
      }
    })();
  }, [tokens, totalDeposited, aoProvider.mintedSupply]);

  React.useEffect(() => {
    (async function () {
      try {
        const price = await getAoPrice();

        if (price !== null) {
          setAoPrice(price);
        }
      } catch (e: any) {
        console.error('Error fetching AO price:', e);
      }
    })();
  }, []);

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
      setDisconnected(false);
      setWalletModalVisible(false);
    } catch (error) {
      setErrorMessage(error.message);
      setWalletAddress(null);
      setBalance(null);
    }

    setWalletModalVisible(false);
  };

  const recoverConnection = React.useCallback(async () => {
    if (disconnected) return;

    const lastConnectedWallet = JSON.parse(localStorage.getItem('onboard.js:last_connected_wallet'));
    if (lastConnectedWallet && lastConnectedWallet.length > 0) {
      setConnecting(true);
      try {
        const [primaryWallet] = await onboard.connectWallet({
          autoSelect: { label: lastConnectedWallet[0], disableModals: true },
        });

        if (primaryWallet) {
          const success = await onboard.setChain({ chainId: '0x1' });
          if (!success) {
            setConnecting(false);
            return;
          }

          setWeb3Provider(primaryWallet.provider);

          const provider = new Web3Provider(primaryWallet.provider);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setWalletAddress(address);
          setConnecting(false);

          const ethBalance = await signer.getBalance();
          const formattedEth = formatEther(ethBalance);

          setBalance(formattedEth);
        } else {
          setConnecting(false);
        }
      } catch (error) {
        console.error('Error recovering connection:', error);
        setConnecting(false);
      }
    }
  }, [onboard, disconnected]);

  const handleDisconnect = async () => {
    const [primaryWallet] = onboard.state.get().wallets;
    if (primaryWallet) {
      try {
        await onboard.disconnectWallet({ label: primaryWallet.label });
      } finally {
        setWalletAddress(null);
        setBalance(null);
        localStorage.removeItem('onboard.js:last_connected_wallet');
        setDisconnected(true);
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

  function getBalanceDisplay(amount: bigint | null): string {
    if (amount === null) return '-';
    if (amount === BigInt(0)) return '0';
    return formatDisplayAmount(Web3.utils.fromWei(amount, 'ether'));
  }

  return (
    <>
      <EthereumContext.Provider
        value={{
          walletAddress,
          balance,
          tokens,
          refreshTokens: () => {
            setTokenRefreshTrigger((prev) => !prev);
          },
          projections,
          totalDeposited,
          handleConnect,
          handleDisconnect,
          walletModalVisible,
          setWalletModalVisible,
          errorMessage,
          web3Provider,
          ensureMainnet,
          connecting,
          aoPrice,
          lastArweaveAddress,
        }}
      >
        {props.children}
      </EthereumContext.Provider>
    </>
  );
}
