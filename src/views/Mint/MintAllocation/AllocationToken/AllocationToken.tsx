import parse from 'html-react-parser';
import React from 'react';
import { ReactSVG } from 'react-svg';

import { Button } from 'components/atoms/Button';
import { ASSETS } from 'helpers/config';
import { AllocationRecordType, AllocationTokenType } from 'helpers/types';
import { formatPercentage } from 'helpers/utils';
import { useAllocationProvider } from 'providers/AllocationProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';
import { IProps } from './types';

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
		arweave: {
			label: language.arLabel,
			description: language.arDescription,
			summary: language.arSummary,
			icon: ASSETS.arweave,
		},
		pi: {
			label: language.piLabel,
			description: language.piDescription,
			summary: language.piSummary,
			icon: ASSETS.pi,
		},
		ao: {
			label: language.ao,
			description: language.aoDescription,
			summary: language.aoSummary,
			icon: ASSETS.ao,
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
				setToken({ type: 'arweave', ...TOKENS.arweave });
				break;
			default:
				break;
		}
	}, [props.type]);

	const currentAllocationRecord = allocationProvider.records?.find(
		(record: AllocationRecordType) => record.id === token?.type
	);

	function getTokenAction() {
		return (
			<Button
				type={currentAllocationRecord ? 'primary' : 'alt1'}
				label={currentAllocationRecord ? language.remove : language.add}
				handlePress={() =>
					currentAllocationRecord
						? allocationProvider.removeToken({
								id: token.type,
								label: token.label,
						  })
						: allocationProvider.addToken({
								id: token.type,
								label: token.label,
						  })
				}
				disabled={allocationProvider.isTokenDisabled({ id: token.type, label: token.label })}
				icon={currentAllocationRecord ? ASSETS.remove : ASSETS.add}
				iconLeftAlign
				height={65}
				fullWidth
			/>
		);
	}

	return token ? (
		<>
			<S.Wrapper className={'border-wrapper-primary'}>
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
					<S.TokenBodyWrapper open={open} className={'fade-in'}>
						{token.summary && (
							<S.TokenBodyDescriptionWrapper>
								<p>{parse(token.summary)}</p>
							</S.TokenBodyDescriptionWrapper>
						)}
						<S.TokenBodyValuesWrapper>
							<S.TokenBodyQuantity>
								<S.TokenBodyQuantityHeader>
									<span className={'primary-text'}>{language.allocation}</span>
								</S.TokenBodyQuantityHeader>
								<S.TokenBodyQuantityValue>
									<p>{formatPercentage(currentAllocationRecord?.value ?? 0)}</p>
								</S.TokenBodyQuantityValue>
							</S.TokenBodyQuantity>
						</S.TokenBodyValuesWrapper>
						<S.TokenBodyActionWrapper>{getTokenAction()}</S.TokenBodyActionWrapper>
					</S.TokenBodyWrapper>
				)}
			</S.Wrapper>
		</>
	) : null;
}
