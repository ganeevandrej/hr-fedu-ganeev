import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import MultilineTextInput from '@common/atoms/inputs/MultilineTextInput';
import SelectInput from '@common/atoms/inputs/SelectInput';
import CardTemplate from '@common/molecules/CardTemplate';
import { RejectTaskRequestDto } from '@models/tasks';
import { Grid } from '@mui/material';
import useAppSelector from '@store/hooks/useAppSelector';

const TaskRejectionForm = () => {
	const rejectReasons = useAppSelector((state) => state.dictionaries.rejectReasons);
	const { control } = useFormContext<RejectTaskRequestDto>();

	return (
		<CardTemplate title="Для отклонения заявки выберите причину">
			<Grid container rowGap={8} display="flex" justifyContent="space-between">
				<Grid item xs={6}>
					<Controller
						name="reason"
						control={control}
						render={({ field, fieldState }) => (
							<SelectInput
								label="Причина отклонения заявки"
								options={rejectReasons}
								value={field.value || ''}
								onChange={field.onChange}
								error={Boolean(fieldState.error?.message)}
								helperText={fieldState.error?.message}
							/>
						)}
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
