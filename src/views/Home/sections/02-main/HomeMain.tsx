import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import MorpheusAsciiArt from 'components/MorpheusAsciiArt';

import './HomeMainStyles.css';

import HyperTextLoad from '../../../../components/hyperTextLoad';

const HomeMain = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [countdown, setCountdown] = useState<string>('');

	// Update Countdown Logic
	const updateCountdown = () => {
		const now = Date.now();
		const targetDate = new Date('2025-02-08T23:20:00Z').getTime();
		const timeDifference = targetDate - now;

		if (timeDifference <= 0) {
			setCountdown('Time is up!');
			return;
		}

		const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
		const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

		setCountdown(`${days}d:${hours}h:${minutes}m:${seconds}s`);
	};

	useEffect(() => {
		updateCountdown();

		const intervalId = setInterval(updateCountdown, 1000);

		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		MorpheusAsciiArt();

		const handleMouseMove = (event: MouseEvent) => {
			if (!containerRef.current) return;

			const rect = containerRef.current.getBoundingClientRect();

			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	return (
		<>
			<main style={{ background: 'black' }}>
				<div className="home-main-wrapper" ref={containerRef}>
					<div className="content-hero-wrapper">
						<div className="text-hero-wrapper" style={{ justifyContent: 'center' }}>
							<div className="main-heading">
								<p
									style={{
										fontSize: 'clamp(18px, 3vw, 30px',
										fontFamily: 'MatrixFont',
										textShadow: '0px 0px 30px #95E18E',
									}}
								>
									Countdown To Mainnet
								</p>
								<h1
									style={{
										fontVariantNumeric: 'tabular-nums',
										fontSize: 'clamp(40px, 8vw, 200px',
										fontFamily: 'MatrixFont',
										textShadow: '0px 0px 50px #8FFF85',
										color: 'white',
									}}
								>
									{countdown}
								</h1>
							</div>
						</div>
						<div style={{ display: 'flex', gap: '40px' }}>
							<div className="button-wrapper">
								<Link to={'/mint'} target="_blank" rel="noopener noreferrer">
									<button className="glitch primary" data-text="→ Boot Up Testnet">
										<HyperTextLoad word={'Mint'} textType="span" speed={1} />
									</button>
								</Link>
							</div>
							<div className="button-wrapper">
								<Link to={'https://cookbook_ao.g8way.io/'} target="_blank" rel="noopener noreferrer">
									<button className="glitch secondary" data-text="→ Boot Up Testnet">
										<HyperTextLoad word={'Build'} textType="span" speed={1} />
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default HomeMain;
