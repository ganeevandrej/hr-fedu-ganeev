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

type ExecutorTaskDto = Task & {
	deadlineDate: string;
	recommendedPrice: number;
	minimalPrice: number;
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
