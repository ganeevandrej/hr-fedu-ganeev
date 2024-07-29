import React from 'react';
import { Outlet } from 'react-router';
import ErrorBoundary from '@business/molecules/ErrorBoundary';
import AppHeader from '@harness/portal/app-header/AppHeader';
import { Box, CssBaseline, styled } from '@mui/material';
import { DictionariesProvider } from '@store/slices/dictionaries/DictionariesProvider';
import SnackbarProvider from './context/snackbar';

const Workspace = styled(Box)(({ theme }) => ({
	marginTop: theme.spacing(11.5),
	display: 'flex',
	width: '100%',
	height: 'auto',
}));

const Harness = () => {
	return (
		<SnackbarProvider>
			<CssBaseline />
			<DictionariesProvider />
			<ErrorBoundary>
				<AppHeader />
				<Workspace>
					<Outlet />
				</Workspace>
			</ErrorBoundary>
		</SnackbarProvider>
	);
};

export default Harness;
