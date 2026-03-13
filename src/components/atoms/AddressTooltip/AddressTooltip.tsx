import React from 'react';

import { formatAddress } from 'helpers/utils';

import * as S from './styles';

interface IProps {
	address: string | null;
	wrap?: boolean;
	children?: React.ReactNode;
}

export default function AddressTooltip(props: IProps) {
	const { address, wrap = false, children } = props;
	const display = children ?? formatAddress(address, wrap);

	if (!address) {
		return <>{display}</>;
	}

	return (
		<S.Wrapper>
			<S.Tooltip className={'info'} position={'bottom'}>
				<span>{address}</span>
			</S.Tooltip>
			{display}
		</S.Wrapper>
	);
}
