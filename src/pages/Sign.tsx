import SignForm from 'components/sign/SignForm';
import React from 'react';
import { useLocation } from 'react-router-dom';

function Sign() {
	const { pathname } = useLocation();
	let page = 'signin';

	if (pathname === '/signup') {
		page = 'signup';
	}

	return <SignForm page={page} />;
}

export default Sign;
