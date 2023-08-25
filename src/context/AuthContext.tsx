import React, { createContext, ReactNode, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import routerPaths from '../router/routerPaths';

export const useAuthContext = createContext<{
	token: string | null;
	saveToken: (token: string) => void;
	clearToken: () => void;
}>({ token: null, saveToken: () => {}, clearToken: () => {} });

export default useAuthContext;

export function AuthContextProvider({ children }: { children: ReactNode }) {
	const navigate = useNavigate();
	const token = localStorage.getItem('ACCESS_TOKEN');

	const saveToken = useCallback(
		(jwt: string) => {
			localStorage.setItem('ACCESS_TOKEN', jwt);
			navigate(routerPaths.todo.path);
		},
		[navigate],
	);

	const clearToken = useCallback(() => {
		localStorage.removeItem('ACCESS_TOKEN');
		navigate(routerPaths.signin.path);
	}, [navigate]);

	const memoizedValue = useMemo(() => ({ token, saveToken, clearToken }), [token, saveToken, clearToken]);

	return <useAuthContext.Provider value={memoizedValue}>{children}</useAuthContext.Provider>;
}
