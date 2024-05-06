import { AssignTaskRequestDto } from '@models/tasks';
import { EmployeeAssignmentRequestModel } from './employeeAssignmentFormSettings';

const mapToDto = (model: EmployeeAssignmentRequestModel): AssignTaskRequestDto => ({
	userFullName: model?.userFullName || '',
	minimalPrice: model?.minimalPrice || 0,
	deadlineDate: model?.deadlineDate ? model?.deadlineDate?.toISOString() : '',
	recommendedPrice: model?.recommendedPrice || 0,
});

export { mapToDto };
