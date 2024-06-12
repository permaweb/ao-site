import React from 'react';

import { BlockedMessage } from 'components/atoms/BlockedMessage';
import { Loader } from 'components/atoms/Loader';
import { URLTabs } from 'components/molecules/URLTabs';
import { ENDPOINTS, URLS } from 'helpers/config';
import { ArweaveProvider } from 'providers/ArweaveProvider';
import { EthereumProvider } from 'providers/EthereumProvider';
import Arweave from 'views/Arweave';
import Cred from 'views/Cred';
import Ethereum from 'views/Ethereum';

import * as S from './styles';

export default function Mint() {
	const [loading, setLoading] = React.useState<boolean>(false);
	const [isBlocked, setIsBlocked] = React.useState<boolean>(false);

	// TODO: Uncomment
	// React.useEffect(() => {
	// 	const checkLocation = async () => {
	// 		setLoading(true);
	// 		try {
	// 			const response = await fetch(ENDPOINTS.ipCheck);
	// 			const data = await response.json();
	// 			if (data.country === 'US') {
	// 				setIsBlocked(true);
	// 			}
	// 		} catch (error) {
	// 			console.error('Error fetching location data', error);
	// 		}
	// 		setLoading(false);
	// 	};

	// 	checkLocation();
	// }, []);

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
				<S.TabsWrapper>
					<URLTabs
						tabs={[
							{
								label: 'Ethereum',
								icon: null,
								disabled: false,
								url: URLS.ethereum,
								view: () => (
									<EthereumProvider>
										<Ethereum />
									</EthereumProvider>
								),
							},
							{
								label: 'Arweave',
								icon: null,
								disabled: false,
								url: URLS.arweave,
								view: () => (
									<ArweaveProvider>
										<Arweave />
									</ArweaveProvider>
								),
							},
							{
								label: 'CRED',
								icon: null,
								disabled: false,
								url: URLS.cred,
								view: () => (
									<ArweaveProvider>
										<Cred />
									</ArweaveProvider>
								),
							},
						]}
						activeUrl={URLS.ethereum}
					/>
				</S.TabsWrapper>
			</S.Wrapper>
		);
	}

	return getView();
}
