import Footer from 'components/Footer/Footer';

import './ExploreMainStyles.css';

import ArweavePermaweb from './ArweavePermaweb';
import Ecosystem from './Ecosystem';
import Intro from './Intro';
import Tokenomics from './Tokenomics';

const ExploreMain = () => {
	return (
		<>
			<main className="explore">
				<div className="explore-main-wrapper">
					<div className="explore-content-wrapper">
						<Intro />
						<Ecosystem />
						<Tokenomics />
						<ArweavePermaweb />
					</div>
					<Footer />
				</div>
			</main>
		</>
	);
};

export default ExploreMain;
