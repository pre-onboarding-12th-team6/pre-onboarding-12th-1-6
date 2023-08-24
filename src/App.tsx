import React from 'react';
import GlobalStyles from 'style/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import theme from 'types/theme';

function App() {
	return (
		<div>
			App
			<ThemeProvider theme={theme}>
				<GlobalStyles />
			</ThemeProvider>
		</div>
	);
}

export default App;
