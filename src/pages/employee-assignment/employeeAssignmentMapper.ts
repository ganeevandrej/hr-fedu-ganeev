import { AssignTaskRequestDto } from '@models/tasks';
import { EmployeeAssignmentRequestModel } from './employeeAssignmentFormSettings';

type EmployeeAssignmentFormData = {
	createdDate: string | null;
	userFullName: string | null;
	deadlineDate: string | null;
	minimalPrice: string | null;
	recommendedPrice: string | null;
};

const mapToDto = (model: EmployeeAssignmentRequestModel): AssignTaskRequestDto => ({
	userFullName: model?.userFullName || '',
	minimalPrice: model?.minimalPrice || 0,
	deadlineDate: model?.deadlineDate ? model?.deadlineDate?.toISOString() : '',
	recommendedPrice: model?.recommendedPrice || 0,
});

const mapToEmployeeAssignmentRequestModel = (formData: EmployeeAssignmentFormData): EmployeeAssignmentRequestModel => {
	const { userFullName, createdDate, deadlineDate, recommendedPrice, minimalPrice } = formData;

	return {
		minimalPrice: minimalPrice ? Number(minimalPrice) : null,
		userFullName: userFullName ? userFullName : null,
		recommendedPrice: recommendedPrice ? Number(recommendedPrice) : null,
		createdDate: createdDate ? new Date(createdDate) : null,
		deadlineDate: deadlineDate ? new Date(deadlineDate) : null,
	};
};

export { mapToDto, mapToEmployeeAssignmentRequestModel };
