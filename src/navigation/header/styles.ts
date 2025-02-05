import styled from 'styled-components';

import { open, transition2 } from 'helpers/animations';
import { STYLING } from 'helpers/config';

export const Wrapper = styled.header`
	height: ${STYLING.dimensions.nav.height};
	width: 100%;
	position: sticky;
	z-index: 2;
	top: 0;
	background: ${(props) => props.theme.colors.view.background};
`;

export const Content = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const SectionStart = styled.div`
	display: flex;
	align-items: center;
	gap: 30px;
`;

export const LogoWrapper = styled.div`
	height: 27.5px;
	width: 27.5px;
	animation: ${open} ${transition2};

	svg {
		height: 27.5px;
		width: 27.5px;
		margin: 2.25px 0 0 0;
		path {
			fill: ${(props) => props.theme.colors.icon.primary.fill};
		}
		&:hover {
			path {
				fill: ${(props) => props.theme.colors.icon.primary.active};
			}
		}
	}

	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: 30.5px;
		width: 30.5px;

		svg {
			height: 30.5px;
			width: 30.5px;
			margin: 0;
		}
	}
`;

export const DesktopNavWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 30px;
	padding: 2.5px 0 0 0;
	animation: ${open} ${transition2};

	a {
		font-size: ${(props) => props.theme.typography.size.small};
		line-height: 1;
	}

	@media (max-width: ${STYLING.cutoffs.initial}) {
		display: none;
	}
`;

export const SectionEnd = styled.div`
	display: flex;
	align-items: center;
	gap: 30px;
`;

export const DesktopSocialWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 30px;
	padding: 8.5px 0 0 0;
	animation: ${open} ${transition2};

	svg {
		height: 20px;
		width: 20px;
		fill: ${(props) => props.theme.colors.icon.primary.fill};

		&:hover {
			color: ${(props) => props.theme.colors.icon.primary.active};
			fill: ${(props) => props.theme.colors.icon.primary.active};
		}
	}

	@media (max-width: ${STYLING.cutoffs.initial}) {
		display: none;
	}
`;

export const MobileNavWrapper = styled.div`
	display: none;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		display: block;
	}
`;

export const MobilePathsWrapper = styled.div`
	width: 100%;

	a {
		height: 60px;
		width: 100%;
		display: flex;
		align-items: center;
		padding: 0 20px;
	}
`;

export const MobileSocialWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 30px;
	padding: 0 20px;
	margin: 20px 0 0 0;

	svg {
		height: 20px;
		width: 20px;
		fill: ${(props) => props.theme.colors.icon.primary.fill};
	}
`;
