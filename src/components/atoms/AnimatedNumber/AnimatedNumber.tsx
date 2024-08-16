import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { TOKEN_DECIMALS } from 'helpers/config';

type AnimatedNumberProps = {
	startValue?: number | null;
	increment?: number | null;
};

const AnimatedNumber = (props: AnimatedNumberProps) => {
	const { startValue, increment } = props;

	const [number, setNumber] = useState<number | null | undefined>(startValue);

	useEffect(() => {
		setNumber(startValue);
	}, [startValue, increment]);

	useEffect(() => {
		if (typeof number !== 'number') return;

		const interval = setInterval(() => {
			setNumber((prev) => increment + prev);
		}, 1_000);

		return () => clearInterval(interval);
	}, [number, increment]);

	const renderDigits = () => {
		const formattedNumber = number.toLocaleString(undefined, {
			minimumFractionDigits: TOKEN_DECIMALS,
			maximumFractionDigits: TOKEN_DECIMALS,
		});

		const digits = formattedNumber.split('');

		return digits.map((char, index) => <Digit key={index} digit={char} index={index} />);
	};

	return (
		<div
			style={{
				display: 'flex',
				gap: '0px',
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
