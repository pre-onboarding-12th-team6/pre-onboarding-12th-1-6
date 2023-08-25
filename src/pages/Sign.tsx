import SignForm from 'components/sign/SignForm';
import React from 'react';
import { useLocation } from 'react-router-dom';
import routerPaths from '../router/routerPaths';

function Sign() {
	const { pathname } = useLocation();
	let page = 'signin';

	if (pathname === routerPaths.signup.path) {
		page = 'signup';
	}

	return <SignForm page={page} />;
}

export default Sign;
