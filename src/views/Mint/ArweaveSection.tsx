import React from 'react';
import { ReactSVG } from 'react-svg';

import { Button } from 'components/atoms/Button';
import { Loader } from 'components/atoms/Loader';
import { ASSETS, TOKEN_DENOMINATION } from 'helpers/config';
import { formatDisplayAmount, getArReward } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import * as S from './styles';

type ArweaveSectionProps = {
	loading: boolean;
	aoSupply: number | null;
	onMonthlyReward?: (value: number) => void;
	onYearlyReward?: (value: number) => void;
};

export function ArweaveSection(props: ArweaveSectionProps) {
	const { loading, aoSupply, onYearlyReward, onMonthlyReward } = props;

	const arProvider = useArweaveProvider();
	const [monthlyReward, setMonthlyReward] = React.useState<number | null>(null);
	const [monthlyRewardRatio, setMonthlyRewardRatio] = React.useState<number | null>(null);
	const [yearlyReward, setYearlyReward] = React.useState<number | null>(null);
	const [yearlyRewardRatio, setYearlyRewardRatio] = React.useState<number | null>(null);

	React.useEffect(() => {
		(async function () {
			if (arProvider && arProvider.walletAddress && aoSupply) {
				if (arProvider.balance !== null && arProvider.balance !== 'Error') {
					try {
						let balance = Number(arProvider.balance);
						let tokenSupply = 66000000;

						const calcMonthlyReward = getArReward(30, balance, tokenSupply, aoSupply);
						setMonthlyReward(calcMonthlyReward);
						onMonthlyReward?.(calcMonthlyReward);

						const calcYearlyReward = getArReward(365, balance, tokenSupply, aoSupply);
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
	}, [arProvider, aoSupply]);

	React.useEffect(() => {
		(async function () {
			if (aoSupply) {
				try {
					let tokenSupply = 66000000;

					setYearlyRewardRatio(getArReward(365, 1, tokenSupply, aoSupply));
					setMonthlyRewardRatio(getArReward(30, 1, tokenSupply, aoSupply));
				} catch (e: any) {
					console.error(e);
				}
			}
		})();
	}, [arProvider, aoSupply]);

	const monthlyRewardArms = React.useMemo(() => {
		if (monthlyReward && monthlyReward > 0) {
			const calcAmount = (monthlyReward * TOKEN_DENOMINATION) / 1000000000;
			return formatDisplayAmount(calcAmount);
		}
		return 'Loading...';
	}, [monthlyReward]);

	const yearlyRewardArms = React.useMemo(() => {
		if (yearlyReward && yearlyReward > 0) {
			const calcAmount = (yearlyReward * TOKEN_DENOMINATION) / 1000000000;
			return formatDisplayAmount(calcAmount);
		}
		return 'Loading...';
	}, [yearlyReward]);

	const yearlyRewardRatioArms = React.useMemo(() => {
		if (yearlyRewardRatio && yearlyRewardRatio > 0) {
			const calcAmount = (yearlyRewardRatio * TOKEN_DENOMINATION) / 1000000000;
			return `1 AR = ${formatDisplayAmount(calcAmount)}`;
		}
		return 'Loading...';
	}, [yearlyRewardRatio]);

	const monthlyRewardRatioArms = React.useMemo(() => {
		if (monthlyRewardRatio && monthlyRewardRatio > 0) {
			const calcAmount = (monthlyRewardRatio * TOKEN_DENOMINATION) / 1000000000;
			return `1 AR = ${formatDisplayAmount(calcAmount)}`;
		}
		return 'Loading...';
	}, [monthlyRewardRatio]);

	const arWalletBalance = React.useMemo(() => {
		if (!arProvider.walletAddress) return `${formatDisplayAmount(null)}`;
		if (arProvider.balance === 'Error') return arProvider.balance;
		return formatDisplayAmount(arProvider.balance);
	}, [arProvider.balance, arProvider.walletAddress]);

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
			{/* <S.Column>
				<S.Label>AO Earnings</S.Label>
				{!!arProvider.walletAddress ? (
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
				{!!arProvider.walletAddress ? (
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
					'-'
				)}
				<S.Label size="small">{monthlyRewardRatioArms}</S.Label>
			</S.Column>
			<S.Column>
				<S.Label>1 year projection</S.Label>
				{!!arProvider.walletAddress ? (
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
					'-'
				)}
				<S.Label size="small">{yearlyRewardRatioArms}</S.Label>
			</S.Column>
		</S.Section>
	);
}
