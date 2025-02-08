import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 40px;
`;

export const ActionsWrapper = styled.div`
	width: 100%;
	display: flex;
	gap: 40px;
	align-items: flex-start;
	justify-content: space-between;

	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-direction: column;
	}
`;

export const Action = styled.button<{ active: boolean }>`
	display: flex;
	flex-direction: column;
	gap: 20px;
	align-items: flex-start;
	flex: 1;
	padding: 20px;
	border: 1px solid
		${(props) => (props.active ? props.theme.colors.indicator.active : props.theme.colors.border.primary)};
	outline: 1.5px solid ${(props) => (props.active ? props.theme.colors.indicator.active : 'transparent')};

	&:hover {
		background: ${(props) => props.theme.colors.container.primary.active};
		border: 1px solid
			${(props) => (props.active ? props.theme.colors.indicator.active : props.theme.colors.border.alt4)};
	}
`;

export const ActionTitle = styled.div`
	span {
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		font-size: ${(props) => props.theme.typography.size.xLg};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const ActionDescription = styled.div`
	p {
		text-align: left;
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.base};
		color: ${(props) => props.theme.colors.font.alt1};
		line-height: 1.65;
	}
`;

export const ActionChart = styled.div`
	width: 100%;
`;

export const SubmitWrapper = styled.div`
	width: fit-content;
	margin: 0 auto;
`;
