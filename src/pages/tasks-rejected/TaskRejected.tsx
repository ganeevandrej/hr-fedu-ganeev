import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTaskByIdQuery, useTasksArchiveMutation, useTasksReturnMutation } from '@api/tasks/taskApi';
import LoaderBox from '@common/atoms/LoaderBox';
import { useErrorHandler } from '@common/hooks/useErrorHandler';
import PageTemplate from '@common/molecules/PageTemplate';
import { statesSnackbar } from '@harness/context/constants';
import { useSnackbar } from '@harness/context/snackbar';
import { Breadcrumb } from '@models/breadCrumbs';
import { Grid } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';
import TaskRejectedCause from './TaskRejectedCause';
import TaskRejectedGeneral from './TaskRejectedGeneral';

const breadcrumbsData: Breadcrumb[] = [{ label: 'Заявки', to: '/tasks' }];

const TaskRejected = () => {
	const params = useParams();
	const navigate = useNavigate();
	const { showSnackbar } = useSnackbar();

	const { successReturn, successArchive, technicalError } = statesSnackbar;

	const { data: taskData, isLoading, error } = useGetTaskByIdQuery(params.id ?? skipToken);

	useErrorHandler(error);

	const [tasksArchive] = useTasksArchiveMutation();
	const [tasksReturn] = useTasksReturnMutation();

	const archiveTask = () => {
		params.id &&
			tasksArchive(params.id)
				.unwrap()
				.then(() => {
					showSnackbar(successArchive);
					navigate('/tasks');
				})
				.catch(() => showSnackbar(technicalError));
	};

	const returnTask = () => {
		params.id &&
			tasksReturn(params.id)
				.unwrap()
				.then(() => {
					showSnackbar(successReturn);
					navigate('/tasks');
				})
				.catch(() => showSnackbar(technicalError));
	};

	return isLoading ? (
		<LoaderBox />
	) : (
		<PageTemplate
			title={`Заявка ${params.id || ''}`}
			breadcrumbsData={breadcrumbsData}
			isFormDirty={true}
			submitButtonHandler={returnTask}
			rejectButtonHandler={archiveTask}
			submitFormName="task-completion-card"
			rejectButtonLabel="Архивировать"
			submitButtonLabel="Вернуть исполнителю"
		>
			<Grid container rowGap={6}>
				<Grid item xs={12}>
					<TaskRejectedGeneral taskData={taskData} />
				</Grid>
				<Grid item xs={12}>
					<TaskRejectedCause taskData={taskData} />
				</Grid>
			</Grid>
		</PageTemplate>
	);
};

export default TaskRejected;
