import { RejectTaskRequestDto } from '@models/tasks';
import * as yup from 'yup';

const getDefaultValues = (): RejectTaskRequestDto => ({
	reason: '',
	comment: '',
});

const useRejectionTaskSchema = () => {
	const schema = yup.object({
		reason: yup.string().required(),
		comment: yup.string().required(),
	});

	const defaultValues = getDefaultValues();

	return { schema, defaultValues };
};

export { useRejectionTaskSchema };
