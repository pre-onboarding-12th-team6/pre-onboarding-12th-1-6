import { signIn, signUp } from 'api/authApi';
import useAuthContext from 'context/AuthContext';
import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import routerPaths from '../../router/routerPaths';
        
const InputWrap = styled.div`
	position: relative;
	width: 300px;
`;

const Input = styled.input`
	${({ theme }) => {
		const { colors } = theme;
		return css`
			width: 100%;
			padding: 15px 10px;
			border: 1px solid ${colors.charcoal};
			border-radius: 4px;
			margin: 10px;
		`;
	}}
`;

const InputSpan = styled.span`
	${({ theme }) => {
		const { colors, fonts } = theme;
		return css`
			position: absolute;
			top: 0;
			left: 20px;
			background-color: ${colors.white};
			padding: 3px;
			font-size: ${fonts.size.sm};
			color: ${colors.charcoal};
		`;
	}}
`;

const ButtonWrap = styled.div`
	display: flex;
	gap: 8px;
	flex-direction: row;
	justify-content: right;
`;
const Button = styled.button`
	${({ theme }) => {
		const { colors } = theme;
		return css`
			color: ${colors.white};
			background-color: ${colors.black};
			padding: 8px 15px;
			border-radius: 50px;
			transition: all 0.5s;
			&:disabled {
				background-color: ${colors.white};
				color: ${colors.black};
				border: 1px solid ${colors.charcoal};
			}
		`;
	}}
`;

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

	useEffect(() => {
		setEmail('');
		setPassword('');
	}, [page]);

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
					alert('회원가입이 완료되었습니다');
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
			<InputWrap>
				<InputSpan>아이디</InputSpan>
				<Input
					onChange={emailCheck}
					value={email}
					type="email"
					data-testid="email-input"
					placeholder="이메일을 입력해주세요"
					required
				/>
			</InputWrap>
			<InputWrap>
				<InputSpan>비밀번호</InputSpan>
				<Input
					onChange={passwordCheck}
					value={password}
					type="password"
					data-testid="password-input"
					placeholder="8자 이상의 비밀번호를 입력해주세요"
					required
				/>
			</InputWrap>
			{page === 'signup' ? (
				<ButtonWrap>
					<Button type="submit" disabled={isDisabled} data-testid="signup-button">
						회원가입
					</Button>
					<Button onClick={handleNavigation} type="button">
						취소
					</Button>
				</ButtonWrap>
			) : (
				<ButtonWrap>
					<Button type="submit" disabled={isDisabled} data-testid="signin-button">
						로그인
					</Button>
					<Button onClick={handleNavigation} type="button">
						회원가입
					</Button>
				</ButtonWrap>
			)}
		</form>
	);
}

export default SignForm;
