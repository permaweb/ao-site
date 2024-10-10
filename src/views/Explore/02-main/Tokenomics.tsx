import { Pie } from 'react-chartjs-2';
import { useInView } from 'react-intersection-observer';
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';

import './ExploreMainStyles.css';

import tokenEmissions from '../../../assets/token_emissions.svg';

import { bulletSquare } from './Ecosystem1';
import { Divider } from './ExploreMain';

Chart.register(ArcElement, Tooltip, Legend);

const Tokenomics = () => {
	const flex: React.CSSProperties = {
		display: 'flex',
		width: '100%',
		alignItems: 'center',
		gap: '40px',
		justifyContent: 'space-between',
	};
	const flexBullet: React.CSSProperties = { display: 'flex', width: '100%', alignItems: 'center', gap: '20px' };
	const flexCol: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '20px', width: '60%' };

	const paragraph: React.CSSProperties = { marginBottom: '0' };

	// Intersection Observer Hook for Pie Chart
	const { ref: pieChartRef, inView: pieChartInView } = useInView({
		threshold: 0.5, // Chart should be halfway visible
		triggerOnce: true, // Only trigger once
	});
	// Data for Pie Chart
	const pieData = {
		labels: ['100% Community'],
		datasets: [
			{
				data: [100],
				backgroundColor: ['#F0D2BC'],
				hoverBackgroundColor: ['#C8AB97'],
			},
		],
	};

	const pieOptions = {
		plugins: {
			legend: {
				display: false,
			},
			tooltip: { enabled: false },
			animation: {
				duration: pieChartInView ? 1000 : 0, // Trigger animation when chart is in view
			},

			repsonsive: true,
			maintainAspectRatio: false,
		},
	};
	return (
		<section id="tokenomics">
			<h1 style={{ marginBottom: '100px' }}>Tokenomics</h1>
			<div style={flex}>
				<div style={flexCol}>
					<p style={paragraph}>
						<b>Max supply:</b> 21,000,000
					</p>
					<p style={paragraph}>
						{' '}
						<b>Minting:</b> 4 year halving cycle
					</p>
				</div>
				<img src={tokenEmissions} alt="token-emissions" width={'45%'} />
			</div>
			<Divider />{' '}
			<div style={flex}>
				<div
					style={{
						position: 'relative',
						display: 'flex',
						justifyContent: 'start',
						width: '30vw',
						height: '30vh',
					}}
					ref={pieChartRef}
				>
					{/* Only render the chart when it's in view */}
					{pieChartInView && <Pie data={pieData} options={pieOptions} />}
				</div>
				<div style={flexCol}>
					<p style={paragraph}>
						<b>100% Fair Launch</b>
					</p>
					<div style={flexBullet}>
						{bulletSquare}
						<p style={paragraph}> 33% automatically distributed to Arweave($AR) token holders. </p>
					</div>
					<div style={flexBullet}>
						{bulletSquare}
						<p style={paragraph}>66% minted to depositors of staked assets currently staked ETH $stETH and $DAI. </p>
					</div>
				</div>
			</div>
			<Divider showBorder />{' '}
			<div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
				<iframe
					src="https://player.vimeo.com/video/955284031?h=85f787894e&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
					allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
					style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
					title="AO Tokenomics"
				></iframe>
			</div>
		</section>
	);
};

export default Tokenomics;
