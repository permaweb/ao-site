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
		},
		{
			name: 'Dexi',
			image: dexi,
			subtitle: '',
		},
		{
			name: 'Arfleet',
			image: arfleet,
			subtitle: '',
		},
		{
			name: 'Permaverse',
			image: permaverse,
			subtitle: '',
		},
		{
			name: 'BazAR',
			image: bazar,
			subtitle: '',
		},
		{
			name: 'View All Ecosystem dApps',
			image: plusBlue, // Use plusBlue image here
			subtitle: '',
		},
	];

	const squareStyle: React.CSSProperties = {
		aspectRatio: '1 / 1',
		backgroundColor: '#f9f9f9',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		cursor: 'pointer',
	};

	const gridStyle: React.CSSProperties = {
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 1fr)',
		gap: '10px',
		width: '100%',
	};

	const headerStyle: React.CSSProperties = {
		font: 'DM Sans',
		fontSize: '18px',
		margin: '10px 0',
	};

	const altHeaderStyle: React.CSSProperties = {
		font: 'DM Sans',
		fontSize: '18px',
		width: '50%',
		textAlign: 'center',
		marginTop: '20px',
	};

	const imageStyle: React.CSSProperties = {
		maxWidth: '150px',
		width: '100%',
	};

	const plusStyle: React.CSSProperties = {
		maxWidth: '25px',
		width: '100%',
	};

	return (
		<div style={gridStyle}>
			{dapps.map((dapp, index) => (
				<div className="background-transition" key={index} style={squareStyle}>
					{dapp.name === 'View All Ecosystem dApps' && ( // Conditionally render plusBlue image above the header for the last item
						<>
							<img src={dapp.image} alt={dapp.name} style={plusStyle} />
							<h3 style={altHeaderStyle}>{dapp.name}</h3>
						</>
					)}

					{dapp.name !== 'View All Ecosystem dApps' && (
						<>
							<h3 style={headerStyle}>{dapp.name}</h3> <img src={dapp.image} alt={dapp.name} style={imageStyle} />
						</>
					)}
				</div>
			))}
		</div>
	);
};

export default SquareGrid;
