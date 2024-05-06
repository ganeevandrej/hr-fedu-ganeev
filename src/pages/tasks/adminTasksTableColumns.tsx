import React from 'react';
import StatusTypography from '@business/atoms/StatusTypography';
import { AdminTaskPreviewDto } from '@models/tasks';
import { Typography } from '@mui/material';
import { createColumnHelper } from '@tanstack/table-core';
import { formatDate } from '@utils/date/dateFormatting';
import { trimString } from '@utils/string/stringFormatting';

const columnHelper = createColumnHelper<AdminTaskPreviewDto>();

const adminTasksTableColumns = [
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
	columnHelper.accessor('preferablePrice', {
		size: 200,
		header: () => <Typography variant="tableHeader">Желаемая стоимость работ, руб.</Typography>,
		cell: (info) => {
			const price = info.getValue();
			const displayPrice = price ? price.toFixed(2).replace('.', ',') : '';
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
		header: () => <Typography variant="tableHeader">Вид работ</Typography>,
		cell: (info) => <Typography noWrap>{trimString(info.getValue(), 35)}</Typography>,
	}),
];

export default adminTasksTableColumns;
