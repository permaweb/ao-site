import React from 'react';
import { ReactSVG } from 'react-svg';

import { Button } from 'components/atoms/Button';
import { Loader } from 'components/atoms/Loader';
import { ASSETS } from 'helpers/config';
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
		if (arProvider && arProvider.walletAddress && aoSupply) {
			if (arProvider.balance !== null && arProvider.balance !== 'Error') {
				try {
					let arBalance = Number(arProvider.balance);
					let arSupply = 66000000;

					const calcMonthlyReward = getArReward(30, arBalance, arSupply, aoSupply);
					setMonthlyReward(calcMonthlyReward);
					onMonthlyReward?.(calcMonthlyReward);

					const calcYearlyReward = getArReward(365, arBalance, arSupply, aoSupply);
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
	}, [arProvider, aoSupply]);

	React.useEffect(() => {
		if (aoSupply) {
			try {
				let arSupply = 66000000;

				setYearlyRewardRatio(getArReward(365, 1, arSupply, aoSupply));
				setMonthlyRewardRatio(getArReward(30, 1, arSupply, aoSupply));
			} catch (e: any) {
				console.error(e);
			}
		}
	}, [arProvider, aoSupply]);

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
						style={{ width: 'fit-content', boxShadow: '0px 4px 0px 0px #797979', border: '1px solid black' }}
						type={'alt1'}
						label={'Connect Arweave Wallet'}
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
				{!!arProvider.walletAddress && monthlyReward !== 0 ? (
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
					{monthlyRewardRatio === null ? 'Loading...' : `1 AR = ${formatDisplayAmount(monthlyRewardRatio)} AO`}
				</S.Label>
			</S.Column>
			<S.Column>
				<S.Label>1 year projection</S.Label>
				{!!arProvider.walletAddress && yearlyReward !== 0 ? (
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
					{yearlyRewardRatio === null ? 'Loading...' : `1 AR = ${formatDisplayAmount(yearlyRewardRatio)} AO`}
				</S.Label>
			</S.Column>
		</S.Section>
	);
}
