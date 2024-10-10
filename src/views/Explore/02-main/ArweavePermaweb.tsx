import './ExploreMainStyles.css';

import { Divider } from './ExploreMain';

const ArweavePermaweb = () => {
	return (
		<section id="arweave">
			<h1>Arweave & the Permaweb</h1>
			<p>
				AO and Arweave are pillars of the Permaweb, the new decentralized internet where users’ rights are immutable and
				guaranteed. Explore and build on a vast number of new use cases, 100% onchain.
			</p>
			<div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
				<iframe
					src="https://player.vimeo.com/video/947500122?h=df45932706&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
					title="Permaweb"
					allow="autoplay; muted; fullscreen; picture-in-picture; clipboard-write"
					style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
				></iframe>
			</div>
			<Divider />
		</section>
	);
};

export default ArweavePermaweb;
