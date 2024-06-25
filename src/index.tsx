import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { App } from 'app';
import { GlobalStyle } from 'app/styles';
import { CustomThemeProvider } from 'providers/CustomThemeProvider';
import { LanguageProvider } from 'providers/LanguageProvider';

import 'zlib'; // Ensure this is bundled, as web3-onboard depends on it
import 'path'; // Ensure this is bundled, as web3-onboard depends on it
import '@fontsource-variable/roboto-mono';
import '@fontsource-variable/dm-sans';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<CustomThemeProvider>
		<LanguageProvider>
			<HashRouter>
				<GlobalStyle />
				<App />
			</HashRouter>
		</LanguageProvider>
	</CustomThemeProvider>
);
