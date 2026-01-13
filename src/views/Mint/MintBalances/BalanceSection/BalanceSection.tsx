import React from 'react';
import { ReactSVG } from 'react-svg';

import { Button } from 'components/atoms/Button';
import { EllipsisLoader } from 'components/atoms/EllipsisLoader';
import { Notification } from 'components/atoms/Notification';
import { Panel } from 'components/atoms/Panel';
import { Tooltip } from 'components/atoms/Tooltip';
import { ASSETS, fetchTokenYield, REDIRECTS } from 'helpers/config';
import { EthTokenEnum, EthTokensYieldProjectionsType, NotificationType } from 'helpers/types';
import { formatAddress, formatDisplayAmount } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useEthereumProvider } from 'providers/EthereumProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { EthExchange } from './EthExchange';
import * as S from './styles';
import { IProps } from './types';

export default function BalanceSection(props: IProps) {
	const arProvider = useArweaveProvider();
	const ethProvider = useEthereumProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [currentYield, setCurrentYield] = React.useState<number | null>(null);
	const [currentNativeYield, setCurrentNativeYield] = React.useState<number | null>(null);

	const [token, setToken] = React.useState<{
		ticker: string;
		wallet: { label: string; icon: string; provider: any; redirect: (address: string) => string };
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
	const [actionResponse, setActionResponse] = React.useState<NotificationType | null>(null);
	const [showDaiConvertModal, setShowDaiConvertModal] = React.useState<boolean>(false);

	React.useEffect(() => {
		const fetchYields = async () => {
			try {
				let nativeYieldValue = null;

				switch (props.type) {
					case EthTokenEnum.StEth:
						nativeYieldValue = await fetchTokenYield('stEth');
						break;
					case EthTokenEnum.DAI:
						nativeYieldValue = await fetchTokenYield('dai');
						break;
					case EthTokenEnum.USDS:
						nativeYieldValue = await fetchTokenYield('usds');
						break;
					default:
						break;
				}

				setCurrentNativeYield(nativeYieldValue);
			} catch (error) {
				console.error('Error fetching yields:', error);
			}
		};

		fetchYields();
	}, [props.type]);

	React.useEffect(() => {
		const allProjections = token?.wallet?.provider?.projections as EthTokensYieldProjectionsType;
		const projections = getTokenProjections();
		const aoPrice = token?.wallet?.provider?.aoPrice;

		if (projections?.yearly?.ratio && aoPrice) {
			let assetPrice;

			switch (props.type) {
				case EthTokenEnum.StEth:
					assetPrice = allProjections[EthTokenEnum.StEth].price;
					break;
				case EthTokenEnum.DAI:
					assetPrice = allProjections[EthTokenEnum.DAI].price;
					break;
				case EthTokenEnum.USDS:
					assetPrice = allProjections[EthTokenEnum.USDS].price;
					break;
			}

			const apy = ((projections.yearly.ratio * aoPrice) / assetPrice) * 100;
			setCurrentYield(apy);
		}
	}, [token?.wallet?.provider?.projections, props.type]);

	const tokens = React.useMemo(() => {
		return {
			stEth: {
				ticker: language.stEth,
				wallet: {
					label: language.connectEthWallet,
					icon: ASSETS.ethereum,
					provider: ethProvider,
					redirect: (address: string) => REDIRECTS.etherscan(address),
				},
				balance: { header: language.amountDeposited, icon: ASSETS.stEth },
				action: {
					label: language.depositStEth,
					icon: ASSETS.exchange,
					fn: () => setShowAction(true),
					component: getEthExchange(EthTokenEnum.StEth),
				},
			},
			dai: {
				ticker: language.dai,
				wallet: {
					label: language.connectEthWallet,
					icon: ASSETS.ethereum,
					provider: ethProvider,
					redirect: (address: string) => REDIRECTS.etherscan(address),
				},
				balance: { header: language.amountDeposited, icon: ASSETS.dai },
				action: {
					label: language.depositDai,
					icon: ASSETS.exchange,
					fn: () => setShowAction(true),
					component: showDaiConvertModal ? getEthExchange(EthTokenEnum.USDS, true) : getEthExchange(EthTokenEnum.DAI),
				},
			},
			usds: {
				ticker: language.usds,
				wallet: {
					label: language.connectEthWallet,
					icon: ASSETS.ethereum,
					provider: ethProvider,
					redirect: (address: string) => REDIRECTS.etherscan(address),
				},
				balance: { header: language.amountDeposited, icon: ASSETS.usds },
				action: {
					label: language.depositUsds,
					icon: ASSETS.exchange,
					fn: () => setShowAction(true),
					component: showDaiConvertModal ? getEthExchange(EthTokenEnum.USDS, true) : getEthExchange(EthTokenEnum.USDS),
				},
			},
		};
	}, [arProvider, ethProvider, language, showAction, currentYield, showDaiConvertModal]);

	React.useEffect(() => {
		switch (props.type) {
			case EthTokenEnum.StEth:
				setToken({ ...tokens.stEth });
				break;
			case EthTokenEnum.DAI:
				setToken({ ...tokens.dai });
				break;
			case EthTokenEnum.USDS:
				setToken({ ...tokens.usds });
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

	React.useEffect(() => {
		if (!showAction) {
			setShowDaiConvertModal(false);
		}
	}, [showAction]);

	function getEthExchange(token: EthTokenEnum, conversionFlow?: boolean) {
		return (
			<EthExchange
				open={showAction}
				token={token}
				setResponse={(response: NotificationType) => setActionResponse(response)}
				handleClose={() => setShowAction(false)}
				conversionFlow={conversionFlow}
			/>
		);
	}

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

	function handleConvertPress() {
		if (!token.wallet.provider.walletAddress) {
			token.wallet.provider.setWalletModalVisible(true);
			return;
		}

		setShowDaiConvertModal(true);
		setShowAction(true);
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

	function getPrimaryBalance() {
		if (!token.wallet?.provider?.walletAddress) return '-';
		switch (props.type) {
			case EthTokenEnum.StEth:
			case EthTokenEnum.DAI:
				return token.wallet?.provider?.tokens?.[props.type]?.deposited?.display ?? <EllipsisLoader />;
			case EthTokenEnum.USDS:
				return token.wallet?.provider?.tokens?.[props.type]?.deposited?.display ?? <EllipsisLoader />;
			default:
				return '-';
		}
	}

	function getTokenProjections() {
		switch (props.type) {
			case EthTokenEnum.StEth:
			case EthTokenEnum.DAI:
				return token?.wallet?.provider?.projections?.[props.type];
			case EthTokenEnum.USDS:
				return token?.wallet?.provider?.projections?.[props.type];
			default:
				return null;
		}
	}

	function renderProjectionAmount(period: 'monthly' | 'yearly') {
		const projectionData = getTokenProjections();
		if (projectionData) {
			const amount = projectionData[period].amount;
			if (amount === null || amount === 0) {
				return '-';
			}
			return (
				<>
					{formatDisplayAmount(amount)} {token.ticker}
				</>
			);
		} else {
			return token.wallet?.provider?.walletAddress ? 'Loading...' : '-';
		}
	}

	function renderConversionAmount(period: 'monthly' | 'yearly') {
		return (
			<S.BalanceQuantityFooter>
				<p>{`${language[period]} ${language.conversion}: `}</p>
				<div className={'quantity-divider'} />
				{getTokenProjections() ? (
					<span className={'primary-text'}>{`1 ${token.ticker} = ${formatDisplayAmount(
						getTokenProjections()[period].ratio
					)} AO`}</span>
				) : (
					<span className={'primary-text'}>-</span>
				)}
			</S.BalanceQuantityFooter>
		);
	}

	return token ? (
		<>
			<S.BalanceSection type={props.type}>
				<S.BalanceHeaderWrapper>
					<S.BalanceHeader>
						<S.HeaderRow>
							<S.HeaderRowStart>
								{token.ticker}
								<S.ApyRow>
									{currentYield !== null ? (
										<>
											<S.ApyText>{`≈ ${currentYield.toFixed(1)}% APY`}</S.ApyText>
										</>
									) : (
										<EllipsisLoader />
									)}
								</S.ApyRow>
							</S.HeaderRowStart>
							<Tooltip
								content={
									<S.TooltipWrapper>
										<p>{language.apyExplanation}</p>
										<span>{language.nativeYieldExplanation}</span>
										<S.TooltipDivider />
										{renderConversionAmount('monthly')}
										{renderConversionAmount('yearly')}
									</S.TooltipWrapper>
								}
							/>
							{/* <ApyTooltip /> */}
						</S.HeaderRow>
						<S.NativeYieldText>
							Native Yield: {currentNativeYield !== null ? `${currentNativeYield.toFixed(1)}%` : '-'}
						</S.NativeYieldText>
					</S.BalanceHeader>
				</S.BalanceHeaderWrapper>
				<S.BalanceBodyWrapper>
					{ethProvider.walletAddress ? (
						<>
							<S.BalanceQuantityLines>
								<S.BalanceQuantityLine>
									<span>{language.currentBalance}</span>
									<p>
										{ethProvider.tokens[props.type]?.balance?.display ?? '-'} {token.ticker}
									</p>
								</S.BalanceQuantityLine>
								<S.BalanceQuantityLine>
									<span>{token.balance.header}</span>
									<p>
										{getPrimaryBalance()} {token.ticker}
									</p>
								</S.BalanceQuantityLine>
								<S.BalanceQuantityLine>
									<span>{language.thirtyDayProjection}</span>
									<p>{renderProjectionAmount('monthly')}</p>
								</S.BalanceQuantityLine>
								<S.BalanceQuantityLine>
									<span>{language.oneYearProjection}</span>
									<p>{renderProjectionAmount('yearly')}</p>
								</S.BalanceQuantityLine>
							</S.BalanceQuantityLines>
							{token.action && (
								<S.BalanceAction>
									{props.type === EthTokenEnum.USDS &&
										ethProvider?.tokens?.[EthTokenEnum.DAI]?.balance?.value > 0 &&
										ethProvider?.tokens?.[EthTokenEnum.USDS]?.balance?.value <= 0 && (
											<Button
												type={'primary'}
												label={
													<S.ConvertButtonLabel>
														<span>Swap DAI → USDS</span>
													</S.ConvertButtonLabel>
												}
												handlePress={handleConvertPress}
												disabled={showAction || token.wallet.provider.connecting}
												height={55}
												fullWidth
											/>
										)}
									<Button
										type={'primary'}
										label={getActionLabel()}
										handlePress={handleActionPress}
										disabled={showAction || token.wallet.provider.connecting}
										height={55}
										fullWidth
									/>
								</S.BalanceAction>
							)}
						</>
					) : (
						<S.NetworkDisconnected>
							<ReactSVG src={ASSETS.info} />
							<p>{language.connectEthWalletToViewDeposits}</p>
							<Button type={'primary'} label={getWalletLabel()} handlePress={handleWalletPress} height={45} fullWidth />
						</S.NetworkDisconnected>
					)}
				</S.BalanceBodyWrapper>
			</S.BalanceSection>
			{token.action && (
				<Panel
					open={showAction}
					width={550}
					header={showDaiConvertModal ? language.convertDai : token.action.label}
					handleClose={() => setShowAction(false)}
					closeHandlerDisabled
				>
					<S.ActionWrapper>{token.action.component}</S.ActionWrapper>
				</Panel>
			)}
			{actionResponse && (
				<Notification
					message={actionResponse.message}
					type={actionResponse.status}
					callback={() => setActionResponse(null)}
				/>
			)}
		</>
	) : null;
}
