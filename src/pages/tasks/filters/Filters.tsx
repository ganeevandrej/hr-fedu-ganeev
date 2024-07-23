import React from 'react';
import { FormProvider, Resolver, useForm } from 'react-hook-form';
import PageTemplate from '@common/molecules/PageTemplate';
import { RoleType } from '@harness/navigation/Router';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import FiltersForm from './FiltersForm';
import { TasksRequestModel, useTasksFiltersSchema } from './FiltersFormSetting';

type Props = {
	onClose: () => void;
	setFilters: (filters: TasksRequestModel) => void;
	role: RoleType;
};

const Filters = ({ onClose, setFilters, role }: Props) => {
	const { schema, defaultValues } = useTasksFiltersSchema();

	const formContext = useForm<TasksRequestModel>({
		defaultValues,
		mode: 'onSubmit',
		resolver: yupResolver(schema, undefined, { mode: 'async', raw: true }) as Resolver<TasksRequestModel>,
	});

	const handleSubmit = (filters: TasksRequestModel) => {
		setFilters(filters);
		onClose();
	};

	return (
		<PageTemplate
			title="Параметры фильтра"
			rejectButtonHandler={onClose}
			rejectButtonLabel="Отмена"
			submitFormName="task-filters-card"
			submitButtonLabel="Применить"
			isFormDirty={true}
		>
			<FormProvider {...formContext}>
				<form
					onSubmit={formContext.handleSubmit(handleSubmit)}
					id="task-filters-card"
					name="task-filters-card"
					noValidate
				>
					<FiltersForm role={role} />
				</form>
			</FormProvider>
		</PageTemplate>
	);
};

export default Filters;
