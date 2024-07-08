import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useGetTaskByIdQuery } from '@api/tasks/taskApi';
import { BreadcrumbItem } from '@common/atoms/BreadCrumbs';
import LoaderBox from '@common/atoms/LoaderBox';
import PageTemplate from '@common/molecules/PageTemplate';
import { CompleteTaskRequestModel } from '@models/tasks';
import { Grid } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';
import TaskCompletionForm from './TaskCompletionForm';
import { defaultValues } from './taskCompletionFormSettings';
import TaskCompletionGeneral from './TaskCompletionGeneral';

const breadcrumbsData: BreadcrumbItem[] = [{ label: 'Заявки', to: '/tasks' }];

const TaskCompletion = () => {
	const params = useParams();
	const { data: taskData, isLoading } = useGetTaskByIdQuery(params.id ?? skipToken);

	const formContext = useForm<CompleteTaskRequestModel>({
		defaultValues,
	});

	return isLoading ? (
		<LoaderBox />
	) : (
		<PageTemplate
			title={`Заявка ${params.id || ''}`}
			breadcrumbsData={breadcrumbsData}
			isFormDirty={formContext.formState.isDirty}
			submitFormName="task-completion-card"
			submitButtonLabel="Завершить"
			submitButtonHandler={() => {}}
		>
			<FormProvider {...formContext}>
				<form id="task-completion-card" name="task-completion-card" noValidate>
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
