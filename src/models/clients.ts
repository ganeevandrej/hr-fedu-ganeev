import { ClientTypes } from './tasks';

type ClientPreviewDto = {
	id: string;
	clientType: ClientTypes;
	userFullName: string;
	phoneNumber: string;
	city: string;
};

type ClientsPreviewDto = ClientPreviewDto[];

type ClientsRequestDto = {
	city?: string;
	clientType?: ClientTypes;
};

// объединение AddClientRequestDto и EditClientRequestDto, так как они одинаковые
type ActionClientRequestDto = {
	id: string;
	firstName: string;
	middleName: string;
	lastName: string;
	hasNameChanged: boolean;
	clientType: ClientTypes;
	birthDate: string;
	city: string;
	phoneNumber: string;
	codeOSU: string;
	inn: string;
	newFirstName?: string;
	newMiddleName?: string;
	newLastName?: string;
};

export { ActionClientRequestDto, ClientPreviewDto, ClientsPreviewDto, ClientsRequestDto };
