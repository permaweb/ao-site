import { AOSyncProvider } from '@vela-ventures/aosync-sdk-react';
import React from 'react';

import { ASSETS } from 'helpers/config'; // Corrected import for ASSETS
import { useLanguageProvider } from 'providers/LanguageProvider';

interface BeaconWalletProviderProps {
	children: React.ReactNode;
}

export function BeaconWalletProvider({ children }: BeaconWalletProviderProps) {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	return (
		<AOSyncProvider
			gatewayConfig={{
				host: 'arweave.net',
				port: 443,
				protocol: 'https',
			}}
			appInfo={{
				name: language.appName,
				logo: ASSETS.arweaveApp,
			}}
			muUrl="https://mu.ao-testnet.xyz"
		>
			{children}
		</AOSyncProvider>
	);
}
