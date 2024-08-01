import { ActionClientRequestDto, ClientPreviewDto } from '@models/clients';
import { ClientTypes } from '@models/tasks';
import { NOT_A_DATE, NOT_A_NUMBER } from '@utils/yup-provider/constants';
import * as yup from 'yup';

interface ActionClientRequestModel
	extends Omit<
		ActionClientRequestDto,
		| 'firstName'
		| 'middleName'
		| 'lastName'
		| 'hasNameChanged'
		| 'clientType'
		| 'birthDate'
		| 'city'
		| 'phoneNumber'
		| 'codeOSU'
		| 'inn'
		| 'newFirstName'
		| 'newMiddleName'
		| 'newLastName'
	> {
	firstName: string | null;
	middleName: string | null;
	lastName: string | null;
	hasNameChanged: boolean | null;
	clientType: ClientTypes;
	birthDate: Date | null;
	city: string | null;
	phoneNumber: number | null;
	codeOSU: string | null;
	inn: string | null;
	newFirstName?: string | null;
	newMiddleName?: string | null;
	newLastName?: string | null;
}

const getDefaultValues = (clientData?: ClientPreviewDto): ActionClientRequestModel => {
	if (clientData) {
		const { id, userFullName, clientType, phoneNumber, city } = clientData;
		const [firstName, middleName, lastName] = userFullName.split(' ');
		return {
			id: id || `FEDU-${new Date().getTime()}`,
			firstName: firstName || null,
			middleName: middleName || null,
			lastName: lastName || null,
			hasNameChanged: false,
			clientType: clientType,
			birthDate: null,
			city: city || null,
			phoneNumber: Number(phoneNumber) || null,
			codeOSU: null,
			inn: null,
			newFirstName: null,
			newMiddleName: null,
			newLastName: null,
		};
	}

	return {
		id: `FEDU-${new Date().getTime()}`,
		firstName: null,
		middleName: null,
		lastName: null,
		hasNameChanged: false,
		clientType: 'standard',
		birthDate: null,
		city: null,
		phoneNumber: null,
		codeOSU: null,
		inn: null,
		newFirstName: null,
		newMiddleName: null,
		newLastName: null,
	};
};

const useActionClientSchema = () => {
	const schema = yup.object({
		id: yup.string(),
		firstName: yup.string().required(),
		middleName: yup.string().required(),
		lastName: yup.string().required(),
		hasNameChanged: yup.boolean().required(),
		clientType: yup.string().required(),
		birthDate: yup.date().typeError(NOT_A_DATE).required(),
		city: yup.string().required(),
		phoneNumber: yup
			.number()
			.typeError(NOT_A_NUMBER)
			.required()
			.test('длина номера телефона', 'Длина числа должна быть равна 11', (value) => {
				if (!value) return false;
				const strValue = value.toString();
				return strValue.length >= 11 && strValue.length < 12;
			}),
		codeOSU: yup.string().required(),
		inn: yup.string().required(),
		newFirstName: yup
			.string()
			.nullable()
			.test('Обязательное поле', 'Поле обязательно для заполнения', (value, context) => {
				if (context.parent.hasNameChanged && !value) {
					return false;
				}
				return true;
			}),
		newMiddleName: yup
			.string()
			.nullable()
			.test('обязательное поле', 'Поле обязательно для заполнения', (value, context) => {
				if (context.parent.hasNameChanged && !value) {
					return false;
				}
				return true;
			}),
		newLastName: yup
			.string()
			.nullable()
			.test('обязательное поле', 'Поле обязательно для заполнения', (value, context) => {
				if (context.parent.hasNameChanged && !value) {
					return false;
				}
				return true;
			}),
	});

	const defaultValues = getDefaultValues();

	return { schema, defaultValues };
};

export { useActionClientSchema, getDefaultValues };
export { ActionClientRequestModel };
