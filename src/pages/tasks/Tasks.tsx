import React from 'react';
import { useGetTasksQuery } from '@api/tasks/taskApi';
import BasicTable from '@business/organisms/BasicTable';
import LoaderBox from '@common/atoms/LoaderBox';
import useNavigateToCard from '@common/hooks/navigateToCard';
import { RoleType } from '@harness/navigation/Router';
import { AdminTaskPreviewDto, ExecutorTaskPreviewDto } from '@models/tasks';
import { Box as MuiBox, styled, Typography as MuiTypography } from '@mui/material';
import useAppSelector from '@store/hooks/useAppSelector';
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

type Props = {
	userRole: RoleType;
};

const Tasks = ({ userRole }: Props) => {
	const workTypes = useAppSelector((state) => state.dictionaries.workTypes);
	const navigateToCard = useNavigateToCard<ExecutorTaskPreviewDto | AdminTaskPreviewDto>('id');

	const { data, isFetching, refetch } = useGetTasksQuery({});

	const tasksData = data || [];

	const tasksTable = isAdminTaskArray(tasksData, userRole) ? (
		<BasicTable
			data={tasksData}
			columns={getAdminTasksTableColumns(workTypes)}
			navigateToCard={navigateToCard}
			refetch={refetch}
		/>
	) : (
		<BasicTable
			data={mapExecutorTasksFromDto(tasksData)}
			columns={getExecutorTasksTableColumns(workTypes)}
			navigateToCard={navigateToCard}
			refetch={refetch}
		/>
	);

	return isFetching ? (
		<LoaderBox />
	) : (
		<Box>
			<Typography variant="h1">Заявки</Typography>
			{tasksTable}
		</Box>
	);
};

export default Tasks;
