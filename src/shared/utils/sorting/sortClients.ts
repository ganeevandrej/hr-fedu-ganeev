import { ClientsPreviewDto } from '@models/clients';
import { sortClientTypes } from '@pages/tasks/constants';

/**
 * Сортировка клиентов;
 * По типу клиента: сначала заявки с типом клиента "Премиум", затем с типом клиента "Стандарт";
 * В рамках каждого типа клиента полное имя клиента по алфавиту;
 * @param clients Массив клиентов
 */
const sortClients = (clients: ClientsPreviewDto): ClientsPreviewDto => {
	return sortClientTypes.reduce((acc, sortValue) => {
		const filteredClients = clients.filter((task) => task.clientType === sortValue);
		const sortClients = filteredClients.sort((currentClient, nextClient) => {
			const currentName = currentClient.userFullName;
			const nextName = nextClient.userFullName;

			return currentName.localeCompare(nextName);
		});

		return [...acc, ...sortClients];
	}, [] as ClientsPreviewDto);
};

export { sortClients };
