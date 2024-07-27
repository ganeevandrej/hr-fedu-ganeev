import React from 'react';
import { FormProvider, Resolver, useForm } from 'react-hook-form';
import { useTasksRejectMutation } from '@api/tasks/taskApi';
import PageTemplate from '@common/molecules/PageTemplate';
import { statesSnackbar } from '@harness/context/constants';
import { useSnackbar } from '@harness/context/snackbar';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import TaskRejectionForm from './TaskRejectionForm';
import { RejectTaskRequestModel, useRejectionTaskSchema } from './TaskRejectionFormSetting';
import { mapToDto } from './taskRejectionMapper';

type Props = {
	taskId: string;
	onClose: () => void;
};

const TaskRejection = ({ taskId, onClose }: Props) => {
	const [taskReject] = useTasksRejectMutation();
	const { schema, defaultValues } = useRejectionTaskSchema();
	const { showSnackbar } = useSnackbar();

	const { successRejection, validationError, technicalError } = statesSnackbar;

	const formContext = useForm<RejectTaskRequestModel>({
		defaultValues,
		mode: 'onSubmit',
		resolver: yupResolver(schema, undefined, { mode: 'async', raw: true }) as Resolver<RejectTaskRequestModel>,
	});

	const handleSubmit = (data: RejectTaskRequestModel) => {
		taskReject({
			id: taskId,
			body: mapToDto(data),
		})
			.unwrap()
			.then(() => {
				onClose();
				showSnackbar(successRejection);
			})
			.catch(() => showSnackbar(technicalError));
	};

	const handlerErrors = () => {
		showSnackbar(validationError);
	};

	return (
		<PageTemplate
			isFormDirty={true}
			title="Отклонение заявки"
			rejectButtonHandler={onClose}
			rejectButtonLabel="Отмена"
			submitButtonLabel="Отклонить"
			submitFormName="task-reject-card"
		>
			<FormProvider {...formContext}>
				<form
					onSubmit={formContext.handleSubmit(handleSubmit, handlerErrors)}
					id="task-reject-card"
					name="task-reject-card"
					noValidate
				>
					<TaskRejectionForm />
				</form>
			</FormProvider>
		</PageTemplate>
	);
};

export default TaskRejection;
