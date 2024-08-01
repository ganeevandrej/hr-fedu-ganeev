import React, { useEffect } from 'react';
import { FormProvider, Resolver, useForm } from 'react-hook-form';
import PageTemplate from '@common/molecules/PageTemplate';
import { statesSnackbar } from '@harness/context/constants';
import { useSnackbar } from '@harness/context/snackbar';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { ClientsRequestDto } from '@models/clients';
import FiltersForm from './FiltersForm';
import { useFiltersSchema } from './FiltersFormSetting';

type Props = {
	setFilters: (data: ClientsRequestDto) => void;
	closeFilters: () => void;
};

const filterObject = <T extends object>(filters: T): T => {
	return Object.entries(filters).reduce((acc, [key, value]) => {
		const keyObject = key as keyof T;
		if (value) {
			acc[keyObject] = value;
		}
		return acc;
	}, {} as T);
};

const Filters = ({ setFilters, closeFilters }: Props) => {
	const { schema, defaultValues } = useFiltersSchema();
	const { showSnackbar } = useSnackbar();

	const { validationError } = statesSnackbar;

	const formContext = useForm<ClientsRequestDto>({
		defaultValues,
		mode: 'onSubmit',
		resolver: yupResolver(schema, undefined, { mode: 'async', raw: true }) as Resolver<ClientsRequestDto>,
	});

	const {
		watch,
		setValue,
		formState: { isDirty },
	} = formContext;

	useEffect(() => {
		const savedFormData = sessionStorage.getItem('clientsFilters');

		if (savedFormData) {
			const formData: ClientsRequestDto = JSON.parse(savedFormData);
			const keysFormData: Array<keyof ClientsRequestDto> = Object.keys(formData) as Array<keyof ClientsRequestDto>;

			keysFormData.forEach((field) => {
				const isDirtyField = Boolean(formData[field]);
				setValue(field, formData[field], { shouldDirty: isDirtyField });
			});
		}
	}, [setValue]);

	useEffect(() => {
		const subscription = watch((value) => {
			sessionStorage.setItem('clientsFilters', JSON.stringify(filterObject(value)));
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	const handleSubmit = (data: ClientsRequestDto) => {
		setFilters(filterObject(data));
		closeFilters();
	};

	const handlerErrors = () => {
		showSnackbar(validationError);
	};

	return (
		<PageTemplate
			isFormDirty={isDirty}
			title="Параметры Фильтра"
			rejectButtonHandler={closeFilters}
			rejectButtonLabel="Отмена"
			submitButtonLabel="Применить"
			submitFormName="filters-clients"
		>
			<FormProvider {...formContext}>
				<form
					onSubmit={formContext.handleSubmit(handleSubmit, handlerErrors)}
					id="filters-clients"
					name="filters-clients"
					noValidate
				>
					<FiltersForm />
				</form>
			</FormProvider>
		</PageTemplate>
	);
};

export default Filters;
