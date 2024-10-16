import React from 'react';

import HyperTextLoad from 'components/hyperTextLoad';

import arfleet from '../../../../assets/arfleet.svg';
import bazar from '../../../../assets/bazar.svg';
import dexi from '../../../../assets/dexi.svg';
import llamaLand from '../../../../assets/llamaland.svg';
import permaverse from '../../../../assets/permaverse.svg';
import plusBlue from '../../../../assets/plus-blue.svg'; // Import plusBlue image

const SquareGrid = () => {
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
		{
			name: 'View All Ecosystem dApps',
			image: plusBlue, // Use plusBlue image here
			subtitle: '',
			link: '/#/explore#ecosystem-apps',
		},
	];

	const squareStyle: React.CSSProperties = {
		aspectRatio: '1 / 1',
		backgroundColor: '#fcfcfc',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		cursor: 'pointer',
		border: '1px solid #C3C3C3',
	};

	const gridStyle: React.CSSProperties = {
		display: 'grid',
		gridTemplateColumns: 'repeat(4, 1fr)',
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

	return (
		<div style={gridStyle}>
			{dapps.map((dapp, index) => (
				<a
					href={dapp.link}
					target={dapp.link.startsWith('http') ? '_blank' : '_self'}
					rel={dapp.link.startsWith('http') ? 'noopener noreferrer' : ''}
					key={index}
					style={squareStyle}
					className="background-transition"
				>
					{dapp.name === 'View All Ecosystem dApps' ? (
						<>
							<img src={dapp.image} alt={dapp.name} style={plusStyle} />
							<h3 style={altHeaderStyle}>{dapp.name}</h3>
						</>
					) : (
						<>
							<h3 style={headerStyle}>{dapp.name}</h3>
							<img src={dapp.image} alt={dapp.name} style={imageStyle} />
						</>
					)}
				</a>
			))}
		</div>
	);
};

export default SquareGrid;
