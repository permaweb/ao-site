import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useTheme } from 'styled-components';

import { Button } from 'components/atoms/Button';
import { AO, ASSETS } from 'helpers/config';
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

	const emptyData = React.useMemo(
		() => ({
			labels: ['Empty'],
			datasets: [
				{
					data: [1],
					backgroundColor: [theme.colors.border.primary],
					borderColor: ['rgba(1, 1, 1, 0.1)'],
					borderWidth: 0,
				},
			],
		}),
		[theme]
	);

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
			theme.colors.stats.alt11,
			theme.colors.stats.alt12,
			theme.colors.stats.alt13,
			theme.colors.stats.alt14,
			theme.colors.stats.alt15,
			theme.colors.stats.alt16,
			theme.colors.stats.alt17,
		];
	}, [theme]);

	const coreMap = React.useMemo(
		() => ({
			ao: { color: theme.colors.stats.alt1, label: 'AO', id: arProvider?.walletAddress || '' },
			pi: { color: theme.colors.stats.primary, label: 'PI', id: AO.piProcess },
			arweave: { color: theme.colors.stats.alt2, label: 'AR', id: '' },
		}),
		[theme, arProvider?.walletAddress]
	);

	const { coreRecords, ecosystemRecords } = React.useMemo(() => {
		if (!arProvider.walletAddress) return { coreRecords: [], ecosystemRecords: [] };

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
	}, [arProvider.walletAddress, allocationProvider?.records, coreMap]);

	const sortedRecords = React.useMemo(() => {
		return [...coreRecords, ...ecosystemRecords];
	}, [coreRecords, ecosystemRecords]);

	const assignedColors = React.useMemo(() => new Set(Object.values(coreMap).map((c) => c.color)), [coreMap]);
	const availableColors = React.useMemo(
		() => keys.filter((color) => !assignedColors.has(color)),
		[keys, assignedColors]
	);

	React.useEffect(() => {
		if (!arProvider.walletAddress) setData(null);

		if (allocationProvider && sortedRecords.length > 0) {
			const pieData: any = {
				labels: sortedRecords.map((record: AllocationRecordType) => record.label),
				datasets: [],
			};

			const assignedColorsSet = new Set(Object.values(coreMap).map((c) => c.color));
			const availableColorsForPie = keys.filter((color) => !assignedColorsSet.has(color));
			const backgroundColors = sortedRecords.map((record: AllocationRecordType, index: number) => {
				const coreEntry = Object.values(coreMap).find((c) => c.id === record.id);
				return coreEntry?.color || availableColorsForPie[index % availableColorsForPie.length];
			});

			pieData.datasets.push({
				data: sortedRecords.map((record: AllocationRecordType) => record.value),
				backgroundColor: backgroundColors,
				borderColor: backgroundColors.map(() => 'rgb(0, 0, 0, 0.1)'),
				borderWidth: 1,
			});

			setData(pieData);
		}
	}, [arProvider.walletAddress, sortedRecords, coreMap, keys, theme]);

	function renderAdjustmentButtons(record: AllocationRecordType) {
		const canRemove = allocationProvider.records && allocationProvider.records.length > 1;
		return (
			<S.SummaryLineActions>
				<Button
					type={'primary'}
					label={'×'}
					tooltip={language.remove}
					handlePress={() => allocationProvider.removeToken(record)}
					disabled={!canRemove || allocationProvider.isTokenDisabled(record)}
				/>
				<Button
					type={'primary'}
					label={'+5%'}
					handlePress={() => allocationProvider.adjustTokenByPercentage(record, 5)}
					disabled={allocationProvider.isTokenDisabled(record) || record.value >= 0.95}
					labelColor={theme.colors.indicator.active}
				/>
				<Button
					type={'primary'}
					label={'-5%'}
					handlePress={() => allocationProvider.adjustTokenByPercentage(record, -5)}
					disabled={allocationProvider.isTokenDisabled(record) || record.value <= 0.05}
				/>
			</S.SummaryLineActions>
		);
	}

	const hasAllocationData = Boolean(data && allocationProvider.records?.length > 0);
	const isWalletConnected = Boolean(arProvider.walletAddress);

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

						{hasAllocationData ? (
							<S.Chart>
								<Pie
									data={data}
									options={{
										animation: {
											duration: 0,
										},
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
							<>
								<S.Chart style={{ opacity: 0.45, filter: 'grayscale(35%)', pointerEvents: 'none' }}>
									<Pie
										data={emptyData}
										options={{
											animation: {
												duration: 0,
											},
											plugins: {
												legend: {
													display: false,
												},
												tooltip: {
													enabled: false,
												},
											},
										}}
									/>
								</S.Chart>
								{isWalletConnected ? (
									<S.InfoWrapper>
										<p>{allocationProvider?.records !== null ? 'No Records Found' : 'Loading...'}</p>
									</S.InfoWrapper>
								) : null}
							</>
						)}
					</S.ChartWrapper>
					{isWalletConnected ? (
						<S.SummaryWrapper>
							<S.SummaryHeader>
								<span>{language.summary}</span>
								<S.ActionReset>
									<Button
										type={'alt2'}
										label={language.reset}
										icon={ASSETS.exchange}
										iconLeftAlign
										handlePress={() => allocationProvider.resetPreferences()}
										disabled={!isWalletConnected || allocationProvider.loading || !allocationProvider.unsavedChanges}
									/>
								</S.ActionReset>
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
													{renderAdjustmentButtons(record)}
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
											const backgroundColor = availableColors[(index + coreRecords.length) % availableColors.length];

											return (
												<S.SummaryLine key={`ecosystem-${index}`}>
													<S.SummaryLineLabel>
														<S.ChartKey background={backgroundColor} />
														<span>{record.label}</span>
													</S.SummaryLineLabel>
													<S.SummaryLineActionsWrapper>
														{renderAdjustmentButtons(record)}
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
					) : null}
				</S.Body>
			</S.Wrapper>
			<S.ActionMain>
				<S.ActionSave>
					<Button
						type={'alt1'}
						label={isWalletConnected ? language.saveChanges : 'Connect Wallet For Your Allocation'}
						handlePress={() => allocationProvider.savePreferences()}
						disabled={!isWalletConnected || allocationProvider.loading || !allocationProvider.unsavedChanges}
						loading={allocationProvider.loading}
						height={60}
						fullWidth
					/>
				</S.ActionSave>
			</S.ActionMain>
		</>
	);
}
