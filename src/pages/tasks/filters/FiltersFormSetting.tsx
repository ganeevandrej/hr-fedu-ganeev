import { TasksRequestDto } from '@models/tasks';
import { NOT_A_DATE, NOT_A_NUMBER } from '@utils/yup-provider/constants';
import * as yup from 'yup';

interface TasksRequestModel
	extends Omit<TasksRequestDto, 'startDate' | 'endDate' | 'priceFrom' | 'recommendedPrice' | 'priceTo'> {
	startDate: Date | null;
	endDate: Date | null;
	priceFrom: number | null;
	priceTo: number | null;
}

const getDefaultValues = (): TasksRequestModel => ({
	startDate: null,
	endDate: null,
	priceFrom: null,
	priceTo: null,
});

const useTasksFiltersSchema = () => {
	const schema = yup.object({
		priceFrom: yup
			.number()
			.typeError(NOT_A_NUMBER)
			.nullable()
			.test('test1', 'Стоимость с больше стоимости по', (value, context) => {
				const parentContext = context.parent;

				if (parentContext.priceTo && value) {
					return !(value > parentContext.priceTo);
				}

				return true;
			}),
		priceTo: yup
			.number()
			.nullable()
			.typeError(NOT_A_NUMBER)
			.test('test2', 'Стоимость по больше стоимости с', (value, context) => {
				const parentContext = context.parent;

				if (parentContext.priceFrom && value) {
					return !(value < parentContext.priceFrom);
				}

				return true;
			}),
		startDate: yup
			.date()
			.nullable()
			.typeError(NOT_A_DATE)
			.test('test3', 'Дата с больше даты по', (value, context) => {
				const parentContext = context.parent;

				if (parentContext.endDate && value) {
					return !(value.getTime() > parentContext.endDate.getTime());
				}

				return true;
			}),
		endDate: yup
			.date()
			.nullable()
			.typeError(NOT_A_DATE)
			.test('test4', 'Дата по меньше даты с', (value, context) => {
				const parentContext = context.parent;

				if (parentContext.startDate && value) {
					return !(value.getTime() < parentContext.startDate.getTime());
				}

				return true;
			}),
	});

	const defaultValues: TasksRequestModel = getDefaultValues();

	return { schema, defaultValues };
};

export { useTasksFiltersSchema, getDefaultValues };
export type { TasksRequestModel };
