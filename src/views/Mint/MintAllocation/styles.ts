import styled from 'styled-components';

import { STYLING } from 'helpers/config';

const ALLOCATION_WIDTH = '425px';

export const AllocationWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 25px;
`;

export const HeaderWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 10px;
`;

export const HeaderInfoWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
`;

export const HeaderInfo = styled.div`
	h6 {
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const HeaderTooltip = styled.div`
	button {
		display: flex;
		align-items: center;
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		font-size: ${(props) => props.theme.typography.size.base};
		color: ${(props) => props.theme.colors.link.color};

		svg {
			height: 15px;
			width: 15px;
			fill: ${(props) => props.theme.colors.link.color};
			margin: 5.5px 5.5px 0 0;
		}

		&:hover {
			color: ${(props) => props.theme.colors.link.active};

			svg {
				color: ${(props) => props.theme.colors.link.active};
			}
		}
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

export const AllocationBodyWrapper = styled(BodyWrapper)``;

export const TokensSection = styled.div`
	width: calc(100% - ${ALLOCATION_WIDTH} - 40px);
	display: flex;
	flex-direction: column;
	gap: 40px;

	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;

export const TokenFlexWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;

	@media (max-width: ${STYLING.cutoffs.desktop}) {
		flex-direction: column;
		gap: 40px;
	}
`;

export const TokenFlexSection = styled.div`
	width: calc(50% - 20px);

	@media (max-width: ${STYLING.cutoffs.desktop}) {
		width: 100%;
	}
`;

export const AllocationSummaryWrapper = styled.div`
	height: fit-content;
	width: ${ALLOCATION_WIDTH};
	position: sticky;
	top: ${STYLING.dimensions.nav.height};

	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;

export const ModalWrapper = styled.div``;
