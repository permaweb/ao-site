import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const TokenSection = styled.button<{ open: boolean }>`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 35px 25px;

	border: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) =>
		props.open
			? props.theme.colors.container.primary.active
			: props.theme.colors.container.primary.background} !important;

	&:hover {
		background: ${(props) => props.theme.colors.container.primary.active} !important;
	}
`;

export const TokenSectionHeaderWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 25px;
	svg {
		height: 40px;
		width: 40px;
		margin: 5px 0 0 0;
	}
`;

export const TokenSectionInfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 1.5px;
`;

export const TokenSectionTitle = styled.div`
	p {
		font-size: ${(props) => props.theme.typography.size.lg};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const TokenSectionDescription = styled.div`
	p {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.alt1};
		text-transform: uppercase;

		b {
			font-weight: ${(props) => props.theme.typography.weight.bold};
		}
	}

	@media (max-width: ${STYLING.cutoffs.secondary}) {
		display: none;
	}
`;

export const TokenSectionEndWrapper = styled.div<{ open: boolean }>`
	svg {
		height: 25px;
		width: 25px;
		fill: ${(props) => props.theme.colors.icon.primary.fill};
		transform: rotate(${(props) => (props.open ? '0deg' : '0deg')});
		transition: transform 250ms ease-in-out;

		margin: 5px 0 0 0;
	}
`;

export const TokenBodyWrapper = styled.div`
	width: 100%;
	border-top: none !important;
	padding: 25px;
`;

export const TokenBodyFlexWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const TokenBodyQuantity = styled.div`
	display: flex;
	flex-direction: column;
`;

export const TokenBodyQuantityHeader = styled.div`
	display: flex;
	flex-direction: column;

	span {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const TokenBodyQuantityValue = styled.div`
	display: flex;
	align-items: center;
	gap: 7.5px;

	p,
	span {
		font-size: ${(props) => props.theme.typography.size.xLg};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.bold};
	}

	p {
		color: ${(props) => props.theme.colors.font.primary};
	}

	svg {
		height: 27.5px;
		width: 27.5px;
		margin: 6.5px 0 0 0;
	}

	.indicator {
		margin: 0 3.5px 0 0;
	}
`;
