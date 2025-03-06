import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useTheme } from 'styled-components';

import { Button } from 'components/atoms/Button';
import { AllocationRecordType } from 'helpers/types';
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

	const colorMap: Record<string, string> = {
		pi: theme.colors.stats.primary,
		ao: theme.colors.stats.alt1,
		arweave: theme.colors.stats.alt3,
	};

	React.useEffect(() => {
		if (allocationProvider) {
			const pieData: any = {
				labels: allocationProvider.records?.map((record: AllocationRecordType) => record.label),
				datasets: [],
			};

			const assignedColors = new Set(Object.values(colorMap));
			const availableColors = keys.filter((color) => !assignedColors.has(color));
			const backgroundColors = allocationProvider.records.map((record: AllocationRecordType, index: number) => {
				return colorMap[record.id] || availableColors[index % availableColors.length];
			});

			pieData.datasets.push({
				data: allocationProvider.records?.map((record: AllocationRecordType) => record.value),
				backgroundColor: backgroundColors,
				borderColor: [theme.colors.border.alt4],
				borderWidth: 1.15,
			});

			setData(pieData);
		}
	}, [allocationProvider, theme]);

	function getMultiplier(record: AllocationRecordType, amount: number) {
		return (
			<Button
				type={'alt2'}
				id={'indicator'}
				label={`${amount}x`}
				handlePress={() => allocationProvider.updateToken(record, amount)}
				disabled={allocationProvider.isTokenDisabled(record) || record.value * amount > 1}
			/>
		);
	}

	return data ? (
		<>
			<S.Wrapper className={'border-wrapper-alt1'}>
				<S.Header>
					<span>{language.allocation}</span>
				</S.Header>
				<S.Body>
					{data && (
						<>
							<S.ChartWrapper>
								<S.ChartHeader>
									<span>{language.allocationSummaryDescription}</span>
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
														<Button
															type={'alt2'}
															label={language.none}
															handlePress={() => allocationProvider.removeToken(record)}
															disabled={allocationProvider.isTokenDisabled(record)}
														/>
														{getMultiplier(record, 2)}
														{getMultiplier(record, 4)}
														<Button
															type={'alt2'}
															id={'indicator'}
															label={language.all}
															handlePress={() => allocationProvider.updateToken(record, 'max')}
															disabled={allocationProvider.isTokenDisabled(record)}
														/>
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
			<S.ActionMain>
				<Button
					type={'alt1'}
					label={language.saveChanges}
					handlePress={() => allocationProvider.savePreferences()}
					disabled={allocationProvider.loading || !allocationProvider.unsavedChanges}
					loading={allocationProvider.loading}
					height={60}
					fullWidth
				/>
			</S.ActionMain>
		</>
	) : null;
}
