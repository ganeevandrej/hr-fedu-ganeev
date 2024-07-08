import React from 'react';
import { FormProvider, Resolver, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useGetTaskByIdQuery, useTasksAssignMutation } from '@api/tasks/taskApi';
import LoaderBox from '@common/atoms/LoaderBox';
import PageTemplate from '@common/molecules/PageTemplate';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Breadcrumb } from '@models/breadCrunbs';
import { Grid } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';
import EmployeeAssignmentForm from './EmployeeAssignmentForm';
import { EmployeeAssignmentRequestModel, useEmployeeAssignmentSchema } from './employeeAssignmentFormSettings';
import EmployeeAssignmentGeneral from './EmployeeAssignmentGeneral';
import { mapToDto } from './employeeAssignmentMapper';

const breadcrumbsData: Breadcrumb[] = [{ label: 'Заявки', to: '/tasks' }];

const EmployeeAssignment = () => {
	const params = useParams();
	const navigate = useNavigate();

	const { data: taskData, isLoading } = useGetTaskByIdQuery(params.id ?? skipToken);

	const [taskAssign] = useTasksAssignMutation();

	const { schema, defaultValues } = useEmployeeAssignmentSchema();

	const formContext = useForm<EmployeeAssignmentRequestModel>({
		defaultValues,
		mode: 'onSubmit',
		resolver: yupResolver(schema, undefined, { mode: 'async', raw: true }) as Resolver<EmployeeAssignmentRequestModel>,
	});

	const handleSubmit = (data: EmployeeAssignmentRequestModel) => {
		taskAssign({
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
			submitFormName="employee-assignment-card"
			submitButtonLabel="Назначить"
		>
			<FormProvider {...formContext}>
				<form
					onSubmit={formContext.handleSubmit(handleSubmit)}
					id="employee-assignment-card"
					name="employee-assignment-card"
					noValidate
				>
					<Grid container rowGap={6}>
						<Grid item xs={12}>
							<EmployeeAssignmentGeneral taskData={taskData!} />
						</Grid>
						<Grid item xs={12}>
							<EmployeeAssignmentForm />
						</Grid>
					</Grid>
				</form>
			</FormProvider>
		</PageTemplate>
	);
};

export default EmployeeAssignment;
