import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { STYLING } from 'helpers/config';

const BLOG_CONTENT_MAX_WIDTH = 600;
const BLOG_IMAGE_EXTENSION = 100;
const BLOG_LOADING_OFFSET = 68;
const IMAGE_LIGHTBOX_ANIMATION_MS = 180;

const overlayFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const overlayFadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const imageZoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.96);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
`;

const imageZoomOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
  to {
    opacity: 0;
    transform: scale(0.96);
    filter: blur(8px);
  }
`;

export const Wrapper = styled.div`
	width: 100%;
	min-height: 100vh;
	padding: 28px 0 40px 0;
`;

export const LoadingState = styled.div`
	width: 100%;
	min-height: calc(100vh - ${BLOG_LOADING_OFFSET}px);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 12px;
	transform: translateY(-${BLOG_LOADING_OFFSET}px);
`;

export const LoadingMessage = styled.p`
	max-width: 520px;
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: ${(props) => props.theme.typography.size.xSmall};
	font-weight: ${(props) => props.theme.typography.weight.regular};
	color: ${(props) => props.theme.colors.font.alt2};
	line-height: 1.5;
	text-align: center;
`;

export const HeroImageWrapper = styled.div`
	position: relative;
	width: calc(100% + ${BLOG_IMAGE_EXTENSION}px);
	max-width: ${BLOG_CONTENT_MAX_WIDTH + BLOG_IMAGE_EXTENSION}px;
	margin-left: -${BLOG_IMAGE_EXTENSION / 2}px;
	aspect-ratio: 16 / 9;
	overflow: hidden;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) => props.theme.colors.container.alt1.background};

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		cursor: zoom-in;
		transition: transform ${STYLING.motion.duration.fast} ${STYLING.motion.easing.decelerate};
	}

	&:hover > span {
		opacity: 1;
		transform: translateY(0);
	}
`;

export const ImageZoomIndicator = styled.span`
	position: absolute;
	right: 12px;
	bottom: 12px;
	width: 24px;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 999px;
	background: rgba(0, 0, 0, 0.45);
	opacity: 0;
	transform: translateY(4px);
	transition: opacity ${STYLING.motion.duration.fast} ${STYLING.motion.easing.decelerate},
		transform ${STYLING.motion.duration.fast} ${STYLING.motion.easing.decelerate};
	pointer-events: none;

	span {
		position: relative;
		width: 10px;
		height: 10px;
		border: 1.5px solid #ffffff;
		border-radius: 999px;
		/* Offset to optically center the icon (handle adds weight to bottom-right) */
		transform: translate(-1px, -1px);

		&::after {
			content: '';
			position: absolute;
			width: 5px;
			height: 1.5px;
			right: -4px;
			bottom: -3px;
			background: #ffffff;
			transform: rotate(45deg);
			transform-origin: center;
			border-radius: 999px;
		}
	}
`;

export const MarkdownImageFrame = styled.span`
	position: relative;
	display: block;
	width: calc(100% + ${BLOG_IMAGE_EXTENSION}px);
	max-width: ${BLOG_CONTENT_MAX_WIDTH + BLOG_IMAGE_EXTENSION}px;
	margin-left: -${BLOG_IMAGE_EXTENSION / 2}px;
	aspect-ratio: 16 / 9;
	overflow: hidden;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) => props.theme.colors.container.alt1.background};
	cursor: zoom-in;

	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	&:hover ${ImageZoomIndicator} {
		opacity: 1;
		transform: translateY(0);
	}
`;

export const ImageLightbox = styled.button<{ $closing: boolean }>`
	position: fixed;
	inset: 0;
	z-index: 1200;
	width: 100%;
	height: 100%;
	border: 0;
	padding: 24px;
	margin: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.78);
	cursor: zoom-out;
	animation: ${(props) => (props.$closing ? overlayFadeOut : overlayFadeIn)} ${IMAGE_LIGHTBOX_ANIMATION_MS}ms ease
		forwards;
`;

export const ImageLightboxContent = styled.span`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	max-width: min(1100px, 94vw);
`;

export const ImageLightboxImage = styled.img<{ $closing: boolean }>`
	max-width: 100%;
	max-height: 90vh;
	width: auto;
	height: auto;
	cursor: zoom-out;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) => props.theme.colors.container.alt1.background};
	box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
	animation: ${(props) => (props.$closing ? imageZoomOut : imageZoomIn)} ${IMAGE_LIGHTBOX_ANIMATION_MS}ms ease
		forwards;
`;

