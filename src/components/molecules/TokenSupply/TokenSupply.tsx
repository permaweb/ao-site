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
import parse from 'html-react-parser';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { ReactSVG } from 'react-svg';
import { useTheme } from 'styled-components';

import { Button } from 'components/atoms/Button';
import { EllipsisLoader } from 'components/atoms/EllipsisLoader';
import { Panel } from 'components/atoms/Panel';
import { ASSETS, REDIRECTS } from 'helpers/config';
import { formatCount } from 'helpers/utils';
import { useAOProvider } from 'providers/AOProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

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

export default function TokenSupply() {
	const theme = useTheme();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];
	const aoProvider = useAOProvider();

	const [showPanel, setShowPanel] = React.useState<boolean>(false);

	const chartRef = React.useRef<any>(null);

	const [aoSupply, setAOSupply] = React.useState<{ monthsFromNow: number; amount: number } | null>(null);
	const [aoSupplyReset, setAOSupplyReset] = React.useState<{ monthsFromNow: number; amount: number } | null>(null);
	const [currentMonth, setCurrentMonth] = React.useState<number | null>(null);

	const totalSupply = React.useMemo(() => {
		return simulateTokenDistribution(21e6, 0.01436, MONTHS);
	}, []);

	const [currentMonthIndex, setCurrentMonthIndex] = React.useState<number | null>(null);

	React.useEffect(() => {
		setAOSupply({ monthsFromNow: 0, amount: aoProvider.mintedSupply });
		setAOSupplyReset({ monthsFromNow: 0, amount: aoProvider.mintedSupply });
	}, [aoProvider.mintedSupply]);

	React.useEffect(() => {
		let currentMonth = totalSupply.findIndex((supply) => supply >= aoProvider.mintedSupply);
		if (currentMonth === -1) {
			currentMonth = totalSupply.length - 1;
		}
		setCurrentMonthIndex(currentMonth);
	}, [totalSupply, aoProvider.mintedSupply]);

	React.useEffect(() => {
		setCurrentMonth(currentMonthIndex);
	}, [currentMonthIndex]);

	const getTokenReleaseDate = React.useCallback(() => {
		if (currentMonthIndex === null) return new Date();
		const release = new Date();
		release.setMonth(release.getMonth() - currentMonthIndex);
		return release;
	}, [currentMonthIndex]);

	const getSupplyDate = React.useCallback(() => {
		const tokenReleaseDate = new Date();
		tokenReleaseDate.setMonth(tokenReleaseDate.getMonth() - currentMonth);
		const supplyDate = new Date(tokenReleaseDate);
		supplyDate.setMonth(supplyDate.getMonth() + currentMonth + (aoSupply?.monthsFromNow ?? 0));

		return supplyDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
	}, [currentMonth, aoSupply]);

	const handleReset = React.useCallback(() => {
		if (chartRef.current) {
			chartRef.current.$activeElement = null;
			chartRef.current.update();
		}
		setAOSupply(aoSupplyReset);
	}, [aoSupplyReset]);

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

	const handleHover = React.useCallback(
		(_event: any, activeElements: any[], chart: any) => {
			if (!activeElements || activeElements.length === 0) {
				chart.$activeElement = null;
				handleReset();
				return;
			}

			if (activeElements && activeElements.length > 0) {
				const activeElem = activeElements[0].element;
				chart.$activeElement = activeElem;
				const xIndex = chart.scales.x.getValueForPixel(activeElem.x);
				const yIndex = chart.scales.y.getValueForPixel(activeElem.y);
				if (xIndex !== null && yIndex !== null) {
					const supply = yIndex;
					if (aoSupply?.amount - supply !== 0) {
						const tokenReleaseDate = getTokenReleaseDate();
						const hoveredDate = new Date(tokenReleaseDate);
						hoveredDate.setMonth(hoveredDate.getMonth() + xIndex);
						const monthsFromNow = xIndex - currentMonthIndex;
						setAOSupply({ monthsFromNow, amount: supply });
					}
				}
			} else {
				chart.$activeElement = null;
			}
		},
		[aoSupply, currentMonthIndex, getTokenReleaseDate, handleReset]
	);

	const createDottedPattern = React.useCallback(() => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		if (!ctx) return theme.colors.container.alt2.background;

		canvas.width = 3;
		canvas.height = 3;

		// Background color
		ctx.fillStyle = theme.colors.container.alt2.background;
		ctx.fillRect(0, 0, 3, 3);

		// Dot color
		ctx.fillStyle = theme.colors.container.alt4.background;
		ctx.beginPath();
		ctx.arc(3, 3, 1, 0, 2 * Math.PI);
		ctx.fill();

		return ctx.createPattern(canvas, 'repeat');
	}, [theme]);

	const chartData = {
		labels: Array.from({ length: MONTHS }, (_, i) => i),
		datasets: [
			{
				data: totalSupply.slice(0, MONTHS),
				fill: true,
				backgroundColor: createDottedPattern(),
				borderColor: theme.colors.chart.primary,
				pointBackgroundColor: theme.colors.chart.primary,
				pointBorderColor: theme.colors.chart.primary,
				pointRadius: 1,
				lineTension: 0.1,
			},
		],
	};

	const chartOptions = {
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
					borderColor: theme.colors.border.alt4,
					borderDash: [3, 2],
				},
				crosshairDot: {
					radius: 5,
					color: theme.colors.view.background,
					borderColor: theme.colors.border.alt4,
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
		<>
			<S.Wrapper>
				<Button
					type={'primary'}
					label={language.tokenSupply}
					handlePress={() => setShowPanel(true)}
					height={43.5}
					width={150}
				/>
			</S.Wrapper>
			<Panel
				open={showPanel}
				width={650}
				header={language.tokenSupply}
				handleClose={() => setShowPanel(false)}
				className={'modal-wrapper'}
			>
				<S.PanelWrapper>
					<S.Metrics>
						<S.MetricsSection>
							<S.MetricsValue>
								<span className={'primary-text'}>{language.totalAOSupply}</span>
							</S.MetricsValue>
							<S.MetricsValueMain>
								<ReactSVG id={'ao-logo'} src={ASSETS.ao} />
								<p>
									{aoSupply?.amount !== null ? (
										aoSupply?.amount > 0 ? (
											formatCount(aoSupply.amount.toFixed(4).toString())
										) : (
											'-'
										)
									) : (
										<EllipsisLoader />
									)}
								</p>
							</S.MetricsValueMain>
							<S.MetricsValue>
								<p>{getSupplyDate()}</p>
							</S.MetricsValue>
						</S.MetricsSection>
					</S.Metrics>
					<S.ChartWrapper>
						<Line ref={chartRef} data={chartData} options={chartOptions} />
					</S.ChartWrapper>
					<S.InfoWrapper className={'fade-in'}>
						<S.InfoHeader>
							<ReactSVG src={ASSETS.plus} />
							<p>{language.fairLaunch}</p>
						</S.InfoHeader>
						<S.InfoBody>
							<p>{parse(language.mintSubheader)}</p>
							<a href={REDIRECTS.tokenomics} target={'_blank'}>
								{language.learnMore}
							</a>
						</S.InfoBody>
					</S.InfoWrapper>
				</S.PanelWrapper>
			</Panel>
		</>
	);
}
