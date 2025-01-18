import React from 'react';
import { ReactSVG } from 'react-svg';

import { ASSETS } from 'helpers/config';
import { AllocationTokenType } from 'helpers/types';
import { formatPercentage } from 'helpers/utils';
import { useAllocationProvider } from 'providers/AllocationProvider';

import * as S from './styles';
import { IProps } from './types';

export default function AllocationToken(props: IProps) {
	const allocationProvider = useAllocationProvider();

	const [token, setToken] = React.useState<{
		type: AllocationTokenType;
		label: string;
		description: string;
		icon: string;
	} | null>(null);

	const [open, setOpen] = React.useState<boolean>(true);

	const TOKENS = {
		pi: {
			label: 'PI',
			description: 'AO + AR + Ecosystem Index',
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
					<S.TokenBodyFlexWrapper>
						<S.TokenBodyQuantity>
							<S.TokenBodyQuantityHeader>
								<span className={'primary-text'}>Balance</span>
							</S.TokenBodyQuantityHeader>
							<S.TokenBodyQuantityValue>
								<p>8.76</p>
							</S.TokenBodyQuantityValue>
						</S.TokenBodyQuantity>
						<S.TokenBodyQuantity>
							<S.TokenBodyQuantityHeader>
								<span className={'primary-text'}>Allocation</span>
							</S.TokenBodyQuantityHeader>
							<S.TokenBodyQuantityValue>
								<p>{formatPercentage(allocationProvider[props.type] ?? 0)}</p>
							</S.TokenBodyQuantityValue>
						</S.TokenBodyQuantity>
						<S.TokenBodyQuantity>
							<S.TokenBodyQuantityHeader>
								<span className={'primary-text'}>30 Day Projection</span>
							</S.TokenBodyQuantityHeader>
							<S.TokenBodyQuantityValue>
								<p>
									<span className={'indicator'}>+</span>1.54
								</p>
							</S.TokenBodyQuantityValue>
						</S.TokenBodyQuantity>
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
					</S.TokenBodyFlexWrapper>
				</S.TokenBodyWrapper>
			)}
		</S.Wrapper>
	) : null;
}
