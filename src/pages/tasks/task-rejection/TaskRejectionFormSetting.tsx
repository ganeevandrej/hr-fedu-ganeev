import { Dictionary } from '@models/dictionaries';
import { RejectTaskRequestDto } from '@models/tasks';
import * as yup from 'yup';

interface RejectTaskRequestModel extends Omit<RejectTaskRequestDto, 'reason' | 'comment'> {
	reason: Dictionary | null;
	comment: string | null;
}

const getDefaultValues = (): RejectTaskRequestModel => ({
	reason: null,
	comment: '',
});

const useRejectionTaskSchema = () => {
	const schema = yup.object({
		reason: yup.object().shape({
			code: yup.string().required(),
			value: yup.string().required(),
		}),
		comment: yup.string().required(),
	});

	const defaultValues = getDefaultValues();

	return { schema, defaultValues };
};

export { useRejectionTaskSchema };
export { RejectTaskRequestModel };
