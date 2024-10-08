import React from 'react';
import { Pie } from 'react-chartjs-2';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';

import HyperTextLoad from 'components/hyperTextLoad';

import './HomeMainStyles.css';

// Register Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const Community = () => {
	// Styles
	const textWrapper: React.CSSProperties = {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		textAlign: 'center',
	};

	const h1Style: React.CSSProperties = {
		fontWeight: 400,
		fontSize: '44px',
	};

	const h2Style: React.CSSProperties = {
		fontWeight: 400,
		fontSize: '18px',
		letterSpacing: '-0.8px',
	};

	const pStyle: React.CSSProperties = {
		fontFamily: 'Roboto Mono',
		letterSpacing: '-0.8px',
		fontWeight: 400,
		fontSize: '18px',
		textTransform: 'uppercase',
		color: '#7F7F7F',
	};

	const wrapper: React.CSSProperties = {
		display: 'flex',
		width: '100%',
		justifyContent: 'center',
		marginBottom: '10px',
	};

	const buttonWrapper: React.CSSProperties = {
		display: 'flex',
		width: '100%',
		justifyContent: 'center',
		gap: '50px',
		marginBottom: '10px',
	};

	// Intersection Observer Hook for CountUp
	const { ref: countUpRef, inView: countUpInView } = useInView({
		threshold: 1.0,
		triggerOnce: true,
	});

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
				backgroundColor: ['#0088FE'],
				hoverBackgroundColor: ['#005bb5'],
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
		<section className="full-section community">
			<div className="content-community-wrapper">
				{/* Header Section */}
				<div style={wrapper}>
					<div style={textWrapper}>
						<p style={pStyle}>
							{countUpInView && <CountUp start={0} end={100} duration={3} suffix="%" style={{ marginRight: '8px' }} />}
							Fair Launch
						</p>
						<h1 style={h1Style}>A truly fair and transparent token economy. </h1>
						<h2 style={h2Style} ref={countUpRef}>
							The AO token is{' '}
							<b>{countUpInView && <CountUp start={0} end={100} duration={3} suffix="%" />} fair launch</b> with no
							insiders. <b>21 million supply.</b> 4 year halving cycle.
						</h2>
					</div>
				</div>

				{/* Pie Chart Section */}
				<div style={{ margin: '50px 0', display: 'flex', justifyContent: 'center', width: '100%' }}>
					<div
						style={{ position: 'relative', display: 'flex', justifyContent: 'center', height: '50vh', width: '50vw' }}
						ref={pieChartRef}
					>
						{/* Only render the chart when it's in view */}
						{pieChartInView && <Pie data={pieData} options={pieOptions} />}
					</div>
				</div>

				{/* Statistics Section */}
				<div style={buttonWrapper}>
					<div className="button-wrapper">
						<Link to={'https://cookbook_ao.g8way.io/'} target="_blank" rel="noopener noreferrer">
							<button className="glitch primary link-terminal-red">
								<HyperTextLoad word={'Learn More'} textType="span" speed={1} />
							</button>
						</Link>
					</div>
					<div className="button-wrapper">
						<Link to={'https://cookbook_ao.g8way.io/'} target="_blank" rel="noopener noreferrer">
							<button className="glitch primary link-terminal-green">
								<HyperTextLoad word={'→ Start Minting'} textType="span" speed={1} />
							</button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Community;
