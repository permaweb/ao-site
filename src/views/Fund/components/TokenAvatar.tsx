import React from 'react';
import styled from 'styled-components';

import { ASSETS } from 'helpers/config';

interface TokenAvatarProps {
	logo?: string;
	size?: 'medium' | 'large' | 'xl';
}

const sizes = {
	medium: '20px',
	large: '30px',
	xl: '46px',
};

const Avatar = styled.img<{ size: string }>`
	width: ${(props) => props.size};
	height: ${(props) => props.size};
	border-radius: 50%;
	// object-fit: cover;
	display: inline-flex;
`;

export function TokenAvatar({ logo = '', size = 'medium' }: TokenAvatarProps) {
	const logoUrl = !logo ? ASSETS.pi : logo.includes('arweave.net') ? logo : `https://arweave.net/${logo}`;

	return (
		<Avatar
			src={logoUrl}
			alt="token logo"
			size={sizes[size]}
			style={{
				opacity: logo ? 1 : 0.25,
			}}
		/>
	);
}
