import { useEffect, useState } from 'react';

import './SideNav.css';

const sections = [
	{ id: 'intro', label: 'Intro' },
	{ id: 'ecosystem', label: 'Ecosystem' },
	{ id: 'ecosystem-wallet', label: 'Wallet', isSubHeader: true },
	{ id: 'ecosystem-token-economy', label: 'Token Economy', isSubHeader: true },
	{ id: 'ecosystem-vouch', label: 'Vouch', isSubHeader: true },
	{ id: 'ecosystem-apps', label: 'Apps', isSubHeader: true },
	{ id: 'tokenomics', label: 'Tokenomics' },
	{ id: 'arweave', label: 'Arweave & the Permaweb' },
];

const SideNav = () => {
	const [activeSection, setActiveSection] = useState('intro'); // Default active section is Intro
	const [indicatorPosition, setIndicatorPosition] = useState(0); // Track indicator position

	useEffect(() => {
		const handleScroll = () => {
			// Check the scroll position and find the active section
			sections.forEach((section, index) => {
				const element = document.getElementById(section.id);
				if (element) {
					const rect = element.getBoundingClientRect();

					// If the section is in the viewport, mark it as active
					if (rect.top < window.innerHeight / 4 && rect.bottom > window.innerHeight / 4) {
						setActiveSection(section.id);
						setIndicatorPosition(index * 30.41); // Adjust the multiplier to move the indicator vertically
					}
				}
			});
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleLinkClick = (id) => (e) => {
		e.preventDefault(); // Prevent default anchor behavior
		const section = document.getElementById(id);
		if (section) {
			const offset = 50; // Set the offset to 40px
			const elementPosition = section.getBoundingClientRect().top + window.scrollY; // Calculate the element's position
			const offsetPosition = elementPosition - offset; // Adjust for the offset

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth', // Smooth scrolling
			});
		}
	};

	return (
		<aside>
			<div className="side-nav">
				{/* Moving Indicator */}
				<div className="moving-indicator" style={{ top: `${indicatorPosition}px` }}></div>
				<ul>
					{sections.map((section) => (
						<li
							key={section.id}
							className={section.id === activeSection ? 'active' : ''}
							style={{ marginLeft: section.isSubHeader ? '20px' : '0' }} // Indent subheaders
						>
							<a href={`#${section.id}`} className="nav-link" onClick={handleLinkClick(section.id)}>
								{section.label}
							</a>
						</li>
					))}
				</ul>
			</div>
			<div className="box"></div>
		</aside>
	);
};

export default SideNav;
