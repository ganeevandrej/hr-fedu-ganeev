import { AdminTasksPreviewDto, ExecutorTasksPreviewDto, TasksPreviewDto } from '@models/tasks';
import { sortClientTypes, sortStatuses } from '@pages/tasks/constants';

type SortTasksReturnType<T extends boolean> = T extends true ? AdminTasksPreviewDto : ExecutorTasksPreviewDto;

const sortTasksByDate = (str1: string, str2: string): number => {
	return new Date(str1).getTime() - new Date(str2).getTime();
};

export const sortTasks = <T extends boolean>(tasks: TasksPreviewDto, isAdminTasks: T): SortTasksReturnType<T> => {
	if (isAdminTasks) {
		return sortStatuses.reduce((acc, sortValue) => {
			const filteredTasks = (tasks as AdminTasksPreviewDto).filter((task) => task.status === sortValue);

			const sortedTasks = filteredTasks.slice().sort((currentTask, nextTask) => {
				return sortTasksByDate(currentTask.createdDate, nextTask.createdDate);
			});

			return [...acc, ...sortedTasks];
		}, [] as AdminTasksPreviewDto) as SortTasksReturnType<T>;
	}

	return sortClientTypes.reduce((acc, sortValue) => {
		const filteredTasks = (tasks as ExecutorTasksPreviewDto).filter((task) => task.clientType === sortValue);

		const sortedTasks = filteredTasks.slice().sort((currentTask, nextTask) => {
			return sortTasksByDate(currentTask.deadlineDate, nextTask.deadlineDate);
		});

		return [...acc, ...sortedTasks];
	}, [] as ExecutorTasksPreviewDto) as SortTasksReturnType<T>;
};
