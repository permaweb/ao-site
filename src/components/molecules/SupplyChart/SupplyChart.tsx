import React from 'react';
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

import { useAOProvider } from 'providers/AOProvider';

import * as S from './styles';

// Custom plugin to draw crosshair lines, an intersection dot, and a static vertical line
const crosshairPlugin = {
	id: 'crosshairPlugin',
	afterDatasetsDraw(chart: any, _args: any, pluginOptions: any) {
		const { ctx, scales } = chart;

		// Draw static current supply vertical line if currentMonth > 0
		if (pluginOptions.currentMonth !== undefined && pluginOptions.currentMonth > 0) {
			const currentMonthValue = pluginOptions.currentMonth;
			const xCoord = scales.x.getPixelForValue(currentMonthValue);
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(xCoord, scales.y.top);
			ctx.lineTo(xCoord, scales.y.bottom);
			ctx.lineWidth = pluginOptions.currentLine?.lineWidth ?? 2;
			ctx.strokeStyle = pluginOptions.currentLine?.borderColor || 'red';
			if (pluginOptions.currentLine?.borderDash) {
				ctx.setLineDash(pluginOptions.currentLine.borderDash);
			}
			ctx.stroke();
			ctx.restore();
		}

		// Draw hover crosshair if an active element exists
		const activeElement = chart.$activeElement;
		if (activeElement) {
			const x = activeElement.x;
			const y = activeElement.y;
			const topY = scales.y.top;
			const bottomY = scales.y.bottom;
			const leftX = scales.x.left;
			const rightX = scales.x.right;

			ctx.save();

			// Vertical line for hover
			ctx.beginPath();
			ctx.moveTo(x, topY);
			ctx.lineTo(x, bottomY);
			ctx.lineWidth = pluginOptions?.verticalLine?.lineWidth ?? 1;
			ctx.strokeStyle = pluginOptions?.verticalLine?.borderColor || 'black';
			if (pluginOptions?.verticalLine?.borderDash) {
				ctx.setLineDash(pluginOptions.verticalLine.borderDash);
			}
			ctx.stroke();

			// Horizontal line for hover
			ctx.beginPath();
			ctx.moveTo(leftX, y);
			ctx.lineTo(rightX, y);
			ctx.lineWidth = pluginOptions?.horizontalLine?.lineWidth ?? 1;
			ctx.strokeStyle = pluginOptions?.horizontalLine?.borderColor || 'black';
			if (pluginOptions?.horizontalLine?.borderDash) {
				ctx.setLineDash(pluginOptions.horizontalLine.borderDash);
			}
			ctx.stroke();

			// Intersection dot for hover
			const dotRadius = pluginOptions?.crosshairDot?.radius ?? 5;
			const dotColor = pluginOptions?.crosshairDot?.color || 'black';
			ctx.beginPath();
			ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
			ctx.fillStyle = dotColor;
			ctx.fill();
			ctx.setLineDash([]);
			ctx.strokeStyle = pluginOptions?.crosshairDot?.borderColor || 'white';
			ctx.lineWidth = pluginOptions?.crosshairDot?.borderWidth ?? 2;
			ctx.stroke();

			ctx.restore();
		}
	},
};

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
	crosshairPlugin
);

const MONTHS = 192;

const simulateTokenDistribution = (initialSupply: number, monthlyRate: number, months: number) => {
	const data: number[] = [];
	let remainingSupply = initialSupply;
	let mintedTokens = 0;

	for (let i = 0; i < months; i++) {
		const newlyMinted = remainingSupply * monthlyRate;
		mintedTokens += newlyMinted;
		remainingSupply -= newlyMinted;
		data.push(mintedTokens);
	}
	return data;
};

