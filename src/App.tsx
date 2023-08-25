import React from 'react';
import { RouterProvider } from 'react-router-dom';
import GlobalStyles from 'style/GlobalStyles';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'types/theme';
import rootRouter from './router';

const Wrap = styled.div`
	height: 100%;
	margin-top: 100px;
	align-items: center;
	display: flex;
	flex-wrap: nowrap;
	overflow: hidden;
	flex-direction: column;
	justify-content: center;
`;

function App() {
	return (
		<Wrap>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<RouterProvider router={rootRouter} />
			</ThemeProvider>
		</Wrap>
	);
}

export default App;
