import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';

ChartJS.register(ArcElement, Tooltip, Legend);

interface AllocationItem {
	token: string;
	percentage: number;
	color?: string;
}

interface AllocationPieChartProps {
	data: AllocationItem[];
}

const ChartContainer = styled.div`
	width: 100%;
	height: 250px;
	position: relative;
	padding: 20px;
`;

export function AllocationPieChart({ data }: AllocationPieChartProps) {
	const hasAllocations = data.some((item) => item.percentage > 0);

	const totalAllocated = data.reduce((sum, item) => sum + item.percentage, 0);
	const unallocatedPercentage = Math.max(0, 100 - totalAllocated);

	const chartData = useMemo(() => {
		if (!hasAllocations) {
			return {
				labels: ['Unallocated'],
				datasets: [
					{
						data: [100],
						backgroundColor: ['rgba(40, 40, 40, 0.2)'],
						borderWidth: 0,
					},
				],
			};
		}

		const chartData = [...data];
		if (unallocatedPercentage > 0) {
			chartData.push({
				token: 'Unallocated',
				percentage: unallocatedPercentage,
				color: 'rgba(40, 40, 40, 0.2)',
			});
		}

		return {
			labels: chartData.map((item) => item.token),
			datasets: [
				{
					data: chartData.map((item) => item.percentage),
					backgroundColor: chartData.map((item) => item.color || '#F2F2F2'),
					borderWidth: 0,
				},
			],
		};
	}, [data, hasAllocations, unallocatedPercentage]);

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				callbacks: {
					label: (context: any) => {
						if (!hasAllocations) {
							return 'Add allocations using the +5% buttons below';
						}
						return `${context.label}: ${context.raw.toFixed(1)}%`;
					},
				},
			},
		},
		cutout: '40%',
	};

	return (
		<ChartContainer>
			<Pie data={chartData} options={options} />
		</ChartContainer>
	);
}
