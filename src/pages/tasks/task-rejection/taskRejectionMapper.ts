import { RejectTaskRequestDto } from '@models/tasks';
import { RejectTaskRequestModel } from './TaskRejectionFormSetting';

const mapToDto = (model: RejectTaskRequestModel): RejectTaskRequestDto => ({
	reason: model.reason ? model.reason.code : '',
	comment: model.comment || '',
});

export { mapToDto };
