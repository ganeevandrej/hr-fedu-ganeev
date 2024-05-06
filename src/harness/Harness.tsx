import React from 'react';
import { Outlet } from 'react-router';
import AppHeader from '@harness/portal/app-header/AppHeader';
import { Box, CssBaseline, styled } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@styles/theme';

const Workspace = styled(Box)(({ theme }) => ({
	marginTop: theme.spacing(11.5),
	display: 'flex',
	width: '100%',
	height: 'calc(100vh - 46px)',
}));

const Harness = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppHeader />
			<Workspace>
				<Outlet />
			</Workspace>
		</ThemeProvider>
	);
};

export default Harness;
