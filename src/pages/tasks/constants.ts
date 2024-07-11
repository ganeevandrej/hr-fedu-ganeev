import { ClientTypes, TasksStatuses } from '@models/tasks';

type ClientTypesDictionaryType = Record<ClientTypes, string>;

const clientTypesDictionary: ClientTypesDictionaryType = {
	standard: 'Стандарт',
	premium: 'Премиум',
};

const sortStatuses: Array<TasksStatuses> = ['rejected', 'unassigned'];
const sortClientTypes: Array<ClientTypes> = ['premium', 'standard'];

export { clientTypesDictionary, sortStatuses, sortClientTypes };
