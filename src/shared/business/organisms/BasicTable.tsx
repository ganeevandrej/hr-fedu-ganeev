import React, { useMemo, useState } from 'react';
import DataNotFoundBox from '@common/atoms/DataNotFoundBox';
import { Box as MuiBox, styled as styledMui, TablePagination } from '@mui/material';
import { ColumnDef, flexRender, getCoreRowModel, Row, useReactTable } from '@tanstack/react-table';
import styled from 'styled-components';
import TablePaginationActions from './TablePaginationActions';

const Box = styledMui(MuiBox)(({ theme }) => ({
	backgroundColor: theme.palette.common.white,
	height: 'fit-content',
	width: '100%',
	borderRadius: theme.spacing(2.5),
	padding: theme.spacing(3),
	paddingBottom: theme.spacing(6),
	marginBottom: theme.spacing(22),
}));

const Table = styled.table`
	border-spacing: 20;
	border-radius: 10px;
	height: fit-content;
	width: 100%;
	box-shadow: 0px 1px rgba(0, 0, 0, 0.329);
	border-collapse: collapse;
`;

const TableHeaderRow = styled.tr`
	border-bottom: 1px solid rgba(0, 0, 0, 0.329);
`;

const TableHeaderCell = styled.th`
	text-align: left;
	white-space: nowrap;
	padding: 16px 0 8px 12px;
`;

const TableCell = styled.td`
	padding: 12px;
	& > p {
		font-size: 14px;
	}
`;

const TableRow = styled.tr`
	border-bottom: 1px solid rgba(0, 0, 0, 0.329);
	&:last-child {
		border-bottom: none;
	}
`;

type Props<T, S> = {
	columns: Array<ColumnDef<T, S>>;
	data: T[];
	navigateToCard?: (row: Row<T>) => void;
};

const BasicTable = <T, S>({ columns, data, navigateToCard }: Props<T, S>) => {
	const [page, setPage] = useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = useState<number>(10);

	const currentItems = useMemo(
		() => data.slice(page * rowsPerPage, (page + 1) * rowsPerPage),
		[data, rowsPerPage, page],
	);

	const table = useReactTable({ data: currentItems, columns, getCoreRowModel: getCoreRowModel() });

	const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setRowsPerPage(Number(event.target.value));
		setPage(0);
	};

	return (
		<Box>
			<Table>
				{table.getHeaderGroups().map((headerGroup) => (
					<thead key={headerGroup.id}>
						<TableHeaderRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHeaderCell key={header.id}>
									{flexRender(header.column.columnDef.header, header.getContext())}
								</TableHeaderCell>
							))}
						</TableHeaderRow>
					</thead>
				))}
				<tbody>
					{!data || !data?.length ? (
						<TableRow style={{ height: '60vh' }}>
							<TableCell colSpan={6} style={{ padding: '10px 0 0 0' }}>
								<DataNotFoundBox title="Список заявок пуст. Приходите позже" />
							</TableCell>
						</TableRow>
					) : (
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id} onDoubleClick={() => navigateToCard && navigateToCard(row)}>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										style={{
											width: cell.column.getSize(),
										}}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					)}
				</tbody>
			</Table>
			{data.length > 0 && (
				<TablePagination
					component="div"
					rowsPerPageOptions={[5, 10, 15]}
					labelRowsPerPage="Строк на странице"
					labelDisplayedRows={({ from, to, count }) => `${from}–${to} из ${count}`}
					count={data.length}
					page={page}
					onPageChange={handleChangePage}
					rowsPerPage={rowsPerPage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					ActionsComponent={TablePaginationActions}
				/>
			)}
		</Box>
	);
};

export default BasicTable;
