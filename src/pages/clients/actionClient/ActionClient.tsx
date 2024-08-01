import React from 'react';
import { FormProvider, Resolver, useForm } from 'react-hook-form';
import { useAddClientMutation, useEditClientMutation } from '@api/clients/clientsApi';
import PageTemplate from '@common/molecules/PageTemplate';
import { statesSnackbar } from '@harness/context/constants';
import { useSnackbar } from '@harness/context/snackbar';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { ClientPreviewDto } from '@models/clients';
import ActionClientForm from './ActionClientForm';
import { ActionClientRequestModel, getDefaultValues, useActionClientSchema } from './ActionClientFormSetting';
import { mapToDto } from './actionClientMapper';

type Props = {
	client?: ClientPreviewDto;
	onClose: () => void;
};
// обединение двух форм(Добавление и редактирование клиента)
const ActionClient = ({ client, onClose }: Props) => {
	const [addClient] = useAddClientMutation();
	const [editClient] = useEditClientMutation();
	const { schema, defaultValues } = useActionClientSchema();
	const { showSnackbar } = useSnackbar();

	const { successAddClient, successEditClient, validationError, technicalError } = statesSnackbar;

	const formContext = useForm<ActionClientRequestModel>({
		defaultValues: client ? getDefaultValues(client) : defaultValues,
		mode: 'onSubmit',
		resolver: yupResolver(schema, undefined, { mode: 'async', raw: true }) as Resolver<ActionClientRequestModel>,
	});

	const handleAddClient = (data: ActionClientRequestModel) => {
		addClient(mapToDto(data))
			.unwrap()
			.then(() => {
				onClose();
				showSnackbar(successAddClient);
			})
			.catch(() => showSnackbar(technicalError));
	};

	const handleEditClient = (data: ActionClientRequestModel) => {
		editClient(mapToDto(data))
			.unwrap()
			.then(() => {
				onClose();
				showSnackbar(successEditClient);
			})
			.catch(() => showSnackbar(technicalError));
	};

	const handlerErrors = () => {
		showSnackbar(validationError);
	};

	const title = client ? 'Редактирование клиента' : 'Заведение клиента';
	const nameForm = client ? 'edit-client' : 'add-client';

	return (
		<PageTemplate
			isFormDirty={true}
			title={title}
			rejectButtonHandler={onClose}
			rejectButtonLabel="Отмена"
			submitButtonLabel="Применить"
			submitFormName={nameForm}
		>
			<FormProvider {...formContext}>
				<form
					onSubmit={formContext.handleSubmit(client ? handleEditClient : handleAddClient, handlerErrors)}
					id={nameForm}
					name={nameForm}
					noValidate
				>
					<ActionClientForm />
				</form>
			</FormProvider>
		</PageTemplate>
	);
};

export default ActionClient;
