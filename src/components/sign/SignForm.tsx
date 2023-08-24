import React, { ChangeEvent, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function SignForm() {
	const { pathname } = useLocation();
	const [, setEmail] = useState('');
	const [, setPassword] = useState('');
	const [isComplete, setIsComplete] = useState({ id: false, password: false });
	const [isDisabled, setIsDisabled] = useState(true);

	useEffect(() => {
		setIsDisabled(!(isComplete.id && isComplete.password));
	}, [isComplete]);

	function emailCheck(e: ChangeEvent<HTMLInputElement>) {
		setIsComplete(
			e.target.value.includes('@')
				? { id: true, password: isComplete.password }
				: { id: false, password: isComplete.password },
		);
		setEmail(e.target.value);
	}

	function passwordCheck(e: ChangeEvent<HTMLInputElement>) {
		setIsComplete(
			e.target.value.length >= 8 ? { id: isComplete.id, password: true } : { id: isComplete.id, password: false },
		);
		setPassword(e.target.value);
	}

	return (
		<form>
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
			{pathname === '/signup' ? (
				<button type="submit" disabled={isDisabled} data-testid="signup-button">
					회원가입
				</button>
			) : (
				<button type="submit" disabled={isDisabled} data-testid="signin-button">
					로그인
				</button>
			)}
		</form>
	);
}

export default SignForm;
