import React from 'react';
import { ReactSVG } from 'react-svg';
import parse from 'html-react-parser';

import { Button } from 'components/atoms/Button';
import { Panel } from 'components/atoms/Panel';
import { ASSETS } from 'helpers/config';
import { AllocationRecordType, AllocationTokenType } from 'helpers/types';
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
	const [showPanel, setShowPanel] = React.useState<boolean>(false);

	const TOKENS = {
		arweave: {
			label: 'Arweave',
			description: 'The Harddrive',
			summary: language.arDescription,
			icon: ASSETS.arweave,
		},
		pi: {
			label: 'Permaweb Index',
			description: 'AO + AR + Ecosystem Index',
			summary: language.piDescription,
			icon: ASSETS.pi,
		},
		ao: {
			label: 'AO',
			description: 'The Super Computer',
			summary: language.aoDescription,
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
				disabled={false}
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
									<span className={'primary-text'}>Allocation</span>
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
			<Panel
				open={showPanel}
				width={550}
				header={`Edit ${token.label} Allocation`}
				handleClose={() => setShowPanel(false)}
			>
				<p></p>
			</Panel>
		</>
	) : null;
}
