import React from 'react';
import { TypeChips } from '@business/molecules/Chips';
import HeaderTable from '@business/molecules/HeaderTable';
import DataNotFoundBox from '@common/atoms/DataNotFoundBox';
import { usePagination } from '@common/hooks/usePagination';
import TableSkeleton from '@common/molecules/TableSkeleton';
import { ClientPreviewDto } from '@models/clients';
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
	refetch: () => void;
	// пропсы dataChips, deleteChips, deleteChip и openFilters в будущем будут обязательные(выполнение таски с филтрацией)
	dataChips?: TypeChips;
	deleteChips?: () => void;
	deleteChip?: (key: string) => void;
	openFilters?: () => void;
	isLoading?: boolean;
	openActionClient?: (client?: ClientPreviewDto) => void;
};

const BasicTable = <T, S>({
	columns,
	data,
	navigateToCard,
	refetch,
	deleteChips,
	deleteChip,
	openFilters,
	dataChips,
	openActionClient,
	isLoading,
}: Props<T, S>) => {
	const { page, rowsPerPage, currentItems, handleChangePage, handleChangeRowsPerPage } = usePagination(data);

	const table = useReactTable({ data: currentItems, columns, getCoreRowModel: getCoreRowModel() });

	const emptyData =
		// в будущем от проверки на dataChips && deleteChips планирую избавиться(выполнение таски с фильтрацией)
		dataChips && deleteChips && dataChips?.length > 0 ? (
			<DataNotFoundBox
				onUpdate={() => deleteChips()}
				textButton="Сбросить филтры"
				title="Список заявок пуст. Приходите позже"
			/>
		) : (
			<DataNotFoundBox onUpdate={refetch} textButton="Обновить" title="Список заявок пуст. Приходите позже" />
		);

	const bodyTable = !data.length ? (
		<TableRow style={{ height: '60vh' }}>
			<TableCell colSpan={6} style={{ padding: '10px 0 0 0' }}>
				{emptyData}
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
	);

	return (
		<Box>
			{dataChips && ( // проверка на dataChips также уйдет(выполнение таски с фильтрацией)
				<HeaderTable
					dataChips={dataChips!}
					deleteChips={deleteChips!}
					deleteChip={deleteChip!}
					openFilters={openFilters!}
					openActionClient={openActionClient}
				/>
			)}
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
				<tbody>{isLoading ? <TableSkeleton countItems={rowsPerPage} /> : bodyTable}</tbody>
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
