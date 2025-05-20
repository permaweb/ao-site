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
		font-size: ${(props) => props.theme.typography.size.lg};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.primary};
		overflow-wrap: anywhere;
		line-height: 1.5;
		letter-spacing: 1.05px;
	}

	ol {
		list-style: normal;
	}

	a,
	p,
	li {
		font-family: ${(props) => props.theme.typography.family.alt1};
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

	ol,
	ul {
		display: flex;
		flex-direction: column;
		gap: 25px;
		padding: 0 0 0 15px;
	}

	img {
		width: 100%;
	}
`;
