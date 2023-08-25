import React from 'react';
import styled, { css } from 'styled-components';

const ErrorWrap = styled.div`
	${({ theme }) => {
		const { colors, fonts } = theme;
		return css`
			font-size: 100px;
			color: ${colors.paleGreen};
			font-weight: ${fonts.weight.bold};
			text-shadow: 4px 4px 5px ${colors.lightGray};
		`;
	}}
`;
function Error() {
	return <ErrorWrap>Error</ErrorWrap>;
}

export default Error;
