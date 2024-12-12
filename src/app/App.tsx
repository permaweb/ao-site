import { useLocation } from 'react-router-dom';

import Footer from 'components/Footer/Footer';
import Nav from 'components/Nav/Nav';
import { Routes } from 'routes';

export default function App() {
	const location = useLocation();
	const isHomePage = location.pathname === '/';

	const dynamicColor = isHomePage ? '#000' : '#fff';

	return (
		<>
			<div id="loader" />
			<div id="notification" />
			<div id="overlay" />
			<Nav />
			<div className={'view-wrapper'} style={{ background: `${dynamicColor}` }}>
				<Routes />
			</div>
			{/* <Footer /> */}
		</>
	);
}
