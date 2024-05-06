import { useEffect } from 'react';
import { useGetDictionariesQuery } from '@api/common/dictionariesApi';
import useAppDispatch from '@store/hooks/useAppDispatch';
import { setDictionaries } from '@store/slices/dictionaries/dictionaries';

const DictionariesProvider = () => {
	const { data } = useGetDictionariesQuery();

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (data) {
			dispatch(setDictionaries(data));
		}
	}, [data, dispatch]);

	return null;
};

export { DictionariesProvider };
