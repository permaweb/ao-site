import './ExploreMainStyles.css';

import tokenEmissions from '../../../assets/token_emissions.svg';

const Tokenomics = () => {
	return (
		<section>
			<h1 style={{ marginBottom: '100px' }}>Tokenomics</h1>
			<p>Max supply: 21,000,000</p>
			<p> Minting: 4 year halving cycle</p>

			<img src={tokenEmissions} alt="token-emissions" width={'50%'} />
			<p>100% Fair Launch</p>
			<p> 33% automatically distributed to Arweave($AR) token holders. </p>
			<p>66% minted to depositors of staked assets currently staked ETH $stETH and $DAI. </p>
			<p>tokenomics video</p>
		</section>
	);
};

export default Tokenomics;
