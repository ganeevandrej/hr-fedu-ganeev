import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RTKQueryTags } from './tags';

const baseUrl = `/api`;

const rtkQueryApi = createApi({
	reducerPath: 'api',
	keepUnusedDataFor: 60,
	refetchOnMountOrArgChange: true,
	baseQuery: fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers) => {
			headers.set('Accept', 'application/json');
			headers.set('Content-Type', 'application/json;charset=UTF-8');
			// указывается значение admin или executor
			headers.set('x-role', 'admin');

			return headers;
		},
	}),
	tagTypes: [RTKQueryTags.Task, RTKQueryTags.Client],
	endpoints: () => ({}),
});

export { rtkQueryApi };
