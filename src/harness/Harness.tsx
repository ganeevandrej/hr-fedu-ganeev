import React from 'react';
import { Outlet } from 'react-router';
import ErrorBoundary from '@business/molecules/ErrorBoundary';
import AppHeader from '@harness/portal/app-header/AppHeader';
import { Box, CssBaseline, styled } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@styles/theme';
import SnackbarProvider from './context/snackbar';

const Workspace = styled(Box)(({ theme }) => ({
	marginTop: theme.spacing(11.5),
	display: 'flex',
	width: '100%',
	height: 'auto',
}));

const Harness = () => {
	return (
		<ThemeProvider theme={theme}>
			<SnackbarProvider>
				<CssBaseline />
				<ErrorBoundary>
					<AppHeader />
					<Workspace>
						<Outlet />
					</Workspace>
				</ErrorBoundary>
			</SnackbarProvider>
		</ThemeProvider>
	);
};

export default Harness;
