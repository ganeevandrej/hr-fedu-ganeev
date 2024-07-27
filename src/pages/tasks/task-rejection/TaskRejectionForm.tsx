import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import MultilineTextInput from '@common/atoms/inputs/MultilineTextInput';
import SelectInput from '@common/atoms/inputs/SelectInput';
import CardTemplate from '@common/molecules/CardTemplate';
import { Grid } from '@mui/material';
import useAppSelector from '@store/hooks/useAppSelector';
import { RejectTaskRequestModel } from './TaskRejectionFormSetting';

const TaskRejectionForm = () => {
	const rejectReasons = useAppSelector((state) => state.dictionaries.rejectReasons);
	const { control } = useFormContext<RejectTaskRequestModel>();

	return (
		<CardTemplate title="Для отклонения заявки выберите причину">
			<Grid container rowGap={8} display="flex" justifyContent="space-between">
				<Grid item xs={6}>
					<Controller
						name="reason"
						control={control}
						render={({ field, fieldState }) => {
							const value = field.value ? field.value.value : '';
							return (
								<SelectInput
									label="Причина отклонения заявки"
									options={rejectReasons}
									value={value}
									onChange={(e) => {
										const selectedReason = rejectReasons.find(({ value }) => value === e.target.value);
										field.onChange({ code: selectedReason?.code, value: selectedReason?.value });
									}}
									error={Boolean(fieldState.error?.message)}
									helperText={fieldState.error?.message}
								/>
							);
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<Controller
						name="comment"
						control={control}
						render={({ field, fieldState }) => {
							return (
								<MultilineTextInput
									value={field.value}
									helperText={fieldState.error?.message}
									label="Комментарий"
									error={Boolean(fieldState.error)}
									onChange={field.onChange}
								/>
							);
						}}
					/>
				</Grid>
			</Grid>
		</CardTemplate>
	);
};

export default TaskRejectionForm;
