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
	const flexBullet: React.CSSProperties = { display: 'flex', width: '100%', alignItems: 'start', gap: '10px' };
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

	const videoWrapper: React.CSSProperties = {
		display: 'flex',
		width: '100%',
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
				<img src={tokenEmissions} alt="token-emissions" width={'50%'} />
			</div>
			<Divider />{' '}
			<div style={flex}>
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
				<div
					style={{
						position: 'relative',
						display: 'flex',
						justifyContent: 'start',
						width: '50%',
					}}
					ref={pieChartRef}
				>
					{/* Only render the chart when it's in view */}
					{pieChartInView && <Pie data={pieData} options={pieOptions} />}
				</div>
			</div>
			<Divider />{' '}
			<div style={videoWrapper}>
				<iframe
					src="https://odysee.com/$/embed/@AO:4/ao_tokenomics-(1440p)_v1:9?r=GovBscmXVLs3avGjcR1f5ktd6X8Ehgqo"
					allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
					style={{ width: '100%', aspectRatio: '16/9' }}
					title="AO Tokenomics"
				></iframe>
			</div>
		</section>
	);
};

export default Tokenomics;
