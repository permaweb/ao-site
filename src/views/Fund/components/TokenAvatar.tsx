import React from 'react';
import styled from 'styled-components';

interface TokenAvatarProps {
	logo?: string;
	size?: 'medium' | 'large' | 'xl';
}

const sizes = {
	medium: '20px',
	large: '30px',
	xl: '84px',
};

const Avatar = styled.img<{ size: string }>`
	width: ${(props) => props.size};
	height: ${(props) => props.size};
	border-radius: 50%;
	object-fit: cover;
`;

export function TokenAvatar({ logo, size = 'medium' }: TokenAvatarProps) {
	return <Avatar src={`https://arweave.net/${logo}`} alt="token logo" size={sizes[size]} />;
}
