import './ExploreMainStyles.css';

import { Divider } from './ExploreMain';

const ArweavePermaweb = () => {
	const videoWrapper: React.CSSProperties = {
		display: 'flex',
		width: '100%',
	};
	return (
		<section id="arweave">
			<h1 style={{ marginBottom: '0px' }}>Arweave & the Permaweb</h1>
			<p>AO and Arweave are pillars of the Permaweb</p>
			<p>
				The new decentralized internet where users’ rights are immutable and guaranteed. Explore and build on a vast
				number of new use cases, 100% onchain.
			</p>
			<div style={videoWrapper}>
				<iframe
					src="https://odysee.com/$/embed/@AO:4/the_permaweb-(1440p)-(1):9?r=GovBscmXVLs3avGjcR1f5ktd6X8Ehgqo"
					title="Permaweb"
					allow="autoplay; muted; fullscreen; picture-in-picture; clipboard-write"
					style={{ width: '100%', aspectRatio: '16/9' }}
				></iframe>
			</div>
			<Divider />
		</section>
	);
};

export default ArweavePermaweb;
