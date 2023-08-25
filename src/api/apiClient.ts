import axios from 'axios';

const apiClient = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	timeout: 5000,
});

apiClient.interceptors.request.use(async (config) => {
	const accessToken = localStorage.getItem('ACCESS_TOKEN');

	// airbnb의 no-param-reassign 규칙으로 새로운 newConfig 객체 생성
	if (accessToken) {
		const newConfig = { ...config };
		newConfig.headers.Authorization = `Bearer ${accessToken}`;
		newConfig.headers['Content-Type'] = 'application/json';
		return newConfig;
	}

	return config;
});

export default apiClient;
