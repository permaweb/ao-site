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

const totalSupply = simulateTokenDistribution(21e6, 1.0387e6, 0.01425, MONTHS);

const chartData = {
	labels: Array.from({ length: MONTHS }, (_, i) => i),
	datasets: [
		{
			label: 'Distributed to Community',
			data: totalSupply.slice(0, MONTHS),
			fill: true,
			backgroundColor: 'rgba(217, 167, 62, 0.2)',
			borderColor: '#D9A73E',
			pointBackgroundColor: '#D9A73E',
			pointBorderColor: '#D9A73E',
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
				font: {
					size: 11,
					family: `'Roboto Mono', monospace`,
				},
			},
			ticks: {
				display: true,
				font: {
					size: 11,
					family: `'Roboto Mono', monospace`,
				},
				callback: function (value: number) {
					const years = (value / 12).toFixed(0);
					return `${years}`;
				},
			},
			min: 0,
			max: 300,
		},
		y: {
			title: {
				display: false,
				text: 'Token Supply (in millions)',
				font: {
					size: 11,
					family: `'Roboto Mono', monospace`,
				},
			},
			min: 0,
			max: 21000000,
			ticks: {
				display: true,
				font: {
					size: 11,
					family: `'Roboto Mono', monospace`,
				},
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
		},
	},
	plugins: {
		tooltip: {
			callbacks: {
				label: function (context: any) {
					let label = '';
					if (context.parsed.y !== null) {
						label +=
							new Intl.NumberFormat('en-US', { style: 'decimal' }).format(context.parsed.y / 1e6) +
							' million tokens minted';
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

export default function SupplyChart() {
	return (
		<S.Wrapper>
			<S.YLabel>
				<span>Total supply (in millions)</span>
			</S.YLabel>
			<Line data={chartData} options={options} />
			<S.XLabel>
				<span>Years</span>
			</S.XLabel>
		</S.Wrapper>
	);
}
