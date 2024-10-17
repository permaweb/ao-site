import styled from 'styled-components';

export const Wrapper = styled.div`
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		align-self: stretch;
	}

	button {
		display: flex;
		flex-direction: row;
		gap: 12px;
		align-items: center;
		padding: 0;
		border: none;
		background: none;
		cursor: pointer;
		color: var(--main-dark-color);
	}

	th {
		text-align: left;
	}

	p a,
	li a {
		font-weight: 300;
	}

	p a:hover,
	li a:hover {
		opacity: 50%;
	}

	h1 {
		font-family: 'DM Sans';
		font-size: clamp(20px, 5vw, 36px);
		font-style: normal;
		font-weight: 300;
		line-height: normal;

		margin: 0;
	}

	h2 {
		font-family: 'Roboto Mono Variable';
		font-size: clamp(12px, 2vw, 20px);
		font-style: normal;
		font-weight: 300;
		line-height: 150%;
		letter-spacing: 0.18px;
	}

	h3 {
		font-family: 'Roboto Mono Variable';
		font-size: clamp(10px, 2vw, 14px);
		font-style: normal;
		font-weight: 300;
		line-height: 150%;
		letter-spacing: 0.18px;
	}

	li,
	p,
	tr {
		font-family: 'DM Sans';
		font-size: clamp(10px, 1.75vw, 14px);
		font-style: normal;
		font-weight: 300;
		line-height: 160.5%;
		letter-spacing: 1px;
		margin: 0;
	}

	td,
	th {
		border: 1px solid white;
	}

	th {
		background: white;
	}

	blockquote {
		background: rgb(242, 242, 242);
		border-left: 7.5px solid #d50e0e;
		margin: 1.5em 10px;
		padding: 0.5em 10px;
	}

	blockquote p {
		display: inline;
	}

	span {
		display: inline-flex;
		align-items: baseline;
		font-size: clamp(10px, 2vw, 12px);
	}

	.specs-main-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1 0 0;
		align-self: stretch;
		gap: 80px;
		margin-top: 100px;
		margin-bottom: 70px;
		width: 100%;
		padding: 20px;
	}

	.text-content-wrapper {
		display: flex;
		max-width: 700px;
		gap: 32px;
		flex-direction: column;
		width: 100%;
		transition: max-width 1s;
	}

	.text-content-wrapper h1 {
		font-size: clamp(20px, 3.5vw, 36px);
	}

	.diagram {
		display: flex;
		flex-direction: column;
		gap: 12px;
		width: 100%;
	}
`;
