import { Link } from 'react-router-dom';

import arconnect from '../../../assets/arconnect.svg';
import arrowUpRight from '../../../assets/ArrowUpRight.svg'; // Import your arrow icon
import bazar from '../../../assets/bazar.svg';
import llamaland from '../../../assets/llamaland.svg';
import permaswap from '../../../assets/permaswap.jpg';
import warDepot from '../../../assets/warDepot.svg';

import { Divider } from './ExploreMain';

export const bulletSquare = (
	<div
		style={{
			width: '12px',
			height: '12px',
			background: '#EAEAEA',
			marginTop: '15px',
			marginLeft: '15px',
			borderRadius: '2px',
		}}
	></div>
);
const Ecosystem1 = () => {
	const arrowInitialStyle: React.CSSProperties = {
		position: 'absolute',
		top: '30px',
		right: '20px',
		width: '5%',
	};

	return (
		<section>
			<div>
				<h1 id="ecosystem" style={{ marginBottom: '0' }}>
					Ecosystem
				</h1>
				<span
					style={{
						fontSize: 'clamp(12px, 2vw, 20px)',
						fontFamily: 'DM Sans',
						fontWeight: '300',
						marginBottom: '100px',
					}}
				>
					Follow these steps to onboard into the AO and Arweave ecosystem:
				</span>
				<div style={{ display: 'flex', gap: '30px' }} id="ecosystem-wallet">
					{bulletSquare}
					<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
						<p style={{ marginBottom: '0' }}>
							<b>Obtain an Arweave wallet.</b>
						</p>

						<p>We recommend Arconnect, the most popular wallet that supports Arweave and AO tokens. </p>
						<Link to={'https://arconnect.io/download'} style={{ width: '100%' }}>
							<div className="wallet-wrapper project-wrapper">
								<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
									<img src={arconnect} alt="arconnect" width={'8%'} />
									<p style={{ marginBottom: '-4px', fontSize: 'clamp(20px, 2vw, 28px)' }}>Arconnect</p>
								</div>
								<span style={{ fontSize: 'clamp(14px, 2vw, 18px)', fontFamily: 'DM Sans', fontWeight: '300' }}>
									Your gateway to Arweave and AO A non-custodial Arweave and AO native wallet with extensive features
									all in your favorite browser and mobile device
								</span>
								{/* Arrow icon */}
								<img src={arrowUpRight} alt="Arrow" style={arrowInitialStyle} />
							</div>
						</Link>
					</div>
				</div>
			</div>
			<Divider />
			<Divider showBorder />
			<Divider />
			<div style={{ display: 'flex', gap: '30px' }} id="ecosystem-token-economy">
				{bulletSquare}
				<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
					<p style={{ marginBottom: '0' }}>
						<b>Enter the token economy.</b>
					</p>
					<p>To use AO apps, obtain wrapped $AR ($wAR) using Permaswap or Wrapped AR Depot.</p>
					<div className="project-container">
						<Link to={'https://permaswap.network'} style={{ width: '100%' }}>
							<div className="wallet-wrapper multiple-project-wrapper">
								<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
									<img src={permaswap} alt="permaswap" width={'8%'} />
									<p style={{ marginBottom: '-4px', fontSize: 'clamp(20px, 2vw, 28px)' }}>Permaswap</p>
								</div>
								<span style={{ fontSize: 'clamp(14px, 2vw, 20px)', fontFamily: 'DM Sans', fontWeight: '300' }}>
									FusionFi Portal, A Unified Financial Protocol on Permaweb.
								</span>
								{/* Arrow icon */}
								<img src={arrowUpRight} alt="Arrow" style={arrowInitialStyle} />
							</div>
						</Link>
						<Link to={'https://wardepot.arweave.net'} style={{ width: '100%' }}>
							<div className="wallet-wrapper multiple-project-wrapper">
								<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
									<img src={warDepot} alt="wardepot" width={'8%'} />
									<p style={{ marginBottom: '-4px', fontSize: 'clamp(20px, 2vw, 28px)' }}>Wrapped Ar Depot</p>
								</div>
								<span style={{ fontSize: 'clamp(14px, 2vw, 20px)', fontFamily: 'DM Sans', fontWeight: '300' }}>
									Powered by Everpay.
								</span>
								{/* Arrow icon */}
								<img src={arrowUpRight} alt="Arrow" style={arrowInitialStyle} />
							</div>
						</Link>
					</div>
				</div>
			</div>
			<Divider />
			<Divider showBorder />
			<Divider />
			<div style={{ display: 'flex', gap: '30px' }} id="ecosystem-vouch">
				{bulletSquare}
				<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
					<p style={{ marginBottom: '0' }}>
						<b>Get vouched. </b>
					</p>
					<p>
						Vouching is a proof of humanity mechanism that will grant your wallet access to all the app experiences on
						AO. There are multiple ways to get vouched.
					</p>

					<Link to={'https://permaswap.network'} style={{ width: '100%' }}>
						<div className="wallet-wrapper project-wrapper">
							<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
								<p style={{ marginBottom: '-4px', fontSize: 'clamp(20px, 2vw, 28px)' }}>Vouch Portal</p>
							</div>
							<span style={{ fontSize: 'clamp(14px, 2vw, 20px)', fontFamily: 'DM Sans', fontWeight: '300' }}>
								Vouch to access your favorite Permaweb Apps!
							</span>
							{/* Arrow icon */}
							<img src={arrowUpRight} alt="Arrow" style={arrowInitialStyle} />
						</div>
					</Link>
				</div>
			</div>
			<Divider />
			<Divider showBorder />
			<Divider />
			<div style={{ display: 'flex', gap: '30px' }} id="ecosystem-apps">
				{bulletSquare}
				<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
					<p style={{ marginBottom: '0' }}>
						<b>Use apps.</b>
					</p>
					<p>Check out a digital marketplace or a 100% onchain game.</p>
					<div className="project-container">
						<Link to={'https://bazar.arweave.net'} style={{ width: '100%' }}>
							<div className="wallet-wrapper multiple-project-wrapper">
								<div style={{ display: 'flex', alignItems: 'center', marginInline: '-18px' }}>
									<img src={bazar} alt="bazar" width={'15%'} />

									<p style={{ marginBottom: '-4px', fontSize: 'clamp(20px, 2vw, 28px)' }}>Bazar</p>
								</div>
								<span style={{ fontSize: 'clamp(14px, 2vw, 20px)', fontFamily: 'DM Sans', fontWeight: '300' }}>
									Empowers creators and collectors to interact, trade, and transact with digital content{' '}
								</span>
								{/* Arrow icon */}
								<img src={arrowUpRight} alt="Arrow" style={arrowInitialStyle} />
							</div>
						</Link>
						<Link to={'https://llamaland.arweave.net'} style={{ width: '100%' }}>
							<div className="wallet-wrapper multiple-project-wrapper">
								<div style={{ display: 'flex', alignItems: 'center', marginInline: '-10px' }}>
									<img src={llamaland} alt="llamaland" width={'13%'} />

									<p style={{ marginBottom: '-4px', fontSize: 'clamp(20px, 2vw, 28px)' }}>Llamaland</p>
								</div>
								<span style={{ fontSize: 'clamp(14px, 2vw, 20px)', fontFamily: 'DM Sans', fontWeight: '300' }}>
									AI powered MMO game built on AO. Petition the Llama King for Llama Coin! 100% onchain.
								</span>
								{/* Arrow icon */}
								<img src={arrowUpRight} alt="Arrow" style={arrowInitialStyle} />
							</div>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Ecosystem1;
