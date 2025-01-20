import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useTheme } from 'styled-components';

import { Button } from 'components/atoms/Button';
import { AllocationTokenSummaryType } from 'helpers/types';
import { formatPercentage } from 'helpers/utils';
import { useAllocationProvider } from 'providers/AllocationProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AllocationSummary() {
	const theme = useTheme();

	const allocationProvider = useAllocationProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const keys = React.useMemo(() => {
		return [
			theme.colors.stats.primary,
			theme.colors.stats.alt1,
			theme.colors.stats.alt2,
			theme.colors.stats.alt3,
			theme.colors.stats.alt4,
			theme.colors.stats.alt5,
			theme.colors.stats.alt6,
			theme.colors.stats.alt7,
			theme.colors.stats.alt8,
			theme.colors.stats.alt9,
			theme.colors.stats.alt10,
		];
	}, [theme]);

	const [data, setData] = React.useState<any>(null);

	const ALLOCATION = [
		{ label: 'Permaweb Index', value: allocationProvider.records.pi },
		{ label: 'AO', value: allocationProvider.records.ao },
		{ label: 'Arweave', value: allocationProvider.records.arweave },
	];

	React.useEffect(() => {
		if (allocationProvider) {
			const pieData: any = {
				labels: ALLOCATION.map((token: AllocationTokenSummaryType) => token.label),
				datasets: [],
			};

			pieData.datasets.push({
				data: ALLOCATION.map((token: AllocationTokenSummaryType) => token.value),
				backgroundColor: keys,
				borderColor: [theme.colors.border.alt4],
				borderWidth: 1,
			});

			setData(pieData);
		}
	}, [allocationProvider, theme]);

	return (
		<S.Wrapper>
			<S.Header>
				<span>{language.allocation}</span>
			</S.Header>
			<S.Body>
				{data && (
					<>
						<S.ChartWrapper>
							<S.ChartHeader>
								<span className={'primary-text'}>{language.allocationSummaryDescription}</span>
							</S.ChartHeader>
							<S.Chart>
								<Pie
									data={data}
									options={{
										plugins: {
											legend: {
												display: false,
											},
											tooltip: {
												callbacks: {
													label: (tooltipItem) => {
														return `${formatPercentage(tooltipItem.raw)}`;
													},
												},
											},
										},
									}}
								/>
							</S.Chart>
							<S.ChartKeyWrapper>
								{ALLOCATION.map((token: AllocationTokenSummaryType, index: number) => {
									return (
										<S.ChartKeyLine key={index}>
											<S.ChartKey background={keys[index] ? keys[index] : null} />
											<S.ChartKeyText>{token.label}</S.ChartKeyText>
											<S.Percentage>{`(${formatPercentage(token.value)})`}</S.Percentage>
										</S.ChartKeyLine>
									);
								})}
							</S.ChartKeyWrapper>
						</S.ChartWrapper>
						<S.SummaryWrapper>
							<S.SummaryHeader>
								<span>{language.summary}</span>
							</S.SummaryHeader>
							<S.SummaryBody>
								{ALLOCATION.map((token: AllocationTokenSummaryType, index: number) => {
									return (
										<S.SummaryLine key={index}>
											<S.SummaryLineLabel>
												<span>{token.label}</span>
											</S.SummaryLineLabel>
											<S.SummaryLineActionsWrapper>
												{/* <S.SummaryLineActions>
													<Button type={'alt3'} label={'None'} handlePress={() => {}} />
													<Button type={'alt3'} label={'2x'} handlePress={() => {}} active />
													<Button type={'alt3'} label={'4x'} handlePress={() => {}} active />
													<Button type={'alt3'} label={'All'} handlePress={() => {}} active />
												</S.SummaryLineActions> */}
												<S.SummaryLinePercentage>
													<p>{formatPercentage(token.value)}</p>
												</S.SummaryLinePercentage>
											</S.SummaryLineActionsWrapper>
										</S.SummaryLine>
									);
								})}
							</S.SummaryBody>
						</S.SummaryWrapper>
					</>
				)}
			</S.Body>
		</S.Wrapper>
	);
}
