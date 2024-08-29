import React, { useEffect, useMemo } from 'react';
import { ReactSVG } from 'react-svg';
import Web3 from 'web3';

import { readHandler } from 'api';

import AnimatedNumber from 'components/atoms/AnimatedNumber/AnimatedNumber';
import { BlockedMessage } from 'components/atoms/BlockedMessage';
import { IconButton } from 'components/atoms/IconButton';
import { Loader } from 'components/atoms/Loader';
import WalletConnectionStatus from 'components/organisms/WalletConnectionStatus/WalletConnectionStatus';
import {
	AO,
	ASSETS,
	DaiBridge_ABI,
	ENDPOINTS,
	ETH_CONTRACTS,
	StEthBridge_ABI,
	TOKEN_DENOMINATION,
} from 'helpers/config';
import { formatDisplayAmount } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useEthereumProvider } from 'providers/EthereumProvider';

import { Artwork } from './Artwork';
import { ArweaveSection } from './ArweaveSection';
import { DaiSection } from './DaiSection';
import { StETHSection } from './StETHSection';
import * as S from './styles';

export default function Mint() {
	const [loading, setLoading] = React.useState<boolean>(false);
	const [isBlocked, setIsBlocked] = React.useState<boolean>(false);

	React.useEffect(() => {
		const checkLocation = async () => {
			setLoading(true);
			try {
				const response = await fetch(ENDPOINTS.ipCheck);
				const data = await response.json();
				if (data.country === 'US') {
					setIsBlocked(true);
				}
			} catch (error) {
				console.error('Error fetching location data', error.message);
			}
			setLoading(false);
		};

		checkLocation();
	}, []);

	const [aoSupply, setAoSupply] = React.useState<number | null>(null);
	React.useEffect(() => {
		(async function () {
			try {
				let aoSupplyFetch: number;
				aoSupplyFetch = await readHandler({
					processId: AO.tokenMirror,
					action: 'Minted-Supply',
				});

				if (aoSupplyFetch) {
					setAoSupply(aoSupplyFetch / TOKEN_DENOMINATION);
				}
			} catch (e: any) {
				console.error(e);
			}
		})();
	}, []);

	const arProvider = useArweaveProvider();
	const ethProvider = useEthereumProvider();

	const [aoBalanceForArWallet, setAoBalanceForArWallet] = React.useState<number | null>(null);
	const [aoBalancesForEthWallet, setAoBalancesForEthWallet] = React.useState<Record<string, string>>(null);

	React.useEffect(() => {
		(async function () {
			if (arProvider && arProvider.walletAddress) {
				try {
					const tokenBalance = await readHandler({
						processId: AO.tokenMirror,
						action: 'Balance',
						tags: [{ name: 'Recipient', value: arProvider.walletAddress }],
					});
					if (tokenBalance != null) setAoBalanceForArWallet(tokenBalance / TOKEN_DENOMINATION);
					else setAoBalanceForArWallet(0);
				} catch (e: any) {
					console.error(e);
				}
			} else {
				setAoBalanceForArWallet(null);
			}
		})();
	}, [arProvider]);

	React.useEffect(() => {
		(async function () {
			if (ethProvider && ethProvider.walletAddress) {
				console.log('Fetching ao balance for eth address', ethProvider.walletAddress);
				try {
					const tokenBalances = await readHandler({
						processId: AO.tokenMirror,
						action: 'Balances-By-User',
						tags: [{ name: 'User', value: ethProvider.walletAddress }],
					});
					console.log('Fetched ao balance for eth address', tokenBalances);
					if (!tokenBalances) {
						setAoBalancesForEthWallet({});
					} else {
						setAoBalancesForEthWallet(tokenBalances);
					}
				} catch (e: any) {
					console.error(e);
				}
			} else {
				setAoBalancesForEthWallet(null);
			}
		})();
	}, [ethProvider]);

	const aoBalanceForEthWalletLoading = useMemo(
		() => ethProvider && ethProvider.walletAddress && aoBalancesForEthWallet === null,
		[ethProvider, aoBalancesForEthWallet]
	);

	const aoBalanceForArWalletLoading = useMemo(
		() => arProvider && arProvider.walletAddress && aoBalanceForArWallet === null,
		[arProvider, aoBalanceForArWallet]
	);

	const aoBalance = React.useMemo<number | null>(() => {
		let calcAmount = null;

		if (typeof aoBalanceForArWallet === 'number') {
			calcAmount += aoBalanceForArWallet;
		}

		if (aoBalancesForEthWallet !== null) {
			for (const wallet of Object.keys(aoBalancesForEthWallet)) {
				if (arProvider.walletAddress === wallet) continue;

				calcAmount += parseInt(aoBalancesForEthWallet[wallet]) / TOKEN_DENOMINATION;
			}
		}

		return calcAmount;
	}, [aoBalanceForArWallet, aoBalancesForEthWallet, arProvider]);

	const [arweaveMonthlyReward, setArweaveMonthlyReward] = React.useState<number | null>(null);
	const [arweaveYearlyReward, setArweaveYearlyReward] = React.useState<number | null>(null);

	const [ethMonthlyReward, setEthMonthlyReward] = React.useState<number | null>(null);
	const [ethYearlyReward, setEthYearlyReward] = React.useState<number | null>(null);

	const [daiMonthlyReward, setDaiMonthlyReward] = React.useState<number | null>(null);
	const [daiYearlyReward, setDaiYearlyReward] = React.useState<number | null>(null);

	const monthlyReward = React.useMemo(() => {
		let calcAmount = null;

		if (typeof arweaveMonthlyReward === 'number') {
			calcAmount += arweaveMonthlyReward;
		}

		if (typeof ethMonthlyReward === 'number') {
			calcAmount += ethMonthlyReward;
		}

		if (typeof daiMonthlyReward === 'number') {
			calcAmount += daiMonthlyReward;
		}

		return calcAmount;
	}, [arweaveMonthlyReward, ethMonthlyReward, daiMonthlyReward]);

	const yearlyReward = React.useMemo(() => {
		let calcAmount = null;

		if (typeof arweaveYearlyReward === 'number') {
			calcAmount += arweaveYearlyReward;
		}

		if (typeof ethYearlyReward === 'number') {
			calcAmount += ethYearlyReward;
		}

		if (typeof daiYearlyReward === 'number') {
			calcAmount += daiYearlyReward;
		}

		return calcAmount;
	}, [arweaveYearlyReward, ethYearlyReward, daiYearlyReward]);

	const realtimeReward = React.useMemo<number | null>(() => {
		let calcAmount = null;

		if (typeof arweaveMonthlyReward === 'number') {
			calcAmount += arweaveMonthlyReward;
		}

		if (typeof ethMonthlyReward === 'number') {
			calcAmount += ethMonthlyReward;
		}

		if (typeof daiMonthlyReward === 'number') {
			calcAmount += daiMonthlyReward;
		}

		calcAmount = calcAmount / 30 / 24 / 60 / 60;

		return calcAmount;
	}, [arweaveMonthlyReward, ethMonthlyReward, daiMonthlyReward]);

	const [totalStEthBridged, setTotalStEthBridged] = React.useState<number | null>(null);
	const [totalDaiBridged, setTotalDaiBridged] = React.useState<number | null>(null);

	const connected = useMemo(() => !!ethProvider.walletAddress || !!arProvider.walletAddress, [arProvider, ethProvider]);

	useEffect(() => {
		(async function () {
			try {
				const web3 = new Web3(ENDPOINTS.mainnetRpc);
				const stEthBridgeContract = new web3.eth.Contract(StEthBridge_ABI, ETH_CONTRACTS.stEthBridge);
				const daiBridgeContract = new web3.eth.Contract(DaiBridge_ABI, ETH_CONTRACTS.daiBridge);

				let [totalStEthDeposited, totalDaiDeposited] = await Promise.all([
					stEthBridgeContract.methods.totalDepositedInPublicPools().call() as any,
					daiBridgeContract.methods.totalDepositedInPublicPools().call() as any,
				]);
				console.log('LOG: totalStEthDeposited, totalDaiDeposited:', totalStEthDeposited, totalDaiDeposited);

				totalStEthDeposited = Number(totalStEthDeposited) / Math.pow(10, 18);
				totalDaiDeposited = Number(totalDaiDeposited) / Math.pow(10, 18);

				if (isNaN(totalStEthDeposited)) throw new Error('Invalid totalStEthDeposited');
				if (isNaN(totalDaiDeposited)) throw new Error('Invalid totalDaiDeposited');

				setTotalStEthBridged(totalStEthDeposited);
				setTotalDaiBridged(totalDaiDeposited);
			} catch (e: any) {
				console.error(e);
			}
		})();
	}, []);

	const [stEthPrice, setStEthPrice] = React.useState<number | null>(null);
	const [stEthYield, setStEthYield] = React.useState<number | null>(null);
	const [daiPrice, setDaiPrice] = React.useState<number | null>(null);
	const [daiYield, setDaiYield] = React.useState<number | null>(null);

	useEffect(() => {
		(async function () {
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
				console.log('LOG: daiResp, stEthResp:', daiResp, stEthResp);

				const daiPrice = Number(daiResp.LastPrice) / 10_000;
				const daiYield = Number(daiResp.LastYield) / 10_000;
				const stEthPrice = Number(stEthResp.LastPrice) / 10_000;
				const stEthYield = Number(stEthResp.LastYield) / 10_000;

				console.log('LOG: daiPrice, daiYield, stEthPrice, stEthYield:', daiPrice, daiYield, stEthPrice, stEthYield);

				setDaiPrice(daiPrice);
				setDaiYield(daiYield);
				setStEthPrice(stEthPrice);
				setStEthYield(stEthYield);
			} catch (e: any) {
				console.error(e);
			}
		})();
	}, []);

	function getView() {
		if (loading) return <Loader />;
		if (isBlocked) {
			return (
				<S.BlockMessage>
					<BlockedMessage />
				</S.BlockMessage>
			);
		}

		return (
			<S.Wrapper>
				<S.Heading>
					<S.Subheading>[+] Your Dashboard</S.Subheading>
					<WalletConnectionStatus />
				</S.Heading>
				<S.Hero columns={2}>
					<S.Column>
						<S.Section columns={1}>
							<S.Column>
								<S.Label>
									<span>Your AO</span>
								</S.Label>
								{connected ? (
									aoBalance === null ? (
										!aoBalanceForEthWalletLoading && !aoBalanceForArWalletLoading ? (
											'-'
										) : (
											<S.LoadingWrapper>
												<S.Loader>
													<Loader xSm relative />
												</S.Loader>
											</S.LoadingWrapper>
										)
									) : (
										<S.AssetAmount>
											<ReactSVG src={ASSETS.aoPict} />
											<AnimatedNumber startValue={aoBalance} increment={realtimeReward} />
											{(aoBalanceForEthWalletLoading || aoBalanceForArWalletLoading) && (
												<S.LoadingWrapper>
													<S.Loader>
														<Loader xSm relative />
													</S.Loader>
												</S.LoadingWrapper>
											)}
										</S.AssetAmount>
									)
								) : (
									<span style={{ fontSize: '28px', fontFamily: 'DM Sans' }}>0 </span>
								)}
								<S.Label>
									<S.TooltipLine>
										<span>/ {formatDisplayAmount(21_000_000)}</span>
										<IconButton
											type={'primary'}
											src={ASSETS.info}
											handlePress={() => {
												const url =
													'https://mirror.xyz/0x1EE4bE8670E8Bd7E9E2E366F530467030BE4C840/-UWra0q0KWecSpgg2-c37dbZ0lnOMEScEEkabVm9qaQ';
												window.open(url, '_blank');
											}}
											dimensions={{ icon: 15, wrapper: 25 }}
										/>
									</S.TooltipLine>
								</S.Label>
							</S.Column>
						</S.Section>
						<S.Divider />
						<S.Section columns={2}>
							<S.Column>
								<S.Label>30 day projection</S.Label>
								{connected ? (
									monthlyReward === null ? (
										<S.LoadingWrapper>
											<S.Loader>
												<Loader xSm relative />
											</S.Loader>
										</S.LoadingWrapper>
									) : (
										<S.AssetAmount variant="alt1">
											<ReactSVG src={ASSETS.aoPict} />+{formatDisplayAmount(monthlyReward)}
										</S.AssetAmount>
									)
								) : (
									<span style={{ fontSize: '28px', fontFamily: 'DM Sans' }}>0 </span>
								)}
							</S.Column>
							<S.Column>
								<S.Label>1 year projection</S.Label>
								{connected ? (
									yearlyReward === null ? (
										<S.LoadingWrapper>
											<S.Loader>
												<Loader xSm relative />
											</S.Loader>
										</S.LoadingWrapper>
									) : (
										<S.AssetAmount variant="alt1">
											<ReactSVG src={ASSETS.aoPict} />+{formatDisplayAmount(yearlyReward)}
										</S.AssetAmount>
									)
								) : (
									<span style={{ fontSize: '28px', fontFamily: 'DM Sans' }}>0 </span>
								)}
							</S.Column>
						</S.Section>
					</S.Column>
					<S.InfoWrapper className={'border-wrapper-primary'}>
						<S.InfoWrapperSection>
							<S.InfoHeader>
								<img style={{ width: '40px' }} src={ASSETS.aoPict} />
								<h4>: 100% Fair Launch.</h4>
							</S.InfoHeader>
							<p style={{ fontFamily: 'DM Sans', textTransform: 'none' }}>
								21 million tokens. 4 year halving.
								<br />
								<br />
								Just like Bitcoin.
								<br />
								<br />
								Every single $AO minted by the community.
								<br />
								<br />
								Hold ar or pre-bridge your assets to participate.
								<br />
								<br />
								<a
									href={
										'https://mirror.xyz/0x1EE4bE8670E8Bd7E9E2E366F530467030BE4C840/-UWra0q0KWecSpgg2-c37dbZ0lnOMEScEEkabVm9qaQ'
									}
									target="_blank"
								>
									Learn more.
								</a>
							</p>
						</S.InfoWrapperSection>
						<S.InfoWrapperSection>
							<img className="pie-chart" src={ASSETS.heroGraphic} />
						</S.InfoWrapperSection>
					</S.InfoWrapper>
				</S.Hero>
				<ArweaveSection
					loading={loading}
					aoSupply={aoSupply}
					onYearlyReward={setArweaveYearlyReward}
					onMonthlyReward={setArweaveMonthlyReward}
				/>
				<StETHSection
					loading={loading}
					aoSupply={aoSupply}
					onYearlyReward={setEthYearlyReward}
					onMonthlyReward={setEthMonthlyReward}
					totalStEthBridged={totalStEthBridged}
					totalDaiBridged={totalDaiBridged}
					stEthPrice={stEthPrice}
					stEthYield={stEthYield}
					daiPrice={daiPrice}
					daiYield={daiYield}
				/>
				<DaiSection
					loading={loading}
					aoSupply={aoSupply}
					onYearlyReward={setDaiYearlyReward}
					onMonthlyReward={setDaiMonthlyReward}
					totalStEthBridged={totalStEthBridged}
					totalDaiBridged={totalDaiBridged}
					stEthPrice={stEthPrice}
					stEthYield={stEthYield}
					daiPrice={daiPrice}
					daiYield={daiYield}
				/>
				<S.Heading>
					<S.Subheading>[+] Network</S.Subheading>
				</S.Heading>
				<S.Section columns={4}>
					<S.Column>
						<S.Label>Total AO Supply</S.Label>
						{aoSupply === null ? (
							<S.LoadingWrapper>
								<S.Loader>
									<Loader xSm relative />
								</S.Loader>
							</S.LoadingWrapper>
						) : (
							<S.AssetAmount variant="alt2">
								<ReactSVG src={ASSETS.aoPict} />
								{formatDisplayAmount(aoSupply.toFixed(2))}
							</S.AssetAmount>
						)}
					</S.Column>
					<S.Column>
						<S.Label>Total stETH Bridged</S.Label>
						{totalStEthBridged === null ? (
							<S.LoadingWrapper>
								<S.Loader>
									<Loader xSm relative />
								</S.Loader>
							</S.LoadingWrapper>
						) : (
							<S.AssetAmount variant="alt2">
								<ReactSVG src={ASSETS.stEth} />
								{formatDisplayAmount(totalStEthBridged.toFixed(2))}
							</S.AssetAmount>
						)}
					</S.Column>
					<S.Column>
						<S.Label>Total DAI Bridged</S.Label>
						{totalDaiBridged === null ? (
							<S.LoadingWrapper>
								<S.Loader>
									<Loader xSm relative />
								</S.Loader>
							</S.LoadingWrapper>
						) : (
							<S.AssetAmount variant="alt2">
								<ReactSVG src={ASSETS.dai} />
								{formatDisplayAmount(totalDaiBridged.toFixed(2))}
							</S.AssetAmount>
						)}
					</S.Column>
				</S.Section>
			</S.Wrapper>
		);
	}

	return getView();
}
