import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Web3 from 'web3';

import { Button } from 'components/atoms/Button';
import { Loader } from 'components/atoms/Loader';
import { AO_TOKEN_DENOMINATION, ASSETS, Erc20_ABI, ETH_CONTRACTS, StEthBridge_ABI, URLS } from 'helpers/config';
import { formatDisplayAmount, getEthReward } from 'helpers/utils';
import { useEthereumProvider } from 'providers/EthereumProvider';

import * as S from '../styles';

type StETHSectionProps = {
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

export function StETHSection(props: StETHSectionProps) {
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
	const [stEthBalance, setStEthBalance] = React.useState<bigint | null>(null);
	const [depositedStEthBalance, setDepositedStEthBalance] = React.useState<bigint | null>(null);

	React.useEffect(() => {
		(async function () {
			if (ethProvider.walletAddress) {
				const web3 = new Web3(ethProvider.web3Provider);

				try {
					const stEthContract = new web3.eth.Contract(Erc20_ABI, ETH_CONTRACTS.stEth);

					const balanceOf = await stEthContract.methods.balanceOf(ethProvider.walletAddress).call();
					setStEthBalance(balanceOf as unknown as bigint);
				} catch (e: any) {
					console.error(e);
					setStEthBalance('Error' as any);
				}

				try {
					const stEthBridgeContract = new web3.eth.Contract(StEthBridge_ABI, ETH_CONTRACTS.stEthBridge);

					const usersData = await stEthBridgeContract.methods.usersData(ethProvider.walletAddress, 0).call();
					setDepositedStEthBalance((usersData as any).deposited as bigint);
				} catch (e: any) {
					console.error(e);
					setDepositedStEthBalance('Error' as any);
				}
			} else {
				setStEthBalance(null);
				setDepositedStEthBalance(null);
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
						let stEthBridgedByUser: number;

						const ETH_DENOMINATION = Math.pow(10, 18);
						const web3 = new Web3(ethProvider.web3Provider);
						const stEthBridgeContract = new web3.eth.Contract(StEthBridge_ABI, ETH_CONTRACTS.stEthBridge);
						const usersData = await stEthBridgeContract.methods.usersData(ethProvider.walletAddress, 0).call();

						stEthBridgedByUser = Number((usersData as any).deposited) / ETH_DENOMINATION;

						if (isNaN(stEthBridgedByUser)) {
							setMonthlyReward(0);
							onMonthlyReward?.(0);
							setYearlyReward(0);
							onYearlyReward?.(0);
							return;
						}

						const calcMonthlyReward = getEthReward(
							30,
							stEthBridgedByUser,
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

						const calcYearlyReward = getEthReward(
							365,
							stEthBridgedByUser,
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
					getEthReward(365, 1, aoSupply, totalStEthBridged, totalDaiBridged, stEthPrice, stEthYield, daiPrice, daiYield)
				);
				setMonthlyRewardRatio(
					getEthReward(30, 1, aoSupply, totalStEthBridged, totalDaiBridged, stEthPrice, stEthYield, daiPrice, daiYield)
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
		<S.Section columns={4} style={{ padding: '24px 12px 24px 32px' }}>
			<S.Column>
				<S.Label>Your STETH Bridged</S.Label>
				{!!ethProvider.walletAddress ? (
					<>
						<S.AssetAmount>
							<ReactSVG src={ASSETS.stEth} />
							<span>
								{typeof depositedStEthBalance === 'bigint'
									? formatDisplayAmount(Web3.utils.fromWei(depositedStEthBalance, 'ether'))
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
						style={{ width: 'fit-content', boxShadow: '0px 4px 0px 0px #797979', border: '1px solid black' }}
						type={'alt1'}
						label={'Connect ETH Wallet'}
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
					<S.AssetAmount>0</S.AssetAmount>
				)}
				<S.Label size="small">
					{monthlyRewardRatio === null ? 'Loading...' : `1 stETH = ${formatDisplayAmount(monthlyRewardRatio)} AO`}
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
					<S.AssetAmount>0</S.AssetAmount>
				)}
				<S.Label size="small">
					{yearlyRewardRatio === null ? 'Loading...' : `1 stETH = ${formatDisplayAmount(yearlyRewardRatio)} AO`}
				</S.Label>
			</S.Column>
			<S.Column>
				<S.Label>
					<ReactSVG
						src={ASSETS.stEth}
						style={{
							width: 12,
							display: 'inline-block',
							marginRight: 8,
							verticalAlign: 'middle',
						}}
					/>
					<span>{stEthBalance ? formatDisplayAmount(Web3.utils.fromWei(stEthBalance, 'ether')) : '0'} Available</span>
				</S.Label>
				<S.Row>
					<Button
						style={{ width: 'fit-content' }}
						type={'accent'}
						label={'Deposit'}
						handlePress={() => navigate(`${URLS.deposit}?asset=stETH`)}
						loading={loading}
						height={40}
						width={170}
					/>
					<Button
						style={{ width: 'fit-content' }}
						type={'alt1'}
						label={'Withdraw'}
						handlePress={() => navigate(`${URLS.withdraw}?asset=stETH`)}
						loading={loading}
						height={40}
						width={170}
					/>
				</S.Row>
			</S.Column>
		</S.Section>
	);
}
