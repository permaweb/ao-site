import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import MorpheusAsciiArt from 'components/MorpheusAsciiArt';

import './HomeMainStyles.css';

import placeholderVideo from '../../../../assets/ao-launch-v2.mp4';
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

		setCountdown(`${days}d : ${hours}h : ${minutes}m : ${seconds}s`);
	};

	useEffect(() => {
		updateCountdown();

		const intervalId = setInterval(updateCountdown, 1000);

		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		MorpheusAsciiArt();

		const debounce = <T extends (...args: any[]) => any>(
			func: T,
			delay: number
		): ((...args: Parameters<T>) => void) => {
			let debounceTimer: number | NodeJS.Timeout;
			return (...args: Parameters<T>) => {
				clearTimeout(debounceTimer as number);
				debounceTimer = setTimeout(() => {
					func(...args);
				}, delay) as unknown as number;
			};
		};

		const handleMouseMove = (e: MouseEvent) => {
			const { clientX, clientY } = e;
			const centerX = window.innerWidth / 2;
			const centerY = window.innerHeight / 2;
			const deltaX = (clientX - centerX) * 0.02;
			const deltaY = (clientY - centerY) * 0.02;

			const distanceX = Math.abs(clientX - centerX);
			const distanceY = Math.abs(clientY - centerY);

			const normalizedDistanceX = distanceX / centerX;
			const normalizedDistanceY = distanceY / centerY;

			const scaleFactor = 1 + 0.075 * Math.max(normalizedDistanceX, normalizedDistanceY);

			if (containerRef.current) {
				const hexocet = containerRef.current.querySelector('canvas');
				if (hexocet) {
					hexocet.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scaleFactor})`;
				}
			}
		};

		const debouncedHandleMouseMove = debounce(handleMouseMove, 100);

		document.addEventListener('mousemove', debouncedHandleMouseMove);

		// Clean up the event listener when the component unmounts
		return () => document.removeEventListener('mousemove', handleMouseMove);
	}, []);

	return (
		<>
			<main style={{ background: 'black' }}>
				<div className="home-main-wrapper" ref={containerRef}>
					<video className="background-video" src={placeholderVideo} autoPlay muted loop playsInline></video>
					<div className="content-hero-wrapper">
						<div className="text-hero-wrapper" style={{ justifyContent: 'center' }}>
							<div className="main-heading">
								<p style={{ textTransform: 'uppercase', fontSize: '18px' }}>Countdown To Mainnet</p>
								<h1 style={{ fontVariantNumeric: 'tabular-nums', fontSize: '150px' }}>{countdown}</h1>
							</div>
						</div>
						<div style={{ display: 'flex', gap: '16px' }}>
							<div className="button-wrapper">
								<Link to={'https://cookbook_ao.g8way.io/'} target="_blank" rel="noopener noreferrer">
									<button className="glitch primary link-terminal-green" data-text="→ Boot Up Testnet">
										<HyperTextLoad word={'Mint'} textType="span" speed={1} />
									</button>
								</Link>
							</div>
							<div className="button-wrapper">
								<Link to={'https://cookbook_ao.g8way.io/'} target="_blank" rel="noopener noreferrer">
									<button className="glitch primary link-terminal-green" data-text="→ Boot Up Testnet">
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
