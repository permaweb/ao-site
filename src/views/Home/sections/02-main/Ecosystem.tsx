import { Link } from 'react-router-dom';

import HyperTextLoad from 'components/hyperTextLoad';

import './HomeMainStyles.css';

import SquareGrid from './SquareGrid';

const Ecosystem = () => {
	const h1Style: React.CSSProperties = {
		textAlign: 'center',
		margin: '10px 0',
		fontWeight: 400,
	};

	const h1AltStyle: React.CSSProperties = {
		textAlign: 'center',

		fontWeight: 400,
		marginTop: '=5px',
	};
	const h2Style: React.CSSProperties = {
		fontWeight: 400,
		fontFamily: 'DM Sans',
		letterSpacing: '-0.8px',
		textAlign: 'center',
		fontSize: 'clamp(12px, 2.5vw, 16px)',
	};

	return (
		<section className="full-section ecosystem" style={{ paddingInline: '40px' }}>
			<div className="content-ecosystem-wrapper">
				<h1 style={h1Style}>Hyper parallel execution means </h1>
				<h1 style={h1AltStyle}>
					unlimited <i>horizontal</i> scalability{' '}
				</h1>
				<p style={h2Style}>
					Live in production, <span style={{ color: '#0013F6' }}>right now.</span>
				</p>
				<SquareGrid />
				<div
					style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: '40px' }}
				>
					<div className="button-wrapper">
						<Link to={'/mint'} replace={false} rel="noopener noreferrer ">
							<button className="glitch primary link-terminal-green">
								<HyperTextLoad word={'See All Of the Ecosystem'} textType="span" speed={1} />
							</button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Ecosystem;
