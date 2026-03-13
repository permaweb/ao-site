import React from 'react';
import { useTheme } from 'styled-components';

const RGB_COLORS = ['#b91c1c', '#15803d', '#1d4ed8'] as const; /* deep red, green, blue */
const CYCLE_DELAY_MS = 10;

export interface RgbCycleTextProps {
	text?: string;
	cycleDelayMs?: number;
	className?: string;
}

export default function RgbCycleText({ text = 'PINNED', cycleDelayMs = CYCLE_DELAY_MS, className }: RgbCycleTextProps) {
	const theme = useTheme();
	const finalColor = theme?.colors?.font?.primary ?? '#000000';

	const [visibleCount, setVisibleCount] = React.useState(1);
	const [colorPhase, setColorPhase] = React.useState(0);

	React.useEffect(() => {
		setVisibleCount(1);
		setColorPhase(0);
	}, [text]);

	React.useEffect(() => {
		if (visibleCount >= text.length && colorPhase === 3) return;

		const timeout = setTimeout(() => {
			if (colorPhase < 3) {
				setColorPhase((p) => p + 1);
			} else {
				if (visibleCount < text.length) {
					setVisibleCount((c) => c + 1);
					setColorPhase(0);
				}
			}
		}, cycleDelayMs);

		return () => clearTimeout(timeout);
	}, [visibleCount, colorPhase, text.length, cycleDelayMs]);

	const startOffset = (visibleCount - 1) % 3;
	const currentColor = colorPhase < 3 ? RGB_COLORS[(startOffset + colorPhase) % 3] : finalColor;

	return (
		<span className={className}>
			{text
				.slice(0, visibleCount)
				.split('')
				.map((letter, i) => {
					const isCurrentLetter = i === visibleCount - 1;
					const color = isCurrentLetter ? currentColor : finalColor;

					return (
						<span
							key={`${i}-${letter}`}
							style={{
								color,
								transition: 'color 0.2s ease',
							}}
						>
							{letter}
						</span>
					);
				})}
		</span>
	);
}
