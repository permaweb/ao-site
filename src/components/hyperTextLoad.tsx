import React, { createElement, useEffect, useRef, useState } from 'react';

interface HyperTextLoadProps {
	word: string;
	textType: 'h1' | 'h2' | 'p' | 'span';
	triggerOnLoad?: boolean;
	triggerOnView?: boolean;
	speed: number;
	style?: React.CSSProperties;
}

const HyperTextLoad: React.FC<HyperTextLoadProps> = ({
	word,
	textType,
	triggerOnLoad = false,
	triggerOnView = false,
	speed,
	style,
}) => {
	const [text, setText] = useState(word);
	const [inView, setInView] = useState(false);
	const letters = 'abcdefghijklmnopqrstuvwxyz.';
	const textRef = useRef<HTMLElement>(null);
	let interval: number | null = null;

	const getRandomDelay = () => Math.floor(Math.random() * (1000 - 500 + 1)) + 500;

	const startAnimation = () => {
		let iteration = 0;

		interval = window.setInterval(() => {
			const newText = word
				.split('')
				.map((char, index) => {
					if (index < iteration) {
						return char;
					}
					return letters[Math.floor(Math.random() * letters.length)];
				})
				.join('');

			setText(newText);

			if (iteration >= word.length && interval) {
				clearInterval(interval);
			}

			iteration += 1 / speed;
		}, 30);
	};

	const mouseOverHandler = () => {
		if (interval) {
			clearInterval(interval);
		}
		startAnimation();
	};

	// Intersection Observer to trigger the animation when the element comes into view
	useEffect(() => {
		if (triggerOnView && textRef.current) {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							// Add a random delay between 500ms and 1 second before triggering the animation
							const randomDelay = getRandomDelay();
							setTimeout(() => {
								setInView(true);
							}, randomDelay);
							observer.disconnect(); // Stop observing after it becomes visible
						}
					});
				},
				{ threshold: 1.0 } // Trigger when 10% of the component is in view
			);

			observer.observe(textRef.current);

			return () => {
				observer.disconnect();
			};
		}
	}, [triggerOnView]);

	useEffect(() => {
		if (triggerOnLoad || (triggerOnView && inView)) {
			startAnimation();
		}

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [triggerOnLoad, triggerOnView, inView]); // Dependencies include inView and triggerOnView

	// Adding optional style prop to the textProps
	const textProps = {
		ref: textRef,
		style, // Pass custom styles here
		onMouseOver: mouseOverHandler,
	};

	const TextElement = createElement(textType, textProps, text);

	return <div>{TextElement}</div>;
};

export default HyperTextLoad;
