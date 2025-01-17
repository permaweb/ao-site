import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useTheme } from 'styled-components';

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
		return [theme.colors.stats.primary, theme.colors.stats.alt1, theme.colors.stats.alt2];
	}, [theme]);

	const [data, setData] = React.useState<any>(null);

	const ALLOCATION = [
		{ label: 'PI', value: allocationProvider.pi },
		{ label: 'AO', value: allocationProvider.ao },
		{ label: 'Arweave', value: allocationProvider.arweave },
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
				borderColor: [theme.colors.border.alt1],
				borderWidth: 1,
			});

			setData(pieData);
		}
	}, [allocationProvider, theme]);

	return (
		<S.Wrapper>
			<S.Header>
				<span className={'primary-text'}>Allocation</span>
			</S.Header>
			<S.Body>
				{data && (
					<S.ChartWrapper>
						<S.ChartHeader>
							<span className={'primary-text'}>Below represents how you are currently allocating your AO Yield.</span>
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
				)}
			</S.Body>
		</S.Wrapper>
	);
}
