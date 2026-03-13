import React from 'react';
import { Link } from 'react-router-dom';

import { NAV_REDIRECTS } from 'helpers/config';

import * as S from './styles';

export default function Footer() {
	const [utcTime, setUtcTime] = React.useState('');

	React.useEffect(() => {
		const formatter = new Intl.DateTimeFormat('en-GB', {
			timeZone: 'UTC',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false,
		});

		const updateTime = () => setUtcTime(formatter.format(new Date()));
		updateTime();
		const intervalId = window.setInterval(updateTime, 1000);

		return () => {
			window.clearInterval(intervalId);
		};
	}, []);

	return (
		<S.FooterRow>
			<S.LinksWrapper>
				{NAV_REDIRECTS.map((element: { path: string; label: string; target?: '_blank' }, index: number) => {
					return (
						<Link key={index} to={element.path} target={'_blank'} className={'primary-text'}>
							<span>{element.label}</span>
						</Link>
					);
				})}
			</S.LinksWrapper>
			<S.UtcTime className={'primary-text'}>{`UTC ${utcTime}`}</S.UtcTime>
		</S.FooterRow>
	);
}
