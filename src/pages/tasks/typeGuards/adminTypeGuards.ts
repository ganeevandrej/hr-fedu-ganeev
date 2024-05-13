import {
	AdminTaskDto,
	AdminTaskPreviewDto,
	AdminTasksPreviewDto,
	ExecutorTaskDto,
	ExecutorTasksPreviewDto,
	TaskDto,
} from '@models/tasks';

const isAdminTaskArray = (data: AdminTasksPreviewDto | ExecutorTasksPreviewDto): data is AdminTasksPreviewDto => {
	return (
		Array.isArray(data) &&
		data.some(
			(task) => typeof task === 'object' && task !== null && (task as AdminTaskPreviewDto).createdDate !== undefined,
		)
	);
};

const isAdminTask = (taskData: TaskDto): taskData is AdminTaskDto =>
	(taskData as ExecutorTaskDto)?.deadlineDate == undefined;

export { isAdminTaskArray, isAdminTask };
