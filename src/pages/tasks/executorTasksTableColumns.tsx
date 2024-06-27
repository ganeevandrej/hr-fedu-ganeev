import React from 'react';
import ClientTypeTypography from '@business/atoms/ClientTypeTypography';
import DeleteButton from '@common/atoms/DeleteButton';
import { Dictionary } from '@models/dictionaries';
import { ClientTypes, ExecutorTaskModel } from '@models/tasks';
import { Box, Typography } from '@mui/material';
import { ColumnDef, createColumnHelper } from '@tanstack/table-core';
import { formatDate } from '@utils/date/dateFormatting';
import { getDictionaryValueByCode } from '@utils/dictionary/dictionaryParsing';
import { trimString } from '@utils/string/stringFormatting';

type ExecutorTasksColumnsType = ColumnDef<ExecutorTaskModel, ClientTypes>[];

const columnHelper = createColumnHelper<ExecutorTaskModel>();

const getExecutorTasksTableColumns = (workTypes: Dictionary[]): ExecutorTasksColumnsType => {
	return [
		columnHelper.accessor('id', {
			size: 100,
			header: () => <Typography variant="tableHeader">ID</Typography>,
			cell: (info) => <Typography noWrap>{info.getValue()}</Typography>,
		}),
		columnHelper.accessor('clientType', {
			size: 200,
			header: () => <Typography variant="tableHeader">Тип клиента</Typography>,
			cell: (info) => {
				const { isExpiring } = info.row.original;
				return <ClientTypeTypography type={info.getValue()} isExpiring={isExpiring} />;
			},
		}),
		columnHelper.accessor((data) => String(data.preferablePrice), {
			id: 'preferablePrice',
			size: 200,
			header: () => <Typography variant="tableHeader">Желаемая стоимость работ, руб.</Typography>,
			cell: (info) => {
				const price = info.getValue();
				const displayPrice = price ? Number(price).toFixed(2).replace('.', ',') : '';
				return <Typography>{displayPrice}</Typography>;
			},
		}),
		columnHelper.accessor('deadlineDate', {
			size: 200,
			header: () => <Typography variant="tableHeader">Крайний срок</Typography>,
			cell: (info) => {
				const { isExpiring } = info.row.original;
				return (
					<Typography variant={isExpiring ? 'expiring' : 'body1'}>{formatDate(new Date(info.getValue()))}</Typography>
				);
			},
		}),
		columnHelper.accessor('workType', {
			size: 250,
			header: () => <Typography variant="tableHeader">Вид работ</Typography>,
			cell: (info) => (
				<Typography noWrap>{trimString(getDictionaryValueByCode(workTypes, info.getValue()), 35)}</Typography>
			),
		}),
		columnHelper.accessor((data) => String(data.isExpiring), {
			id: 'isExpiring',
			size: 150,
			header: '',
			cell: () => (
				<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
					<DeleteButton />
				</Box>
			),
		}),
	];
};

export default getExecutorTasksTableColumns;
