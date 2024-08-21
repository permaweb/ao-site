import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 20px;
	position: relative;
	top: 60px;
	margin: 0 auto;
	max-width: 1600px;
	gap: 20px;
`;

export const Heading = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const Section = styled.div<{ columns?: number }>`
	padding: 24px 32px;
	display: grid;
	gap: 20px;
	grid-template-columns: repeat(${(props) => props.columns || 5}, 1fr);
`;

export const Column = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	overflow: hidden;
`;

export const Row = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
`;

export const TabsWrapper = styled.div`
	width: 100%;
	max-width: 1240px;
	margin: 0 0 20px 0;
`;

export const BlockMessage = styled.div`
	width: fit-content;
	margin: 40px auto;
`;

export const Subheading = styled.h6`
	font-family: 'Roboto Mono', monospace;
	font-weight: ${(props) => props.theme.typography.weight.regular};
	font-size: ${(props) => props.theme.typography.size.base};
	text-transform: uppercase;
`;

export const Label = styled.h6<{ size?: 'small' | 'default' }>`
	font-family: 'Roboto Mono', monospace;
	font-weight: ${(props) => props.theme.typography.weight.thin};
	font-size: ${(props) =>
		props.size === 'small' ? props.theme.typography.size.xxSmall : props.theme.typography.size.base};
	text-transform: uppercase;
	color: ${(props) => props.theme.colors.font.alt1};

	&.button {
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}
`;

export const AssetAmount = styled.h6<{
	variant?: 'alt1' | 'alt2' | 'default';
}>`
	font-weight: ${(props) => props.theme.typography.weight.regular};
	font-size: ${(props) => props.theme.typography.size.xLg};
	display: flex;
	align-items: center;
	gap: 10px;

	svg {
		width: 40px;
		height: 40px;
		margin-bottom: -8px;
	}

	.small {
		margin-left: -20px;
	}
	.small svg {
		padding: 12px 0px 8px 20px;
	}

	${(props) =>
		props.variant === 'alt1' &&
		`
		color: ${props.theme.colors.font.green};
		font-size: ${props.theme.typography.size.lg2};
		svg {
			width: 30px;
			height: 30px;
			margin-bottom: -4px;
		}
	`}

	${(props) =>
		props.variant === 'alt2' &&
		`
		font-size: ${props.theme.typography.size.lg2};
		svg {
			width: 20px;
			height: 20px;
			margin-bottom: -4px;
		}
	`}

	span {
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: normal;
	}
`;

export const Hero = styled(Section)`
	align-items: center;

	${Column} {
		align-items: center;
	}
`;

export const Divider = styled.div`
	width: 100%;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.alt3};
`;

export const LoadingWrapper = styled.div`
	display: flex;
	align-items: center;
	margin: 0 0 0 -15px;
	span {
		color: ${(props) => props.theme.colors.font.alt1};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		text-transform: uppercase;
	}
`;

export const Loader = styled.div``;
