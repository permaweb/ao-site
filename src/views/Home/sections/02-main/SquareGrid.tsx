import React, { useRef, useState } from 'react';

import HyperTextLoad from 'components/hyperTextLoad';

import arfleet from '../../../../assets/arfleet.svg';
import bazar from '../../../../assets/bazar.svg';
import dexi from '../../../../assets/dexi.svg';
import llamaLand from '../../../../assets/llamaland.svg';
import permaverse from '../../../../assets/permaverse.svg';
import plusBlue from '../../../../assets/plus-blue.svg'; // Import plusBlue image

const SquareGrid = () => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Track the hovered dApp index
	const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Reference to the debounce timeout

	const dapps = [
		{
			name: 'Llamaland',
			image: llamaLand,
			subtitle: '',
			link: 'https://llamaland.arweave.net',
		},
		{
			name: 'Dexi',
			image: dexi,
			subtitle: '',
			link: 'https://dexi.arweave.net',
		},
		{
			name: 'Arfleet',
			image: arfleet,
			subtitle: '',
			link: 'https://arfleet.arweave.net',
		},
		{
			name: 'Permaverse',
			image: permaverse,
			subtitle: '',
			link: 'https://permaverse.arweave.net',
		},
		{
			name: 'BazAR',
			image: bazar,
			subtitle: '',
			link: 'https://bazar.arweave.net',
		},
	];

	const squareStyle: React.CSSProperties = {
		aspectRatio: '1 / 1',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		cursor: 'pointer',
	};

	const gridStyle: React.CSSProperties = {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		gap: '10px',
		width: '100%',
	};

	const headerStyle: React.CSSProperties = {
		fontFamily: 'Roboto Mono',
		fontSize: 'clamp(10px, 2vw, 14px)',
		textTransform: 'uppercase',
		fontWeight: '400',
		margin: '10px 0',
	};

	const altHeaderStyle: React.CSSProperties = {
		fontFamily: 'Roboto Mono',
		fontSize: 'clamp(10px, 2vw, 14px)',
		textTransform: 'uppercase',
		fontWeight: '400',
		width: '50%',
		textAlign: 'center',
		marginTop: '20px',
	};

	const imageStyle: React.CSSProperties = {
		maxWidth: '150px',
		width: '50%',
	};

	const plusStyle: React.CSSProperties = {
		maxWidth: '25px',
		width: '100%',
	};

	const handleMouseEnter = (index: number) => {
		// Clear any existing timeout
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current);
		}

		// Set the hovered index after a short delay
		hoverTimeoutRef.current = setTimeout(() => {
			setHoveredIndex(index);
		}, 2); // Adjust the delay as needed (200ms debounce)
	};

	const handleMouseLeave = () => {
		// Clear any existing timeout
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current);
		}

		// Debounce the state reset to avoid flickering on rapid mouse movements
		hoverTimeoutRef.current = setTimeout(() => {
			setHoveredIndex(null);
		}, 2);
	};

	return (
		<div style={gridStyle}>
			{dapps.map((dapp, index) => (
				<a
					className="square-logo"
					href={dapp.link}
					target={dapp.link.startsWith('http') ? '_blank' : '_self'}
					rel={dapp.link.startsWith('http') ? 'noopener noreferrer' : ''}
					key={index}
					style={squareStyle}
					onMouseEnter={() => handleMouseEnter(index)}
					onMouseLeave={handleMouseLeave}
				>
					<>
						<HyperTextLoad
							word={dapp.name}
							textType="h3"
							speed={1}
							triggerOnLoad={false}
							triggerOnView={true}
							style={headerStyle}
							triggerOnParentHover={hoveredIndex === index}
						/>
						<img src={dapp.image} alt={dapp.name} style={imageStyle} />
					</>
				</a>
			))}
		</div>
	);
};

export default SquareGrid;
