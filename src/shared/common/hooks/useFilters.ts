import { useEffect, useState } from 'react';
import { ClientsRequestDto } from '@models/clients';

const useFilters = () => {
	const [filters, setFilters] = useState<ClientsRequestDto>({});
	const [openModalFilters, setOpenModalFilters] = useState(false);

	useEffect(() => {
		const savedFormData = sessionStorage.getItem('clientsFilters');

		if (savedFormData) {
			const formData: ClientsRequestDto = JSON.parse(savedFormData);
			setFilters(formData);
		}
	}, []);

	const openFilters = () => {
		setOpenModalFilters(true);
	};

	const closeFilters = () => {
		setOpenModalFilters(false);
	};

	const resetAllFilters = () => {
		sessionStorage.removeItem('clientsFilters');
		setFilters({});
	};

	const resetItemFilters = (key: string) => {
		if (key in filters) {
			const keyFilters = key as keyof ClientsRequestDto;
			setFilters((prevState) => {
				const newFilters = { ...prevState };
				delete newFilters[keyFilters];
				sessionStorage.setItem('clientsFilters', JSON.stringify(newFilters));
				return newFilters;
			});
		}
	};

	return { filters, setFilters, openModalFilters, openFilters, closeFilters, resetAllFilters, resetItemFilters };
};

export { useFilters };
