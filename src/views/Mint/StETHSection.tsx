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
import { AO, AO_ABI, ASSETS, ENDPOINTS, ETH_CONTRACTS, STETH_ABI, TOKEN_DENOMINATION, URLS } from 'helpers/config';
import { formatDisplayAmount, getArReward, getEthReward } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { EthereumProvider, useEthereumProvider } from 'providers/EthereumProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';
import Ethereum from 'views/Ethereum';

import * as S from './styles';

type StETHSectionProps = {
	loading: boolean;
};

export function StETHSection(props: StETHSectionProps) {
	const { loading } = props;

	const ethProvider = useEthereumProvider();
	const [stethBalance, setStethBalance] = React.useState<bigint | null>(null);
	const [depositedStethBalance, setDespositedStethBalance] = React.useState<bigint | null>(null);

	React.useEffect(() => {
		(async function () {
			if (ethProvider.walletAddress) {
				const web3 = new Web3(ethProvider.web3Provider);

				try {
					const stethContract = new web3.eth.Contract(STETH_ABI, ETH_CONTRACTS.steth);

					const balanceOf = await stethContract.methods.balanceOf(ethProvider.walletAddress).call();
					setStethBalance(balanceOf as unknown as bigint);
				} catch (e: any) {
					console.error(e);
					setStethBalance('Error' as any);
				}

				try {
					const aoContract = new web3.eth.Contract(AO_ABI, ETH_CONTRACTS.ao);

					const usersData = await aoContract.methods.usersData(ethProvider.walletAddress, 0).call();
					setDespositedStethBalance((usersData as any).deposited as bigint);
				} catch (e: any) {
					console.error(e);
					setDespositedStethBalance('Error' as any);
				}
			} else {
				setStethBalance(null);
				setDespositedStethBalance(null);
			}
		})();
	}, [ethProvider.walletAddress]);

	const [fetchingReward, setFetchingReward] = React.useState<boolean>(false);
	const [fetchingAoSupply, setFetchingAoSupply] = React.useState<boolean>(false);
	const [fetchingTotal, setFetchingTotal] = React.useState<boolean>(false);

	const [aoSupply, setAoSupply] = React.useState<number | null>(null);

	const [monthlyReward, setMonthlyReward] = React.useState<number | null>(null);
	const [yearlyReward, setYearlyReward] = React.useState<number | null>(null);

	const [yearlyRewardDisplay, setYearlyRewardDisplay] = React.useState<number | null>(null);
	const [totalBridged, setTotalBridged] = React.useState<number | null>(null);

	const [showInfoModal, setShowInfoModal] = React.useState<boolean>(false);

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
			if (ethProvider && ethProvider.walletAddress && aoSupply) {
				if (ethProvider.balance !== null && ethProvider.balance !== 'Error') {
					setFetchingReward(true);
					try {
						let balance: number;
						let tokenSupply: number;
						let rewardFn: (days: number, userBalance: number, totalBalances: number, currentAOSupply: number) => number;

						const ETH_DENOMINATION = Math.pow(10, 18);

						rewardFn = getEthReward;

						const web3 = new Web3(ethProvider.web3Provider);

						const aoContract = new web3.eth.Contract(AO_ABI, ETH_CONTRACTS.ao);

						const usersData = await aoContract.methods.usersData(ethProvider.walletAddress, 0).call();
						const totalDeposited = await aoContract.methods.totalDepositedInPublicPools().call();

						tokenSupply = Number(totalDeposited) / ETH_DENOMINATION;
						balance = Number((usersData as any).deposited) / ETH_DENOMINATION;

						const calcMonthlyReward = rewardFn(30.4, balance, tokenSupply, aoSupply);
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
	}, [ethProvider, aoSupply]);

	React.useEffect(() => {
		(async function () {
			if (aoSupply) {
				setFetchingTotal(true);
				try {
					const ETH_DENOMINATION = Math.pow(10, 18);

					const web3 = new Web3(ENDPOINTS.mainnetRpc);

					const aoContract = new web3.eth.Contract(AO_ABI, ETH_CONTRACTS.ao);

					const totalDeposited = await aoContract.methods.totalDepositedInPublicPools().call();
					const formattedDepositsAmount = Number(totalDeposited) / ETH_DENOMINATION;

					if (totalDeposited && Number(totalDeposited) > 0) {
						setTotalBridged(formattedDepositsAmount);
						setYearlyRewardDisplay(getEthReward(365, 1, formattedDepositsAmount, aoSupply));
					}
				} catch (e: any) {
					console.error(e);
				}
				setFetchingTotal(false);
			}
		})();
	}, [aoSupply]);

	const monthlyArms = React.useMemo(() => {
		if (monthlyReward && monthlyReward > 0) {
			const calcAmount = (monthlyReward * TOKEN_DENOMINATION) / 1000000000;
			return formatDisplayAmount(calcAmount);
		}
		return 'Loading...';
	}, [monthlyReward]);

	const yearlyArms = React.useMemo(() => {
		if (yearlyReward && yearlyReward > 0) {
			const calcAmount = (yearlyReward * TOKEN_DENOMINATION) / 1000000000;
			return formatDisplayAmount(calcAmount);
		}
		return 'Loading...';
	}, [yearlyReward]);

	const navigate = useNavigate();

	return (
		<S.Section>
			<S.Column>
				<S.Label>Your STETH Bridged</S.Label>
				{!!ethProvider.walletAddress ? (
					<>
						<S.AssetAmount>
							<ReactSVG src={ASSETS.eth} />
							<span>{depositedStethBalance ? Web3.utils.fromWei(depositedStethBalance, 'ether') : ''}</span>
						</S.AssetAmount>
						<S.Label
							size="small"
							className="button"
							onClick={() => {
								ethProvider.handleDisconnect();
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
							ethProvider.setWalletModalVisible(true);
						}}
						loading={loading}
						height={40}
					/>
				)}
			</S.Column>
			<S.Column>
				<S.Label>AO Earnings</S.Label>
				{!!ethProvider.walletAddress ? (
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
				{!!ethProvider.walletAddress ? (
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
				<S.Label size="small">1 STETH = 300</S.Label>
			</S.Column>
			<S.Column>
				<S.Label>1 year projection</S.Label>
				{!!ethProvider.walletAddress ? (
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
				<S.Label size="small">1 STETH = 300k</S.Label>
			</S.Column>
			<S.Column>
				<S.Label>
					<span>{stethBalance ? Web3.utils.fromWei(stethBalance, 'ether') : ''} Available</span>
				</S.Label>
				<S.Row>
					<Button
						style={{ width: 'fit-content' }}
						type={'accent'}
						label={'Deposit'}
						handlePress={() => navigate(URLS.deposit)}
						loading={loading}
						height={40}
					/>
					<Button
						style={{ width: 'fit-content' }}
						type={'alt1'}
						label={'Withdraw'}
						handlePress={() => navigate(URLS.withdraw)}
						loading={loading}
						height={40}
					/>
				</S.Row>
			</S.Column>
		</S.Section>
	);
}