export default function SupplyChart(props: {
	currentValue: { months: number; supply: number };
	setCurrentValue: (value: { months: number; supply: number }) => void;
	setCurrentMonth: (value: number) => void;
	handleReset: () => void;
}) {
	const theme = useTheme();
	const aoProvider = useAOProvider();

	const chartRef = React.useRef<any>(null);

	const totalSupply = React.useMemo(() => {
		return simulateTokenDistribution(21e6, 0.01436, MONTHS);
	}, []);

	const [currentMonthIndex, setCurrentMonthIndex] = React.useState<number | null>(null);

	const chartData = {
		labels: Array.from({ length: MONTHS }, (_, i) => i),
		datasets: [
			{
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

	const handleReset = React.useCallback(() => {
		if (chartRef.current) {
			chartRef.current.$activeElement = null;
			chartRef.current.update();
		}
		props.handleReset();
	}, [props]);

	React.useEffect(() => {
		let currentMonth = totalSupply.findIndex((supply) => supply >= aoProvider.mintedSupply);
		if (currentMonth === -1) {
			currentMonth = totalSupply.length - 1;
		}
		setCurrentMonthIndex(currentMonth);
	}, [totalSupply, aoProvider.mintedSupply]);

	React.useEffect(() => {
		props.setCurrentMonth(currentMonthIndex);
	}, [currentMonthIndex, aoProvider.mintedSupply]);

	React.useEffect(() => {
		const chartInstance = chartRef.current;
		const canvas = chartInstance?.canvas;
		if (canvas) {
			canvas.addEventListener('mouseleave', handleReset);
		}
		return () => {
			if (canvas) {
				canvas.removeEventListener('mouseleave', handleReset);
			}
		};
	}, [handleReset]);

	const getTokenReleaseDate = React.useCallback(() => {
		if (currentMonthIndex === null) return new Date();
		const release = new Date();
		release.setMonth(release.getMonth() - currentMonthIndex);
		return release;
	}, [currentMonthIndex]);

	const handleHover = React.useCallback(
		(_event: any, activeElements: any[], chart: any) => {
			if (!activeElements || activeElements.length === 0) {
				chart.$activeElement = null;
				props.handleReset();
				return;
			}

			if (activeElements && activeElements.length > 0) {
				const activeElem = activeElements[0].element;
				chart.$activeElement = activeElem;
				const xIndex = chart.scales.x.getValueForPixel(activeElem.x);
				const yIndex = chart.scales.y.getValueForPixel(activeElem.y);
				if (xIndex !== null && yIndex !== null) {
					const supply = yIndex;
					if (props.currentValue?.supply - supply !== 0) {
						const tokenReleaseDate = getTokenReleaseDate();
						const hoveredDate = new Date(tokenReleaseDate);
						hoveredDate.setMonth(hoveredDate.getMonth() + xIndex);
						const monthsFromNow = xIndex - currentMonthIndex;
						props.setCurrentValue({ months: monthsFromNow, supply });
					}
				}
			} else {
				chart.$activeElement = null;
			}
		},
		[props.currentValue]
	);

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			tooltip: { enabled: false },
			legend: { display: false, labels: { usePointStyle: true } },
			crosshairPlugin: {
				verticalLine: {
					lineWidth: 1.5,
					borderColor: theme.colors.border.alt2,
					borderDash: [0, 0],
				},
				horizontalLine: {
					lineWidth: 1,
					borderColor: theme.colors.border.alt5,
					borderDash: [3, 2],
				},
				crosshairDot: {
					radius: 5,
					color: theme.colors.view.background,
					borderColor: theme.colors.border.alt5,
					borderWidth: 2,
					borderDash: [0, 0],
				},
				currentMonth: currentMonthIndex > 0 ? currentMonthIndex : undefined,
				currentLine: {
					lineWidth: 1.5,
					borderColor: theme.colors.border.alt2,
					borderDash: [3, 2],
				},
			},
		},
		interaction: {
			mode: 'index' as const,
			intersect: false,
		},
		scales: {
			x: {
				title: { display: false, text: 'Years' },
				ticks: {
					display: false,
					callback: function (value: number) {
						const years = (value / 12).toFixed(0);
						return `${years}`;
					},
				},
				grid: { display: false, drawBorder: false, drawOnChartArea: false },
				border: { display: false },
				min: 0,
				max: 160,
			},
			y: {
				min: 0,
				max: 21000000,
				title: { display: false },
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
				grid: { display: false, drawBorder: false, drawOnChartArea: false },
				border: { display: false },
			},
		},
		onHover: handleHover,
	};

	return (
		<S.Wrapper>
			<Line ref={chartRef} data={chartData} options={options} />
		</S.Wrapper>
	);
}
