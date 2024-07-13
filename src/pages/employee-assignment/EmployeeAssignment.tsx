import React, { useEffect } from 'react';
import { FormProvider, Resolver, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useGetTaskByIdQuery, useTasksAssignMutation } from '@api/tasks/taskApi';
import LoaderBox from '@common/atoms/LoaderBox';
import { useErrorHandler } from '@common/hooks/useErrorHandler';
import PageTemplate from '@common/molecules/PageTemplate';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Breadcrumb } from '@models/breadCrumbs';
import { Grid } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';
import EmployeeAssignmentForm from './EmployeeAssignmentForm';
import { EmployeeAssignmentRequestModel, useEmployeeAssignmentSchema } from './employeeAssignmentFormSettings';
import EmployeeAssignmentGeneral from './EmployeeAssignmentGeneral';
import { mapToDto, mapToEmployeeAssignmentRequestModel } from './employeeAssignmentMapper';

const breadcrumbsData: Breadcrumb[] = [{ label: 'Заявки', to: '/tasks' }];

const EmployeeAssignment = () => {
	const params = useParams();
	const navigate = useNavigate();

	const { data: taskData, isLoading, error } = useGetTaskByIdQuery(params.id ?? skipToken);

	useErrorHandler(error);

	const [taskAssign] = useTasksAssignMutation();

	const { schema, defaultValues } = useEmployeeAssignmentSchema();

	const formContext = useForm<EmployeeAssignmentRequestModel>({
		defaultValues,
		mode: 'onSubmit',
		resolver: yupResolver(schema, undefined, { mode: 'async', raw: true }) as Resolver<EmployeeAssignmentRequestModel>,
	});

	const {
		watch,
		setValue,
		formState: { isDirty },
	} = formContext;

	useEffect(() => {
		const savedFormData = sessionStorage.getItem('employeeForm');

		if (savedFormData) {
			const formData = mapToEmployeeAssignmentRequestModel(JSON.parse(savedFormData));
			const keysFormData: Array<keyof EmployeeAssignmentRequestModel> = Object.keys(formData) as Array<
				keyof EmployeeAssignmentRequestModel
			>;

			keysFormData.forEach((field) => {
				if (field !== 'createdDate') {
					const isDirtyField = Boolean(formData[field]);
					setValue(field, formData[field], { shouldDirty: isDirtyField });
				}
			});
		}
	}, [setValue]);

	useEffect(() => {
		const subscription = watch((value) => {
			sessionStorage.setItem('employeeForm', JSON.stringify(value));
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	const handleSubmit = (data: EmployeeAssignmentRequestModel) => {
		taskAssign({
			id: params.id || '',
			body: mapToDto(data),
		})
			.unwrap()
			.then(() => {
				sessionStorage.removeItem('employeeForm');
				navigate('/tasks');
			})
			.catch(() => {});
	};

	return isLoading ? (
		<LoaderBox />
	) : (
		<PageTemplate
			title={`Заявка ${params.id || ''}`}
			breadcrumbsData={breadcrumbsData}
			isFormDirty={isDirty}
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
