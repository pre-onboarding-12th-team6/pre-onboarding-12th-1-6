import React from 'react';
import { RouterProvider } from 'react-router-dom';
import GlobalStyles from 'style/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import theme from 'types/theme';
import rootRouter from './router';

function App() {
	return (
		<div>
			App
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<RouterProvider router={rootRouter} />
			</ThemeProvider>
		</div>
	);
}

export default App;
