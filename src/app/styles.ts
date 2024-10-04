import { createGlobalStyle } from 'styled-components';

import { fadeIn1, open } from 'helpers/animations';
import { STYLING } from 'helpers/config';

export const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
  }

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
		overflow-x: hidden !important;
    background: ${(props) => props.theme.colors.view.background};
  }

	#root {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}

:root {
	font-family: 'DM Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
		'Open Sans', 'Helvetica Neue', sans-serif;
	line-height: 1.5;
	font-weight: 200;
	color-scheme: light;
	color: var(--main-dark-color);
	background-color: var(--background-color);

	font-synthesis: none;
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	-webkit-text-size-adjust: 100%;

	--container-padding: 100px;
	--header-height: 116px;
	--nav-background-color: #fefefe;
	--background-color: #fefefe;
	--background-color-2: #fef4f4;
	--background-color-3: #edffec;
	--background-color-4: #fdf2f2;
	--background-color-5: #e8eeff;
	--faded-accent-color: #f8fff8;
	--table-accent-color: #e1ebea;
	--accent-color: #054bfe;
	--main-dark-color: #222326;
	--triangle-color: #e6e7ea;
	--terminal-red: #d50e0e;
	--terminal-green: #45cc05;
	--terminal-blue: #054bfe;

  // web3 onboard
  --onboard-modal-backdrop: rgba(130, 130, 130, 0.25);
  --onboard-font-family-normal: "DM Sans";
}

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: none;
  }

  * {
    box-sizing: border-box;
  }

  html, body {
			margin: 0;
			color-scheme: ${(props) => props.theme.scheme};
			font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
			"Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
			sans-serif;
			font-family: ${(props) => props.theme.typography.family.primary};
			font-weight: ${(props) => props.theme.typography.weight.medium};
			color: ${(props) => props.theme.colors.font.primary};
			line-height: 1.5;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			box-sizing: border-box;
	}

  h1, h2, h3, h4, h5, h6 {
    font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.medium};
    color: ${(props) => props.theme.colors.font.primary};
		overflow-wrap: anywhere;
  }

	h1 {
    font-size: ${(props) => props.theme.typography.size.h1};
  }

  h2 {
    font-size: ${(props) => props.theme.typography.size.h2};
		letter-spacing: 1.5px;
  }

  h4 {
    font-size: ${(props) => props.theme.typography.size.h4};
  }

  a, button {
    transition: all 100ms;
  }
  
  button {
    padding: 0;
    margin: 0;
    border: none;
    background: transparent;
    &:hover {
      cursor: pointer;
    }

    &:disabled {
      cursor: default;
    }
  }

  a {
    color: ${(props) => props.theme.colors.link.color};
    text-decoration: none;
    &:hover {
      color: ${(props) => props.theme.colors.link.active};
    }
  }

  input, textarea {
    box-shadow: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;
    margin: 0;
    padding: 10px;
    &:focus {
      outline: 0;
    }
    &:disabled {
      cursor: default;
    }
  }
  
  textarea {
    resize: none;
  }

  label {
    cursor: text;
  }

  b, strong {
    font-weight: ${(props) => props.theme.typography.weight.bold};
  }

  .border-wrapper-primary {
    background: ${(props) => props.theme.colors.container.primary.background};
    border: 1px solid ${(props) => props.theme.colors.border.primary};
    border-radius: ${STYLING.dimensions.radius.primary};
  }

    .border-wrapper-secondary {
    background: ${(props) => props.theme.colors.container.primary.background};
    border-left: 1px solid black;
    border-radius: ${STYLING.dimensions.radius.primary};
  }

  .border-wrapper-alt1 {
    background: ${(props) => props.theme.colors.container.alt3.background};
  }

	.border-wrapper-alt2 {
    background: ${(props) => props.theme.colors.container.primary.background};
    border: 1px solid ${(props) => props.theme.colors.border.alt4};
    border-radius: ${STYLING.dimensions.radius.primary};
  }

  .border-wrapper-alt3 {
    background: ${(props) => props.theme.colors.container.primary.background};
		border: 1px solid ${(props) => props.theme.colors.border.alt4};
    border-radius: ${STYLING.dimensions.radius.primary};
  }

  .max-view-wrapper {
    width: 100%;
    max-width: ${STYLING.cutoffs.max};
    margin: 0 auto;
    padding: 0 20px;
  }

	.modal-wrapper {
		padding: 0 20px 20px 20px !important;
	}

  .info-text {
    padding: 0 4.25px;
    background: ${(props) => props.theme.colors.container.primary.background};
    border: 1px solid ${(props) => props.theme.colors.border.primary};
    border-radius: ${STYLING.dimensions.radius.alt2};
    animation: ${open} ${fadeIn1};
    span {
      color: ${(props) => props.theme.colors.font.primary};
      font-size: ${(props) => props.theme.typography.size.xxxSmall};
      font-weight: ${(props) => props.theme.typography.weight.medium};
      white-space: nowrap;
	  }
  }

  .overlay {
    min-height: 100vh;
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 11;
    top: 0;
    left: 0;
    background: ${(props) => props.theme.colors.overlay.primary};
    backdrop-filter: blur(7.5px);
    animation: ${open} ${fadeIn1};
  }

	.app-loader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${open} ${fadeIn1};
    svg {
      height: auto;
      width: 50px;
      margin: 0 0 12.5px 0;
			fill: ${(props) => props.theme.colors.font.primary};
    }
  }

	.fade-in {
		animation: ${open} ${fadeIn1};
	}

	.pre-bridge-wrapper {
		display: flex;
		justify-content: space-between;;
		flex-wrap: wrap;
		gap: 20px;
		button {
			min-width: 0 !important;
			width: 100% !important;
		}
		@media (max-width: ${STYLING.cutoffs.initial}) {
			flex-direction: column;
		}
	}

	.pre-bridge-content {
		height: fit-content;
		width: 720px;
		display: flex;
		flex: 1;
	}

	header {
		position: fixed;
		top: 0;
		display: flex;
		height: 40px;
		width: 100%;
		overflow: hidden;
    z-index: 60;
		background: #FFFFFF;
	}

