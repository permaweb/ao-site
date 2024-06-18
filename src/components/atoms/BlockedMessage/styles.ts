import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 540px;
	max-width: 85vw;
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	img {
		width: 65%;
		margin: 60px 0;
	}
	.button-wrapper {
		display: flex;
		flex-direction: row;
		gap: 10px;
		background: var(--background-color);
		border: 1px solid black;
		width: fit-content;
		margin: 0 auto;
	}

	.button-wrapper button {
		font-family: 'Roboto Mono', monospace;
		letter-spacing: -0.1px;
		text-transform: uppercase;
		font-size: 12px;
		padding-right: 20px;
		padding-left: 20px;
		padding-top: 15px;
		padding-bottom: 15px;
		box-shadow: 3px 3px black, 6px 6px gray, 9px 9px var(--triangle-color);
		transition: all 100ms;
	}

	.button-wrapper button:hover {
		background: var(--triangle-color);
		font-weight: 600;
		transition: background 500ms;
	}
`;

export const Message = styled.div`
	p {
		color: ${(props) => props.theme.colors.font.primary};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-family: ${(props) => props.theme.typography.family.primary};
		text-transform: uppercase;
		text-align: center;
		line-height: 1.65;

		b {
			font-weight: ${(props) => props.theme.typography.weight.bold};
			text-decoration: underline;
		}

		a {
			text-decoration: underline;
		}
	}
`;
