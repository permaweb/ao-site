import { Link } from 'react-router-dom';

import { NAV_REDIRECTS } from 'helpers/config';

import * as S from './styles';

export default function Footer() {
	return (
		<S.LinksWrapper>
			{NAV_REDIRECTS.map((element: { path: string; label: string; target?: '_blank' }, index: number) => {
				return (
					<Link key={index} to={element.path} target={'_blank'} className={'primary-text'}>
						<span>{element.label}</span>
					</Link>
				);
			})}
		</S.LinksWrapper>
	);
}
