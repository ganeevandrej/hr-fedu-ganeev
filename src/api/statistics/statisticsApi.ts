import { Statistic } from '@models/statistic';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { rtkQueryApi } from '../rtkQueryApi';

const statisticsApi = rtkQueryApi.injectEndpoints({
	endpoints: (build) => ({
		getStatistics: build.query<Statistic, void>({
			async queryFn(_arg, _queryApi, _extraOptions, baseQuery) {
				const [workers, tasks] = await Promise.all([
					baseQuery('/v1/statistic/workers'),
					baseQuery(`/v1/statistic/tasks`),
				]);
				if (workers.data && tasks.data) {
					return { data: { workers: workers.data, tasks: tasks.data } as Statistic };
				}
				return { error: (workers.error || tasks.error) as FetchBaseQueryError };
			},
		}),
	}),
});

export const { useGetStatisticsQuery } = statisticsApi;
