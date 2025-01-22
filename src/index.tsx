import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { App } from 'app';
import { GlobalStyle } from 'app/styles';
import { AllocationProvider } from 'providers/AllocationProvider';
import { AOProvider } from 'providers/AOProvider';
import { ArweaveProvider } from 'providers/ArweaveProvider';
import { CustomThemeProvider } from 'providers/CustomThemeProvider';
import { EthereumProvider } from 'providers/EthereumProvider';
import { LanguageProvider } from 'providers/LanguageProvider';
import { LocationProvider } from 'providers/LocationProvider';

import 'zlib'; // Ensure this is bundled, as web3-onboard depends on it
import 'path'; // Ensure this is bundled, as web3-onboard depends on it
import '@fontsource-variable/roboto-mono';
import '@fontsource-variable/dm-sans';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<CustomThemeProvider>
		<LocationProvider>
			<LanguageProvider>
				<HashRouter>
					<GlobalStyle />
					<AOProvider>
						<EthereumProvider>
							<ArweaveProvider>
								<AllocationProvider>
									<App />
								</AllocationProvider>
							</ArweaveProvider>
						</EthereumProvider>
					</AOProvider>
				</HashRouter>
			</LanguageProvider>
		</LocationProvider>
	</CustomThemeProvider>
);
