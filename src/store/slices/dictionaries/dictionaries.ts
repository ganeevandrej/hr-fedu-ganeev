import { Dictionaries, DictionaryNames } from '@models/dictionaries';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/store';

const initialState: Dictionaries = {
	rejectReasons: [],
	taskStatuses: [],
	workTypes: [],
};

const dictionariesSlice = createSlice({
	name: 'dictionarySlice',
	initialState,
	reducers: {
		setDictionaries: (_, action: PayloadAction<Dictionaries>) => action.payload,
	},
});

export const dictionariesSelector = (name: DictionaryNames) => (state: RootState) => state.dictionaries[name];
export const { setDictionaries } = dictionariesSlice.actions;
export default dictionariesSlice.reducer;
export { dictionariesSlice };
