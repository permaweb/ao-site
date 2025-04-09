import { CategoryScale, Chart as ChartJS, Filler, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js';
import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

import { Skeleton } from './LoadingSkeletons';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

export interface StandardChartData {
	labels: string[];
	datasets: {
		data: number[];
		borderColor: string;
		backgroundColor: string;
		fill: boolean;
		tension: number;
		pointRadius: number;
		borderWidth: number;
	}[];
}

interface TrendChartProps {
	height?: number;
	width?: number;
	data?: StandardChartData;
	chartColor?: string;
	isLoading?: boolean;
}

const ChartContainer = styled.div<{ height: number; width: number }>`
	width: ${(props) => props.width}px;
	height: ${(props) => props.height}px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export function TrendChart({
	height = 150,
	width = 130,
	data,
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
	}, [chartColor, height, data]);

	const defaultChartData: StandardChartData = {
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

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: { display: false },
			tooltip: {
				enabled: true,
				mode: 'nearest' as const,
				intersect: false,
				backgroundColor: 'rgba(0, 0, 0, 0.7)',
				titleFont: { size: 12 },
				bodyFont: { size: 11 },
				padding: 8,
				displayColors: false,
				callbacks: {
					title: (items: any) => items[0].label || 'Unknown',
					label: (context: any) => context.raw.toLocaleString(),
				},
			},
		},
		scales: {
			x: { display: false },
			y: { display: false },
		},
		hover: { mode: 'nearest' as const, intersect: false },
	};

	if (isLoading || !data || data.labels.length === 0) {
		return (
			<ChartContainer height={height} width={width}>
				<Skeleton width="100%" height={height} />
			</ChartContainer>
		);
	}

	return (
		<ChartContainer height={height} width={width}>
			<Line ref={chartRef} data={data || defaultChartData} options={options} />
		</ChartContainer>
	);
}
