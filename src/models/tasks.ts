type TasksStatuses = 'rejected' | 'unassigned';

type ClientTypes = 'standard' | 'premium';

type AdminTasksPreviewDto = AdminTaskPreviewDto[];

type AdminTaskPreviewDto = {
	id: string;
	createdDate: string;
	status: TasksStatuses;
	workType: string;
	preferablePrice?: number;
};

type ExecutorTasksPreviewDto = ExecutorTaskPreviewDto[];

type ExecutorTaskPreviewDto = {
	id: string;
	deadlineDate: string;
	clientType: ClientTypes;
	workType: string;
	preferablePrice?: number;
};

type ExecutorTaskModel = {
	id: string;
	deadlineDate: string;
	clientType: ClientTypes;
	workType: string;
	preferablePrice?: number;
	isExpiring: boolean;
};

type AdminTaskDto = {
	id: string;
	createdDate: string;
	preferablePrice?: number;
	codeOSU: string;
	clientFullName: string;
	phoneNumber: string;
	workType: string;
	clientType: string;
	rejectReason?: string;
	comment?: string;
};

type AssignTaskRequestDto = {
	userFullName: string;
	minimalPrice: number;
	deadlineDate: string;
	recommendedPrice?: number;
};

type ExecutorTaskDto = {
	id: string;
	createdDate: string;
	deadlineDate: string;
	preferablePrice?: number;
	recommendedPrice?: number;
	minimalPrice: number;
	phoneNumber: string;
	workType: string;
	codeOSU: string;
	clientFullName: string;
};

type CompleteTaskRequestModel = {
	workType: string;
	workPrice: number | null;
	completeDate: Date | null;
	comment?: string;
};

type TaskDto = ExecutorTaskDto | AdminTaskDto;

type TaskRequestQuery = {
	id: string;
	role: 'admin' | 'executor';
};

type TasksMutationRequestModel = {
	id: string;
	body: AssignTaskRequestDto;
};

const isAdminTaskArray = (data: AdminTasksPreviewDto | ExecutorTasksPreviewDto): data is AdminTasksPreviewDto => {
	return (
		Array.isArray(data) &&
		data.some(
			(task) =>
				typeof task === 'object' &&
				task !== null &&
				'id' in task &&
				'createdDate' in task &&
				'status' in task &&
				'workType' in task &&
				'preferablePrice' in task,
		)
	);
};

const isAdminTask = (taskData: TaskDto): taskData is AdminTaskDto =>
	(taskData as AdminTaskDto).clientType !== undefined;

const isExecutorTaskArray = (data: AdminTasksPreviewDto | ExecutorTasksPreviewDto): data is ExecutorTasksPreviewDto => {
	return (
		Array.isArray(data) &&
		data.some(
			(task) =>
				typeof task === 'object' &&
				task !== null &&
				'id' in task &&
				'deadlineDate' in task &&
				'clientType' in task &&
				'workType' in task &&
				'preferablePrice' in task,
		)
	);
};

const isExecutorTask = (taskData: TaskDto): taskData is ExecutorTaskDto =>
	(taskData as ExecutorTaskDto).deadlineDate !== undefined;

export type {
	TasksStatuses,
	ClientTypes,
	AdminTasksPreviewDto,
	AdminTaskPreviewDto,
	ExecutorTaskPreviewDto,
	ExecutorTasksPreviewDto,
	ExecutorTaskModel,
	AdminTaskDto,
	ExecutorTaskDto,
	TaskDto,
	AssignTaskRequestDto,
	CompleteTaskRequestModel,
	TaskRequestQuery,
	TasksMutationRequestModel,
};

export { isAdminTask, isAdminTaskArray, isExecutorTask, isExecutorTaskArray };
