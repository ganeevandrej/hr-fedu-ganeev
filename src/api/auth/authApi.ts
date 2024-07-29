import { GetAuthResponseDto, LoginRequestModel } from '@models/auth';
import { rtkQueryApi } from '../rtkQueryApi';

const authApi = rtkQueryApi.injectEndpoints({
	endpoints: (build) => ({
		getAuth: build.query<GetAuthResponseDto, void>({
			query: () => ({
				url: '/v1/auth',
				method: 'GET',
			}),
		}),
		logout: build.mutation<void, void>({
			query: () => ({
				url: '/v1/logout',
				method: 'GET',
			}),
		}),
		login: build.mutation<void, LoginRequestModel>({
			query: ({ body }) => ({
				url: '/v1/login',
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const { useGetAuthQuery, useLoginMutation, useLogoutMutation } = authApi;
