import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import AmountInput from '@common/atoms/inputs/AmountInput';
import DateInput from '@common/atoms/inputs/DateInput';
import MultilineTextInput from '@common/atoms/inputs/MultilineTextInput';
import SelectInput from '@common/atoms/inputs/SelectInput';
import CardTemplate from '@common/molecules/CardTemplate';
import { CompleteTaskRequestModel } from '@models/tasks';
import { Grid } from '@mui/material';
import { RootState } from '@store/store';

const TaskCompletionForm = () => {
	const workTypes = useSelector((state: RootState) => state.dictionaries.workTypes);
	const { control } = useFormContext<CompleteTaskRequestModel>();

	return (
		<Grid container rowGap={6} display="flex" justifyContent="space-between">
			<CardTemplate title="Учет работ">
				<Grid container rowGap={5} display="flex" justifyContent="space-between">
					<Grid item xs={4}>
						<Controller
							name="workType"
							control={control}
							render={({ field }) => {
								return (
									<SelectInput
										label="Фактический вид работ"
										options={workTypes}
										value={field.value}
										onChange={field.onChange}
									/>
								);
							}}
						/>
					</Grid>
					<Grid item xs={4}>
						<Controller
							name="workPrice"
							control={control}
							render={({ field }) => {
								return <AmountInput value={field.value} label="Стоимость оказанных услуг" onChange={field.onChange} />;
							}}
						/>
					</Grid>
					<Grid item xs={4}>
						<Controller
							name="completeDate"
							control={control}
							render={({ field, fieldState }) => {
								return (
									<DateInput
										label="Дата исполнения заявки"
										value={field.value}
										onChange={field.onChange}
										error={fieldState.error?.message}
									/>
								);
							}}
						/>
					</Grid>
				</Grid>
			</CardTemplate>
			<Grid item xs={12}>
				<CardTemplate title="Комментарий">
					<Controller
						name="comment"
						control={control}
						render={({ field }) => {
							return <MultilineTextInput value={field.value} onChange={field.onChange} />;
						}}
					/>
				</CardTemplate>
			</Grid>
		</Grid>
	);
};

export default TaskCompletionForm;
