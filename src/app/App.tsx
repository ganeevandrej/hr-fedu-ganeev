import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Router from '@harness/navigation/Router';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import store from '@store/store';
import theme from '@styles/theme';
import { YupProvider } from '@utils/yup-provider/yup-provider';
import { ru } from 'date-fns/locale/ru';

const App = () => {
	return (
		<Provider store={store}>
			<StrictMode>
				<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
					<ThemeProvider theme={theme}>
						<YupProvider>
							<BrowserRouter>
								<Router />
							</BrowserRouter>
						</YupProvider>
					</ThemeProvider>
				</LocalizationProvider>
			</StrictMode>
		</Provider>
	);
};

export default App;
