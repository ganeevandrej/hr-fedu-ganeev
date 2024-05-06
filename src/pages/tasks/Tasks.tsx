import React from 'react';
import BasicTable from '@business/organisms/BasicTable';
import LoaderBox from '@common/atoms/LoaderBox';
import useNavigateToCard from '@common/hooks/navigateToCard';
import { AdminTaskPreviewDto, ExecutorTaskPreviewDto, isAdminTaskArray, TasksStatuses } from '@models/tasks';
import { Box as MuiBox, styled, Typography as MuiTypography } from '@mui/material';
import { ColumnDef } from '@tanstack/table-core';
import adminTasksTableColumns from './adminTasksTableColumns';
import mapExecutorTasksFromDto from './executorTasksMapper';
import executorTasksTableColumns from './executorTasksTableColumns';

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
	const isLoading = false;

	const tasksTable = isAdminTaskArray(data) ? (
		<BasicTable data={data} columns={adminTasksTableColumns as AdminTasksColumnsType} navigateToCard={navigateToCard} />
	) : (
		<BasicTable
			data={mapExecutorTasksFromDto(data)}
			columns={executorTasksTableColumns as ExecutorTasksColumnsType}
			navigateToCard={navigateToCard}
		/>
	);

	return (
		<Box>
			{isLoading ? (
				<LoaderBox />
			) : (
				<>
					<Typography variant="h1">Заявки</Typography>
					{tasksTable}
				</>
			)}
		</Box>
	);
};

export default Tasks;
