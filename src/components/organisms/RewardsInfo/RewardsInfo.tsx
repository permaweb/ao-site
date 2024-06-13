import React from 'react';
import Web3 from 'web3';

import { readHandler } from 'api';

import { IconButton } from 'components/atoms/IconButton';
import { Loader } from 'components/atoms/Loader';
import { Modal } from 'components/molecules/Modal';
import { AO, AO_ABI, ASSETS, ENDPOINTS, ETH_CONTRACTS, STETH_ABI, TOKEN_DENOMINATION } from 'helpers/config';
import { formatDisplayAmount, getArReward, getEthReward } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useEthereumProvider } from 'providers/EthereumProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';
import { IProps } from './types';

export default function RewardsInfo(props: IProps) {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const arProvider = useArweaveProvider();
	const ethProvider = useEthereumProvider();

	const [provider, setProvider] = React.useState<any>(null);

	const [fetchingReward, setFetchingReward] = React.useState<boolean>(false);

	const [monthlyReward, setMonthlyReward] = React.useState<number | null>(null);
	const [yearlyReward, setYearlyReward] = React.useState<number | null>(null);

	const [yearlyRewardDisplay, setYearlyRewardDisplay] = React.useState<number | null>(null);
	const [totalBridged, setTotalBridged] = React.useState<number | null>(null);

	const [showInfoModal, setShowInfoModal] = React.useState<boolean>(false);

	React.useEffect(() => {
		switch (props.chain) {
			case 'arweave':
				setProvider(arProvider);
				break;
			case 'ethereum':
				setProvider(ethProvider);
				break;
		}
	}, [props.chain, arProvider, ethProvider]);

	React.useEffect(() => {
		(async function () {
			if (provider && provider.walletAddress) {
				if (provider.balance !== null && provider.balance !== 'Error') {
					setFetchingReward(true);
					try {
						let balance: number;
						let aoSupply: number;
						let tokenSupply: number;
						let rewardFn: (days: number, userBalance: number, totalBalances: number, currentAOSupply: number) => number;

						aoSupply = await readHandler({
							processId: AO.token,
							action: 'Minted-Supply',
						});

						switch (props.chain) {
							case 'arweave':
								rewardFn = getArReward;

								const arSupplyResponse = await fetch(ENDPOINTS.arTotalSupply);

								tokenSupply = Number(await arSupplyResponse.text());
								balance = Number(provider.balance);
								break;
							case 'ethereum':
								rewardFn = getEthReward;

								const web3 = new Web3(window.ethereum);
								await window.ethereum.enable();

								const aoContract = new web3.eth.Contract(AO_ABI, ETH_CONTRACTS.ao);
								const stethContract = new web3.eth.Contract(STETH_ABI, ETH_CONTRACTS.steth);

								const usersData = await aoContract.methods.usersData(ethProvider.walletAddress, 0).call();
								const totalSupply = await stethContract.methods.totalSupply().call();

								tokenSupply = Number(totalSupply);
								balance = Number((usersData as any).deposited)  / Math.pow(10, 18);
								break;
						}

						// TODO - balance or balance * (10 ^ 18)
						const calcMonthlyReward = rewardFn(30, balance, tokenSupply, aoSupply);
						setMonthlyReward(calcMonthlyReward);

						// TODO - balance or balance * (10 ^ 18)
						const calcYearlyReward = rewardFn(365, balance, tokenSupply, aoSupply);
						setYearlyReward(calcYearlyReward);

						// TODO - 1 or 1 * (10 ^ 18)
						setYearlyRewardDisplay(rewardFn(365, 1, tokenSupply, aoSupply));
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
	}, [provider]);

	React.useEffect(() => {
		(async function () {
			if (provider && provider.walletAddress && props.chain === 'ethereum') {
				const web3 = new Web3(window.ethereum);
				await window.ethereum.enable();

				const aoContract = new web3.eth.Contract(AO_ABI, ETH_CONTRACTS.ao);
				const totalDeposited = await aoContract.methods.totalDepositedInPublicPools().call();

				if (totalDeposited && Number(totalDeposited) > 0) setTotalBridged(Number(totalDeposited));
			}
		})();
	}, [provider, props.chain]);

	const monthlyAO = React.useMemo(() => {
		if (monthlyReward && monthlyReward > 0) {
			return `~ ${formatDisplayAmount(monthlyReward)} AO`;
		}
		return `${formatDisplayAmount(monthlyReward)} AO`;
	}, [monthlyReward]);

	// TODO - confirm division
	const monthlyArms = React.useMemo(() => {
		if (monthlyReward && monthlyReward > 0) {
			const calcAmount = (monthlyReward * TOKEN_DENOMINATION) / 1000000000;
			return `~ ${formatDisplayAmount(calcAmount)}`;
		}
		return '-';
	}, [monthlyReward]);

	const yearlyAO = React.useMemo(() => {
		if (yearlyReward && yearlyReward > 0) {
			return `~ ${formatDisplayAmount(yearlyReward)} AO`;
		}
		return `${formatDisplayAmount(yearlyReward)} AO`;
	}, [yearlyReward]);

	// TODO - confirm division
	const yearlyArms = React.useMemo(() => {
		if (yearlyReward && yearlyReward > 0) {
			const calcAmount = (yearlyReward * TOKEN_DENOMINATION) / 1000000000;
			return `~ ${formatDisplayAmount(calcAmount)}`;
		}
		return '-';
	}, [yearlyReward]);

	// TODO - confirm divison
	const yearlyDisplay = React.useMemo(() => {
		if (yearlyRewardDisplay && yearlyRewardDisplay > 0) {
			const calcAmount = (yearlyRewardDisplay * TOKEN_DENOMINATION) / 1000000000;
			return `~ ${formatDisplayAmount(calcAmount)} AO`;
		}
		return '- AO';
	}, [yearlyRewardDisplay]);

	const totalBridgedDisplay = React.useMemo(() => {
		if (totalBridged && totalBridged > 0) {
			const calcAmount = totalBridged / Math.pow(10, 18);
			return `${formatDisplayAmount(calcAmount)} stETH`;
		}
		return '- stETH';
	}, [totalBridged]);

	return (
		<>
			<S.Wrapper className={'border-wrapper-alt1'}>
				<S.Amounts>
					<S.AmountLine>
						<S.Amount className={'fade-in'}>
							<span>Your monthly allocation</span>
							<p>{monthlyAO}</p>
						</S.Amount>
						<S.AltAmount className={'fade-in'}>
							<S.TooltipLine>
								<span>Giga-Armstrongs</span>
								<IconButton
									type={'primary'}
									src={ASSETS.info}
									handlePress={() => setShowInfoModal(true)}
									dimensions={{ icon: 15, wrapper: 25 }}
								/>
							</S.TooltipLine>
							<p>{monthlyArms}</p>
						</S.AltAmount>
					</S.AmountLine>
					<S.AmountLine>
						<S.Amount className={'fade-in'}>
							<span>Your yearly allocation</span>
							<p>{yearlyAO}</p>
						</S.Amount>
						<S.AltAmount className={'fade-in'}>
							<S.TooltipLine>
								<span>Giga-Armstrongs</span>
								<IconButton
									type={'primary'}
									src={ASSETS.info}
									handlePress={() => setShowInfoModal(true)}
									dimensions={{ icon: 15, wrapper: 25 }}
								/>
							</S.TooltipLine>
							<p>{yearlyArms}</p>
						</S.AltAmount>
					</S.AmountLine>
				</S.Amounts>
			</S.Wrapper>
			{props.chain === 'ethereum' && (
				<S.Wrapper className={'border-wrapper-alt1'}>
					<S.Amounts>
						<S.AmountLine>
							<S.Amount className={'fade-in'}>
								<span>Yearly AO for 1 stETH</span>
								<p>{yearlyDisplay}</p>
							</S.Amount>
						</S.AmountLine>
						<S.AmountLine>
							<S.Amount className={'fade-in'}>
								<span>Total bridged stETH</span>
								<p>{totalBridgedDisplay}</p>
							</S.Amount>
						</S.AmountLine>
					</S.Amounts>
				</S.Wrapper>
			)}
			{fetchingReward && (
				<S.LoadingWrapper>
					<span>{`${language.fetchingRewards}...`}</span>
					<S.Loader>
						<Loader xSm relative />
					</S.Loader>
				</S.LoadingWrapper>
			)}
			{showInfoModal && (
				<Modal header={'GIGA-ARMSTRONGS'} handleClose={() => setShowInfoModal(false)}>
					<div className={'modal-wrapper'}>
						<p>{language.gigaArmstrongInfo}</p>
					</div>
				</Modal>
			)}
		</>
	);
}
