import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import Sign from '../pages/Sign';
import Todo from '../pages/Todo';
import Error from '../pages/Error';
import { Authorized, UnAuthorized } from '../pages/Redirect';
import Layout from '../components/layout';
import routerPaths from './routerPaths';

const router = (
	<Route element={<Layout />}>
		<Route element={<UnAuthorized />}>
			<Route path={routerPaths.signin.path} element={<Sign />} />
			<Route path={routerPaths.signup.path} element={<Sign />} />
		</Route>
		<Route element={<Authorized />}>
			<Route path={routerPaths.home.path} element={<Navigate to={routerPaths.todo.path} replace />} />
			<Route path={routerPaths.todo.path} element={<Todo />} />
		</Route>
		<Route path={routerPaths.default.path} element={<Error />} />
	</Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(router));

export default rootRouter;
