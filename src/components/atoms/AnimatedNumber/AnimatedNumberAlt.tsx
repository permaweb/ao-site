import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type AnimatedNumberAltProps = {
	startValue?: number | null;
	increment?: number | null;
	targetValue?: number;
};

const getRandomDelay = () => Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;

const AnimatedNumberAlt = (props: AnimatedNumberAltProps) => {
	const { startValue = 0, increment = 1, targetValue = 0 } = props;

	const [number, setNumber] = useState<number>(startValue);
	const [delay, setDelay] = useState<number>(getRandomDelay());

	useEffect(() => {
		setNumber(startValue);
	}, [startValue]);

	useEffect(() => {
		if (typeof number !== 'number' || number >= targetValue) return;

		const interval = setTimeout(() => {
			setNumber((prev) => {
				const newValue = Math.min(prev + increment, targetValue);
				return Math.round(newValue);
			});
			setDelay(getRandomDelay());
		}, delay);

		return () => clearTimeout(interval);
	}, [number, increment, targetValue, delay]);

	const renderDigits = () => {
		const formattedNumber = number.toLocaleString(undefined, {
			maximumFractionDigits: 0,
		});

		const digits = formattedNumber.split('');

		return digits.map((char, index) => <Digit key={index} digit={char} index={index} />);
	};

	return (
		<div
			style={{
				display: 'flex',
				height: 50,
				marginTop: -10,
				marginBottom: -10,
			}}
		>
			{typeof number !== 'number' ? '-' : renderDigits()}
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
				marginLeft: '-5px',
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
						fontSize: '24px',
						fontFamily: 'DM Sans',
					}}
				>
					{digit}
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default AnimatedNumberAlt;
