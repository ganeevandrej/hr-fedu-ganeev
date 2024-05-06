import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Router from '@harness/navigation/Router';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DictionariesProvider } from '@store/slices/dictionaries/DictionariesProvider';
import store from '@store/store';
import { YupProvider } from '@utils/yup-provider/yup-provider';
import { ru } from 'date-fns/locale/ru';

const App = () => {
	return (
		<Provider store={store}>
			<StrictMode>
				<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
					<YupProvider>
						<DictionariesProvider />
						<BrowserRouter>
							<Router />
						</BrowserRouter>
					</YupProvider>
				</LocalizationProvider>
			</StrictMode>
		</Provider>
	);
};

export default App;
