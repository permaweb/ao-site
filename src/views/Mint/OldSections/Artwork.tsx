import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Container = styled.div`
	width: 227px;
	height: 227px;
	margin: 0 auto;
	position: relative;

	& > svg {
		position: absolute;
	}
`;

export function Artwork() {
	return (
		<Container>
			<svg width="227" height="227" viewBox="0 0 227 227" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M46 136L46 226L136 226L136 136M46 136L136 136M46 136L46 46L136 46M136 136L136 46M136 136L226 136L226 46L136 46M91 181L91 91M91 181L181 181L181 91M91 181L0.999998 181L0.999994 91L91 91M91 91L181 91M91 91L91 1L181 0.999999L181 91"
					stroke="#DFDFDF"
				/>
			</svg>
			<svg width="227" height="227" viewBox="0 0 227 227" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M91 46H1V136H91M91 46V136M91 46H181V136M91 136H181M91 136V226H181V136M46 91H136M46 91V181H136M46 91V1H136V91M136 91V181M136 91H226V181H136"
					stroke="#DFDFDF"
				/>
			</svg>
			<svg width="227" height="227" viewBox="0 0 227 227" fill="none" xmlns="http://www.w3.org/2000/svg">
				<motion.path
					d="M91 46H1V136H91M91 46V136M91 46H181V136M91 136H181M91 136V226H181V136M46 91H136M46 91V181H136M46 91V1H136V91M136 91V181M136 91H226V181H136"
					stroke="#133AFF"
					variants={{
						hidden: { pathLength: 0.1, pathOffset: -0.2 },
						visible: {
							pathOffset: 0.2,
							transition: {
								duration: 3,
								ease: 'easeInOut',
								repeat: Infinity,
								repeatType: 'reverse',
							},
						},
					}}
					initial="hidden"
					animate="visible"
				/>
			</svg>
			<svg width="227" height="227" viewBox="0 0 227 227" fill="none" xmlns="http://www.w3.org/2000/svg">
				<motion.path
					d="M46 136L46 226L136 226L136 136M46 136L136 136M46 136L46 46L136 46M136 136L136 46M136 136L226 136L226 46L136 46M91 181L91 91M91 181L181 181L181 91M91 181L0.999998 181L0.999994 91L91 91M91 91L181 91M91 91L91 1L181 0.999999L181 91"
					stroke="#133AFF"
					variants={{
						hidden: { pathLength: 0.1, pathOffset: -0.2 },
						visible: {
							pathOffset: 0.2,
							transition: {
								delay: 1.5,
								duration: 3,
								ease: 'easeInOut',
								repeat: Infinity,
								repeatType: 'reverse',
							},
						},
					}}
					initial="hidden"
					animate="visible"
				/>
			</svg>
			<svg width="227" height="227" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M11.3938 31.7567H15.9222L16.8464 29.2693L14.767 25.0316L11.3938 31.7567Z"
					fill="#fff"
					strokeWidth={0.25}
					stroke="#DFDFDF"
				/>
				<path
					d="M23.408 28.3942L18.3712 18.3063L16.8464 21.7611L21.6059 31.7567H25.0343L23.408 28.3942Z"
					fill="#fff"
					strokeWidth={0.25}
					stroke="#DFDFDF"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M31.8228 31.7567C35.572 31.7567 38.6113 28.7316 38.6113 25C38.6113 21.2684 35.572 18.2432 31.8228 18.2432C28.0736 18.2432 25.0343 21.2684 25.0343 25C25.0343 28.7316 28.0736 31.7567 31.8228 31.7567ZM31.8228 29.1046C34.1005 29.1046 35.9467 27.2669 35.9467 25C35.9467 22.7331 34.1005 20.8954 31.8228 20.8954C29.5453 20.8954 27.6989 22.7331 27.6989 25C27.6989 27.2669 29.5453 29.1046 31.8228 29.1046Z"
					fill="#fff"
					strokeWidth={0.25}
					stroke="#DFDFDF"
				/>
			</svg>
		</Container>
	);
}
