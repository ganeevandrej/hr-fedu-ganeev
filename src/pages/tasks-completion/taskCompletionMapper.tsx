import { CompleteTaskRequestDto } from '@models/tasks';
import { CompleteTaskRequestModel } from './taskCompletionFormSettings';

const mapToDto = (model: CompleteTaskRequestModel): CompleteTaskRequestDto => ({
	workType: model?.workType ? model.workType.code : '',
	workPrice: model?.workPrice || 0,
	completeDate: model?.completeDate ? model?.completeDate?.toISOString() : '',
	...(model?.comment ? { comment: model.comment } : {}),
});

export { mapToDto };
