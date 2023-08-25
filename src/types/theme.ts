import { DefaultTheme } from 'styled-components';

const colors = {
	// black
	black: '#212121',
	// white
	white: '#ffffff',
	// gray
	charcoal: '#444444',
	mediumGray: '#999999',
	lightGray: '#e5e5e5',
	// yellow
	yellow: '#E0B22C',
	// red
	red: '#ffafb4',
	// green
	darkGreen: '#293638',
	paleGreen: '#699290',
};

const fonts = {
	family: {
		base: 'Pretendard',
	},
	size: {
		base: '14px',
		sm: '12px',
		lg: '18px',
		title: '28px',
	},
	weight: {
		light: 300,
		normal: 500,
		bold: 700,
	},
};

export type ColorsTypes = typeof colors;
export type FontsTypes = typeof fonts;

const theme: DefaultTheme = {
	colors,
	fonts,
};

export default theme;
