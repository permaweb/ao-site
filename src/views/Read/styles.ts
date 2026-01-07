import styled from 'styled-components';

export const Wrapper = styled.div`
	max-width: 700px;
	display: flex;
	flex-direction: column;
	gap: 25px;
	margin: 0 auto 40px auto;

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.primary};
		overflow-wrap: anywhere;
		line-height: 1.5;
		letter-spacing: 1.05px;
	}

	h1 {
		font-size: clamp(28px, 2.75vw, 36px);
	}

	h2 {
		font-size: calc(clamp(28px, 2.75vw, 36px) * 0.8);
	}

	h3 {
		font-size: calc(clamp(28px, 2.75vw, 36px) * 0.7);
	}

	h4 {
		font-size: calc(clamp(28px, 2.75vw, 36px) * 0.6);
	}

	h5 {
		font-size: calc(clamp(28px, 2.75vw, 36px) * 0.5);
	}

	h6 {
		font-size: calc(clamp(28px, 2.75vw, 36px) * 0.4);
	}

	a,
	p,
	li {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.primary};
		overflow-wrap: anywhere;
		line-height: 1.55;
	}

	a {
		color: ${(props) => props.theme.colors.link.color};

		&:hover {
			color: ${(props) => props.theme.colors.link.active};
			text-decoration: underline;
			text-decoration-thickness: 1.25px;
		}
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 25px;
	}

	img {
		width: 100%;
	}
`;
