import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, Outlet } from 'react-router-dom';
// import Sign from '../pages/Sign';
import { AuthContextProvider } from 'context/AuthContext';
// import Todo from '../pages/Todo';
import Error from '../pages/Error';
import { Authorized, UnAuthorized } from '../pages/Redirect';
import Header from '../components/layout/Header';

function Layout() {
	return (
		<AuthContextProvider>
			<Header />
			<Outlet />
		</AuthContextProvider>
	);
}

const router = (
	<Route element={<Layout />}>
		<Route element={<UnAuthorized />}>
			{/* <Route path="/signin" element={<Sign />} />
			<Route path="/signup" element={<Sign />} /> */}
		</Route>
		<Route element={<Authorized />}>
			<Route path="/" element={<Navigate to="/todo" replace />} />
			{/* <Route path="/todo" element={<Todo />} /> */}
		</Route>
		<Route path="*" element={<Error />} />
	</Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(router));

export default rootRouter;
