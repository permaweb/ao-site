import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Web3 from 'web3';

import { Button } from 'components/atoms/Button';
import { Loader } from 'components/atoms/Loader';
import { ASSETS, DaiBridge_ABI, Erc20_ABI, ETH_CONTRACTS, URLS } from 'helpers/config';
import { formatDisplayAmount, getDaiReward } from 'helpers/utils';
import { useEthereumProvider } from 'providers/EthereumProvider';

import * as S from './styles';

type DaiSectionProps = {
	loading: boolean;
	aoSupply: number | null;
	onMonthlyReward?: (value: number) => void;
	onYearlyReward?: (value: number) => void;
	totalStEthBridged: number | null;
	totalDaiBridged: number | null;
	stEthPrice: number | null;
	stEthYield: number | null;
	daiPrice: number | null;
	daiYield: number | null;
};

export function DaiSection(props: DaiSectionProps) {
	const {
		loading,
		aoSupply,
		onMonthlyReward,
		onYearlyReward,
		totalStEthBridged,
		totalDaiBridged,
		stEthPrice,
		stEthYield,
		daiPrice,
		daiYield,
	} = props;

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
			if (
				ethProvider &&
				ethProvider.walletAddress &&
				aoSupply !== null &&
				totalStEthBridged !== null &&
				totalDaiBridged !== null &&
				stEthPrice !== null &&
				stEthYield !== null &&
				daiPrice !== null &&
				daiYield !== null
			) {
				if (ethProvider.balance !== null && ethProvider.balance !== 'Error') {
					try {
						let daiBridgedByUser: number;

						const ETH_DENOMINATION = Math.pow(10, 18);
						const web3 = new Web3(ethProvider.web3Provider);
						const daiBridgeContract = new web3.eth.Contract(DaiBridge_ABI, ETH_CONTRACTS.daiBridge);
						const usersData = await daiBridgeContract.methods.usersData(ethProvider.walletAddress, 0).call();

						daiBridgedByUser = Number((usersData as any).deposited) / ETH_DENOMINATION;

						if (isNaN(daiBridgedByUser)) {
							setMonthlyReward(0);
							onMonthlyReward?.(0);
							setYearlyReward(0);
							onYearlyReward?.(0);
							return;
						}

						const calcMonthlyReward = getDaiReward(
							30,
							daiBridgedByUser,
							aoSupply,
							totalStEthBridged,
							totalDaiBridged,
							stEthPrice,
							stEthYield,
							daiPrice,
							daiYield
						);
						setMonthlyReward(calcMonthlyReward);
						onMonthlyReward?.(calcMonthlyReward);

						const calcYearlyReward = getDaiReward(
							365,
							daiBridgedByUser,
							aoSupply,
							totalStEthBridged,
							totalDaiBridged,
							stEthPrice,
							stEthYield,
							daiPrice,
							daiYield
						);
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
	}, [ethProvider, aoSupply, totalStEthBridged, totalDaiBridged, stEthPrice, stEthYield, daiPrice, daiYield]);

	React.useEffect(() => {
		if (
			aoSupply !== null &&
			totalStEthBridged !== null &&
			totalDaiBridged !== null &&
			stEthPrice !== null &&
			stEthYield !== null &&
			daiPrice !== null &&
			daiYield !== null
		) {
			try {
				setYearlyRewardRatio(
					getDaiReward(365, 1, aoSupply, totalStEthBridged, totalDaiBridged, stEthPrice, stEthYield, daiPrice, daiYield)
				);
				setMonthlyRewardRatio(
					getDaiReward(30, 1, aoSupply, totalStEthBridged, totalDaiBridged, stEthPrice, stEthYield, daiPrice, daiYield)
				);
			} catch (e: any) {
				console.error(e);
				setYearlyRewardRatio(0);
				setMonthlyRewardRatio(0);
			}
		}
	}, [aoSupply, totalStEthBridged, totalDaiBridged, stEthPrice, stEthYield, daiPrice, daiYield]);

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
				{!!ethProvider.walletAddress && monthlyReward !== 0 ? (
					monthlyReward === null ? (
						<S.LoadingWrapper>
							<S.Loader>
								<Loader xSm relative />
							</S.Loader>
						</S.LoadingWrapper>
					) : (
						<S.AssetAmount>
							<ReactSVG src={ASSETS.plus} className="small" />
							<span>{formatDisplayAmount(monthlyReward)}</span>
						</S.AssetAmount>
					)
				) : (
					<S.AssetAmount>-</S.AssetAmount>
				)}
				<S.Label size="small">
					{monthlyRewardRatio === null ? 'Loading...' : `1 DAI = ${formatDisplayAmount(monthlyRewardRatio)} AO`}
				</S.Label>
			</S.Column>
			<S.Column>
				<S.Label>1 year projection</S.Label>
				{!!ethProvider.walletAddress && yearlyReward !== 0 ? (
					yearlyReward === null ? (
						<S.LoadingWrapper>
							<S.Loader>
								<Loader xSm relative />
							</S.Loader>
						</S.LoadingWrapper>
					) : (
						<S.AssetAmount>
							<ReactSVG src={ASSETS.plus} className="small" />
							<span>{formatDisplayAmount(yearlyReward)}</span>
						</S.AssetAmount>
					)
				) : (
					<S.AssetAmount>-</S.AssetAmount>
				)}
				<S.Label size="small">
					{yearlyRewardRatio === null ? 'Loading...' : `1 DAI = ${formatDisplayAmount(yearlyRewardRatio)} AO`}
				</S.Label>
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
