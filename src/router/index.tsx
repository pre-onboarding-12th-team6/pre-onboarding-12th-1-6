import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import Sign from '../pages/Sign';
import Todo from '../pages/Todo';
import Error from '../pages/Error';
import { Authorized, UnAuthorized } from '../pages/Redirect';
import Layout from '../components/layout';
import ROUTER_PATHS from './routerPaths';

const router = (
	<Route element={<Layout />}>
		<Route element={<UnAuthorized />}>
			<Route path={ROUTER_PATHS.signin.path} element={<Sign />} />
			<Route path={ROUTER_PATHS.signup.path} element={<Sign />} />
		</Route>
		<Route element={<Authorized />}>
			<Route path={ROUTER_PATHS.home.path} element={<Navigate to={ROUTER_PATHS.todo.path} replace />} />
			<Route path={ROUTER_PATHS.todo.path} element={<Todo />} />
		</Route>
		<Route path={ROUTER_PATHS.default.path} element={<Error />} />
	</Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(router));

export default rootRouter;
