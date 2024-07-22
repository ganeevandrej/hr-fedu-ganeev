import React from 'react';
import { FormProvider, Resolver, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTaskByIdQuery, useTasksCompleteMutation } from '@api/tasks/taskApi';
import LoaderBox from '@common/atoms/LoaderBox';
import { useErrorHandler } from '@common/hooks/useErrorHandler';
import PageTemplate from '@common/molecules/PageTemplate';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Breadcrumb } from '@models/breadCrumbs';
import { Grid } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';
import TaskCompletionForm from './TaskCompletionForm';
import { CompleteTaskRequestModel, useCompleteTaskSchema } from './taskCompletionFormSettings';
import TaskCompletionGeneral from './TaskCompletionGeneral';
import { mapToDto } from './taskCompletionMapper';

const breadcrumbsData: Breadcrumb[] = [{ label: 'Заявки', to: '/tasks' }];

const TaskCompletion = () => {
	const params = useParams();
	const navigate = useNavigate();

	const { data: taskData, isLoading, error } = useGetTaskByIdQuery(params.id ?? skipToken);

	useErrorHandler(error);

	const [tasksComplete] = useTasksCompleteMutation();
	const { schema, defaultValues } = useCompleteTaskSchema();

	const formContext = useForm<CompleteTaskRequestModel>({
		defaultValues,
		mode: 'onSubmit',
		resolver: yupResolver(schema, undefined, { mode: 'async', raw: true }) as Resolver<CompleteTaskRequestModel>,
	});

	const handleSubmit = (data: CompleteTaskRequestModel) => {
		tasksComplete({
			id: params.id || '',
			body: mapToDto(data),
		})
			.unwrap()
			.then(() => navigate('/tasks'))
			.catch(() => {});
	};

	return isLoading ? (
		<LoaderBox />
	) : (
		<PageTemplate
			title={`Заявка ${params.id || ''}`}
			breadcrumbsData={breadcrumbsData}
			isFormDirty={formContext.formState.isDirty}
			submitFormName="task-completion-card"
			submitButtonLabel="Завершить"
		>
			<FormProvider {...formContext}>
				<form
					noValidate
					id="task-completion-card"
					name="task-completion-card"
					onSubmit={formContext.handleSubmit(handleSubmit)}
				>
					<Grid container rowGap={6}>
						<Grid item xs={12}>
							<TaskCompletionGeneral taskData={taskData!} />
						</Grid>
						<Grid item xs={12}>
							<TaskCompletionForm />
						</Grid>
					</Grid>
				</form>
			</FormProvider>
		</PageTemplate>
	);
};

export default TaskCompletion;
