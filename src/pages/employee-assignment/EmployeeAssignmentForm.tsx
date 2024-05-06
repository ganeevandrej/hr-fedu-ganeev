import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import AmountInput from '@common/atoms/inputs/AmountInput';
import DateInput from '@common/atoms/inputs/DateInput';
import PersonSearchInput from '@common/atoms/inputs/PersonSearchInput';
import CardTemplate from '@common/molecules/CardTemplate';
import { Grid } from '@mui/material';
import { EmployeeAssignmentRequestModel } from './employeeAssignmentFormSettings';

const EmployeeAssignmentForm = () => {
	const options = [
		{
			label: 'Петров Петр Петрович',
		},
		{
			label: 'Иванов Иванов Иванович',
		},
		{
			label: 'Дмитриев Дмитрий Дмитриевич',
		},
	];

	const { control } = useFormContext<EmployeeAssignmentRequestModel>();

	return (
		<CardTemplate title="Назначить исполнителя">
			<Grid container rowGap={8} display="flex" justifyContent="space-between">
				<Grid item xs={4}>
					<Controller
						name="userFullName"
						control={control}
						render={({ field, fieldState }) => (
							<PersonSearchInput
								value={field.value}
								options={options}
								label="ФИО исполнителя"
								onChange={field.onChange}
								error={!!fieldState.error?.message}
								helperText={fieldState.error?.message}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={4}>
					<Controller
						name="deadlineDate"
						control={control}
						render={({ field, fieldState }) => {
							return (
								<DateInput
									label="Крайний срок исполнения заявки"
									value={field.value || null}
									onChange={field.onChange}
									error={fieldState.error?.message}
								/>
							);
						}}
					/>
				</Grid>
				<Grid item xs={4}>
					<Controller
						name="minimalPrice"
						control={control}
						render={({ field, fieldState }) => {
							return (
								<AmountInput
									value={field.value || ''}
									label="Минимальная стоимость работ"
									onChange={field.onChange}
									error={!!fieldState.error?.message}
									helperText={fieldState.error?.message}
								/>
							);
						}}
					/>
				</Grid>
				<Grid item xs={4}>
					<Controller
						name="recommendedPrice"
						control={control}
						render={({ field, fieldState }) => {
							return (
								<AmountInput
									value={field.value || null}
									label="Рекомендуемая стоимость работ"
									onChange={field.onChange}
									error={!!fieldState.error?.message}
									helperText={fieldState.error?.message}
								/>
							);
						}}
					/>
				</Grid>
			</Grid>
		</CardTemplate>
	);
};

export default EmployeeAssignmentForm;
