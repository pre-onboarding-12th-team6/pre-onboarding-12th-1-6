import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { AuthContextProvider } from '../../context/AuthContext';

function Layout() {
	return (
		<AuthContextProvider>
			<Header />
			<Outlet />
		</AuthContextProvider>
	);
}

export default Layout;
