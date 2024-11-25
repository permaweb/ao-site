import { useEffect } from 'react';

import Footer from 'components/Footer/Footer';

import './HomeMainStyles.css';

import morpheusAsciiArt from '../../../../components/MorpheusAsciiArt';

import Build from './Build';
import Community from './Community';
import Ecosystem from './Ecosystem';
import Hero from './Hero';
import Permaweb from './Permaweb';

const HomeMain = () => {
	useEffect(() => {
		morpheusAsciiArt();
	}, []);

	return (
		<>
			<main>
				<div className="main-wrapper">
					<Hero />
					<Ecosystem />
					<Build />
					<Community />
					<Permaweb />
					<Footer />
				</div>
			</main>
		</>
	);
};

export default HomeMain;
