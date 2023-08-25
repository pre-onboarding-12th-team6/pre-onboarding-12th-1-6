import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import ROUTER_PATHS from '../router/routerPaths';

export function UnAuthorized() {
	const { token } = useContext(useAuthContext);
	if (token !== null) {
		return <Navigate to={ROUTER_PATHS.todo.path} />;
	}
	return <Outlet />;
}

export function Authorized() {
	const { token } = useContext(useAuthContext);
	if (token === null) {
		return <Navigate to={ROUTER_PATHS.signin.path} />;
	}
	return <Outlet />;
}
