import { TypeChips } from '@business/molecules/Chips';
import { ClientsRequestDto } from '@models/clients';
import { ButtonPrefixes } from './constants';

const getClientsChips = (filters: ClientsRequestDto): TypeChips => {
	return Object.entries(filters).map(([key, value]) => {
		const keyObject = key as keyof ClientsRequestDto;
		const label =
			key === 'clientType'
				? `${ButtonPrefixes[keyObject]} ${value === 'premium' ? 'Да' : 'Нет'}`
				: `${ButtonPrefixes[keyObject]} ${value}`;
		return {
			label,
			key: keyObject,
		};
	});
};

export { getClientsChips };
