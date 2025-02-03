import { Line } from 'react-chartjs-2';
import {
	CategoryScale,
	Chart as ChartJS,
	Filler,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js';
import { useTheme } from 'styled-components';

import * as S from './styles';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const MONTHS = 2400;

const simulateTokenDistribution = (
	initialSupply: number,
	initialExisting: number,
	monthlyRate: number,
	months: number
) => {
	const data = [];
	let remainingSupply = initialSupply - initialExisting;
	let existingTokens = initialExisting;

	for (let i = 0; i < months; i++) {
		const newlyMinted = remainingSupply * monthlyRate;
		existingTokens += newlyMinted;
		remainingSupply -= newlyMinted;
		data.push(existingTokens);
	}

	return data;
};

// TODO: Check values
export default function SupplyChart() {
	const theme = useTheme();

	const totalSupply = simulateTokenDistribution(21e6, 1.0387e6, 0.01425, MONTHS);

	const chartData = {
		labels: Array.from({ length: MONTHS }, (_, i) => i),
		datasets: [
			{
				label: 'Distributed to Community',
				data: totalSupply.slice(0, MONTHS),
				fill: true,
				backgroundColor: theme.colors.container.alt1.background,
				borderColor: theme.colors.indicator.primary,
				pointBackgroundColor: theme.colors.indicator.primary,
				pointBorderColor: theme.colors.indicator.primary,
				pointRadius: 1,
				lineTension: 0.1,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				title: {
					display: false,
					text: 'Years',
				},
				ticks: {
					display: false,
					callback: function (value: number) {
						const years = (value / 12).toFixed(0);
						return `${years}`;
					},
				},
				grid: {
					display: false,
					drawBorder: false,
					drawOnChartArea: false,
				},
				border: {
					display: false,
				},
				min: 0,
				max: 160,
			},
			y: {
				min: 0,
				max: 21000000,
				title: {
					display: false,
				},
				ticks: {
					display: false,
					stepSize: 5250000,
					callback: function (value: number) {
						switch (value) {
							case 0:
								return '0';
							case 5250000:
								return '5.25m';
							case 10500000:
								return '11m';
							case 15750000:
								return '15.75m';
							case 21000000:
								return '21m';
							default:
								return '';
						}
					},
				},
				grid: {
					display: false,
					drawBorder: false,
					drawOnChartArea: false,
				},
				border: {
					display: false,
				},
			},
		},
		plugins: {
			grid: {
				display: false,
			},
			tooltip: {
				callbacks: {
					label: function (context: any) {
						let label = '';
						if (context.parsed.y !== null) {
							label += new Intl.NumberFormat('en-US', { style: 'decimal' }).format(context.parsed.y / 1e6) + 'M';
						}
						return label;
					},
					title: function (context: any) {
						if (context && context.length) {
							const totalMonths = context[0].dataIndex;
							const years = Math.floor(totalMonths / 12);
							const months = totalMonths % 12;
							return `${years} years ${months} months`;
						}
						return '';
					},
					labelColor: function (context: any) {
						return {
							borderColor: context.dataset.borderColor,
							backgroundColor: context.dataset.borderColor,
							borderWidth: 2,
							borderRadius: 2,
							padding: 5,
						};
					},
				},
			},
			legend: {
				display: false,
				labels: {
					usePointStyle: true,
				},
			},
		},
	};

	return (
		<S.Wrapper>
			<Line data={chartData} options={options} />
		</S.Wrapper>
	);
}
