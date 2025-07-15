import React from 'react';
import { ReactSVG } from 'react-svg';

import { ApyTooltip } from 'components/atoms/ApyTooltip';
import { Button } from 'components/atoms/Button';
import { EllipsisLoader } from 'components/atoms/EllipsisLoader';
import { Notification } from 'components/atoms/Notification';
import { Panel } from 'components/atoms/Panel';
import { EthExchange } from 'components/organisms/EthExchange';
import { ASSETS, fetchTokenYield, REDIRECTS } from 'helpers/config';
import { EthTokenEnum, EthTokensYieldProjectionsType, NotificationType } from 'helpers/types';
import { formatAddress, formatDisplayAmount } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useEthereumProvider } from 'providers/EthereumProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { CloseHandler } from 'wrappers/CloseHandler';

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
		header: string | React.ReactNode;
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
	const [copied, setCopied] = React.useState<boolean>(false);
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
				console.log(`Native yield for ${props.type}:`, nativeYieldValue);
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
			console.log('Projected APY', apy, aoPrice, assetPrice);
			setCurrentYield(apy);
		}
	}, [token?.wallet?.provider?.projections, props.type]);

	const tokens = React.useMemo(() => {
		return {
			ao: {
				header: language.yourAO,
				ticker: language.ao,
				wallet: {
					label: language.connectArWallet,
					icon: ASSETS.arweave,
					provider: arProvider,
					redirect: (address: string) => REDIRECTS.viewblock(address),
				},
				balance: { header: language.currentBalance, icon: ASSETS.ao },
			},
			arweave: {
				header: language.arLabel,
				ticker: language.ar,
				wallet: {
					label: language.connectArWallet,
					icon: ASSETS.arweave,
					provider: arProvider,
					redirect: (address: string) => REDIRECTS.viewblock(address),
				},
				balance: { header: language.currentBalance, icon: ASSETS.arweave },
			},
			stEth: {
				header: (
					<>
						<S.HeaderRow>
							{language.stEth}
							<S.ApyRow>
								{currentYield !== null ? (
									<>
										<S.ApyText>{`≈${currentYield.toFixed(1)}% APY`}</S.ApyText>
										<ApyTooltip position="top" />
									</>
								) : (
									<EllipsisLoader />
								)}
							</S.ApyRow>
						</S.HeaderRow>
						<S.NativeYieldText>
							Native Yield: {currentNativeYield !== null ? `${currentNativeYield.toFixed(1)}%` : '-'}
						</S.NativeYieldText>
					</>
				),
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
				header: (
					<>
						<S.HeaderRow>
							{language.dai}
							<S.ApyRow>
								{currentYield !== null ? (
									<>
										<S.ApyText>{`≈${currentYield.toFixed(1)}% APY`}</S.ApyText>
										<ApyTooltip position="top" />
									</>
								) : (
									<EllipsisLoader />
								)}
							</S.ApyRow>
						</S.HeaderRow>
						<S.NativeYieldText>
							Native Yield: {currentNativeYield !== null ? `${currentNativeYield.toFixed(1)}%` : '-'}
						</S.NativeYieldText>
					</>
				),
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
				header: (
					<>
						<S.HeaderRow>
							{language.usds}
							<S.ApyRow>
								{currentYield !== null ? (
									<>
										<S.ApyText>{`≈${currentYield.toFixed(1)}% APY`}</S.ApyText>
										<ApyTooltip position="top" />
									</>
								) : (
									<EllipsisLoader />
								)}
							</S.ApyRow>
						</S.HeaderRow>
						<S.NativeYieldText>
							Native Yield: {currentNativeYield !== null ? `${currentNativeYield.toFixed(1)}%` : '-'}
						</S.NativeYieldText>
					</>
				),
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
				if (token.wallet?.provider?.aoBalance !== null) return formatDisplayAmount(token.wallet.provider.aoBalance);
				return <EllipsisLoader />;
			case 'arweave':
				if (token.wallet?.provider?.balance !== null) return formatDisplayAmount(token.wallet.provider.balance);
				return <EllipsisLoader />;
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
			case 'ao':
				return mergeTokenProjections();
			case 'arweave':
				return token?.wallet?.provider?.projections;
			case EthTokenEnum.StEth:
			case EthTokenEnum.DAI:
				return token?.wallet?.provider?.projections?.[props.type];
			case EthTokenEnum.USDS:
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
					(ethProvider.projections?.dai?.monthly?.amount ?? 0) +
					(ethProvider.projections?.usds?.monthly?.amount ?? 0),
				ratio: null,
			},
			yearly: {
				amount:
					(arProvider.projections?.yearly?.amount ?? 0) +
					(ethProvider.projections?.stEth?.yearly?.amount ?? 0) +
					(ethProvider.projections?.dai?.yearly?.amount ?? 0) +
					(ethProvider.projections?.usds?.yearly?.amount ?? 0),
				ratio: null,
			},
		};
	}

	const copyAddress = React.useCallback(async (address: string) => {
		if (address) {
			if (address.length > 0) {
				await navigator.clipboard.writeText(address);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			}
		}
	}, []);

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
							<S.BalanceWalletAction>
								<Button
									type={'primary'}
									label={getWalletLabel()}
									handlePress={handleWalletPress}
									active={showWalletDropdown}
									disabled={token.wallet.provider.connecting}
									icon={token.wallet.icon}
									iconLeftAlign
									noTextTransform
								/>
							</S.BalanceWalletAction>
							{showWalletDropdown && (
								<S.BalanceWalletDropdown className={'border-wrapper-alt2 fade-in'}>
									<S.BalanceWalletDropdownLine>
										<p>{`${language.balance}:`}</p>
										<ReactSVG src={token.wallet.icon} />
										<p>
											<b>{formatDisplayAmount(token.wallet.provider.balance)}</b>
										</p>
									</S.BalanceWalletDropdownLine>
									<button onClick={() => copyAddress(token.wallet?.provider?.walletAddress)}>
										<ReactSVG src={ASSETS.copy} /> {copied ? `${language.copied}!` : language.copyWalletAddress}
									</button>
									<button
										onClick={() => window.open(token.wallet?.redirect(token.wallet?.provider?.walletAddress), '_blank')}
									>
										<ReactSVG src={ASSETS.view} /> {language.viewInExplorer}
									</button>
									<button id={'disconnect-action'} onClick={handleWalletDisconnect}>
										<ReactSVG src={ASSETS.disconnect} /> {language.disconnect}
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
								<span className={'primary-text'}>{language.thirtyDayProjection}</span>
							</S.BalanceQuantityHeader>
							<S.BalanceQuantityBody>
								<p>
									{(() => {
										const projectionData = getTokenProjections();
										if (projectionData) {
											const amount = projectionData.monthly.amount;
											if (amount === null || amount === 0) {
												return '-';
											}
											return (
												<>
													<span className={'indicator'}>+</span>
													{formatDisplayAmount(amount)}
												</>
											);
										} else {
											return token.wallet?.provider?.walletAddress ? <EllipsisLoader /> : '-';
										}
									})()}
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
								<span className={'primary-text'}>{language.oneYearProjection}</span>
							</S.BalanceQuantityHeader>
							<S.BalanceQuantityBody>
								<p>
									{(() => {
										const projectionData = getTokenProjections();
										if (projectionData) {
											const amount = projectionData.yearly.amount;
											if (amount === null || amount === 0) {
												return '-';
											}
											return (
												<>
													<span className={'indicator'}>+</span>
													{formatDisplayAmount(amount)}
												</>
											);
										} else {
											return token.wallet?.provider?.walletAddress ? <EllipsisLoader /> : '-';
										}
									})()}
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
							{(props.type === EthTokenEnum.DAI ||
								(props.type === EthTokenEnum.USDS &&
									ethProvider?.tokens?.[EthTokenEnum.DAI]?.balance?.value > 0 &&
									ethProvider?.tokens?.[EthTokenEnum.USDS]?.balance?.value <= 0)) && (
								<Button
									type={'alt1'}
									label={
										<S.ConvertButtonLabel>
											<span>Swap DAI → USDS</span>
										</S.ConvertButtonLabel>
									}
									handlePress={handleConvertPress}
									icon={ASSETS.arrowRight}
									iconLeftAlign
									disabled={showAction || token.wallet.provider.connecting}
									height={55}
									fullWidth
								/>
							)}
							<Button
								type={props.type === EthTokenEnum.DAI ? 'indicator' : 'alt1'}
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
