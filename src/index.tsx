import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';

import { App } from 'app';
import { GlobalStyle } from 'app/styles';
import { AllocationProvider } from 'providers/AllocationProvider';
import { AOProvider } from 'providers/AOProvider';
import { ArweaveProvider } from 'providers/ArweaveProvider';
import { CustomThemeProvider } from 'providers/CustomThemeProvider';
import { EthereumProvider } from 'providers/EthereumProvider';
import { LanguageProvider } from 'providers/LanguageProvider';

import 'zlib';
import 'path';

const config = createConfig({
	chains: [mainnet],
	connectors: [metaMask({ extensionOnly: true, injectProvider: false })],
	transports: {
		[mainnet.id]: http(),
	},
});

function Root() {
	return (
		<WagmiProvider config={config}>
			<CustomThemeProvider>
				<LanguageProvider>
					<HashRouter>
						<GlobalStyle />
						<AOProvider>
							<EthereumProvider>
								<ArweaveProvider>
									<AllocationProvider>
										<div id={'loader'} />
										<div id={'notification'} />
										<div id={'overlay'} />
										<App />
									</AllocationProvider>
								</ArweaveProvider>
							</EthereumProvider>
						</AOProvider>
					</HashRouter>
				</LanguageProvider>
			</CustomThemeProvider>
		</WagmiProvider>
	);
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
