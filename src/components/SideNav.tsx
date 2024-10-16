import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import the useLocation hook

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
	const location = useLocation(); // Get the current path from React Router

	// Scroll to section when the component mounts or path changes
	useEffect(() => {
		// Scroll to the section based on the hash in the URL
		const scrollToSection = () => {
			if (location.hash) {
				const sectionId = location.hash.substring(1); // Remove the '#' to get the section ID
				const section = document.getElementById(sectionId);
				if (section) {
					const offset = 50; // Set the offset to account for any fixed headers
					const elementPosition = section.getBoundingClientRect().top + window.scrollY;
					const offsetPosition = elementPosition - offset;

					window.scrollTo({
						top: offsetPosition,
						behavior: 'smooth', // Smooth scrolling
					});
				}
			}
		};

		scrollToSection(); // Call it on mount/path change

		// Attach scroll listener to highlight sections while scrolling
		const handleScroll = () => {
			sections.forEach((section, index) => {
				const element = document.getElementById(section.id);
				if (element) {
					const rect = element.getBoundingClientRect();

					// If the section is in the viewport, mark it as active
					if (rect.top < window.innerHeight / 4 && rect.bottom > window.innerHeight / 4) {
						setActiveSection(section.id);
						setIndicatorPosition(index * 30.41); // Adjust the multiplier to move the indicator vertically

						// Use the location.pathname to get the full current path
						const currentPath = '/#' + location.pathname; // This will give you '/explore'
						const newUrl = `${currentPath}#${section.id}`; // Append the hash to the current path

						// Avoid unnecessary updates to the URL
						if (window.location.hash !== `#${section.id}`) {
							window.history.replaceState(null, '', newUrl);
						}
					}
				}
			});
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [location.pathname, location.hash]); // Re-run the effect if the pathname or hash changes

	const handleLinkClick = (id) => (e) => {
		e.preventDefault(); // Prevent default anchor behavior
		const section = document.getElementById(id);
		if (section) {
			const offset = 50; // Set the offset to 50px
			const elementPosition = section.getBoundingClientRect().top + window.scrollY; // Calculate the element's position
			const offsetPosition = elementPosition - offset; // Adjust for the offset

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth', // Smooth scrolling
			});

			// Use the location.pathname to get the full current path
			const currentPath = location.pathname; // This will give you '/explore'
			const newUrl = `${currentPath}#${id}`; // Append the hash to the current path

			// Avoid unnecessary updates to the URL
			if (window.location.hash !== `#${id}`) {
				window.history.replaceState(null, '', newUrl);
			}
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
