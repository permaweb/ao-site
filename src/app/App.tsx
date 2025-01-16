import { Header } from 'navigation/header';
import { Routes } from 'routes';

import * as S from './styles';

// TODO: 404
export default function App() {
	return (
		<>
			<div id={'loader'} />
			<div id={'notification'} />
			<div id={'overlay'} />
			<Header />
			<S.View className={'max-view-wrapper'}>
				<Routes />
			</S.View>
		</>
	);
}
