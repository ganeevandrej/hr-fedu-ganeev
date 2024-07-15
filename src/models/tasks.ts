type TasksStatuses = 'rejected' | 'unassigned' | 'completed' | 'assigned' | 'archive' | 'late';

type ClientTypes = 'standard' | 'premium';

type Task = {
	id: string;
	createdDate: string;
	preferablePrice: number;
	codeOSU: string;
	clientFullName: string;
	phoneNumber: string;
	workType: string;
};

type AdminTasksPreviewDto = AdminTaskPreviewDto[];

type AdminTaskPreviewDto = Pick<AdminTaskDto, 'id' | 'createdDate' | 'workType' | 'preferablePrice'> & {
	status: TasksStatuses;
};

type ExecutorTasksPreviewDto = ExecutorTaskPreviewDto[];

type ExecutorTaskPreviewDto = Pick<ExecutorTaskDto, 'id' | 'deadlineDate' | 'workType' | 'preferablePrice'> & {
	clientType: ClientTypes;
};

type ExecutorTaskModel = ExecutorTaskPreviewDto & {
	isExpiring: boolean;
};

type TasksRequestDto = {
	startDate?: Date;
	endDate?: Date;
	priceFrom?: number;
	priceTo?: number;
};

type AdminTaskDto = Task & {
	clientType: string;
	rejectReason?: string;
	comment?: string;
};

type AssignTaskRequestDto = {
	userFullName: string;
	minimalPrice: number;
	deadlineDate: string;
	recommendedPrice: number;
};

type CompleteTaskRequestDto = {
	workType: string;
	workPrice: number;
	completeDate: string;
	comment?: string;
};

type RejectTaskRequestDto = {
	reason: string;
	comment: string;
};

type ExecutorTaskDto = Task & {
	deadlineDate: string;
	recommendedPrice: number;
	minimalPrice: number;
	clientType: string;
};

type TaskDto = ExecutorTaskDto | AdminTaskDto;

type TasksPreviewDto = ExecutorTasksPreviewDto | AdminTasksPreviewDto;

type TaskRequestQuery = {
	id: string;
	role: 'admin' | 'executor';
};

type TasksMutationRequestModel = {
	id: string;
	body: AssignTaskRequestDto | CompleteTaskRequestDto | RejectTaskRequestDto;
};

export type {
	TasksStatuses,
	ClientTypes,
	AdminTasksPreviewDto,
	AdminTaskPreviewDto,
	ExecutorTaskPreviewDto,
	ExecutorTasksPreviewDto,
	CompleteTaskRequestDto,
	RejectTaskRequestDto,
	ExecutorTaskModel,
	AdminTaskDto,
	ExecutorTaskDto,
	TaskDto,
	TasksRequestDto,
	TasksPreviewDto,
	AssignTaskRequestDto,
	TaskRequestQuery,
	TasksMutationRequestModel,
};