export const ImageLightboxCaption = styled.span`
	max-width: 100%;
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: ${(props) => props.theme.typography.size.xSmall};
	font-style: italic;
	line-height: 1.5;
	color: #f2f2f2;
	text-align: center;
	white-space: normal;
`;

export const ImageLightboxCloseIndicator = styled(ImageZoomIndicator)`
	right: 10px;
	top: 10px;
	bottom: auto;
	opacity: 1;
	transform: translateY(0);
	background: rgba(0, 0, 0, 0.55);

	span {
		&::before {
			content: '';
			position: absolute;
			width: 7px;
			height: 2px;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background: #ffffff;
			border-radius: 999px;
		}
	}
`;

export const Article = styled.article`
	width: 100%;
	max-width: ${BLOG_CONTENT_MAX_WIDTH}px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 24px;
`;

export const Title = styled.h1`
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: ${(props) => props.theme.typography.size.h2};
	font-weight: ${(props) => props.theme.typography.weight.regular};
	color: ${(props) => props.theme.colors.font.primary};
	line-height: 1.12;
	letter-spacing: -0.02em;
`;

export const Subtitle = styled.p`
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: ${(props) => props.theme.typography.size.base};
	font-weight: ${(props) => props.theme.typography.weight.regular};
	color: ${(props) => props.theme.colors.font.alt2};
	line-height: 1.7;
`;

export const KickerRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 8px;
`;

export const Kicker = styled.span`
	display: inline-block;
	padding: 3px 8px;
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: ${(props) => props.theme.typography.size.xxxSmall};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	color: ${(props) => props.theme.colors.font.alt2};
	line-height: 1.3;
	background: ${(props) => props.theme.colors.container.alt1.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: 999px;
`;

export const MetaRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 8px 16px;
`;

export const AuthorIcon = styled.span`
	display: inline-block;
	width: 3px;
	height: 3px;
	border-radius: 999px;
	background: ${(props) => props.theme.colors.border.alt3};
	flex-shrink: 0;
`;

export const AuthorName = styled.span`
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: ${(props) => props.theme.typography.size.xxSmall};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	color: ${(props) => props.theme.colors.font.alt2};
	line-height: 1.4;
`;

export const MetaSecondary = styled.span`
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: ${(props) => props.theme.typography.size.xxSmall};
	font-weight: ${(props) => props.theme.typography.weight.regular};
	color: ${(props) => props.theme.colors.font.alt1};
	line-height: 1.4;
`;

export const Section = styled.section`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const SectionHeading = styled.h2`
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: ${(props) => props.theme.typography.size.lg};
	font-weight: ${(props) => props.theme.typography.weight.bold};
	color: ${(props) => props.theme.colors.font.primary};
	line-height: 1.35;
	margin-top: 8px;

	&:first-of-type {
		margin-top: 0;
	}
`;

export const Paragraph = styled.p`
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: ${(props) => props.theme.typography.size.base};
	font-weight: ${(props) => props.theme.typography.weight.regular};
	color: ${(props) => props.theme.colors.font.primary};
	line-height: 1.75;
`;

export const MarkdownBody = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;

	a {
		color: white;
		text-decoration: none;

		&:hover {
			color: #e0e0e0;
		}

		&[data-link-index='0'] {
			background-color: red;
		}

		&[data-link-index='1'] {
			background-color: green;
		}

		&[data-link-index='2'] {
			background-color: blue;
		}

		&[data-link-index='3'] {
			background-color: black;
		}
	}

	p,
	li {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.primary};
		line-height: 1.75;
	}

	ul,
	ol {
		margin: 10px 0 14px;
		padding-left: 28px;
	}

	ul {
		list-style: disc;
	}

	ol {
		list-style: decimal;
	}

	li {
		margin: 6px 0;
		padding-left: 12px;
	}

	li::marker {
		color: ${(props) => props.theme.colors.font.alt1};
	}

	ul ul,
	ol ol,
	ul ol,
	ol ul {
		margin: 6px 0;
	}

	ul ul {
		list-style: circle;
	}

	ul ul ul {
		list-style: square;
	}

	h1,
	h2,
	h3 {
		font-family: ${(props) => props.theme.typography.family.primary};
		color: ${(props) => props.theme.colors.font.primary};
		line-height: 1.2;
		margin-top: 8px;
	}

	h1 {
		font-size: ${(props) => props.theme.typography.size.h3};
	}

	h2 {
		font-size: ${(props) => props.theme.typography.size.h4};
		margin-top: 40px;
	}

	h3 {
		font-size: ${(props) => props.theme.typography.size.lg};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.alt2};
		opacity: 0.6;
	}

	p:has(> [data-article-image]),
	p:has(> a > [data-article-image]) {
		margin-top: 60px;
		margin-bottom: 60px;
	}

	p:has(> [data-article-image]) > em,
	p:has(> a > [data-article-image]) > em {
		display: block;
		text-align: center;
		font-style: italic;
		color: ${(props) => props.theme.colors.font.alt1};
	}

	code:not(pre code) {
		padding: 2px 6px;
		font-size: 0.9em;
		background: ${(props) => props.theme.colors.container.alt1.background};
		border: 1px solid ${(props) => props.theme.colors.border.primary};
	}

	div[class*='prism'] {
		font-size: ${(props) => props.theme.typography.size.xSmall};
	}
`;

export const CodeBlock = styled.div`
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	overflow: hidden;
`;

export const BackLinkWrapper = styled.div`
	margin-top: 16px;
	padding-top: 24px;
	border-top: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const BackLink = styled(Link)`
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: ${(props) => props.theme.typography.size.xSmall};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	line-height: 1;
	text-transform: none;
	transition: none;
	opacity: 0.6;
	color: ${(props) => props.theme.colors.font.primary};
	text-decoration: none;

	&:hover {
		opacity: 1;
	}
`;

export const SuggestedSection = styled.section`
	display: flex;
	flex-direction: column;
	gap: 14px;
	margin-top: 4px;
	padding-top: 22px;
	border-top: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const SuggestedHeading = styled.h3`
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: ${(props) => props.theme.typography.size.small};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	color: ${(props) => props.theme.colors.font.primary};
	line-height: 1.3;
`;

export const SuggestedList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const SuggestedCard = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 10px;
	text-decoration: none;
	color: inherit;
	padding: 8px;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) => props.theme.colors.container.alt1.background};
	transition: border-color ${STYLING.motion.duration.fast} ${STYLING.motion.easing.decelerate};

	&:hover {
		border-color: ${(props) => props.theme.colors.border.alt3};
	}
