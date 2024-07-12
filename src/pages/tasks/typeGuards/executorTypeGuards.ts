import { ExecutorTaskDto, TaskDto } from '@models/tasks';

const isExecutorTask = (taskData: TaskDto): taskData is ExecutorTaskDto => 'deadlineDate' in taskData;

export { isExecutorTask };
