import React from 'react';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { IconButton, styled, Typography as MuiTypography } from '@mui/material';
import { TablePaginationActionsProps } from '@mui/material/TablePagination/TablePaginationActions';

const Typography = styled(MuiTypography)(({ theme }) => ({
	marginLeft: theme.spacing(16),
	marginRight: theme.spacing(5),
}));

const TablePaginationActions = (props: TablePaginationActionsProps) => {
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, page + 1);
	};

	return (
		<>
			<Typography>
				{page + 1}/{Math.ceil(count / rowsPerPage)}
			</Typography>
			<IconButton onClick={handleBackButtonClick} disabled={page === 0}>
				<KeyboardArrowLeft />
			</IconButton>
			<IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
				<KeyboardArrowRight />
			</IconButton>
		</>
	);
};

export default TablePaginationActions;
