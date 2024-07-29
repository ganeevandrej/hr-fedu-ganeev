import { LoginRequestDto } from '@models/auth';
import * as yup from 'yup';

const getDefaultValues = (): LoginRequestDto => ({
	login: '',
	password: '',
});

const useLoginSchema = () => {
	const schema = yup.object({
		password: yup.string().required(),
		login: yup.string().required(),
	});

	const defaultValues = getDefaultValues();

	return { schema, defaultValues };
};

export { useLoginSchema };
