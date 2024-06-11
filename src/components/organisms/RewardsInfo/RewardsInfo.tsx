import React from 'react';

import { Loader } from 'components/atoms/Loader';
import { TOKEN_DENOMINATION } from 'helpers/config';
import { formatDisplayAmount } from 'helpers/utils';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';
import { IProps } from './types';

export default function RewardsInfo(props: IProps) {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	// ARMS
	const [dailyReward, setDailyReward] = React.useState<number | null>(null);

	React.useEffect(() => {
		setDailyReward(props.dailyReward);
	}, [props.dailyReward]);

	const dailyAO = React.useMemo(() => {
		if (dailyReward && dailyReward > 0) {
			const calcAmount = dailyReward / TOKEN_DENOMINATION;
			return `${formatDisplayAmount(calcAmount)} AO`;
		}
		return `${formatDisplayAmount(dailyReward)} AO`;
	}, [dailyReward]);

	const dailyArms = React.useMemo(() => {
		if (dailyReward && dailyReward > 0) {
			return formatDisplayAmount(dailyReward);
		}
		return '-';
	}, [dailyReward]);

	const monthlyAO = React.useMemo(() => {
		if (dailyReward && dailyReward > 0) {
			const calcAmount = (dailyReward * 30) / TOKEN_DENOMINATION;
			return `${formatDisplayAmount(calcAmount)} AO`;
		}
		return `${formatDisplayAmount(dailyReward)} AO`;
	}, [dailyReward]);

	const monthlyArms = React.useMemo(() => {
		if (dailyReward && dailyReward > 0) {
			const calcAmount = dailyReward * 30;
			return formatDisplayAmount(calcAmount);
		}
		return '-';
	}, [dailyReward]);

	return (
		<>
			<S.Wrapper className={'border-wrapper-alt1'}>
				<S.Amounts>
					<S.AmountLine>
						<S.Amount className={'fade-in'}>
							<span>Daily AO</span>
							<p>{dailyAO}</p>
						</S.Amount>
						<S.AltAmount className={'fade-in'}>
							<span>Daily Giga-Armstrongs</span>
							<p>{dailyArms}</p>
						</S.AltAmount>
					</S.AmountLine>
					<S.AmountLine>
						<S.Amount className={'fade-in'}>
							<span>Monthly AO</span>
							<p>{monthlyAO}</p>
						</S.Amount>
						<S.AltAmount className={'fade-in'}>
							<span>Monthly Giga-Armstrongs</span>
							<p>{monthlyArms}</p>
						</S.AltAmount>
					</S.AmountLine>
				</S.Amounts>
			</S.Wrapper>
			{props.fetchingReward && (
				<S.LoadingWrapper>
					<span>{`${language.fetchingRewards}...`}</span>
					<S.Loader>
						<Loader xSm relative />
					</S.Loader>
				</S.LoadingWrapper>
			)}
		</>
	);
}
