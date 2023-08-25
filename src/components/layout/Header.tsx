import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import useAuthContext from '../../context/AuthContext';

const HeaderBar = styled.header`
	${({ theme }) => {
		const { colors } = theme;
		return css`
			background-color: ${colors.paleGreen};
			color: ${colors.white};
			width: 100%;
			min-height: fit-content;
			max-height: 50px;
			padding: 10px;
			text-align: center;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			position: fixed;
			/* flex-wrap: wrap; */
			align-content: space-around;
			left: 0;
			top: 0;
		`;
	}}
`;

const Title = styled.h1`
	${({ theme }) => {
		const { colors, fonts } = theme;
		return css`
			color: ${colors.white};
			font-size: ${fonts.size.lg};
			font-weight: ${fonts.weight.normal};
			line-height: 27px;
		`;
	}}
`;

const Button = styled.button`
	${({ theme }) => {
		const { colors, fonts } = theme;
		return css`
			font-size: ${fonts.size.sm};
			color: ${colors.charcole};
			background-color: ${colors.white};
			padding: 4px 12px;
			border-radius: 50px;
			transition: all 0.3s;
			&:hover {
				background-color: ${colors.charcoal};
				color: ${colors.white};
			}
		`;
	}}
`;

function Header() {
	const { token, clearToken } = useContext(useAuthContext);

	const logout = () => {
		clearToken();
	};

	return (
		<HeaderBar>
			{token !== null && (
				<>
					<Title>ToDo List</Title>
					<Button type="button" onClick={logout}>
						로그아웃
					</Button>
				</>
			)}
		</HeaderBar>
	);
}

export default Header;
