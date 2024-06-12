import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { App } from 'app';
import { GlobalStyle } from 'app/styles';
import { CustomThemeProvider } from 'providers/CustomThemeProvider';
import { LanguageProvider } from 'providers/LanguageProvider';

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
