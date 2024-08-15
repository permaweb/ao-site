import React from 'react';

import { BlockedMessage } from 'components/atoms/BlockedMessage';
import { Loader } from 'components/atoms/Loader';
import { ENDPOINTS } from 'helpers/config';
import { EthereumProvider } from 'providers/EthereumProvider';
import Ethereum from 'views/Ethereum';

import * as S from './styles';

export default function Mint() {
	const [loading, setLoading] = React.useState<boolean>(false);
	const [isBlocked, setIsBlocked] = React.useState<boolean>(false);

	React.useEffect(() => {
		const checkLocation = async () => {
			setLoading(true);
			try {
				const response = await fetch(ENDPOINTS.ipCheck);
				const data = await response.json();
				if (data.country === 'US') {
					setIsBlocked(true);
				}
			} catch (error) {
				console.error('Error fetching location data', error);
			}
			setLoading(false);
		};

		checkLocation();
	}, []);

	function getView() {
		if (loading) return <Loader />;
		if (isBlocked) {
			return (
				<S.BlockMessage>
					<BlockedMessage />
				</S.BlockMessage>
			);
		}

		return (
			<S.Wrapper>
				<EthereumProvider>
					<Ethereum />
				</EthereumProvider>
			</S.Wrapper>
		);
	}

	return getView();
}
