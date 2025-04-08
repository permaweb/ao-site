import { CategoryScale, Chart as ChartJS, Filler, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js';
import React, { useEffect, useMemo, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

import { formatDate } from '../../../helpers/utils';

import { Skeleton } from './LoadingSkeletons';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

interface TrendChartProps {
	height?: number;
	delegationRecords?: any[];
	dataKey?: 'totalDelegators' | 'totalDelegatedAO';
	chartColor?: string;
	isLoading?: boolean;
}

const ChartContainer = styled.div<{ height: number }>`
	width: 130px;
	height: ${(props) => props.height}px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export function TrendChart({
	height = 150,
	delegationRecords = [],
	dataKey = 'totalDelegators',
	chartColor = '#0DBD27',
	isLoading = false,
}: TrendChartProps) {
	const chartRef = useRef<ChartJS<'line'>>(null);

	useEffect(() => {
		const chart = chartRef.current;

		if (chart) {
			const ctx = chart.ctx;
			const gradient = ctx.createLinearGradient(0, 0, 0, height);
			gradient.addColorStop(0, `${chartColor}80`);
			gradient.addColorStop(0.5, `${chartColor}40`);
			gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

			if (chart.data.datasets[0]) {
				chart.data.datasets[0].backgroundColor = gradient;
				chart.update();
			}
		}
	}, [chartRef, chartColor, height, delegationRecords]);

	const chartData = useMemo(() => {
		if (!delegationRecords || delegationRecords.length === 0) {
			return {
				labels: [],
				datasets: [
					{
						data: [],
						borderColor: chartColor,
						backgroundColor: `${chartColor}33`,
						fill: true,
						tension: 0.4,
						pointRadius: 0,
						borderWidth: 1,
					},
				],
			};
		}

		const sortedRecords = [...delegationRecords]
			.filter((record) => record?.summary?.Data?.[dataKey])
			.sort((a, b) => {
				const timestampA = a?.summary?.Timestamp || 0;
				const timestampB = b?.summary?.Timestamp || 0;
				return timestampA - timestampB;
			});

		const labels = sortedRecords.map((record) =>
			record?.summary?.Timestamp ? formatDate(record.summary.Timestamp, 'dateString') : 'Unknown'
		);

		const values = sortedRecords.map((record) => {
			const value = record?.summary?.Data?.[dataKey];
			if (!value) return 0;

			return dataKey === 'totalDelegatedAO' ? parseFloat(value) / 10 ** 12 : parseInt(value);
		});

		return {
			labels,
			datasets: [
				{
					data: values,
					borderColor: chartColor,
					backgroundColor: `${chartColor}33`,
					fill: true,
					tension: 0.4,
					pointRadius: 0,
					borderWidth: 1,
				},
			],
		};
	}, [delegationRecords, dataKey, chartColor]);

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				enabled: true,
				mode: 'nearest' as const,
				intersect: false,
				backgroundColor: 'rgba(0, 0, 0, 0.7)',
				titleFont: {
					size: 12,
				},
				bodyFont: {
					size: 11,
				},
				padding: 8,
				displayColors: false,
				callbacks: {
					title: (items) => {
						if (delegationRecords && items[0].dataIndex < delegationRecords.length) {
							const record = delegationRecords[items[0].dataIndex];
							return record?.summary?.Timestamp
								? formatDate(record.summary.Timestamp, 'dateString')
								: items[0].label || 'Unknown';
						}
						return items[0].label || 'Unknown';
					},
					label: (context) => {
						let value = context.raw;
						if (dataKey === 'totalDelegatedAO') {
							return `${value.toLocaleString()} AO`;
						}
						return value.toLocaleString();
					},
				},
			},
		},
		scales: {
			x: {
				display: false,
			},
			y: {
				display: false,
			},
		},
		hover: {
			mode: 'nearest' as const,
			intersect: false,
		},
	};

	if (isLoading || !delegationRecords || delegationRecords.length === 0) {
		return (
			<ChartContainer height={height}>
				<Skeleton width="100%" height={height} />
			</ChartContainer>
		);
	}

	return (
		<ChartContainer height={height}>
			<Line ref={chartRef} data={chartData} options={options} />
		</ChartContainer>
	);
}
