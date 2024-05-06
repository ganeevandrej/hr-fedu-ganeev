import { useNavigate } from 'react-router';
import { Row } from '@tanstack/table-core';

const useNavigateToCard = <T>(cardIdPathname: keyof T) => {
	const navigate = useNavigate();

	return (row: Row<T>) => {
		const { original } = row;

		const cardId = String(original[cardIdPathname]);

		navigate(cardId);
	};
};

export default useNavigateToCard;
