import React from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { formatEther } from '@ethersproject/units';

// import WalletConnectProvider from '@walletconnect/web3-provider';
import { Modal } from 'components/molecules/Modal';
import { ETH_WALLETS } from 'helpers/config';

import { useLanguageProvider } from './LanguageProvider';
import * as S from './styles';
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

const EthereumContext = React.createContext<EthereumContextState>(DEFAULT_CONTEXT);

export const useEthereumProvider = () => React.useContext(EthereumContext);

function WalletList(props: { handleConnect: any }) {
	// const isWalletInstalled = (walletType: string) => {
	// 	switch (walletType) {
	// 		case 'MetaMask':
	// 			return !!window.ethereum;
	// 		case 'WalletConnect':
	// 			return true;
	// 		case 'Rabby':
	// 			return !!window.ethereum?.isRabby;
	// 		case 'Phantom':
	// 			return !!window.solana?.isPhantom;
	// 		default:
	// 			return false;
	// 	}
	// };

	return (
		<S.WalletListContainer>
			{ETH_WALLETS.map((wallet: any, index: number) => (
				<S.WalletListItem
					key={index}
					onClick={() => props.handleConnect(wallet.type)}
					className={'border-wrapper-alt2'}
				>
					{wallet.logo && <img src={`${wallet.logo}`} alt={''} />}
					<span>{wallet.type.charAt(0).toUpperCase() + wallet.type.slice(1)}</span>
					{/* {!isWalletInstalled(wallet.type) && <div style={{ height: 10, width: 10, background: 'red' }} />} */}
				</S.WalletListItem>
			))}
		</S.WalletListContainer>
	);
}

export function EthereumProvider({ children }: EthereumProviderProps) {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [walletAddress, setWalletAddress] = React.useState<string | null>(null);
	const [balance, setBalance] = React.useState<string | null>(null);
	const [walletModalVisible, setWalletModalVisible] = React.useState<boolean>(false);
	const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

	const handleConnect = async (walletType: string) => {
		try {
			let provider: any;
			switch (walletType) {
				case 'MetaMask':
					if (window.ethereum) {
						provider = new Web3Provider(window.ethereum);
						await provider.send('eth_requestAccounts', []);
					} else {
						alert('MetaMask is not installed');
					}
					break;
				case 'Rabby':
					if (window.ethereum?.isRabby) {
						provider = new Web3Provider(window.ethereum);
						await provider.send('eth_requestAccounts', []);
					} else {
						alert('Rabby is not installed');
					}
					break;
				case 'Phantom':
					if (window.solana?.isPhantom) {
						await window.solana.connect();
						provider = new Web3Provider(window.solana);
					} else {
						alert('Phantom is not installed');
					}
					break;
				default:
					alert('Unsupported wallet type');
			}
			
			const network = await provider.getNetwork();
			if (network.name === 'homestead') {
				const signer = provider.getSigner();
				const address = await signer.getAddress();
				setWalletAddress(address);
	
				const balance = await signer.getBalance();
				setBalance(formatEther(balance));
				setWalletModalVisible(false);
			}
			else {
				alert('Your wallet must be connected to ETH Mainnet!')
			}
		} catch (error) {
			setErrorMessage(error.message);
			setWalletAddress(null);
		}
	};

	const handleDisconnect = () => {
		setWalletAddress(null);
		setBalance(null);
	};

	return (
		<>
			{walletModalVisible && (
				<Modal header={language.connectWallet} handleClose={() => setWalletModalVisible(false)}>
					<WalletList handleConnect={handleConnect} />
				</Modal>
			)}
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
