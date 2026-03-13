import React from 'react';
import { ReactSVG } from 'react-svg';

import { AddressTooltip } from 'components/atoms/AddressTooltip';
import { Button } from 'components/atoms/Button';
import { EllipsisLoader } from 'components/atoms/EllipsisLoader';
import { Modal } from 'components/atoms/Modal';
import { ViewHeader } from 'components/atoms/ViewHeader';
import { ASSETS } from 'helpers/config';
import { DefaultTokenEarningsType } from 'helpers/types';
import { formatAddress, formatDisplayAmount } from 'helpers/utils';
import { Footer } from 'navigation/footer';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useEthereumProvider } from 'providers/EthereumProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { WalletConnect } from 'wallet/WalletConnect';

import { MintBalances } from './MintBalances';
import * as S from './styles';

export default function Mint() {
	const arProvider = useArweaveProvider();
	const ethProvider = useEthereumProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [info, setInfo] = React.useState<string | null>(null);

	const [copiedAr, setCopiedAr] = React.useState<boolean>(false);
	const [copiedEth, setCopiedEth] = React.useState<boolean>(false);
	const [copiedDepositArweave, setCopiedDepositArweave] = React.useState<boolean>(false);

	function getTokenBalance(token: DefaultTokenEarningsType) {
		if (!arProvider?.walletAddress) return '-';

		let balance;

		switch (token) {
			case 'ao':
				balance = 'aoBalance';
				break;
			case 'arweave':
				balance = 'balance';
				break;
			default:
				return null;
		}

		if (arProvider[balance] !== null)
			return <p className={'fade-in'}>{formatDisplayAmount(arProvider[balance])}</p>;

		return <EllipsisLoader />;
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

	function getTokenProjections(token: DefaultTokenEarningsType) {
		switch (token) {
			case 'ao':
				return mergeTokenProjections();
			case 'arweave':
				return arProvider?.projections;
			default:
				return null;
		}
	}

	function getTokenProjectionsDisplay(token: DefaultTokenEarningsType, period: 'monthly' | 'yearly') {
		const projection = getTokenProjections(token)?.[period]?.amount;

		if (projection) return <p className={'fade-in'}>{formatDisplayAmount(projection)}</p>;

		return <EllipsisLoader />;
	}

	const copyArAddress = React.useCallback(async () => {
		if (arProvider.walletAddress) {
			await navigator.clipboard.writeText(arProvider.walletAddress);
			setCopiedAr(true);
			setTimeout(() => setCopiedAr(false), 2000);
		}
	}, [arProvider.walletAddress]);

	const copyEthAddress = React.useCallback(async () => {
		if (ethProvider.walletAddress) {
			await navigator.clipboard.writeText(ethProvider.walletAddress);
			setCopiedEth(true);
			setTimeout(() => setCopiedEth(false), 2000);
		}
	}, [ethProvider.walletAddress]);

	const copyDepositArweaveAddress = React.useCallback(async () => {
		if (ethProvider.lastArweaveAddress) {
			await navigator.clipboard.writeText(ethProvider.lastArweaveAddress);
			setCopiedDepositArweave(true);
			setTimeout(() => setCopiedDepositArweave(false), 2000);
		}
	}, [ethProvider.lastArweaveAddress]);

	return (
		<>
			<S.Wrapper className={'fade-in'}>
				<ViewHeader header={language.mint} actions={[<WalletConnect />]} />
				<S.BodyWrapper>
					<S.GlobalWrapper className={'border-wrapper-primary'}>
						<S.GlobalSection>
							<span>{language.globalFairLaunchDeposits}</span>
							<p>{ethProvider.totalDeposited?.usdTotal?.display ?? <EllipsisLoader />}</p>
						</S.GlobalSection>
						<S.GlobalSectionsFlex>
							<S.GlobalSubSection>
								<span>{language.totalStEthBridged}</span>
								<p>{ethProvider.totalDeposited?.stEth?.display ?? <EllipsisLoader />}</p>
							</S.GlobalSubSection>
							<S.GlobalSubSection>
								<span>{language.totalDaiBridged}</span>
								<p>{ethProvider.totalDeposited?.dai?.display ?? <EllipsisLoader />}</p>
							</S.GlobalSubSection>
							<S.GlobalSubSection>
								<span>{language.totalUsdsBridged}</span>
								<p>{ethProvider.totalDeposited?.usds?.display ?? <EllipsisLoader />}</p>
							</S.GlobalSubSection>
						</S.GlobalSectionsFlex>
					</S.GlobalWrapper>
					<S.NetworkWrapper className={'border-wrapper-primary'}>
						<S.NetworkHeaderWrapper>
							<S.NetworkHeader>
								<p>{language.yourNetworkRewards}</p>
							</S.NetworkHeader>
							<S.NetworkHeaderDivider />
							{arProvider.walletAddress ? (
								<>
									<S.NetworkHeaderWallet>
										<S.NetworkHeaderAddressRow>
											<ReactSVG className={'network-header-logo'} src={ASSETS.arweave} />
											<AddressTooltip address={arProvider.walletAddress}>
												<S.NetworkHeaderAddress
													disabled={copiedAr}
													onClick={copiedAr ? undefined : copyArAddress}
												>
													{copiedAr
														? `${language.copied}!`
														: formatAddress(arProvider.walletAddress, false)}
												</S.NetworkHeaderAddress>
											</AddressTooltip>
										</S.NetworkHeaderAddressRow>
									</S.NetworkHeaderWallet>
									<S.NetworkHeaderWalletActions>
										<Button
											type={'alt2'}
											label={language.disconnect}
											handlePress={() => arProvider.handleDisconnect()}
										/>
									</S.NetworkHeaderWalletActions>
								</>
							) : (
								<S.NetworkHeaderWallet>
									<span>
										{language.noWalletConnected} <ReactSVG src={ASSETS.warning} />
									</span>
								</S.NetworkHeaderWallet>
							)}
						</S.NetworkHeaderWrapper>
						<S.NetworkBodyWrapper>
							{arProvider.walletAddress ? (
								<S.NetworkSectionsWrapper>
									<S.NetworkSection>
										<S.NetworkSectionHeader>
											<span>{language.asset}</span>
										</S.NetworkSectionHeader>
										<S.NetworkSectionBody>
											<S.NetworkSectionBodyValue>
												<ReactSVG src={ASSETS.ao} />
												{getTokenBalance('ao')}
											</S.NetworkSectionBodyValue>
											<S.NetworkSectionBodyValue>
												<ReactSVG src={ASSETS.arweave} />
												{getTokenBalance('arweave')}
											</S.NetworkSectionBodyValue>
										</S.NetworkSectionBody>
									</S.NetworkSection>

									<S.NetworkSection>
										<S.NetworkSectionHeader>
											<span>{language.thirtyDayProjectionAO}</span>
										</S.NetworkSectionHeader>
										<S.NetworkSectionBody>
											<S.NetworkSectionBodyValue>
												{getTokenProjectionsDisplay('ao', 'monthly')}
											</S.NetworkSectionBodyValue>
											<S.NetworkSectionBodyValue>
												{getTokenProjectionsDisplay('arweave', 'monthly')}
											</S.NetworkSectionBodyValue>
										</S.NetworkSectionBody>
									</S.NetworkSection>

									<S.NetworkSection>
										<S.NetworkSectionHeader>
											<span>{language.oneYearProjectionAO}</span>
										</S.NetworkSectionHeader>
										<S.NetworkSectionBody>
											<S.NetworkSectionBodyValue>
												{getTokenProjectionsDisplay('ao', 'yearly')}
											</S.NetworkSectionBodyValue>
											<S.NetworkSectionBodyValue>
												{getTokenProjectionsDisplay('arweave', 'yearly')}
											</S.NetworkSectionBodyValue>
										</S.NetworkSectionBody>
									</S.NetworkSection>
								</S.NetworkSectionsWrapper>
							) : (
								<S.NetworkDisconnected>
									<S.NetworkDisconnectedIconText>
										<ReactSVG src={ASSETS.wallet} />
										<p>{language.connectArweaveWalletToViewRewards}</p>
									</S.NetworkDisconnectedIconText>
									<Button
										type={'primary'}
										label={language.connectWallet}
										handlePress={() => arProvider.setWalletModalVisible(true)}
										height={45}
										width={175}
									/>
								</S.NetworkDisconnected>
							)}
						</S.NetworkBodyWrapper>
					</S.NetworkWrapper>
					<S.DepositsWrapper className={'border-wrapper-alt1'}>
						<S.NetworkWrapper className={'border-wrapper-primary'}>
							<S.NetworkHeaderWrapper>
								<S.NetworkHeader>
									<p>{language.deposits}</p>
								</S.NetworkHeader>
								<S.NetworkHeaderDivider />
								{ethProvider.walletAddress ? (
									<>
										<S.NetworkHeaderWallet>
											<S.NetworkHeaderAddressRow>
												<ReactSVG className={'network-header-logo'} src={ASSETS.ethereum} />
												<AddressTooltip address={ethProvider.walletAddress}>
													<S.NetworkHeaderAddress
														disabled={copiedEth}
														onClick={copiedEth ? undefined : copyEthAddress}
													>
														{copiedEth
															? `${language.copied}!`
															: formatAddress(ethProvider.walletAddress, false)}
													</S.NetworkHeaderAddress>
												</AddressTooltip>
											</S.NetworkHeaderAddressRow>
											{ethProvider.lastArweaveAddress && (
												<>
													<S.NetworkHeaderDivider />
													<S.NetworkHeaderArweave>
														<span>{language.depositArweaveLabel}</span>
														<S.NetworkHeaderAddressRow>
															<ReactSVG
																className={'network-header-logo'}
																src={ASSETS.arweave}
															/>
															<AddressTooltip address={ethProvider.lastArweaveAddress}>
																<S.NetworkHeaderAddress
																	disabled={copiedDepositArweave}
																	onClick={
																		copiedDepositArweave
																			? undefined
																			: copyDepositArweaveAddress
																	}
																>
																	{copiedDepositArweave
																		? `${language.copied}!`
																		: formatAddress(
																				ethProvider.lastArweaveAddress,
																				false
																		  )}
																</S.NetworkHeaderAddress>
															</AddressTooltip>
														</S.NetworkHeaderAddressRow>
													</S.NetworkHeaderArweave>
												</>
											)}
										</S.NetworkHeaderWallet>
										<S.NetworkHeaderWalletActions>
											<Button
												type={'alt2'}
												label={language.disconnect}
												handlePress={() => ethProvider.handleDisconnect()}
											/>
										</S.NetworkHeaderWalletActions>
									</>
								) : (
									<S.NetworkHeaderWallet>
										<span>
											{language.noWalletConnected} <ReactSVG src={ASSETS.warning} />
										</span>
									</S.NetworkHeaderWallet>
								)}
							</S.NetworkHeaderWrapper>
							<S.NetworkBodyWrapper>
								{ethProvider.walletAddress ? (
									<S.NetworkBodyInfoLine>
										<p>{language.depositInfo}</p>
									</S.NetworkBodyInfoLine>
								) : (
									<S.NetworkDisconnected>
										<S.NetworkDisconnectedIconText>
											<ReactSVG src={ASSETS.wallet} />
											<p>{language.connectEthWalletToViewDeposits}</p>
										</S.NetworkDisconnectedIconText>
										<Button
											type={'primary'}
											label={language.connectEthWallet}
											handlePress={() => ethProvider.setWalletModalVisible(true)}
											height={45}
											width={175}
										/>
									</S.NetworkDisconnected>
								)}
							</S.NetworkBodyWrapper>
						</S.NetworkWrapper>
						<MintBalances />
					</S.DepositsWrapper>
				</S.BodyWrapper>
				<Footer />
			</S.Wrapper>
			{info && (
				<Modal header={language.earnings} handleClose={() => setInfo(null)}>
					<S.ModalWrapper className={'modal-wrapper'}>
						<span>{info}</span>
					</S.ModalWrapper>
				</Modal>
			)}
		</>
	);
}
