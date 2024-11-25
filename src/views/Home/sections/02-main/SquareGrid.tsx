import React, { useRef, useState } from 'react';

import HyperTextLoad from 'components/hyperTextLoad';

import arfleet from '../../../../assets/arfleet.svg';
import bazar from '../../../../assets/bazar.svg';
import botega from '../../../../assets/Botega_logo.svg';
import dexi from '../../../../assets/dexi.svg';
import llamaLand from '../../../../assets/llamaland.svg';
import permaverse from '../../../../assets/permaverse.svg';

const SquareGrid = () => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Track the hovered dApp index
	const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Reference to the debounce timeout

	const dapps = [
		{
			name: 'Llamaland',
			image: llamaLand,
			subtitle: 'AI / Gaming',
			link: 'https://llamaland.arweave.net',
		},
		{
			name: 'Dexi',
			image: dexi,
			subtitle: 'AI / DEX',
			link: 'https://dexi.arweave.net',
		},
		{
			name: 'Arfleet',
			image: arfleet,
			subtitle: 'Temporary Storage',
			link: 'https://arfleet.arweave.net',
		},
		{
			name: 'Permaverse',
			image: permaverse,
			subtitle: '3D Gaming',
			link: 'https://permaverse.arweave.net',
		},
		{
			name: 'BazAR',
			image: bazar,
			subtitle: 'Atomic Asset Marketplace',
			link: 'https://bazar.arweave.net',
		},
		{
			name: 'Botega',
			image: botega,
			subtitle: 'AI  / DEFI',
			link: 'https://botega.arweave.net',
		},
	];

	const squareStyle: React.CSSProperties = {
		position: 'relative',
		aspectRatio: '1 / 1',
		display: 'flex',
		width: '100%',
		flexDirection: 'column',
		cursor: 'pointer',
	};

	const gridStyle: React.CSSProperties = {
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 1fr)',
		gap: '20px',
		width: '100%',
		marginTop: '80px',
	};

	const headerStyle: React.CSSProperties = {
		fontFamily: 'Roboto Mono',
		fontSize: 'clamp(10px, 2vw, 14px)',
		textTransform: 'uppercase',
		fontWeight: '400',
	};

	const imageStyle: React.CSSProperties = {
		width: '50px',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
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
					<div
						style={{
							display: 'flex',
							width: '100%',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'gray' }}>{dapp.subtitle}</span>
						<HyperTextLoad
							word={dapp.name}
							textType="h3"
							speed={1}
							triggerOnLoad={false}
							triggerOnView={true}
							style={headerStyle}
							triggerOnParentHover={hoveredIndex === index}
						/>
					</div>
					<img src={dapp.image} alt={dapp.name} style={imageStyle} />
				</a>
			))}
		</div>
	);
};

export default SquareGrid;
