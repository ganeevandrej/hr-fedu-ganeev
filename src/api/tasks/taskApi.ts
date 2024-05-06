import { TaskDto, TasksMutationRequestModel } from '@models/tasks';
import { rtkQueryApi } from '../rtkQueryApi';

const taskApi = rtkQueryApi.injectEndpoints({
	endpoints: (build) => ({
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
		tasksReturn: build.mutation<void, TasksMutationRequestModel>({
			query: ({ id, body }) => ({
				url: `/v1/tasks/${id}/return`,
				method: 'POST',
				body: body,
			}),
		}),
		tasksArchive: build.mutation<void, TasksMutationRequestModel>({
			query: ({ id, body }) => ({
				url: `/v1/tasks/${id}/archive`,
				method: 'POST',
				body: body,
			}),
		}),
	}),
});

export const { useGetTaskByIdQuery, useTasksAssignMutation, useTasksReturnMutation, useTasksArchiveMutation } = taskApi;
