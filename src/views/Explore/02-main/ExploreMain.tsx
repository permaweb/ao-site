import Footer from 'components/Footer/Footer';
import SideNav from 'components/SideNav';

import './ExploreMainStyles.css';

import ArweavePermaweb from './ArweavePermaweb';
import Ecosystem1 from './Ecosystem1';
import Intro from './Intro';
import Tokenomics from './Tokenomics';

export const Divider = ({ showBorder = false }) => (
	<div
		className="divider"
		style={{
			border: showBorder ? '1px solid #F2F2F2' : 'none', // Conditionally apply the border
		}}
	></div>
);

const ExploreMain = () => {
	return (
		<>
			<main className="explore">
				<div className="explore-main-wrapper">
					<div className="explore-content-wrapper">
						<Intro />
						<Divider showBorder />

						<Ecosystem1 />
						<Divider showBorder />

						<Tokenomics />
						<Divider showBorder />
						<ArweavePermaweb />
					</div>
					<SideNav />
					<Footer />
				</div>
			</main>
		</>
	);
};

export default ExploreMain;
