import { TasksRequestDto } from '@models/tasks';
import { TasksRequestModel } from './FiltersFormSetting';

const mapToDto = (model: TasksRequestModel): TasksRequestDto => {
	const { startDate, endDate, priceFrom, priceTo } = model;

	return {
		startDate: startDate ? startDate.toISOString() : undefined,
		endDate: endDate ? endDate.toISOString() : undefined,
		priceFrom: priceFrom || undefined,
		priceTo: priceTo || undefined,
	};
};

export { mapToDto };
