import React from 'react';

import { URLTabs } from 'components/molecules/URLTabs';
import { IP_TOKEN, URLS } from 'helpers/config';
import { ArweaveProvider } from 'providers/ArweaveProvider';
import { EthereumProvider } from 'providers/EthereumProvider';
import Arweave from 'views/Arweave';
import Cred from 'views/Cred';
import Ethereum from 'views/Ethereum';

import * as S from './styles';

export default function Mint() {
	const [isBlocked, setIsBlocked] = React.useState<boolean>(false);

	// TODO
	// React.useEffect(() => {
	//     const checkLocation = async () => {
	//         try {
	//             const response = await fetch(`https://ipinfo.io?token=${IP_TOKEN}`);
	//             const data = await response.json();
	//             if (data.country === 'US') {
	//                 setIsBlocked(true);
	//             }
	//         } catch (error) {
	//             console.error('Error fetching location data', error);
	//         }
	//     };

	//     checkLocation();
	// }, []);

	return !isBlocked ? (
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
	) : (
		<S.BlockMessage>Service is not available</S.BlockMessage>
	);
}
