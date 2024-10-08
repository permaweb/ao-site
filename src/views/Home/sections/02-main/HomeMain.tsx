import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Footer from 'components/Footer/Footer';

import './HomeMainStyles.css';

import morpheusAsciiArt from '../../../../components/MorpheusAsciiArt';

import Build from './Build';
import Community from './Community';
import Ecosystem from './Ecosystem';
import Hero from './Hero';
import Permaweb from './Permaweb';

const HomeMain = () => {
	useEffect(() => {
		morpheusAsciiArt();

		// const debounce = <T extends (...args: any[]) => any>(
		// 	func: T,
		// 	delay: number
		// ): ((...args: Parameters<T>) => void) => {
		// 	let debounceTimer: number | NodeJS.Timeout;
		// 	return (...args: Parameters<T>) => {
		// 		clearTimeout(debounceTimer as number);
		// 		debounceTimer = setTimeout(() => {
		// 			func(...args);
		// 		}, delay) as unknown as number;
		// 	};
		// };

		// const handleMouseMove = (e: MouseEvent) => {
		// 	const { clientX, clientY } = e;
		// 	const centerX = window.innerWidth / 2;
		// 	const centerY = window.innerHeight / 2;
		// 	const deltaX = (clientX - centerX) * 0.02;
		// 	const deltaY = (clientY - centerY) * 0.02;

		// 	const distanceX = Math.abs(clientX - centerX);
		// 	const distanceY = Math.abs(clientY - centerY);

		// 	const normalizedDistanceX = distanceX / centerX;
		// 	const normalizedDistanceY = distanceY / centerY;

		// 	const scaleFactor = 1 + 0.075 * Math.max(normalizedDistanceX, normalizedDistanceY);

		// 	if (containerRef.current) {
		// 		const hexocet = containerRef.current.querySelector('canvas');
		// 		if (hexocet) {
		// 			hexocet.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scaleFactor})`;
		// 		}
		// 	}
		// };

		// const debouncedHandleMouseMove = debounce(handleMouseMove, 100);

		// document.addEventListener('mousemove', debouncedHandleMouseMove);

		// // Clean up the event listener when the component unmounts
		// return () => document.removeEventListener('mousemove', handleMouseMove);
	}, []);

	return (
		<>
			<main>
				<div className="main-wrapper">
					<Hero />
					<Ecosystem />
					<Build />
					<Community />
					<Permaweb />
					<Footer />
				</div>
			</main>
		</>
	);
};

export default HomeMain;
