import { RTKQueryTags } from '@api/tags';
import { ActionClientRequestDto, ClientsPreviewDto, ClientsRequestDto } from '@models/clients';
import { rtkQueryApi } from '../rtkQueryApi';

const clientsApi = rtkQueryApi.injectEndpoints({
	endpoints: (build) => ({
		getClients: build.query<ClientsPreviewDto, ClientsRequestDto>({
			query: (params) => ({
				url: '/v1/clients',
				method: 'GET',
				params,
			}),
			providesTags: [RTKQueryTags.Client],
		}),
		addClient: build.mutation<void, ActionClientRequestDto>({
			query: (body) => ({
				url: '/v1/add-client',
				method: 'POST',
				body,
			}),
			invalidatesTags: [RTKQueryTags.Client],
		}),
		editClient: build.mutation<void, ActionClientRequestDto>({
			query: (body) => ({
				url: '/v1/edit-client',
				method: 'POST',
				body,
			}),
			invalidatesTags: [RTKQueryTags.Client],
		}),
	}),
});

export const { useGetClientsQuery, useAddClientMutation, useEditClientMutation } = clientsApi;
