import React from 'react';

import * as S from './styles';

export default function EllipsisLoader(props: { className?: string }) {
	const [dots, setDots] = React.useState('');

	React.useEffect(() => {
		const interval = setInterval(() => {
			setDots((prev) => (prev === '...' ? '' : prev + '.'));
		}, 150);
		return () => clearInterval(interval);
	}, []);

	return <S.Ellipsis className={props.className ?? ''}>{dots}</S.Ellipsis>;
}
