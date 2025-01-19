import React from 'react';
import { ReactSVG } from 'react-svg';
import parse from 'html-react-parser';

import { Button } from 'components/atoms/Button';
import { ASSETS } from 'helpers/config';
import { AllocationTokenType } from 'helpers/types';
import { formatPercentage } from 'helpers/utils';
import { useAllocationProvider } from 'providers/AllocationProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';
import { IProps } from './types';

// TODO: Language
export default function AllocationToken(props: IProps) {
	const allocationProvider = useAllocationProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [token, setToken] = React.useState<{
		type: AllocationTokenType;
		label: string;
		description: string;
		summary?: string;
		icon: string;
	} | null>(null);

	const [open, setOpen] = React.useState<boolean>(props.defaultClosed ? !props.defaultClosed : true);

	const TOKENS = {
		pi: {
			label: 'PI',
			description: 'AO + AR + Ecosystem Index',
			summary: '<b>Currency of the Permaweb</b> (33.33% AO, 33.33% AR, 33.33% Ecosystem Projects)',
			icon: ASSETS.pi,
		},
		ao: {
			label: 'AO',
			description: 'The Security Token',
			icon: ASSETS.ao,
		},
		ar: {
			label: 'Arweave',
			description: 'The Harddrive',
			icon: ASSETS.arweave,
		},
	};

	React.useEffect(() => {
		switch (props.type) {
			case 'pi':
				setToken({ type: 'pi', ...TOKENS.pi });
				break;
			case 'ao':
				setToken({ type: 'ao', ...TOKENS.ao });
				break;
			case 'arweave':
				setToken({ type: 'arweave', ...TOKENS.ar });
				break;
			default:
				break;
		}
	}, [props.type]);

	return token ? (
		<S.Wrapper>
			<S.TokenSection open={open} className={'fade-in'} onClick={() => setOpen((prev) => !prev)}>
				<S.TokenSectionHeaderWrapper>
					<ReactSVG src={token.icon} />
					<S.TokenSectionInfoWrapper>
						<S.TokenSectionTitle>
							<p>{token.label}</p>
						</S.TokenSectionTitle>
						<S.TokenSectionDescription>
							<p>{token.description}</p>
						</S.TokenSectionDescription>
					</S.TokenSectionInfoWrapper>
				</S.TokenSectionHeaderWrapper>
				<S.TokenSectionEndWrapper open={open}>
					<ReactSVG src={ASSETS.arrow} />
				</S.TokenSectionEndWrapper>
			</S.TokenSection>
			{open && (
				<S.TokenBodyWrapper className={'border-wrapper-primary fade-in'}>
					{token.summary && (
						<S.TokenBodyDescriptionWrapper>
							<p className={'primary-text'}>{parse(token.summary)}</p>
						</S.TokenBodyDescriptionWrapper>
					)}
					<S.TokenBodyValuesWrapper>
						{/* <S.TokenBodyQuantity>
							<S.TokenBodyQuantityHeader>
								<span className={'primary-text'}>Balance</span>
							</S.TokenBodyQuantityHeader>
							<S.TokenBodyQuantityValue>
								<p>8.76</p>
							</S.TokenBodyQuantityValue>
						</S.TokenBodyQuantity> */}
						<S.TokenBodyQuantity>
							<S.TokenBodyQuantityHeader>
								<span className={'primary-text'}>Allocation</span>
							</S.TokenBodyQuantityHeader>
							<S.TokenBodyQuantityValue>
								<p>{formatPercentage(allocationProvider[props.type] ?? 0)}</p>
							</S.TokenBodyQuantityValue>
						</S.TokenBodyQuantity>
						{/* <S.TokenBodyQuantity>
							<S.TokenBodyQuantityHeader>
								<span className={'primary-text'}>30 Day Projection</span>
							</S.TokenBodyQuantityHeader>
							<S.TokenBodyQuantityValue>
								<p>
									<span className={'indicator'}>+</span>1.54
								</p>
							</S.TokenBodyQuantityValue>
						</S.TokenBodyQuantity> */}
						<S.TokenBodyQuantity>
							<S.TokenBodyQuantityHeader>
								<span className={'primary-text'}>1 Year Projection</span>
							</S.TokenBodyQuantityHeader>
							<S.TokenBodyQuantityValue>
								<p>
									<span className={'indicator'}>+</span>400.34
								</p>
							</S.TokenBodyQuantityValue>
						</S.TokenBodyQuantity>
					</S.TokenBodyValuesWrapper>
					<S.TokenBodyActionWrapper>
						<Button
							type={'alt1'}
							label={language.add}
							handlePress={() => {}}
							icon={ASSETS.add}
							iconLeftAlign
							height={65}
							fullWidth
						/>
					</S.TokenBodyActionWrapper>
				</S.TokenBodyWrapper>
			)}
		</S.Wrapper>
	) : null;
}
