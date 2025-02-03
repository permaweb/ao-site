import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useTheme } from 'styled-components';

import { Button } from 'components/atoms/Button';
import { AllocationRecordType } from 'helpers/types';
import { formatPercentage } from 'helpers/utils';
import { useAllocationProvider } from 'providers/AllocationProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

ChartJS.register(ArcElement, Tooltip, Legend);

// TODO: SummaryLineActions
export default function AllocationSummary() {
	const theme = useTheme();

	const allocationProvider = useAllocationProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [data, setData] = React.useState<any>(null);

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

	React.useEffect(() => {
		if (allocationProvider) {
			const pieData: any = {
				labels: allocationProvider.records?.map((record: AllocationRecordType) => record.label),
				datasets: [],
			};

			pieData.datasets.push({
				data: allocationProvider.records?.map((record: AllocationRecordType) => record.value),
				backgroundColor: keys,
				borderColor: [theme.colors.border.alt4],
				borderWidth: 1,
			});

			setData(pieData);
		}
	}, [allocationProvider, theme]);

	return data ? (
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
						</S.ChartWrapper>
						<S.SummaryWrapper>
							<S.SummaryHeader>
								<span>{language.summary}</span>
							</S.SummaryHeader>
							<S.SummaryBody>
								{allocationProvider.records?.map((record: AllocationRecordType, index: number) => {
									return (
										<S.SummaryLine key={index}>
											<S.SummaryLineLabel>
												<S.ChartKey background={keys[index] ? keys[index] : null} />
												<span>{record.label}</span>
											</S.SummaryLineLabel>
											<S.SummaryLineActionsWrapper>
												<S.SummaryLineActions>
													<Button type={'alt3'} label={'None'} handlePress={() => {}} />
													<Button type={'alt3'} label={'2x'} handlePress={() => {}} active />
													<Button type={'alt3'} label={'4x'} handlePress={() => {}} active />
													<Button type={'alt3'} label={'All'} handlePress={() => {}} active />
												</S.SummaryLineActions>
												<S.SummaryLinePercentage>
													<p>{formatPercentage(record.value)}</p>
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
	) : null;
}
