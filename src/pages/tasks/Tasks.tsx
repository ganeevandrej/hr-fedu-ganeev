import React, { useState } from 'react';
import { useGetTasksQuery } from '@api/tasks/taskApi';
import BasicTable from '@business/organisms/BasicTable';
import LoaderBox from '@common/atoms/LoaderBox';
import useNavigateToCard from '@common/hooks/navigateToCard';
import { useErrorHandler } from '@common/hooks/useErrorHandler';
import Modal from '@common/molecules/Modal';
import { RoleType } from '@harness/navigation/Router';
import { AdminTaskPreviewDto, ExecutorTaskPreviewDto } from '@models/tasks';
import { Box as MuiBox, styled, Typography as MuiTypography } from '@mui/material';
import useAppSelector from '@store/hooks/useAppSelector';
import { sortTasks } from '@utils/sorting/sortTasks';
import TaskRejection from './task-rejection/TaskRejection';
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
	const [taskId, setTaskId] = useState('');
	const [openModalRejection, setOpenModalRejection] = useState(false);

	const openModal = (id: string) => {
		setTaskId(id);
		setOpenModalRejection(true);
	};

	const closeModal = () => setOpenModalRejection(false);

	const { data, isFetching, refetch, error } = useGetTasksQuery({});

	useErrorHandler(error);

	const tasksData = data || [];

	const isAdminTasks = isAdminTaskArray(tasksData, userRole);

	const tasksTable = isAdminTasks ? (
		<BasicTable
			data={sortTasks(tasksData, isAdminTasks)}
			columns={getAdminTasksTableColumns(workTypes)}
			navigateToCard={navigateToCard}
			refetch={refetch}
		/>
	) : (
		<BasicTable
			data={mapExecutorTasksFromDto(sortTasks(tasksData, isAdminTasks))}
			columns={getExecutorTasksTableColumns(workTypes, openModal)}
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
			<Modal width={635} onClose={closeModal} open={openModalRejection}>
				<TaskRejection taskId={taskId} onClose={closeModal} />
			</Modal>
		</Box>
	);
};

export default Tasks;
