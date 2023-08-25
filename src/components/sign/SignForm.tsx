import { signIn, signUp } from 'api/authApi';
import useAuthContext from 'context/AuthContext';
import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routerPaths from '../../router/routerPaths';

function SignForm({ page }: { page: string }) {
	const navigate = useNavigate();
	const { saveToken } = useContext(useAuthContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isComplete, setIsComplete] = useState({ id: false, password: false });
	const [isDisabled, setIsDisabled] = useState(true);

	useEffect(() => {
		setIsDisabled(!(isComplete.id && isComplete.password));
	}, [isComplete]);

	const emailCheck = (e: ChangeEvent<HTMLInputElement>) => {
		setIsComplete(
			e.target.value.includes('@')
				? { id: true, password: isComplete.password }
				: { id: false, password: isComplete.password },
		);
		setEmail(e.target.value);
	};

	const passwordCheck = (e: ChangeEvent<HTMLInputElement>) => {
		setIsComplete(
			e.target.value.length >= 8 ? { id: isComplete.id, password: true } : { id: isComplete.id, password: false },
		);
		setPassword(e.target.value);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const body = {
			email,
			password,
		};

		if (page === 'signup') {
			try {
				const { status } = await signUp(body);
				if (status === 201) {
					navigate(routerPaths.signin.path);
				} else {
					throw new Error('회원가입 중 오류가 발생했습니다');
				}
			} catch (error: unknown) {
				if (error instanceof Error) {
					alert(`Error : ${error.message}`);
				} else {
					alert('unknown error occurred');
				}
			}
		} else {
			try {
				const { status, data } = await signIn(body);
				if (status === 200) {
					saveToken(data.access_token);
					navigate(routerPaths.todo.path);
				} else {
					throw new Error('로그인 중 오류가 발생했습니다');
				}
			} catch (error) {
				if (error instanceof Error) {
					alert(`Error : ${error.message}`);
				} else {
					alert('unknown error occurred');
				}
			}
		}
	};

	const handleNavigation = () => {
		if (page === 'signin') {
			navigate(routerPaths.signup.path);
		} else {
			navigate(routerPaths.signin.path);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<span>아이디</span>
				<input
					onChange={emailCheck}
					type="email"
					data-testid="email-input"
					placeholder="이메일을 입력해주세요"
					required
				/>
			</div>
			<div>
				<span>비밀번호</span>
				<input
					onChange={passwordCheck}
					type="password"
					data-testid="password-input"
					placeholder="8자 이상의 비밀번호를 입력해주세요"
					required
				/>
			</div>
			{page === 'signup' ? (
				<>
					<button type="submit" disabled={isDisabled} data-testid="signup-button">
						회원가입
					</button>
					<button onClick={handleNavigation} type="button">
						취소
					</button>
				</>
			) : (
				<>
					<button type="submit" disabled={isDisabled} data-testid="signin-button">
						로그인
					</button>
					<button onClick={handleNavigation} type="button">
						회원가입
					</button>
				</>
			)}
		</form>
	);
}

export default SignForm;
