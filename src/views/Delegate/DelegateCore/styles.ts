import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	width: 100%;
`;

export const HeaderWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 12.5px;
	padding: 23.5px 25px 20px 25px;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};

	p {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.lg};
		color: ${(props) => props.theme.colors.font.primary};
	}

	span {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) =>
			`clamp(${props.theme.typography.size.xSmall}, 2vw, ${props.theme.typography.size.base})`};
		color: ${(props) => props.theme.colors.font.alt1};
	}

	@media (max-width: ${STYLING.cutoffs.initial}) {
		justify-content: space-between;
		flex-wrap: wrap;
	}

	@media (max-width: ${STYLING.cutoffs.mobile}) {
		padding: 18px 16px 16px 16px;
	}
`;

export const BodyWrapper = styled.div`
	width: 100%;
	display: flex;

	> * {
		&:not(:last-child) {
			border-right: 1px solid ${(props) => props.theme.colors.border.primary};
		}
	}

	@media (max-width: ${STYLING.cutoffs.desktop}) {
		flex-direction: column;

		> * {
			&:not(:last-child) {
				border-right: none;
				border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
			}
		}
	}
`;

export const BodySection = styled.div`
	flex: 1;
	position: relative;
	padding: 20px 25px;

	@media (max-width: ${STYLING.cutoffs.tablet}) {
		padding: 16px 20px;
	}

	@media (max-width: ${STYLING.cutoffs.mobile}) {
		padding: 16px;
	}
`;

export const BodySectionHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 7.5px;

	p {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		font-size: ${(props) => props.theme.typography.size.lg};
		color: ${(props) => props.theme.colors.font.primary};
	}

	span {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const BodySectionName = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;

	img {
		height: 23px;
		width: 23px;
		object-fit: contain;
		flex-shrink: 0;
	}
`;

export const BodySectionDescription = styled.div`
	min-height: 100px;
	margin: 10px 0 0 0;

	@media (max-width: ${STYLING.cutoffs.tablet}) {
		min-height: 72px;
	}

	p {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const BodySectionAction = styled.div`
	display: flex;
	align-items: center;
	gap: 7.5px;
	margin: 40px 0 0 0;

	@media (max-width: ${STYLING.cutoffs.tablet}) {
		margin: 24px 0 0 0;
	}

	p {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		font-size: ${(props) => props.theme.typography.size.small};
		color: ${(props) => props.theme.colors.font.primary};
	}

	span {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;
