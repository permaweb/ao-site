import React from 'react';
import { ReactSVG } from 'react-svg';

import { Button } from 'components/atoms/Button';
import { EllipsisLoader } from 'components/atoms/EllipsisLoader';
import { Panel } from 'components/atoms/Panel';
import { EthExchange } from 'components/organisms/EthExchange';
import { ASSETS } from 'helpers/config';
import { EthTokenEnum } from 'helpers/types';
import { formatAddress, formatDisplayAmount } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useEthereumProvider } from 'providers/EthereumProvider';
import { CloseHandler } from 'wrappers/CloseHandler';

import * as S from './styles';
import { IProps } from './types';

// TODO: Location provider
export default function BalanceSection(props: IProps) {
	const arProvider = useArweaveProvider();
	const ethProvider = useEthereumProvider();

	const [token, setToken] = React.useState<{
		header: string;
		ticker: string;
		wallet: { label: string; icon: string; provider: any };
		balance: { header: string; icon: string };
		action?: {
			label: string;
			icon: string;
			fn: () => void;
			component: React.ReactNode;
		};
	} | null>(null);

	const [showWalletDropdown, setShowWalletDropdown] = React.useState<boolean>(false);
	const [showAction, setShowAction] = React.useState<boolean>(false);

	const tokens = React.useMemo(() => {
		return {
			ao: {
				header: 'Your AO',
				ticker: 'AO',
				wallet: { label: 'Connect Arweave Wallet', icon: ASSETS.arweave, provider: arProvider },
				balance: { header: 'Current Balance', icon: ASSETS.ao },
			},
			arweave: {
				header: 'Arweave',
				ticker: 'AR',
				wallet: { label: 'Connect Arweave Wallet', icon: ASSETS.arweave, provider: arProvider },
				balance: { header: 'Current Balance', icon: ASSETS.arweave },
			},
			stEth: {
				header: 'Deposited stETH',
				ticker: 'StETH',
				wallet: { label: 'Connect ETH Wallet', icon: ASSETS.ethereum, provider: ethProvider },
				balance: { header: 'Amount Deposited', icon: ASSETS.stEth },
				action: {
					label: 'Exchange StETH',
					icon: ASSETS.exchange,
					fn: () => setShowAction(true),
					component: <EthExchange token={EthTokenEnum.StEth} />,
				},
			},
			dai: {
				header: 'Deposited DAI',
				ticker: 'DAI',
				wallet: { label: 'Connect ETH Wallet', icon: ASSETS.ethereum, provider: ethProvider },
				balance: { header: 'Amount Deposited', icon: ASSETS.dai },
				action: {
					label: 'Exchange DAI',
					icon: ASSETS.exchange,
					fn: () => setShowAction(true),
					component: <EthExchange token={EthTokenEnum.DAI} />,
				},
			},
		};
	}, [arProvider, ethProvider]);

	React.useEffect(() => {
		switch (props.type) {
			case 'ao':
				setToken({ ...tokens.ao });
				break;
			case 'arweave':
				setToken({ ...tokens.arweave });
				break;
			case EthTokenEnum.StEth:
				setToken({ ...tokens.stEth });
				break;
			case EthTokenEnum.DAI:
				setToken({ ...tokens.dai });
				break;
			default:
				break;
		}
	}, [props.type, tokens]);

	React.useEffect(() => {
		setToken((prev) => ({
			...prev,
			provider: token?.wallet?.provider ?? null,
		}));
	}, [token?.wallet?.provider]);

	function handleWalletPress() {
		if (!token.wallet.provider.walletAddress) {
			token.wallet.provider.setWalletModalVisible(true);
			return;
		}

		setShowWalletDropdown(!showWalletDropdown);
	}

	function handleActionPress() {
		if (!token.wallet.provider.walletAddress) {
			token.wallet.provider.setWalletModalVisible(true);
			return;
		}

		if (token.action) token.action.fn();
	}

	function getActionLabel() {
		if (token?.wallet.provider.connecting) return `Connecting...`;
		if (!token?.wallet.provider.walletAddress) return token.wallet.label;
		return token?.action.label;
	}

	function getWalletLabel() {
		if (token?.wallet.provider.connecting) return `Connecting...`;
		if (token?.wallet.provider.walletAddress) return formatAddress(token.wallet.provider.walletAddress, false);
		return token?.wallet.label;
	}

	function handleWalletDisconnect() {
		if (token.wallet.provider) {
			token.wallet.provider.handleDisconnect();
			setShowWalletDropdown(false);
		}
	}

	function getPrimaryBalance() {
		if (!token.wallet?.provider?.walletAddress) return '-';
		switch (props.type) {
			case 'ao':
				if (token.wallet?.provider?.aoBalance) return formatDisplayAmount(token.wallet.provider.aoBalance);
				return <EllipsisLoader />;
			case 'arweave':
				if (token.wallet?.provider?.balance) return formatDisplayAmount(token.wallet.provider.balance);
				return <EllipsisLoader />;
			case EthTokenEnum.StEth:
			case EthTokenEnum.DAI:
				return token.wallet?.provider?.tokens?.[props.type]?.deposited?.display ?? <EllipsisLoader />;
			default:
				return '-';
		}
	}

	function getTokenProjections() {
		switch (props.type) {
			case 'ao':
				return mergeTokenProjections();
			case 'arweave':
				return token?.wallet?.provider?.projections;
			case EthTokenEnum.StEth:
			case EthTokenEnum.DAI:
				return token?.wallet?.provider?.projections?.[props.type];
			default:
				return null;
		}
	}

	function mergeTokenProjections() {
		if (!arProvider.projections && !ethProvider.projections) return null;

		return {
			monthly: {
				amount:
					(arProvider.projections?.monthly?.amount ?? 0) +
					(ethProvider.projections?.stEth?.monthly?.amount ?? 0) +
					(ethProvider.projections?.dai?.monthly?.amount ?? 0),
				ratio: null,
			},
			yearly: {
				amount:
					(arProvider.projections?.yearly?.amount ?? 0) +
					(ethProvider.projections?.stEth?.yearly?.amount ?? 0) +
					(ethProvider.projections?.dai?.yearly?.amount ?? 0),
				ratio: null,
			},
		};
	}

	return token ? (
		<>
			<S.BalanceSection type={props.type} className={'fade-in'}>
				<S.BalanceHeaderWrapper>
					<S.BalanceHeader>
						<span>{token.header}</span>
					</S.BalanceHeader>
					<S.BalanceWalletWrapper>
						<CloseHandler
							callback={() => {
								setShowWalletDropdown(false);
							}}
							active={showWalletDropdown}
							disabled={!showWalletDropdown}
						>
							<Button
								type={'primary'}
								label={getWalletLabel()}
								handlePress={handleWalletPress}
								active={showWalletDropdown}
								disabled={token.wallet.provider.connecting}
								icon={token.wallet.icon}
								iconLeftAlign
							/>
							{showWalletDropdown && (
								<S.BalanceWalletDropdown className={'border-wrapper-alt2 fade-in'}>
									<S.BalanceWalletDropdownLine>
										<p>Balance:</p>
										<ReactSVG src={token.wallet.icon} />
										<p>
											<b>{formatDisplayAmount(token.wallet.provider.balance)}</b>
										</p>
									</S.BalanceWalletDropdownLine>
									<button onClick={handleWalletDisconnect}>
										<ReactSVG src={ASSETS.disconnect} /> Disconnect
									</button>
								</S.BalanceWalletDropdown>
							)}
						</CloseHandler>
					</S.BalanceWalletWrapper>
				</S.BalanceHeaderWrapper>
				<S.BalanceBodyWrapper>
					<S.BalanceQuantitySection>
						<S.BalanceQuantityHeader>
							<span className={'primary-text'}>{token.balance.header}</span>
						</S.BalanceQuantityHeader>
						<S.BalanceQuantityBody>
							<ReactSVG id={props.type === 'ao' ? 'ao-logo' : ''} src={token.balance.icon} />
							<p>{getPrimaryBalance()}</p>
						</S.BalanceQuantityBody>
					</S.BalanceQuantitySection>
					<S.BalancesQuantityFlexSection>
						<S.BalanceQuantityEndSection>
							<S.BalanceQuantityHeader>
								<span className={'primary-text'}>30 Day Projection</span>
							</S.BalanceQuantityHeader>
							<S.BalanceQuantityBody>
								<p>
									{getTokenProjections() ? (
										<>
											<span className={'indicator'}>+</span>
											{formatDisplayAmount(getTokenProjections().monthly.amount)}
										</>
									) : (
										<>{token.wallet?.provider?.walletAddress ? <EllipsisLoader /> : '-'}</>
									)}
								</p>
							</S.BalanceQuantityBody>
							{props.type !== 'ao' && (
								<S.BalanceQuantityFooter>
									{getTokenProjections() ? (
										<span className={'primary-text'}>{`1 ${token.ticker} = ${formatDisplayAmount(
											getTokenProjections().monthly.ratio
										)} AO`}</span>
									) : (
										<span className={'primary-text'}>-</span>
									)}
								</S.BalanceQuantityFooter>
							)}
						</S.BalanceQuantityEndSection>
						<S.BalanceQuantityEndSection>
							<S.BalanceQuantityHeader>
								<span className={'primary-text'}>1 Year Projection</span>
							</S.BalanceQuantityHeader>
							<S.BalanceQuantityBody>
								<p>
									{getTokenProjections() ? (
										<>
											<span className={'indicator'}>+</span>
											{formatDisplayAmount(getTokenProjections().yearly.amount)}
										</>
									) : (
										<>{token.wallet?.provider?.walletAddress ? <EllipsisLoader /> : '-'}</>
									)}
								</p>
							</S.BalanceQuantityBody>
							{props.type !== 'ao' && (
								<S.BalanceQuantityFooter>
									{getTokenProjections() ? (
										<span className={'primary-text'}>{`1 ${token.ticker} = ${formatDisplayAmount(
											getTokenProjections().yearly.ratio
										)} AO`}</span>
									) : (
										<span className={'primary-text'}>-</span>
									)}
								</S.BalanceQuantityFooter>
							)}
						</S.BalanceQuantityEndSection>
					</S.BalancesQuantityFlexSection>
					{token.action && (
						<S.BalanceAction>
							<Button
								type={'alt1'}
								label={getActionLabel()}
								handlePress={handleActionPress}
								icon={token.wallet.provider.walletAddress ? token.action.icon : ASSETS.wallet}
								iconLeftAlign
								disabled={showAction || token.wallet.provider.connecting}
								height={55}
								fullWidth
							/>
						</S.BalanceAction>
					)}
				</S.BalanceBodyWrapper>
			</S.BalanceSection>
			{token.action && (
				<Panel
					open={showAction}
					width={550}
					header={token.action.label}
					handleClose={() => setShowAction(false)}
					closeHandlerDisabled
				>
					<S.ActionWrapper>{token.action.component}</S.ActionWrapper>
				</Panel>
			)}
		</>
	) : null;
}
