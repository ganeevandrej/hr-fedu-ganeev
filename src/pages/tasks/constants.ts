import { ClientTypes } from '@models/tasks';

type ClientTypesDictionaryType = Record<ClientTypes, string>;

const clientTypesDictionary: ClientTypesDictionaryType = {
	standard: 'Стандарт',
	premium: 'Премиум',
};

export { clientTypesDictionary };
