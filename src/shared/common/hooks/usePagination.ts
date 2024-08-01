import { useMemo, useState } from 'react';

const usePagination = <T>(data: T[]) => {
	const [page, setPage] = useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = useState<number>(10);

	const currentItems = useMemo(
		() => data.slice(page * rowsPerPage, (page + 1) * rowsPerPage),
		[data, rowsPerPage, page],
	);

	const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setRowsPerPage(Number(event.target.value));
		setPage(0);
	};

	return { page, rowsPerPage, currentItems, handleChangePage, handleChangeRowsPerPage };
};

export { usePagination };