`;

export const SuggestedImage = styled.div<{ hasImage: boolean }>`
	width: 76px;
	height: 52px;
	flex-shrink: 0;
	overflow: hidden;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) =>
		props.hasImage
			? props.theme.colors.container.primary.background
			: props.theme.colors.container.alt2.background};

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const SuggestedContent = styled.div`
	flex: 1;
	min-width: 0;
	display: flex;
	flex-direction: column;
	gap: 3px;
`;

export const SuggestedType = styled.span`
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: ${(props) => props.theme.typography.size.xxxxSmall};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	color: ${(props) => props.theme.colors.font.alt1};
	line-height: 1.2;
	text-transform: uppercase;
	letter-spacing: 0.04em;
`;

export const SuggestedTitle = styled.p`
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: ${(props) => props.theme.typography.size.xSmall};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	color: ${(props) => props.theme.colors.font.primary};
	line-height: 1.35;
`;

export const SuggestedDate = styled.span`
	flex-shrink: 0;
	align-self: center;
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: ${(props) => props.theme.typography.size.xxxSmall};
	font-weight: ${(props) => props.theme.typography.weight.regular};
	color: ${(props) => props.theme.colors.font.alt1};
	line-height: 1.4;
`;

export const NotFound = styled.div`
	width: 100%;
	max-width: ${BLOG_CONTENT_MAX_WIDTH}px;
	margin: 0 auto;
	padding: 32px 0;

	p {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.primary};
		line-height: 1.6;
	}
`;

export const NotFoundLink = styled(Link)`
	display: inline-block;
	margin-top: 12px;
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: ${(props) => props.theme.typography.size.small};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	color: ${(props) => props.theme.colors.link.color};

	&:hover {
		color: ${(props) => props.theme.colors.link.active};
		text-decoration: underline;
		text-decoration-thickness: 1.25px;
	}
`;

export const FooterWrapper = styled.div`
	margin-top: 28px;

	@media (max-width: ${STYLING.cutoffs.mobile}) {
		margin-top: 20px;
	}
`;
