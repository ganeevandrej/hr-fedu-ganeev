import React from 'react';
import { useGetClientsQuery } from '@api/clients/clientsApi';
import BasicTable from '@business/organisms/BasicTable';
import { useActionClient } from '@common/hooks/useActionClient';
import { useErrorHandler } from '@common/hooks/useErrorHandler';
import { useFilters } from '@common/hooks/useFilters';
import Modal from '@common/molecules/Modal';
import { Box as MuiBox, styled, Typography as MuiTypography } from '@mui/material';
import { sortClients } from '@utils/sorting/sortClients';
import ActionClient from './actionClient/ActionClient';
import Filters from './filters/Filters';
import { getClientsChips } from './clientsChips';
import getClientsTableColumns from './clientsTableColumns';

const Box = styled(MuiBox)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	width: '100vw',
	padding: theme.spacing(0, 5),
}));

const Typography = styled(MuiTypography)(({ theme }) => ({
	color: theme.palette.common.black,
	padding: theme.spacing(4, 0, 3.5, 1),
	fontFamily: 'InterBold',
}));

const Clients = () => {
	const { client, openModalActionClient, openActionClient, closeActionClient } = useActionClient();

	const { filters, setFilters, openModalFilters, openFilters, closeFilters, resetAllFilters, resetItemFilters } =
		useFilters();

	const { data, isFetching, refetch, error } = useGetClientsQuery(filters);

	useErrorHandler(error);

	const clients = data || [];

	return (
		<Box>
			<Typography variant="h1">Клиенты</Typography>
			<BasicTable
				data={sortClients(clients)}
				columns={getClientsTableColumns(openActionClient)}
				refetch={refetch}
				isLoading={isFetching}
				deleteChips={resetAllFilters}
				deleteChip={resetItemFilters}
				dataChips={getClientsChips(filters)}
				openFilters={openFilters}
				openActionClient={openActionClient}
			/>
			<Modal open={openModalFilters} width={485} onClose={closeFilters}>
				<Filters setFilters={setFilters} closeFilters={closeFilters} />
			</Modal>
			<Modal open={openModalActionClient} width={1094} onClose={closeActionClient}>
				<ActionClient onClose={closeActionClient} client={client} />
			</Modal>
		</Box>
	);
};

export default Clients;
