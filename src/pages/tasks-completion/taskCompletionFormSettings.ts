import { Dictionary } from '@models/dictionaries';
import { CompleteTaskRequestDto, ExecutorTaskDto } from '@models/tasks';
import { NOT_A_DATE, NOT_A_NUMBER } from '@utils/yup-provider/constants';
import * as yup from 'yup';

interface CompleteTaskRequestModel
	extends Omit<CompleteTaskRequestDto, 'workType' | 'workPrice' | 'completeDate' | 'comment'> {
	workType: Dictionary | null;
	workPrice: number | null;
	completeDate: Date | null;
	comment: string | null;
	createdDate?: Date | null;
	deadlineDate?: Date | null;
	minimalPrice?: number;
	recommendedPrice?: number;
	preferablePrice?: number;
	clientType?: string;
}

const getDefaultValues = (data?: ExecutorTaskDto): CompleteTaskRequestModel => {
	const { createdDate, deadlineDate, minimalPrice, recommendedPrice, preferablePrice, clientType } = data || {};
	return {
		comment: '',
		workType: null,
		workPrice: null,
		completeDate: null,
		clientType: clientType,
		minimalPrice: minimalPrice,
		preferablePrice: preferablePrice,
		recommendedPrice: recommendedPrice,
		createdDate: createdDate ? new Date(createdDate) : null,
		deadlineDate: deadlineDate ? new Date(deadlineDate) : null,
	};
};

const useCompleteTaskSchema = () => {
	const schema = yup.object({
		workType: yup.object().shape({
			code: yup.string().required(),
			value: yup.string().required(),
		}),
		workPrice: yup
			.number()
			.typeError(NOT_A_NUMBER)
			.nullable()
			.required()
			.min(yup.ref('minimalPrice'), 'Введенная стоимость меньше минимальной')
			.max(yup.ref('recommendedPrice'), 'Введенная стоимость больше рекомендованной')
			.test('test1', 'Крайний срок превышен. Введенная стоимость должна быть равна желаемой', (val, context) => {
				const parentContext = context.parent;
				return !(
					parentContext.clientType !== 'premium' &&
					parentContext.completeDate?.getTime() > parentContext.deadlineDate?.getTime() &&
					val !== parentContext.preferablePrice
				);
			})
			.test('test2', 'Крайний срок превышен. Введенная стоимость должна быть равна минимальной', (val, context) => {
				const parentContext = context.parent;
				return !(
					parentContext.clientType === 'premium' &&
					parentContext.completeDate?.getTime() > parentContext.deadlineDate?.getTime() &&
					val !== parentContext.minimalPrice
				);
			}),
		completeDate: yup
			.date()
			.typeError(NOT_A_DATE)
			.nullable()
			.required()
			.min(yup.ref('createdDate'), 'Дата исполнения заявки меньше даты создания'),
		comment: yup.string(),
	});

	const defaultValues = getDefaultValues();

	return { schema, defaultValues };
};

export { useCompleteTaskSchema, getDefaultValues };
export type { CompleteTaskRequestModel };
