import interBoldFont from '@assets/fonts/Inter-Bold.ttf';
import interMediumFont from '@assets/fonts/Inter-Medium.ttf';
import interRegularFont from '@assets/fonts/Inter-Regular.ttf';
import { alpha, createTheme } from '@mui/material/styles';

const theme = createTheme({
	typography: {
		fontFamily: 'InterRegular, InterBold, InterMedium',
		fontWeightBold: 800,
		fontWeightMedium: 600,
		fontWeightRegular: 400,
		h1: { fontSize: 24 },
		h2: { fontSize: 22 },
		h3: { fontSize: 20 },
		h4: { fontSize: 18 },
		h5: { fontSize: 16 },
		h6: { fontSize: 14 },
		subtitle1: { fontSize: 12 },
		tableHeader: {
			fontWeight: 800,
		},
		expiring: {
			fontWeight: 600,
			fontSize: 14,
			color: '#FF0000',
		},
	},
	palette: {
		primary: {
			main: '#FFFFFF',
		},
		error: {
			main: '#FF0000',
		},
		secondary: {
			main: '#3A9EC9',
		},
		common: {
			white: '#FFFFFF',
			black: '#1F1F1F',
		},
		grey: {
			'300': '#b3b3b3',
		},
		background: {
			default: '#F1F3F8',
		},
		status: {
			unassigned: '#66BFFF',
			rejected: '#393B44',
		},
		type: {
			standard: '#86DC89',
			premium: '#B8BCE2',
			expiring: alpha('#FF0000', 0.4),
		},
		appHeader: '#BDC0E4',
		button: {
			delete: '#B8BCE2',
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
	spacing: 4,
	components: {
		MuiCssBaseline: {
			styleOverrides: `
			@font-face {
				font-family: 'interRegular';
				font-weight: 400;
	            font-size: 14px;
				src: local('Inter'), local('Inter-Regular'), url(${interRegularFont}) format('truetype');
			  }
			@font-face {
				font-family: 'interBold';
				font-weight: 400;
	            font-size: 14px;
				src: local('Inter'), local('Inter-Bold'), url(${interBoldFont}) format('truetype');
			  }
			@font-face {
				font-family: 'interMedium';
				font-weight: 400;
	            font-size: 14px;
				src: local('Inter'), local('Inter-Medium'), url(${interMediumFont}) format('truetype');
			}
			`,
		},
		MuiToolbar: {
			styleOverrides: {
				dense: {
					height: 46,
					minHeight: 46,
					paddingLeft: 14,
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				containedSecondary: {
					color: '#F1F3F8',
					backgroundColor: '#BDC0E4',
				},
				outlinedSecondary: {
					color: '#A0A5D8',
					border: '1px solid #A0A5D8',
				},
			},
		},
	},
});

export default theme;