nav {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  padding-left: 32px;
  padding-right: 32px;
}

.nav-left {
  display: flex;
  flex-direction: row;
  gap: 32px;
}

.nav-left a {
  display: flex;
}
.ao-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
}

.ao-wrapper:hover {
  opacity: 75%;
}

.nav-buttons-header {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.nav-buttons-header button {
  font-family: 'Roboto Mono', monospace;
  letter-spacing: -0.1px;
  text-transform: uppercase;
  font-size: (8px, 5vw, 12px);
}

.main-cta-wrapper {
  position: relative;
}

.main-cta-button button {
  font-family: 'Roboto Mono', monospace;
  letter-spacing: -0.1px;
  text-transform: uppercase;
  font-size: (8px, 5vw, 12px);
}

footer {
  display: flex;
  height: 40px;
  width: 100%;
  overflow: hidden;
  z-index: 1000;
}

.footer-container {
  position: fixed;
  bottom: 12px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  padding-left: 32px;
  padding-right: 32px;
}

.nav-left {
  display: flex;
  flex-direction: row;
  gap: 32px;
}

.ao-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.nav-buttons button {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  flex-direction: row;
  font-family: 'Roboto Mono', monospace;
  letter-spacing: -0.1px;
  text-transform: uppercase;
  font-size: (8px, 5vw, 12px);
}

.arweave-badge {
  height: 100%;

	@media(max-width: 400px) {
		display: none;
	}
}

.arweave-badge button {

  padding-left: 32px;
}

.arweave-badge img {
  margin: 1.5px 0 0 0;
}

.view-wrapper {
	min-height: calc(100vh - 40px);
	width: 100%;
}

  .scroll-wrapper {
    overflow: auto;
    
    scrollbar-color: transparent transparent;
    ::-webkit-scrollbar {
      width: 12.5px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: transparent;
    }

    &:hover {
      scrollbar-color: ${(props) => props.theme.colors.scrollbar.thumb} transparent;

      ::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.colors.scrollbar.thumb};
      }
    }
  }
`;
