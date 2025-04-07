import { CategoryScale, Chart as ChartJS, Filler, LinearScale, LineElement, PointElement } from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

interface TrendChartProps {
	height?: number;
}

const ChartContainer = styled.div<{ height: number }>`
	width: 100px;
	height: ${(props) => props.height}px;
	position: relative;
`;

export function TrendChart({ height = 150 }: TrendChartProps) {
	const data = {
		labels: Array(10).fill(''),
		datasets: [
			{
				data: [10, 15, 12, 18, 22, 19, 25, 30, 28, 35],
				borderColor: '#0DBD27',
				backgroundColor: 'rgba(13, 189, 39, 0.2)',
				fill: true,
				tension: 0.4,
				pointRadius: 0,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				enabled: false,
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
	};

	return (
		<ChartContainer height={height}>
			<Line data={data} options={options} />
		</ChartContainer>
	);
}
