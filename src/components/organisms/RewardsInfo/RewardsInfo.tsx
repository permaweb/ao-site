import React from 'react';
import Web3 from 'web3';

import { readHandler } from 'api';

import { IconButton } from 'components/atoms/IconButton';
import { Loader } from 'components/atoms/Loader';
import { Modal } from 'components/molecules/Modal';
import { AO, ASSETS, ENDPOINTS, ETH_CONTRACTS, STETH_ABI, TOKEN_DENOMINATION } from 'helpers/config';
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
								break;
							case 'ethereum':
								rewardFn = getEthReward;

								const web3 = new Web3(window.ethereum);
								await window.ethereum.enable();

								const stethContract = new web3.eth.Contract(STETH_ABI, ETH_CONTRACTS.steth);
								const totalSupply = await stethContract.methods.totalSupply().call();

								tokenSupply = Number(totalSupply);
								break;
						}

						const calcMonthlyReward = rewardFn(30, Number(provider.balance), tokenSupply, aoSupply);
						setMonthlyReward(calcMonthlyReward);

						const calcYearlyReward = rewardFn(365, Number(provider.balance), tokenSupply, aoSupply);
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
	}, [provider]);

	const monthlyAO = React.useMemo(() => {
		if (monthlyReward && monthlyReward > 0) {
			return `~ ${formatDisplayAmount(monthlyReward)} AO`;
		}
		return `${formatDisplayAmount(monthlyReward)} AO`;
	}, [monthlyReward]);

	const monthlyArms = React.useMemo(() => {
		if (monthlyReward && monthlyReward > 0) {
			const calcAmount = monthlyReward * TOKEN_DENOMINATION;
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

	const yearlyArms = React.useMemo(() => {
		if (yearlyReward && yearlyReward > 0) {
			const calcAmount = yearlyReward * TOKEN_DENOMINATION;
			return `~ ${formatDisplayAmount(calcAmount)}`;
		}
		return '-';
	}, [yearlyReward]);

	return (
		<>
			<S.Wrapper className={'border-wrapper-alt1'}>
				<S.Amounts>
					<S.AmountLine>
						<S.Amount className={'fade-in'}>
							<span>Monthly AO</span>
							<p>{monthlyAO}</p>
						</S.Amount>
						<S.AltAmount className={'fade-in'}>
							<S.TooltipLine>
								<span>Monthly Giga-Armstrongs</span>
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
							<span>Yearly AO</span>
							<p>{yearlyAO}</p>
						</S.Amount>
						<S.AltAmount className={'fade-in'}>
							<S.TooltipLine>
								<span>Yearly Giga-Armstrongs</span>
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
