import React from 'react';
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';

import './HomeMainStyles.css';

// Register Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const Permaweb = () => {
	const permawebVideo = 'https://arweave.net/uTIDSlJj4JREsuJSGdCNa2gd5KRehdYbGeF68TJ57E0';
	// Styles
	const textWrapper: React.CSSProperties = {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',

		padding: '40px',
	};

	const h1Style: React.CSSProperties = {
		fontWeight: 400,

		textAlign: 'center',
	};

	const h2Style: React.CSSProperties = {
		fontWeight: 400,

		letterSpacing: '-0.8px',
		textAlign: 'center',
	};

	const wrapper: React.CSSProperties = {
		display: 'flex',
		width: '100%',
	};

	const videoWrapper: React.CSSProperties = {
		display: 'flex',
		width: '100%',
	};

	return (
		<section className="full-section permaweb">
			<div className="content-permaweb-wrapper">
				{/* Text Section */}

				<div style={wrapper}>
					<div style={textWrapper}>
						<div>
							<h1 style={h1Style}>Dawn of the decentralized web.</h1>
							<h2 style={h2Style}>AO is the decentralized supercomputer powering the permaweb. </h2>
						</div>
					</div>
				</div>
				{/* Permaweb Video Section */}

				<div style={videoWrapper}>
					<video src={permawebVideo} autoPlay loop muted width={'100%'} />
				</div>
			</div>
		</section>
	);
};

export default Permaweb;
