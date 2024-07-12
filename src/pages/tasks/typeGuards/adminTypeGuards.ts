import { RoleType } from '@harness/navigation/Router';
import { AdminTaskDto, AdminTasksPreviewDto, TaskDto, TasksPreviewDto } from '@models/tasks';

const isAdminTaskArray = (data: TasksPreviewDto, role: RoleType): data is AdminTasksPreviewDto => {
	const isTaskAdmin = data.some((task) => typeof task === 'object' && task !== null && 'createdDate' in task);

	if (!data.length) {
		return role === 'admin';
	}

	return role === 'admin' && isTaskAdmin;
};

const isAdminTask = (taskData: TaskDto): taskData is AdminTaskDto => 'createdDate' in taskData;

export { isAdminTaskArray, isAdminTask };
