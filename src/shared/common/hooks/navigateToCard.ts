import { useNavigate } from 'react-router';
import { Row } from '@tanstack/table-core';

const useNavigateToCard = <T extends object>(cardIdPathname: keyof T) => {
	const navigate = useNavigate();

	return (row: Row<T>) => {
		const { original } = row;

		const cardId = String(original[cardIdPathname]);

		if ('status' in original && original.status === 'rejected') {
			navigate(`${cardId}/rejected`);
		} else {
			navigate(cardId);
		}
	};
};

export default useNavigateToCard;
