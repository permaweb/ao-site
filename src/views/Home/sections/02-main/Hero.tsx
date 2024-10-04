import { useRef } from 'react';
import { Link } from 'react-router-dom';

import './HomeMainStyles.css';

import chevronDown from '../../../../assets/chevronDown.svg';
import HexocetAnimationComponent from '../../../../components/HexocetAnimation/HexocetAnimationComponent';
import HyperTextLoad from '../../../../components/hyperTextLoad';

const Hero = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<div className="hero-main-wrapper" ref={containerRef}>
			<div className="hero">
				<HexocetAnimationComponent containerRef={containerRef} />
				<div className="content-hero-wrapper">
					<div className="text-hero-wrapper">
						<div className="main-heading">
							<h1>Hyper. Parallel. Computer.</h1>
						</div>
					</div>
					<div className="button-wrapper">
						<Link to={'https://cookbook_ao.g8way.io/'} target="_blank" rel="noopener noreferrer">
							<button className="glitch primary link-terminal-blue" data-text="→ Boot Up Testnet">
								<HyperTextLoad word={'→ Boot Up The TestNet'} textType="span" speed={1} />
							</button>
						</Link>
					</div>
				</div>
				<div className="explore-wrapper">
					<span>Explore</span> <img className="floating" src={chevronDown} alt="chevron-down" />
				</div>
			</div>
		</div>
	);
};

export default Hero;
