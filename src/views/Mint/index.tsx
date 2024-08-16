import React, { useMemo } from 'react';
import { ReactSVG } from 'react-svg';

import { readHandler } from 'api';

import artwork from 'assets/dashboard-artwork.png';
import AnimatedNumber from 'components/atoms/AnimatedNumber/AnimatedNumber';
import { BlockedMessage } from 'components/atoms/BlockedMessage';
import { Loader } from 'components/atoms/Loader';
import WalletConnectionStatus from 'components/organisms/WalletConnectionStatus/WalletConnectionStatus';
import { AO, ASSETS, ENDPOINTS, TOKEN_DENOMINATION } from 'helpers/config';
import { formatDisplayAmount } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useEthereumProvider } from 'providers/EthereumProvider';

import { ArweaveSection } from './ArweaveSection';
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
				console.error('Error fetching location data', error);
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
	const [aoBalance, setAoBalance] = React.useState<number | null>(null);

	const ethProvider = useEthereumProvider();

	// TODO - Current Balance by ETH Address
	React.useEffect(() => {
		(async function () {
			if (arProvider && arProvider.walletAddress) {
				try {
					const tokenBalance = await readHandler({
						processId: AO.tokenMirror,
						action: 'Balance',
						tags: [{ name: 'Recipient', value: arProvider.walletAddress }],
					});
					if (tokenBalance != null) setAoBalance(tokenBalance / TOKEN_DENOMINATION);
				} catch (e: any) {
					console.error(e);
				}
			} else {
				setAoBalance(null);
			}
		})();
	}, [arProvider]);

	const [arweaveMonthlyReward, setArweaveMonthlyReward] = React.useState<number | null>(null);
	const [arweaveYearlyReward, setArweaveYearlyReward] = React.useState<number | null>(null);

	const [ethMonthlyReward, setEthMonthlyReward] = React.useState<number | null>(null);
	const [ethYearlyReward, setEthYearlyReward] = React.useState<number | null>(null);

	const monthlyRewardArms = React.useMemo(() => {
		let calcAmount = null;

		if (arweaveMonthlyReward && arweaveMonthlyReward > 0) {
			calcAmount += (arweaveMonthlyReward * TOKEN_DENOMINATION) / 1000000000;
		}

		if (ethMonthlyReward && ethMonthlyReward > 0) {
			calcAmount += (ethMonthlyReward * TOKEN_DENOMINATION) / 1000000000;
		}

		return calcAmount === null ? 'Loading...' : formatDisplayAmount(calcAmount);
	}, [arweaveMonthlyReward, ethMonthlyReward]);

	const yearlyRewardArms = React.useMemo(() => {
		let calcAmount = null;

		if (arweaveYearlyReward && arweaveYearlyReward > 0) {
			calcAmount += (arweaveYearlyReward * TOKEN_DENOMINATION) / 1000000000;
		}

		if (ethYearlyReward && ethYearlyReward > 0) {
			calcAmount += (ethYearlyReward * TOKEN_DENOMINATION) / 1000000000;
		}

		return calcAmount === null ? 'Loading...' : formatDisplayAmount(calcAmount);
	}, [arweaveYearlyReward, ethYearlyReward]);

	const realtimeRewardArms = React.useMemo<number | null>(() => {
		let calcAmount = null;

		if (arweaveMonthlyReward && arweaveMonthlyReward > 0) {
			calcAmount += (arweaveMonthlyReward * TOKEN_DENOMINATION) / 1000000000;
		}

		if (ethMonthlyReward && ethMonthlyReward > 0) {
			calcAmount += (ethMonthlyReward * TOKEN_DENOMINATION) / 1000000000;
		}

		calcAmount = calcAmount / 30 / 24 / 60 / 60;

		return calcAmount;
	}, [arweaveMonthlyReward, ethMonthlyReward]);

	const [totalStETHBridged, setTotalStETHBridged] = React.useState<number | null>(null);

	const connected = useMemo(() => !!ethProvider.walletAddress || !!arProvider.walletAddress, [arProvider, ethProvider]);

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
								<S.Label>Your AO (G-Armstrongs)</S.Label>
								{connected ? (
									aoBalance === null ? (
										<S.LoadingWrapper>
											<S.Loader>
												<Loader xSm relative />
											</S.Loader>
										</S.LoadingWrapper>
									) : (
										<S.AssetAmount>
											<ReactSVG src={ASSETS.aoPict} />
											<AnimatedNumber startValue={aoBalance} increment={realtimeRewardArms} />
										</S.AssetAmount>
									)
								) : (
									'-'
								)}
							</S.Column>
						</S.Section>
						<S.Divider />
						<S.Section columns={2}>
							<S.Column>
								<S.Label>30 day projection</S.Label>
								{connected ? (
									monthlyRewardArms === 'Loading...' ? (
										<S.LoadingWrapper>
											<S.Loader>
												<Loader xSm relative />
											</S.Loader>
										</S.LoadingWrapper>
									) : (
										<S.AssetAmount variant="alt1">
											<ReactSVG src={ASSETS.aoPict} />+{monthlyRewardArms}
										</S.AssetAmount>
									)
								) : (
									'-'
								)}
							</S.Column>
							<S.Column>
								<S.Label>1 year projection</S.Label>
								{connected ? (
									yearlyRewardArms === 'Loading...' ? (
										<S.LoadingWrapper>
											<S.Loader>
												<Loader xSm relative />
											</S.Loader>
										</S.LoadingWrapper>
									) : (
										<S.AssetAmount variant="alt1">
											<ReactSVG src={ASSETS.aoPict} />+{yearlyRewardArms}
										</S.AssetAmount>
									)
								) : (
									'-'
								)}
							</S.Column>
						</S.Section>
					</S.Column>
					<S.Artwork src={artwork} alt="artwork" />
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
					onTotalBridged={setTotalStETHBridged}
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
						<S.Label>Total StETH Bridged</S.Label>
						{totalStETHBridged === null ? (
							<S.LoadingWrapper>
								<S.Loader>
									<Loader xSm relative />
								</S.Loader>
							</S.LoadingWrapper>
						) : (
							<S.AssetAmount variant="alt2">
								<ReactSVG src={ASSETS.eth} />
								{formatDisplayAmount(totalStETHBridged.toFixed(2))}
							</S.AssetAmount>
						)}
					</S.Column>
				</S.Section>
			</S.Wrapper>
		);
	}

	return getView();
}
