import { TaskDto, TasksMutationRequestModel, TasksPreviewDto, TasksRequestDto } from '@models/tasks';
import { rtkQueryApi } from '../rtkQueryApi';

const taskApi = rtkQueryApi.injectEndpoints({
	endpoints: (build) => ({
		getTasks: build.query<TasksPreviewDto, TasksRequestDto>({
			query: (params) => ({
				url: `/v1/tasks`,
				method: 'GET',
				params,
			}),
			providesTags: ['Task'],
		}),
		getTaskById: build.query<TaskDto, string>({
			query: (id) => ({
				url: `/v1/tasks/${id}`,
				method: 'GET',
			}),
		}),
		tasksAssign: build.mutation<void, TasksMutationRequestModel>({
			query: ({ id, body }) => ({
				url: `/v1/tasks/${id}/assign`,
				method: 'POST',
				body: body,
			}),
		}),
		tasksReturn: build.mutation<void, string>({
			query: (id) => ({
				url: `/v1/tasks/${id}/return`,
				method: 'POST',
			}),
		}),
		tasksComplete: build.mutation<void, TasksMutationRequestModel>({
			query: ({ id, body }) => ({
				url: `/v1/tasks/${id}/complete`,
				method: 'POST',
				body: body,
			}),
		}),
		tasksArchive: build.mutation<void, string>({
			query: (id) => ({
				url: `/v1/tasks/${id}/archive`,
				method: 'POST',
			}),
		}),
	}),
});

export const {
	useGetTasksQuery,
	useGetTaskByIdQuery,
	useTasksAssignMutation,
	useTasksReturnMutation,
	useTasksCompleteMutation,
	useTasksArchiveMutation,
} = taskApi;
