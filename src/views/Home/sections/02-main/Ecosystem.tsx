import './HomeMainStyles.css';

import SquareGrid from './SquareGrid';

const Ecosystem = () => {
	const h1Style: React.CSSProperties = {
		textAlign: 'center',
		margin: '10px 0',
		fontWeight: 400,
		fontSize: '44px',
	};

	const h2Style: React.CSSProperties = {
		fontSize: '28px',
		letterSpacing: '-0.76px',
		textAlign: 'center',
		fontWeight: 400,
		margin: '10px 0 50px 0',
	};
	return (
		<div className="full-section ecosystem">
			<div className="content-ecosystem-wrapper">
				<h1 style={h1Style}>Hyper parallel execution means </h1>
				<h1 style={h1Style}>unlimited horizontal scalability </h1>
				<h2 style={h2Style}>
					Live in production, <span style={{ color: '#0013F6' }}>right now.</span>
				</h2>
				<SquareGrid />
			</div>
		</div>
	);
};

export default Ecosystem;
