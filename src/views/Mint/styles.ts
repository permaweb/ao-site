import styled from 'styled-components';

import { STYLING } from 'helpers/config';

const ALLOCATION_WIDTH = '425px';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 40px;
`;

export const GlobalWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;

	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
		gap: 40px;
	}
`;

export const GlobalSection = styled.div`
	height: 350px;
	width: calc(50% - 20px);
	padding: 25px;

	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;

export const GlobalHeader = styled.div`
	h6 {
		line-height: 1;
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-size: ${(props) => props.theme.typography.size.xLg};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const HeaderWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
`;

export const HeaderBalanceWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const HeaderInfo = styled.div`
	h6 {
		line-height: 1;
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-size: ${(props) => props.theme.typography.size.xLg};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const HeaderBalanceQuantity = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;

	h4 {
		line-height: 1;
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.xBold};
		color: ${(props) => props.theme.colors.font.primary};
	}

	svg {
		height: 30px;
		width: 30px;
		fill: ${(props) => props.theme.colors.icon.primary.fill};
		margin: 1.5px 0 0 0;
	}
`;

export const BodyWrapper = styled.div`
	width: 100%;
	display: flex;
	gap: 40px;

	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
		gap: 40px;
	}
`;

export const TokensSection = styled.div`
	width: calc(100% - ${ALLOCATION_WIDTH} - 40px);
	display: flex;
	flex-direction: column;
	gap: 40px;

	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;

export const AllocationWrapper = styled.div`
	height: fit-content;
	width: ${ALLOCATION_WIDTH};

	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;
