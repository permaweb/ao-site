import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { CopyToClipboard } from './CopyToClipboard';

type IdBlockProps = {
	label: string;
	value?: string;
	href?: string;
	hideCopyToClipboard?: boolean;
};

const StyledLink = styled(Link)`
	text-decoration: none;
	color: inherit;
`;

const LabelBox = styled.span`
	display: inline-block;
	&:hover {
		text-decoration: underline;
	}
`;

const IdBox = styled.span`
	padding: 3px 6px;
`;

const Container = styled.div`
	color: rgb(117, 117, 117);
	& svg {
		color: rgb(117, 117, 117);
	}
`;

export function IdBlock(props: IdBlockProps) {
	const { label, value, href, hideCopyToClipboard } = props;

	const copyValue = value || label;

	if (href) {
		return (
			<Container>
				<StyledLink
					to={href}
					onClick={(event) => {
						event.stopPropagation();
					}}
					target={href.startsWith('http') ? '_blank' : undefined}
				>
					<LabelBox title={value}>{label}</LabelBox>
				</StyledLink>
				{!hideCopyToClipboard && <CopyToClipboard value={copyValue} />}
			</Container>
		);
	}

	return (
		<Container>
			<IdBox title={value}>{label}</IdBox>
			{!hideCopyToClipboard && <CopyToClipboard value={copyValue} />}
		</Container>
	);
}
