import Footer from 'components/Footer/Footer';

import './ExploreMainStyles.css';

import ArweavePermaweb from './ArweavePermaweb';
import Ecosystem1 from './Ecosystem1';
import Ecosystem2 from './Ecosystem2';
import Ecosystem3 from './Ecosystem3';
import Ecosystem4 from './Ecosystem4';
import Intro from './Intro';
import Tokenomics from './Tokenomics';

const ExploreMain = () => {
	return (
		<>
			<main className="explore">
				<div className="explore-main-wrapper">
					<div className="explore-content-wrapper">
						<Intro />
						<Ecosystem1 />
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
