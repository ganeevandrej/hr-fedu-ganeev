import { Dictionaries } from '@models/dictionaries';
import { rtkQueryApi } from '../rtkQueryApi';

const dictionariesApi = rtkQueryApi.injectEndpoints({
	endpoints: (build) => ({
		getDictionaries: build.query<Dictionaries, void>({
			query: () => ({
				url: '/v1/dictionaries',
				method: 'GET',
			}),
		}),
	}),
});

export const { useGetDictionariesQuery } = dictionariesApi;
