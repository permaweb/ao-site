import React from 'react';
import { Link } from 'react-router-dom';
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';

import HyperTextLoad from 'components/hyperTextLoad';
import { Divider } from 'views/Explore/02-main/ExploreMain';

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
		fontFamily: 'DM Sans',
		letterSpacing: '-0.8px',
		textAlign: 'center',
		fontSize: 'clamp(12px, 2.5vw, 16px)',
	};

	const wrapper: React.CSSProperties = {
		display: 'flex',
		width: '100%',
	};

	const videoWrapper: React.CSSProperties = {
		display: 'flex',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	};

	return (
		<section className="full-section permaweb">
			<div className="content-permaweb-wrapper">
				{/* Text Section */}

				<div style={wrapper}>
					<div style={textWrapper}>
						<div>
							<h1 style={h1Style}>Dawn of the decentralized web.</h1>
							<p style={h2Style}>AO is the decentralized supercomputer powering the permaweb. </p>
						</div>
					</div>
				</div>
				{/* Permaweb Video Section */}

				<div style={videoWrapper}>
					<iframe
						src="https://odysee.com/$/embed/@AO:4/the_permaweb-(1440p)-(1):9?r=GovBscmXVLs3avGjcR1f5ktd6X8Ehgqo"
						title="Permaweb"
						allow="autoplay; muted; fullscreen; picture-in-picture; clipboard-write"
						style={{ width: '80%', aspectRatio: '16/9', borderRadius: '20px' }}
					></iframe>
				</div>
				<div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
					<div className="button-wrapper">
						<Link to={'/explore#permaweb'} replace={false} target="_blank" rel="noopener noreferrer">
							<button className="glitch primary link-terminal-red">
								<HyperTextLoad word={'Learn More'} textType="span" speed={1} />
							</button>
						</Link>
					</div>
				</div>
			</div>
			<Divider />
		</section>
	);
};

export default Permaweb;
