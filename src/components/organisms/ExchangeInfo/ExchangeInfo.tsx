import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import parse from 'html-react-parser';

import { ASSETS, ETH_EXCHANGE_CONFIG, ETH_EXCHANGE_REDIRECTS } from 'helpers/config';
import { TokenEarningsType } from 'helpers/types';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

export default function ExchangeInfo(props: { token: TokenEarningsType }) {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	return (
		<S.Wrapper>
			<S.Description className={'border-wrapper-alt1 fade-in'}>
				<p>{parse(ETH_EXCHANGE_CONFIG[props.token].description)}</p>
			</S.Description>
			<S.IconsWrapper className={'border-wrapper-alt1 fade-in'}>
				<S.IconGroup>
					<p className={'primary-text'}>{language.baseContractAudits}</p>
					<S.IconsLine>
						<Link to={ETH_EXCHANGE_REDIRECTS.codehawks} target={'_blank'}>
							<div className={'codehawks-audit'}>
								<ReactSVG src={ASSETS.codehawksAudit} />
							</div>
						</Link>
						<Link to={ETH_EXCHANGE_REDIRECTS.renascence} target={'_blank'}>
							<div className={'renascence-audit'}>
								<ReactSVG src={ASSETS.renascenseAudit} />
							</div>
						</Link>
						<Link to={ETH_EXCHANGE_REDIRECTS.morpheus} target={'_blank'}>
							<div className={'morpheus-audit'}>
								<ReactSVG src={ASSETS.morpheusAudit} />
							</div>
						</Link>
					</S.IconsLine>
				</S.IconGroup>
				<S.IconGroup>
					<p className={'primary-text'}>{language.aoAudit}</p>
					<S.IconsLine>
						<Link to={ETH_EXCHANGE_REDIRECTS.ncc1} target={'_blank'}>
							<div className={'ncc-audit-wrapper'}>
								<div className={'ncc-audit'}>
									<ReactSVG src={ASSETS.nccAudit} />
								</div>
								<span>֯֯1</span>
							</div>
						</Link>
						<Link to={ETH_EXCHANGE_REDIRECTS.ncc2} target={'_blank'}>
							<div className={'ncc-audit-wrapper'}>
								<div className={'ncc-audit'}>
									<ReactSVG src={ASSETS.nccAudit} />
								</div>
								<span>2</span>
							</div>
						</Link>
					</S.IconsLine>
				</S.IconGroup>
			</S.IconsWrapper>
		</S.Wrapper>
	);
}
