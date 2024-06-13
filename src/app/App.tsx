import Footer from 'components/Footer/Footer';
import Nav from 'components/Nav/Nav';
import { Routes } from 'routes';

export default function App() {
	return (
		<>
			<div id="loader" />
			<div id="notification" />
			<div id="overlay" />
			<Nav />
			<div className={'view-wrapper'}>
				<Routes />
			</div>
			<Footer />
		</>
	);
}
