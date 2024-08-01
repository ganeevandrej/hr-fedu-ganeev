import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import StatusTypography from '@business/atoms/StatusTypography';
import { Dictionary } from '@models/dictionaries';
import { AdminTaskPreviewDto, TasksStatuses } from '@models/tasks';
import { Link, Typography } from '@mui/material';
import { ColumnDef, createColumnHelper } from '@tanstack/table-core';
import { formatDate } from '@utils/date/dateFormatting';
import { getDictionaryValueByCode } from '@utils/dictionary/dictionaryParsing';
import { trimString } from '@utils/string/stringFormatting';

type AdminTasksColumnsType = ColumnDef<AdminTaskPreviewDto, TasksStatuses>[];

const columnHelper = createColumnHelper<AdminTaskPreviewDto>();

const getAdminTasksTableColumns = (workTypes: Dictionary[]): AdminTasksColumnsType => {
	return [
		columnHelper.accessor('id', {
			size: 100,
			header: () => <Typography variant="tableHeader">ID</Typography>,
			cell: (info) => <Typography noWrap>{info.getValue()}</Typography>,
		}),
		columnHelper.accessor('status', {
			size: 200,
			header: () => <Typography variant="tableHeader">Статус</Typography>,
			cell: (info) => <StatusTypography status={info.getValue()} />,
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
		columnHelper.accessor('createdDate', {
			size: 200,
			header: () => <Typography variant="tableHeader">Дата создания заявки</Typography>,
			cell: (info) => <Typography>{formatDate(new Date(info.getValue()))}</Typography>,
		}),
		columnHelper.accessor('workType', {
			size: 250,
			header: () => (
				// Нету точной статистики по открытию страницы "Виды работ", поэтому добавил данный функционал
				<Link underline="hover" component={RouterLink} color="inherit" to="/workTypes">
					Вид работ
				</Link>
			),
			cell: (info) => (
				<Typography noWrap>{trimString(getDictionaryValueByCode(workTypes, info.getValue()), 35)}</Typography>
			),
		}),
	];
};

export default getAdminTasksTableColumns;
