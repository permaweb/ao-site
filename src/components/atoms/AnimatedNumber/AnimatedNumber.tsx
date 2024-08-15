import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type AnimatedNumberProps = {
	height?: string;
};

const AnimatedNumber = (props: AnimatedNumberProps) => {
	const { height = 50 } = props;

	const [number, setNumber] = useState(1_000);

	useEffect(() => {
		const interval = setInterval(() => {
			setNumber((prev) => parseFloat((100 * Math.random()).toFixed(2)) + prev);
		}, 1_000);

		return () => clearInterval(interval);
	}, []);

	const renderDigits = () => {
		const formattedNumber = number.toLocaleString(undefined, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}); // Format number with thousand separators and two decimal places

		const digits = formattedNumber.split(''); // Split into individual characters, including commas and decimal point

		return digits.map((char, index) => <Digit key={index} digit={char} index={index} />);
	};

	return (
		<div
			style={{
				display: 'flex',
				gap: '0px',
				height,
				marginTop: -10,
				marginBottom: -10,
			}}
		>
			{renderDigits()}
		</div>
	);
};

const Digit = ({ digit, index }) => {
	return (
		<div
			style={{
				position: 'relative',
				width: ['.', ','].includes(digit) ? '10px' : '20px',
				height: '100%',
				overflow: 'hidden',
			}}
		>
			<AnimatePresence initial={false}>
				<motion.div
					key={`${index}-${digit}`}
					initial={{ y: '-100%' }}
					animate={{ y: '0%' }}
					exit={{ y: '100%' }}
					transition={{ duration: 0.33, ease: 'easeInOut' }}
					style={{
						width: '100%',
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						position: 'absolute',
					}}
				>
					{digit}
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default AnimatedNumber;
