import React from 'react';
import BasicTable from '@business/organisms/BasicTable';
import useNavigateToCard from '@common/hooks/navigateToCard';
import { AdminTaskPreviewDto, ExecutorTaskPreviewDto, TasksStatuses } from '@models/tasks';
import { Box as MuiBox, styled, Typography as MuiTypography } from '@mui/material';
import { ColumnDef } from '@tanstack/table-core';
import { isAdminTaskArray } from './typeGuards/adminTypeGuards';
import getAdminTasksTableColumns from './adminTasksTableColumns';
import mapExecutorTasksFromDto from './executorTasksMapper';
import getExecutorTasksTableColumns from './executorTasksTableColumns';

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

type ExecutorTasksColumnsType = Array<ColumnDef<ExecutorTaskPreviewDto, ClientTypes>>;

type AdminTasksColumnsType = Array<ColumnDef<AdminTaskPreviewDto, TasksStatuses>>;

const Tasks = () => {
	const navigateToCard = useNavigateToCard<ExecutorTaskPreviewDto | AdminTaskPreviewDto>('id');

	/* eslint-disable @typescript-eslint/no-explicit-any */
	const data: any = [];

	const tasksTable = isAdminTaskArray(data) ? (
		<BasicTable
			data={data}
			columns={getAdminTasksTableColumns() as AdminTasksColumnsType}
			navigateToCard={navigateToCard}
		/>
	) : (
		<BasicTable
			data={mapExecutorTasksFromDto(data)}
			columns={getExecutorTasksTableColumns() as ExecutorTasksColumnsType}
			navigateToCard={navigateToCard}
		/>
	);

	return (
		<Box>
			<Typography variant="h1">Заявки</Typography>
			{tasksTable}
		</Box>
	);
};

export default Tasks;
