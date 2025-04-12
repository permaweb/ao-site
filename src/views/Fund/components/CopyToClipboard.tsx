import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components';

import { ASSETS } from 'helpers/config';

type CopyToClipboardProps = {
	value: string;
};

const CopyButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	padding: 0;
	margin-left: 4px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	vertical-align: middle;

	&:hover {
		opacity: 0.8;
	}
`;

export function CopyToClipboard({ value }: CopyToClipboardProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async (event) => {
		try {
			event.stopPropagation();
			event.preventDefault();
			await navigator.clipboard.writeText(value);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	};

	return (
		<CopyButton onClick={handleCopy} title={copied ? 'Copied!' : 'Copy to clipboard'}>
			<ReactSVG src={copied ? ASSETS.checkmark : ASSETS.copy} style={{ width: '16px', height: '16px' }} />
		</CopyButton>
	);
}
