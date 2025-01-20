import styled from 'styled-components';

import { STYLING } from 'helpers/config';

const ALLOCATION_WIDTH = '425px';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 60px;
	padding: 20px 0;
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
	width: 50%;

	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;

export const InfoWrapper = styled(GlobalSection)`
	padding: 0 70px 0 0;

	@media (max-width: ${STYLING.cutoffs.initial}) {
		padding: 0;
	}
`;

export const InfoHeader = styled.div`
	margin: 0 0 30px 0;
	h6 {
		line-height: 1;
		font-family: ${(props) => props.theme.typography.family.primary};
		font-size: ${(props) => props.theme.typography.size.xxLg};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.primary};
	}

	@media (max-width: ${STYLING.cutoffs.initial}) {
		h6 {
			line-height: 1.5;
		}
	}
`;

export const InfoBody = styled.div`
	margin: 20px 0 0 0;
	p {
		font-size: ${(props) => props.theme.typography.size.small};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.primary};
	}

	b {
		font-weight: ${(props) => props.theme.typography.weight.bold};
	}

	a {
		display: block;
		margin: 20px 0 0 0;
		font-size: ${(props) => props.theme.typography.size.xxSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.link.color};
		text-decoration: underline;

		&:hover {
			color: ${(props) => props.theme.colors.link.active};
		}
	}

	#info-body-subheader {
		font-size: ${(props) => props.theme.typography.size.lg};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
`;

export const MetricsWrapper = styled(GlobalSection)`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 55px 40px;

	@media (max-width: ${STYLING.cutoffs.initial}) {
		padding: 20px;
	}
`;

export const Metrics = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 0 25px;

	@media (max-width: ${STYLING.cutoffs.tablet}) {
		padding: 0;
	}
`;

export const MetricsSection = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 10px;

	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-direction: column;
		align-items: flex-start;
		gap: 20px;
	}
`;

export const MetricsValue = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5px;

	p {
		font-size: ${(props) => props.theme.typography.size.lg};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}

	span {
		font-size: ${(props) => props.theme.typography.size.small};
		color: ${(props) => props.theme.colors.font.alt1};
	}

	p,
	span {
		text-align: center;
	}

	@media (max-width: ${STYLING.cutoffs.tablet}) {
		p,
		span {
			text-align: left;
		}
	}
`;

export const Messages = styled(MetricsSection)`
	justify-content: center;
	padding: 0 0 35px 0;
	margin: 0 0 40px 0;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};

	p {
		font-size: ${(props) => props.theme.typography.size.xLg};
	}
`;

export const BalancesWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 25px;
`;

export const YieldAllocationWrapper = styled.div`
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
		line-height: 1;
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-size: ${(props) => props.theme.typography.size.xLg};
		font-weight: ${(props) => props.theme.typography.weight.medium};
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

export const BalancesBodyWrapper = styled(BodyWrapper)`
	flex-direction: column;
`;

export const BalancesFlexWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 20px;
`;

export const BalanceFlexSection = styled.div`
	width: calc(50% - 20px);

	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;

export const BalanceSection = styled.div`
	width: 100%;
	padding: 20px;
`;

export const BalanceHeaderWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 20px;
`;

export const BalanceHeader = styled.div`
	span {
		line-height: 1;
		font-size: ${(props) => props.theme.typography.size.xLg};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const BalanceBodyWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	margin: 40px 0 0 0;
	flex-wrap: wrap;
	gap: 20px;
`;

export const BalanceQuantitySection = styled.div`
	width: 175px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 2.5px;
`;

export const BalanceQuantityEndSection = styled(BalanceQuantitySection)`
	align-items: flex-end;

	@media (max-width: ${STYLING.cutoffs.secondary}) {
		align-items: flex-start;
	}
`;

export const BalancesQuantityFlexSection = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 20px;
	margin: 0 0 0 auto;

	@media (max-width: ${STYLING.cutoffs.secondary}) {
		margin: 0;
	}
`;

export const BalanceQuantityHeader = styled.div`
	span {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const BalanceQuantityBody = styled.div`
	display: flex;
	align-items: center;
	gap: 7.5px;

	p,
	span {
		font-size: ${(props) => props.theme.typography.size.lg};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.xBold};
	}

	p {
		display: flex;
		align-items: center;
		gap: 7.5px;
	}

	svg {
		height: 20px;
		width: 20px;
		margin: 6.5px 0 0 0;
	}

	#ao-logo {
		svg {
			height: 30px;
			width: 30px;
			margin: 6.5px 3.5px 0 0;
		}
	}
`;

export const BalanceQuantityFooter = styled.div`
	span {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		color: ${(props) => props.theme.colors.font.alt1};
	}

	button {
		margin: 3.5px 0 0 0;
		span {
			color: ${(props) => props.theme.colors.link.color} !important;
		}

		&:hover {
			text-decoration: underline;
			text-decoration-thickness: 1.25px;
			text-decoration-color: ${(props) => props.theme.colors.link.active} !important;
			span {
				color: ${(props) => props.theme.colors.link.active} !important;
			}
		}
	}
`;

export const BalancesGlobalWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
	flex-wrap: wrap;
	gap: 20px;

	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
	}
`;

export const BalancesGlobalFlexWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 20px 100px;
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
	align-items: center;
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
