import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 30px;
`;

export const Description = styled.div`
	display: flex;
	svg {
		height: 15px;
		width: 15px;
		margin: 0 10px 0 0;
	}
	p {
		color: ${(props) => props.theme.colors.font.primary};
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-family: ${(props) => props.theme.typography.family.alt1};

		a {
			color: ${(props) => props.theme.colors.font.primary};
			font-weight: ${(props) => props.theme.typography.weight.medium};
			text-decoration: underline;
		}
	}
`;

export const IconsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 25px;
`;

export const IconGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 7.5px;
	p {
		color: ${(props) => props.theme.colors.font.alt1};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.regular};
	}
`;

export const IconsLine = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px 30px;
	svg {
		height: 30px;
		width: 50px;
	}

	div {
		height: 30px;
	}

	.ncc-audit {
		svg {
			height: 30px;
			width: 100px;
		}
	}

	.ncc-audit-wrapper {
		display: flex;
		align-items: flex-end;

		span {
			display: inline-block;
			font-size: 0.75rem;
			color: ${(props) => props.theme.colors.font.alt1};
		}
	}

	.renascence-audit {
		svg {
			height: 30px;
			width: 125px;
		}
	}

	.codehawks-audit {
		svg {
			height: 30px;
			width: 125px;
		}
	}

	.morpheus-audit {
		svg {
			height: 30px;
			width: 40px;
		}
	}

	a {
		&:hover {
			svg {
				opacity: 0.75;
			}
		}
	}
`;
