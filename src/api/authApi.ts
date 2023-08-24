import { UserAuth } from '../types/type';
import apiClient from './apiClient';

export const signUp = async (body: UserAuth) => {
	try {
		return await apiClient.post('/auth/signup', body);
	} catch (error) {
		const errorObj = error as Error;
		alert(`회원가입 중 오류가 발생했습니다: ${errorObj.message}`);
		throw errorObj;
	}
};

export const signIn = async (body: UserAuth) => {
	try {
		return await apiClient.post('/auth/signin', body);
	} catch (error) {
		const errorObj = error as Error;
		alert(`로그인 중 오류가 발생했습니다: ${errorObj.message}`);
		throw errorObj;
	}
};
