import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import './HomeMainStyles.css';

import HexocetAnimationComponent from '../../../../components/HexocetAnimation/HexocetAnimationComponent';
import HyperTextLoad from '../../../../components/hyperTextLoad';
import morpheusAsciiArt from '../../../../components/MorpheusAsciiArt';

const HomeMain = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [countdown, setCountdown] = useState<string>('');

	useEffect(() => {
		morpheusAsciiArt();

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

	useEffect(() => {
		const targetDate = new Date('2025-02-09T17:00:00Z'); // 12 PM EST in UTC (5 PM UTC)
		const updateCountdown = () => {
			const now = new Date();
			const timeDifference = targetDate.getTime() - now.getTime();

			if (timeDifference <= 0) {
				setCountdown('Time is up!');
				return;
			}

			const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
			const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

			setCountdown(`${days}d, ${hours}h, ${minutes}m, ${seconds}s`);
		};

		updateCountdown(); // Initial call
		const interval = setInterval(updateCountdown, 1000); // Update every second

		return () => clearInterval(interval); // Cleanup interval on component unmount
	}, []);

	return (
		<>
			<main>
				<div className="home-main-wrapper" ref={containerRef}>
					<HexocetAnimationComponent containerRef={containerRef} />
					<div className="content-hero-wrapper">
						<div className="text-hero-wrapper">
							<div className="main-heading">
								<h1>{countdown}</h1>
							</div>
						</div>
						<div className="button-wrapper">
							<Link to={'https://cookbook_ao.g8way.io/'} target="_blank" rel="noopener noreferrer">
								<button className="glitch primary link-terminal-blue" data-text="→ Boot Up Testnet">
									<HyperTextLoad word={'→ Boot Up The TestNet'} textType="span" speed={1} />
								</button>
							</Link>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default HomeMain;
