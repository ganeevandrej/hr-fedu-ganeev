import { ExecutorTaskDto, TaskDto } from '@models/tasks';

const isExecutorTask = (taskData: TaskDto): taskData is ExecutorTaskDto =>
	(taskData as ExecutorTaskDto).deadlineDate !== undefined;

export { isExecutorTask };
