import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { App } from 'app';
import { GlobalStyle } from 'app/styles';
import { AllocationProvider } from 'providers/AllocationProvider';
import { ArweaveProvider } from 'providers/ArweaveProvider';
import { CustomThemeProvider } from 'providers/CustomThemeProvider';
import { EthereumProvider } from 'providers/EthereumProvider';
import { LanguageProvider } from 'providers/LanguageProvider';

import 'zlib'; // Ensure this is bundled, as web3-onboard depends on it
import 'path'; // Ensure this is bundled, as web3-onboard depends on it
import '@fontsource-variable/roboto-mono';
import '@fontsource-variable/dm-sans';
import './App.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<CustomThemeProvider>
		<LanguageProvider>
			<HashRouter>
				<GlobalStyle />
				<EthereumProvider>
					<ArweaveProvider>
						<AllocationProvider>
							<App />
						</AllocationProvider>
					</ArweaveProvider>
				</EthereumProvider>
			</HashRouter>
		</LanguageProvider>
	</CustomThemeProvider>
);
