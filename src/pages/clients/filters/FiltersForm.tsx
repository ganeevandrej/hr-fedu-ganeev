import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CheckBoxInput from '@common/atoms/inputs/CheckBoxInput';
import SelectInput from '@common/atoms/inputs/SelectInput';
import CardTemplate from '@common/molecules/CardTemplate';
import { ClientsRequestDto } from '@models/clients';
import { Grid } from '@mui/material';
import { cityOptions } from '../constants';

const FiltersForm = () => {
	const { control } = useFormContext<ClientsRequestDto>();

	return (
		<CardTemplate>
			<Grid container rowGap={8} display="flex" justifyContent="space-between">
				<Grid item xs={12}>
					<Controller
						name="city"
						control={control}
						render={({ field, fieldState }) => {
							const value = field.value ? field.value : '';
							return (
								<SelectInput
									label="Города"
									width="100%"
									options={cityOptions}
									value={value}
									onChange={field.onChange}
									error={Boolean(fieldState.error?.message)}
									helperText={fieldState.error?.message}
								/>
							);
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<Controller
						name="clientType"
						control={control}
						render={({ field, fieldState }) => {
							return (
								<CheckBoxInput
									label="Премиум"
									value={field.value === 'premium'}
									onChange={() => {
										if (field.value) {
											field.onChange(field.value === 'standard' ? 'premium' : 'standard');
										} else {
											field.onChange('premium');
										}
									}}
									error={fieldState.error?.message}
								/>
							);
						}}
					/>
				</Grid>
			</Grid>
		</CardTemplate>
	);
};

export default FiltersForm;
