import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useTheme } from 'styled-components';

import { Button } from 'components/atoms/Button';
import { AO } from 'helpers/config';
import { AllocationRecordType } from 'helpers/types';
import { formatPercentage } from 'helpers/utils';
import { useAllocationProvider } from 'providers/AllocationProvider';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DelegateSummary() {
	const theme = useTheme();

	const arProvider = useArweaveProvider();
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

	const coreMap = React.useMemo(
		() => ({
			ao: { color: theme.colors.stats.alt1, label: 'AO', id: arProvider?.walletAddress || '' },
			pi: { color: theme.colors.stats.primary, label: 'PI', id: AO.piProcess },
			arweave: { color: theme.colors.stats.alt3, label: 'AR', id: '' },
		}),
		[theme, arProvider?.walletAddress]
	);

	const { coreRecords, ecosystemRecords } = React.useMemo(() => {
		const coreIds = Object.values(coreMap).map((c) => c.id);
		const recordsMap = new Map(allocationProvider?.records?.map((r) => [r.id, r]) || []);

		const core: AllocationRecordType[] = [];
		const ecosystem: AllocationRecordType[] = [];

		// Add core projects first (up to 3)
		Object.values(coreMap).forEach((coreProject) => {
			const existingRecord = recordsMap.get(coreProject.id);
			if (existingRecord) {
				core.push(existingRecord);
			} else {
				// Add core project with 0% allocation if not in records
				core.push({ id: coreProject.id, label: coreProject.label, value: 0 });
			}
		});

		// Add remaining non-core projects
		allocationProvider?.records?.forEach((record) => {
			if (!coreIds.includes(record.id)) {
				ecosystem.push(record);
			}
		});

		return { coreRecords: core, ecosystemRecords: ecosystem };
	}, [allocationProvider?.records, coreMap]);

	const sortedRecords = React.useMemo(() => {
		return [...coreRecords, ...ecosystemRecords];
	}, [coreRecords, ecosystemRecords]);

	React.useEffect(() => {
		if (allocationProvider && sortedRecords.length > 0) {
			const pieData: any = {
				labels: sortedRecords.map((record: AllocationRecordType) => record.label),
				datasets: [],
			};

			const assignedColors = new Set(Object.values(coreMap).map((c) => c.color));
			const availableColors = keys.filter((color) => !assignedColors.has(color));
			const backgroundColors = sortedRecords.map((record: AllocationRecordType, index: number) => {
				const coreEntry = Object.values(coreMap).find((c) => c.id === record.id);
				return coreEntry?.color || availableColors[index % availableColors.length];
			});

			pieData.datasets.push({
				data: sortedRecords.map((record: AllocationRecordType) => record.value),
				backgroundColor: backgroundColors,
				borderColor: [theme.colors.border.alt3],
				borderWidth: 1.15,
			});

			setData(pieData);
		}
	}, [sortedRecords, coreMap, keys, theme]);

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

	return (
		<>
			<S.Wrapper className={'border-wrapper-primary'}>
				<S.Header>
					<span>{language.allocation}</span>
				</S.Header>
				<S.Body>
					<S.ChartWrapper>
						<S.ChartHeader>
							<span>{language.allocationSummaryDescription}</span>
						</S.ChartHeader>

						{data && allocationProvider.records?.length > 0 ? (
							<S.Chart>
								<Pie
									data={data}
									options={{
										animation: false as any,
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
						) : (
							<S.InfoWrapper>
								<p>
									{!arProvider.walletAddress
										? 'Wallet Not Connected'
										: allocationProvider?.records !== null
										? 'No Records Found'
										: 'Loading...'}
								</p>
							</S.InfoWrapper>
						)}
					</S.ChartWrapper>
					<S.SummaryWrapper>
						<S.SummaryHeader>
							<span>{language.summary}</span>
						</S.SummaryHeader>
						<S.SummarySubheader>
							<span>Core Tokens</span>
						</S.SummarySubheader>
						<S.SummaryBody>
							{coreRecords
								.filter((record) => record.value > 0)
								.map((record: AllocationRecordType, index: number) => {
									const coreEntry = Object.values(coreMap).find((c) => c.id === record.id);
									const backgroundColor = coreEntry?.color || keys[index % keys.length];

									return (
										<S.SummaryLine key={`core-${index}`}>
											<S.SummaryLineLabel>
												<S.ChartKey background={backgroundColor} />
												<span>{record.label}</span>
											</S.SummaryLineLabel>
											<S.SummaryLineActionsWrapper>
												<S.SummaryLineActions>
													<Button
														type={'alt2'}
														label={language.none}
														handlePress={() => allocationProvider.removeToken(record)}
														disabled={true}
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
						<S.SummaryDivider />
						<S.SummarySubheader>
							<span>Ecosystem Projects</span>
						</S.SummarySubheader>
						<S.SummaryBody>
							{ecosystemRecords.length > 0 ? (
								<>
									{ecosystemRecords.map((record: AllocationRecordType, index: number) => {
										const backgroundColor = keys[(index + 3) % keys.length];

										return (
											<S.SummaryLine key={`ecosystem-${index}`}>
												<S.SummaryLineLabel>
													<S.ChartKey background={backgroundColor} />
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
								</>
							) : (
								<S.SummaryInfoLine>
									<span>No Allocations</span>
								</S.SummaryInfoLine>
							)}
						</S.SummaryBody>
					</S.SummaryWrapper>
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
	);
}
