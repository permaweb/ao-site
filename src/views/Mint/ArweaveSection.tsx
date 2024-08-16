import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Web3 from 'web3';

import { readHandler } from 'api';

import artwork from 'assets/dashboard-artwork.png';
import AnimatedNumber from 'components/atoms/AnimatedNumber/AnimatedNumber';
import { BlockedMessage } from 'components/atoms/BlockedMessage';
import { Button } from 'components/atoms/Button';
import { Loader } from 'components/atoms/Loader';
import WalletConnectionStatus from 'components/organisms/WalletConnectionStatus/WalletConnectionStatus';
import { AO, AO_ABI, ASSETS, ENDPOINTS, ETH_CONTRACTS, STETH_ABI, TOKEN_DENOMINATION } from 'helpers/config';
import { formatDisplayAmount, getArReward } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { EthereumProvider, useEthereumProvider } from 'providers/EthereumProvider';
import Ethereum from 'views/Ethereum';

import * as S from './styles';

type ArweaveSectionProps = {
	loading: boolean;
};

export function ArweaveSection(props: ArweaveSectionProps) {
	const { loading } = props;

	const arProvider = useArweaveProvider();
	const arWalletBalance = React.useMemo(() => {
		if (!arProvider.walletAddress) return `${formatDisplayAmount(null)}`;
		if (arProvider.balance === 'Error') return arProvider.balance;
		return `${formatDisplayAmount(arProvider.balance)}`;
	}, [arProvider.balance, arProvider.walletAddress]);
	const [monthlyReward, setMonthlyReward] = React.useState<number | null>(null);
	const [aoSupply, setAoSupply] = React.useState<number | null>(null);
	const [fetchingReward, setFetchingReward] = React.useState<boolean>(false);
	const [fetchingAoSupply, setFetchingAoSupply] = React.useState<boolean>(false);
	const [yearlyReward, setYearlyReward] = React.useState<number | null>(null);

	React.useEffect(() => {
		(async function () {
			setFetchingAoSupply(true);
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
			setFetchingAoSupply(false);
		})();
	}, []);

	React.useEffect(() => {
		(async function () {
			if (arProvider && arProvider.walletAddress && aoSupply) {
				if (arProvider.balance !== null && arProvider.balance !== 'Error') {
					setFetchingReward(true);
					try {
						let balance: number;
						let tokenSupply: number;
						let rewardFn: (days: number, userBalance: number, totalBalances: number, currentAOSupply: number) => number;

						rewardFn = getArReward;
						tokenSupply = 66000000;
						balance = Number(arProvider.balance);

						const calcMonthlyReward = rewardFn(30, balance, tokenSupply, aoSupply);
						setMonthlyReward(calcMonthlyReward);

						const calcYearlyReward = rewardFn(365, balance, tokenSupply, aoSupply);
						setYearlyReward(calcYearlyReward);
					} catch (e: any) {
						console.error(e);
					}
					setFetchingReward(false);
				}
			} else {
				setMonthlyReward(null);
				setYearlyReward(null);
			}
		})();
	}, [arProvider, aoSupply]);

	const monthlyArms = React.useMemo(() => {
		if (monthlyReward && monthlyReward > 0) {
			const calcAmount = (monthlyReward * TOKEN_DENOMINATION) / 1000000000;
			return calcAmount;
		}
		return 'Loading...';
	}, [monthlyReward]);

	const yearlyArms = React.useMemo(() => {
		if (yearlyReward && yearlyReward > 0) {
			const calcAmount = (yearlyReward * TOKEN_DENOMINATION) / 1000000000;
			return `${formatDisplayAmount(calcAmount)}`;
		}
		return 'Loading...';
	}, [yearlyReward]);

	return (
		<S.Section className="border-wrapper-alt1" columns={4}>
			<S.Column>
				<S.Label>Your Arweave</S.Label>
				{!!arProvider.walletAddress ? (
					<>
						<S.AssetAmount>
							<ReactSVG src={ASSETS.arweave} />
							<span>{arWalletBalance}</span>
						</S.AssetAmount>
						<S.Label
							size="small"
							className="button"
							onClick={() => {
								arProvider.handleDisconnect();
							}}
						>
							Disconnect Wallet
						</S.Label>
					</>
				) : (
					<Button
						style={{ width: 'fit-content' }}
						type={'alt1'}
						label={'Connect Wallet'}
						handlePress={() => {
							arProvider.setWalletModalVisible(true);
						}}
						loading={loading}
						height={40}
					/>
				)}
			</S.Column>
			<S.Column>
				<S.Label>AO Earnings</S.Label>
				{!!arProvider.walletAddress ? (
					<S.AssetAmount>
						<ReactSVG src={ASSETS.aoPict} />
						<AnimatedNumber />
					</S.AssetAmount>
				) : (
					'-'
				)}
			</S.Column>
			<S.Column>
				<S.Label>30 day projection</S.Label>
				{!!arProvider.walletAddress ? (
					monthlyArms === 'Loading...' ? (
						<S.LoadingWrapper>
							<S.Loader>
								<Loader xSm relative />
							</S.Loader>
						</S.LoadingWrapper>
					) : (
						<S.AssetAmount>
							<ReactSVG src={ASSETS.plus} className="small" />
							<span>{monthlyArms}</span>
						</S.AssetAmount>
					)
				) : (
					'-'
				)}
				<S.Label size="small">1 AR = 300</S.Label>
			</S.Column>
			<S.Column>
				<S.Label>1 year projection</S.Label>
				{!!arProvider.walletAddress ? (
					yearlyArms === 'Loading...' ? (
						<S.LoadingWrapper>
							<S.Loader>
								<Loader xSm relative />
							</S.Loader>
						</S.LoadingWrapper>
					) : (
						<S.AssetAmount>
							<ReactSVG src={ASSETS.plus} className="small" />
							<span>{yearlyArms}</span>
						</S.AssetAmount>
					)
				) : (
					'-'
				)}
				<S.Label size="small">1 AR = 300k</S.Label>
			</S.Column>
		</S.Section>
	);
}
