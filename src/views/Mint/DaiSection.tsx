import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Web3 from 'web3';

import { Button } from 'components/atoms/Button';
import { Loader } from 'components/atoms/Loader';
import { ASSETS, DaiBridge_ABI, ENDPOINTS, Erc20_ABI, ETH_CONTRACTS, TOKEN_DENOMINATION, URLS } from 'helpers/config';
import { formatDisplayAmount, getDaiReward } from 'helpers/utils';
import { useEthereumProvider } from 'providers/EthereumProvider';

import * as S from './styles';

type DaiSectionProps = {
	loading: boolean;
	aoSupply: number | null;
	onMonthlyReward?: (value: number) => void;
	onYearlyReward?: (value: number) => void;
	onTotalBridged?: (value: number) => void;
};

export function DaiSection(props: DaiSectionProps) {
	const { loading, aoSupply, onMonthlyReward, onYearlyReward, onTotalBridged } = props;

	const ethProvider = useEthereumProvider();
	const [daiBalance, setDaiBalance] = React.useState<bigint | null>(null);
	const [depositedDaiBalance, setDepositedDaiBalance] = React.useState<bigint | null>(null);

	React.useEffect(() => {
		(async function () {
			if (ethProvider.walletAddress) {
				const web3 = new Web3(ethProvider.web3Provider);

				try {
					const daiContract = new web3.eth.Contract(Erc20_ABI, ETH_CONTRACTS.dai);
					const balanceOf = await daiContract.methods.balanceOf(ethProvider.walletAddress).call();
					setDaiBalance(balanceOf as unknown as bigint);
				} catch (e: any) {
					console.error(e);
					setDaiBalance('Error' as any);
				}

				try {
					const daiBridgeContract = new web3.eth.Contract(DaiBridge_ABI, ETH_CONTRACTS.daiBridge);
					const usersData = await daiBridgeContract.methods.usersData(ethProvider.walletAddress, 0).call();
					setDepositedDaiBalance((usersData as any).deposited as bigint);
				} catch (e: any) {
					console.error(e);
					setDepositedDaiBalance('Error' as any);
				}
			} else {
				setDaiBalance(null);
				setDepositedDaiBalance(null);
			}
		})();
	}, [ethProvider.walletAddress]);

	const [monthlyReward, setMonthlyReward] = React.useState<number | null>(null);
	const [yearlyReward, setYearlyReward] = React.useState<number | null>(null);

	const [monthlyRewardRatio, setMonthlyRewardRatio] = React.useState<number | null>(null);
	const [yearlyRewardRatio, setYearlyRewardRatio] = React.useState<number | null>(null);

	React.useEffect(() => {
		(async function () {
			if (ethProvider && ethProvider.walletAddress && aoSupply) {
				if (ethProvider.balance !== null && ethProvider.balance !== 'Error') {
					try {
						let balance: number;
						let tokenSupply: number;

						const ETH_DENOMINATION = Math.pow(10, 18);

						const web3 = new Web3(ethProvider.web3Provider);
						const daiBridgeContract = new web3.eth.Contract(DaiBridge_ABI, ETH_CONTRACTS.daiBridge);

						const usersData = await daiBridgeContract.methods.usersData(ethProvider.walletAddress, 0).call();
						const totalDeposited = await daiBridgeContract.methods.totalDepositedInPublicPools().call();

						tokenSupply = Number(totalDeposited) / ETH_DENOMINATION;
						balance = Number((usersData as any).deposited) / ETH_DENOMINATION;

						const calcMonthlyReward = getDaiReward(30, balance, tokenSupply, aoSupply);
						setMonthlyReward(calcMonthlyReward);
						onMonthlyReward?.(calcMonthlyReward);

						const calcYearlyReward = getDaiReward(365, balance, tokenSupply, aoSupply);
						setYearlyReward(calcYearlyReward);
						onYearlyReward?.(calcYearlyReward);
					} catch (e: any) {
						console.error(e);
					}
				}
			} else {
				setMonthlyReward(null);
				onMonthlyReward?.(null);
				setYearlyReward(null);
				onYearlyReward?.(null);
			}
		})();
	}, [ethProvider, aoSupply]);

	React.useEffect(() => {
		(async function () {
			if (aoSupply) {
				try {
					const ETH_DENOMINATION = Math.pow(10, 18);
					const web3 = new Web3(ENDPOINTS.mainnetRpc);
					const daiBridgeContract = new web3.eth.Contract(DaiBridge_ABI, ETH_CONTRACTS.daiBridge);
					const totalDeposited = await daiBridgeContract.methods.totalDepositedInPublicPools().call();
					const formattedDepositsAmount = Number(totalDeposited) / ETH_DENOMINATION;

					if (totalDeposited && Number(totalDeposited) > 0) {
						onTotalBridged?.(formattedDepositsAmount);
						setYearlyRewardRatio(getDaiReward(365, 1, formattedDepositsAmount, aoSupply));
						setMonthlyRewardRatio(getDaiReward(30, 1, formattedDepositsAmount, aoSupply));
					}
				} catch (e: any) {
					console.error(e);
				}
			}
		})();
	}, [aoSupply]);

	const monthlyRewardArms = React.useMemo(() => {
		if (typeof monthlyReward === 'number') {
			const calcAmount = (monthlyReward * TOKEN_DENOMINATION) / 1000000000;
			return formatDisplayAmount(calcAmount);
		}
		return 'Loading...';
	}, [monthlyReward]);

	const yearlyRewardArms = React.useMemo(() => {
		if (typeof yearlyReward === 'number') {
			const calcAmount = (yearlyReward * TOKEN_DENOMINATION) / 1000000000;
			return formatDisplayAmount(calcAmount);
		}
		return 'Loading...';
	}, [yearlyReward]);

	const yearlyRewardRatioArms = React.useMemo(() => {
		if (yearlyRewardRatio && yearlyRewardRatio > 0) {
			const calcAmount = (yearlyRewardRatio * TOKEN_DENOMINATION) / 1000000000;
			return `1 DAI = ${formatDisplayAmount(calcAmount)}`;
		}
		return 'Loading...';
	}, [yearlyRewardRatio]);

	const monthlyRewardRatioArms = React.useMemo(() => {
		if (monthlyRewardRatio && monthlyRewardRatio > 0) {
			const calcAmount = (monthlyRewardRatio * TOKEN_DENOMINATION) / 1000000000;
			return `1 DAI = ${formatDisplayAmount(calcAmount)}`;
		}
		return 'Loading...';
	}, [monthlyRewardRatio]);

	const navigate = useNavigate();

	return (
		<S.Section columns={4}>
			<S.Column>
				<S.Label>Your DAI Bridged</S.Label>
				{!!ethProvider.walletAddress ? (
					<>
						<S.AssetAmount>
							<ReactSVG src={ASSETS.dai} />
							<span>
								{typeof depositedDaiBalance === 'bigint'
									? formatDisplayAmount(Web3.utils.fromWei(depositedDaiBalance, 'ether'))
									: ''}
							</span>
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
			{/* <S.Column>
				<S.Label>AO Earnings</S.Label>
				{!!ethProvider.walletAddress ? (
					<S.AssetAmount>
						<ReactSVG src={ASSETS.aoPict} />
						<AnimatedNumber />
					</S.AssetAmount>
				) : (
					'-'
				)}
			</S.Column> */}
			<S.Column>
				<S.Label>30 day projection</S.Label>
				{!!ethProvider.walletAddress && monthlyRewardArms !== '0' ? (
					monthlyRewardArms === 'Loading...' ? (
						<S.LoadingWrapper>
							<S.Loader>
								<Loader xSm relative />
							</S.Loader>
						</S.LoadingWrapper>
					) : (
						<S.AssetAmount>
							<ReactSVG src={ASSETS.plus} className="small" />
							<span>{monthlyRewardArms}</span>
						</S.AssetAmount>
					)
				) : (
					<S.AssetAmount>-</S.AssetAmount>
				)}
				<S.Label size="small">{monthlyRewardRatioArms}</S.Label>
			</S.Column>
			<S.Column>
				<S.Label>1 year projection</S.Label>
				{!!ethProvider.walletAddress && yearlyRewardArms !== '0' ? (
					yearlyRewardArms === 'Loading...' ? (
						<S.LoadingWrapper>
							<S.Loader>
								<Loader xSm relative />
							</S.Loader>
						</S.LoadingWrapper>
					) : (
						<S.AssetAmount>
							<ReactSVG src={ASSETS.plus} className="small" />
							<span>{yearlyRewardArms}</span>
						</S.AssetAmount>
					)
				) : (
					<S.AssetAmount>-</S.AssetAmount>
				)}
				<S.Label size="small">{yearlyRewardRatioArms}</S.Label>
			</S.Column>
			<S.Column>
				<S.Label>
					<ReactSVG
						src={ASSETS.dai}
						style={{
							width: 12,
							display: 'inline-block',
							marginRight: 8,
							verticalAlign: 'middle',
						}}
					/>
					<span>{daiBalance ? formatDisplayAmount(Web3.utils.fromWei(daiBalance, 'ether')) : '0'} Available</span>
				</S.Label>
				<S.Row>
					<Button
						style={{ width: 'fit-content' }}
						type={'accent'}
						label={'Deposit'}
						handlePress={() => navigate(`${URLS.deposit}?asset=DAI`)}
						loading={loading}
						height={40}
					/>
					<Button
						style={{ width: 'fit-content' }}
						type={'alt1'}
						label={'Withdraw'}
						handlePress={() => navigate(`${URLS.withdraw}?asset=DAI`)}
						loading={loading}
						height={40}
					/>
				</S.Row>
			</S.Column>
		</S.Section>
	);
}
