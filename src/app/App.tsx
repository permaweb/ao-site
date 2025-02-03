import React from 'react';

import { Header } from 'navigation/header';
import { Routes } from 'routes';

import AsciiArt from './AsciiArt';
import * as S from './styles';

export default function App() {
	React.useEffect(() => {
		AsciiArt();
	}, []);

	return (
		<>
			<div id={'loader'} />
			<div id={'notification'} />
			<div id={'overlay'} />
			<Header />
			<S.View>
				<Routes />
			</S.View>
		</>
	);
}
