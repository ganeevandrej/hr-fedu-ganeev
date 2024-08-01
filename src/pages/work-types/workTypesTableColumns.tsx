import React from 'react';
import ClientTypeTypography from '@business/atoms/ClientTypeTypography';
import EditButton from '@common/atoms/EditButton';
import { ClientPreviewDto } from '@models/clients';
import { ClientTypes } from '@models/tasks';
import { Box as MuiBox, styled, Typography } from '@mui/material';
import { ColumnDef, createColumnHelper } from '@tanstack/table-core';
import { toFormatPhone } from '@utils/phone/toFormatPhone';

const Box = styled(MuiBox)({
	display: 'flex',
	justifyContent: 'flex-end',
});

type ClientsColumnsType = ColumnDef<ClientPreviewDto, ClientTypes>[];

const columnHelper = createColumnHelper<ClientPreviewDto>();

const getClientsTableColumns = (openEditClient: (client?: ClientPreviewDto) => void): ClientsColumnsType => {
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
				return <ClientTypeTypography type={info.getValue()} />;
			},
		}),
		columnHelper.accessor((data) => String(data.userFullName), {
			id: 'userFullName',
			size: 400,
			header: () => <Typography variant="tableHeader">ФИО</Typography>,
			cell: (info) => <Typography>{info.getValue() || '--'}</Typography>,
		}),
		columnHelper.accessor('phoneNumber', {
			size: 200,
			header: () => <Typography variant="tableHeader">Телефон</Typography>,
			cell: (info) => <Typography>{toFormatPhone(info.getValue()) || '--'}</Typography>,
		}),
		columnHelper.accessor('city', {
			size: 250,
			header: () => <Typography variant="tableHeader">Город</Typography>,
			cell: (info) => <Typography>{info.getValue() || '--'}</Typography>,
		}),
		columnHelper.accessor((data) => String(data.id), {
			id: 'editClient',
			size: 100,
			header: '',
			cell: (info) => {
				const client = info.row.original;
				return (
					<Box>
						<EditButton handleClick={() => openEditClient(client)} />
					</Box>
				);
			},
		}),
	];
};

export default getClientsTableColumns;
