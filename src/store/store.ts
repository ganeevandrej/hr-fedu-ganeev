import { rtkQueryApi } from '@api/rtkQueryApi';
import { configureStore } from '@reduxjs/toolkit';
import dictionariesReducer from './slices/dictionaries/dictionaries';

const store = configureStore({
	reducer: {
		[rtkQueryApi.reducerPath]: rtkQueryApi.reducer,
		dictionaries: dictionariesReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat([rtkQueryApi.middleware]),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
