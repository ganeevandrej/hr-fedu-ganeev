import { AssignTaskRequestDto } from '@models/tasks';
import { NOT_A_DATE, NOT_A_NUMBER } from '@utils/yup-provider/constants';
import * as yup from 'yup';

interface EmployeeAssignmentRequestModel
	extends Omit<
		AssignTaskRequestDto,
		'userFullName' | 'deadlineDate' | 'minimalPrice' | 'recommendedPrice' | 'createdDate'
	> {
	createdDate?: Date | null;
	userFullName: string | null;
	deadlineDate: Date | null;
	minimalPrice: number | null;
	recommendedPrice: number | null;
}

const getDefaultValues = (createdDate?: string): EmployeeAssignmentRequestModel => ({
	createdDate: createdDate ? new Date(createdDate) : null,
	userFullName: null,
	deadlineDate: null,
	minimalPrice: null,
	recommendedPrice: null,
});

const useEmployeeAssignmentSchema = () => {
	const schema = yup.object({
		preferablePrice: yup.number(),
		userFullName: yup.string().required(),
		deadlineDate: yup
			.date()
			.typeError(NOT_A_DATE)
			.nullable()
			.required()
			.min(yup.ref('createdDate'), 'Крайний срок исполнения заявки должен быть позже даты создания'),
		minimalPrice: yup.number().typeError(NOT_A_NUMBER).nullable().required(),
		recommendedPrice: yup.number().typeError(NOT_A_NUMBER).nullable().required(),
	});

	const defaultValues: EmployeeAssignmentRequestModel = getDefaultValues();

	return { schema, defaultValues };
};

export { useEmployeeAssignmentSchema, getDefaultValues };
export type { EmployeeAssignmentRequestModel };
