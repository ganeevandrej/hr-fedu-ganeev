import { ActionClientRequestDto } from '@models/clients';
import { ActionClientRequestModel } from './ActionClientFormSetting';

const mapToDto = (model: ActionClientRequestModel): ActionClientRequestDto => ({
	id: model.id || '',
	firstName: model.firstName || '',
	middleName: model.middleName || '',
	lastName: model.lastName || '',
	hasNameChanged: model.hasNameChanged || false,
	clientType: model.clientType ? 'premium' : 'standard',
	birthDate: model.birthDate ? model.birthDate.toISOString() : '',
	city: model.city || '',
	phoneNumber: String(model.phoneNumber) || '',
	codeOSU: model.codeOSU || '',
	inn: model.inn || '',
	newFirstName: model.hasNameChanged && model.newFirstName ? model.newFirstName : '',
	newMiddleName: model.hasNameChanged && model.newMiddleName ? model.newMiddleName : '',
	newLastName: model.hasNameChanged && model.newLastName ? model.newLastName : '',
});

export { mapToDto };
