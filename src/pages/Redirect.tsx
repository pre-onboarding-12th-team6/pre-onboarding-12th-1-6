import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export function UnAuthorized() {
	const { token } = useContext(useAuthContext);
	if (token !== null) {
		return <Navigate to="/todo" />;
	}
	return <Outlet />;
}

export function Authorized() {
	const { token } = useContext(useAuthContext);
	if (token === null) {
		return <Navigate to="/signin" />;
	}
	return <Outlet />;
}
