import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import routerPaths from '../router/routerPaths';

export function UnAuthorized() {
	const { token } = useContext(useAuthContext);
	if (token !== null) {
		return <Navigate to={routerPaths.todo.path} />;
	}
	return <Outlet />;
}

export function Authorized() {
	const { token } = useContext(useAuthContext);
	if (token === null) {
		return <Navigate to={routerPaths.signin.path} />;
	}
	return <Outlet />;
}
