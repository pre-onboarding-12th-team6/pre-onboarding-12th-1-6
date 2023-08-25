import { createGlobalStyle, css } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset};
  ${({ theme }) => {
		return css`
			body {
				font-family: ${theme.fonts.family.base};
				font-size: ${theme.fonts.size.base};
				color: ${theme.colors.purple};
				width: 100vw;
				height: 100%;
				-ms-user-select: none;
				-moz-user-select: -moz-none;
				-khtml-user-select: none;
				-webkit-user-select: none;
				user-select: none;
			}
			a {
				text-decoration: none;
				color: inherit;
			}
			* {
				box-sizing: border-box;
			}
			button {
				border: none;
				cursor: pointer;
			}
			input {
				border: none;
			}
			ul {
				list-style: none;
			}
		`;
	}}
`;
export default GlobalStyles;
