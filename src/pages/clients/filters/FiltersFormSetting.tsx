import { ClientsRequestDto } from '@models/clients';
import * as yup from 'yup';

const getDefaultValues = (): ClientsRequestDto => ({
	city: undefined,
	clientType: undefined,
});

const useFiltersSchema = () => {
	const schema = yup.object({
		city: yup.string().nullable(),
		clientType: yup.string().nullable(),
	});

	const defaultValues = getDefaultValues();

	return { schema, defaultValues };
};

export { useFiltersSchema };
