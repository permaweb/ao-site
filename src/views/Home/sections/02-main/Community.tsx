import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

import AnimatedNumberAlt from 'components/atoms/AnimatedNumber/AnimatedNumberAlt';
import HyperTextLoad from 'components/hyperTextLoad';

import './HomeMainStyles.css';

const Community = () => {
	const stats = {
		Processes: { name: 'Processes', amount: 204000 },
		Users: { name: 'Users', amount: 50000 },
		Messages: { name: 'Messages', amount: 740590690 },
	};

	const hexagonVideo =
		'https://ewt3hbxdv5im273zdsy4j2hbnavkf4zkittqffreevxvelqdhifa.arweave.net/JaezhuOvUM1_eRyxxOjhaCqi8ypE5wKWJCVvUi4DOgo';

	const h1Wrapper: React.CSSProperties = {
		margin: '200px 0',
		zIndex: '2',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'end',
	};

	const h1Style: React.CSSProperties = {
		textAlign: 'right',
		fontWeight: 400,
		fontSize: '44px',
	};

	const wrapper: React.CSSProperties = {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		marginBottom: '20px',
	};

	const relativeWrapper: React.CSSProperties = {
		position: 'relative',
		display: 'flex',
		width: '100%',
		justifyContent: 'end',
		marginBottom: '20px',
	};

	const statWrapper: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	};

	const buttonWrapper: React.CSSProperties = {
		display: 'flex',
		justifyContent: 'space-between',
		width: '100%',
		marginBottom: '40px',
	};

	const buttonStyle: React.CSSProperties = {
		background: 'none',
		border: 'none',
		display: 'flex',
		gap: '10px',
		fontSize: '16px',
		cursor: 'pointer',
		textTransform: 'uppercase',

		fontFamily: 'Roboto Mono',

		letterSpacing: '-0.52px',

		fontWeight: '400',
	};

	const videoWrapper: React.CSSProperties = {
		position: 'absolute',
		left: '0',
		width: '900px',
		zIndex: '1',
		transform: 'translateX(-300px)',
		animation: 'alt-pulse 5s ease-in-out infinite',
	};

	const statTextStyle: React.CSSProperties = {
		fontFamily: 'Roboto Mono',
		textTransform: 'uppercase',
		fontSize: '18px',
		letterSpacing: '-0.52px',
		color: '#808080',
		fontWeight: '400',
	};

	// Using Intersection Observer to determine when the CountUp is in view
	const { ref: countUpRef, inView: countUpInView } = useInView({
		threshold: 1.0, // Ensure 100% of the element is in view
		triggerOnce: true, // Trigger animation only once
	});

	return (
		<div className="full-section community">
			<div className="content-community-wrapper">
				{/* Top Navigation Buttons */}
				<div style={buttonWrapper}>
					<button className="link-terminal-red" style={buttonStyle}>
						&gt;
						<HyperTextLoad word={'Discord'} textType="span" speed={1} triggerOnView />
					</button>
					<button className="link-terminal-green" style={buttonStyle}>
						&gt;
						<HyperTextLoad word={'ao docs'} textType="span" speed={1} triggerOnView />
					</button>
					<button className="link-terminal-blue" style={buttonStyle}>
						&gt;
						<HyperTextLoad word={'cookbook'} textType="span" speed={1} triggerOnView />
					</button>
					<button className="link-terminal-green" style={buttonStyle}>
						&gt;
						<HyperTextLoad word={'ao paper'} textType="span" speed={1} triggerOnView />
					</button>
				</div>

				{/* Video and Header Section */}
				<div style={relativeWrapper}>
					<div style={videoWrapper}>
						<video width={'100%'} src={hexagonVideo} autoPlay loop muted />
					</div>
					<div style={h1Wrapper}>
						<h1 style={h1Style}>Start to Community anything you want, </h1>
						<h1 style={h1Style} className={'count-up-num'} ref={countUpRef}>
							<span style={{ color: 'var(--terminal-green)' }}>
								{countUpInView && <CountUp start={0} end={100} duration={3} suffix="%" />}
							</span>
							<span style={{ color: 'var(--terminal-green)', marginLeft: '5px' }}>onchain.</span>
						</h1>
					</div>
				</div>

				{/* Statistics Section */}
				<div style={wrapper}>
					<div style={statWrapper}>
						<h3 style={statTextStyle}>{stats.Users.name}</h3>

						<AnimatedNumberAlt startValue={stats.Users.amount - 60} increment={1} targetValue={stats.Users.amount} />
					</div>
					<div style={statWrapper}>
						<h3 style={statTextStyle}>{stats.Processes.name}</h3>

						<AnimatedNumberAlt
							startValue={stats.Processes.amount - 240}
							increment={4}
							targetValue={stats.Processes.amount}
						/>
					</div>
					<div style={statWrapper}>
						<h3 style={statTextStyle}>{stats.Messages.name}</h3>

						<AnimatedNumberAlt
							startValue={stats.Messages.amount - 480}
							increment={8}
							targetValue={stats.Messages.amount}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Community;
