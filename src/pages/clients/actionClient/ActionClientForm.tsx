import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CheckBoxInput from '@common/atoms/inputs/CheckBoxInput';
import DateInput from '@common/atoms/inputs/DateInput';
import SelectInput from '@common/atoms/inputs/SelectInput';
import TextInput from '@common/atoms/inputs/TextInput';
import CardTemplate from '@common/molecules/CardTemplate';
import { Grid } from '@mui/material';
import { cityOptions } from '../constants';
import { ActionClientRequestModel } from './ActionClientFormSetting';

const ActionClientForm = () => {
	const { control, watch } = useFormContext<ActionClientRequestModel>();

	const { hasNameChanged } = watch();

	return (
		<CardTemplate>
			<Grid container rowGap={6}>
				<Grid item xs={4}>
					<Controller
						name="firstName"
						control={control}
						render={({ field, fieldState }) => {
							return (
								<TextInput
									label="Фамилия"
									value={field.value || ''}
									onChange={field.onChange}
									helperText={fieldState.error?.message}
									error={Boolean(fieldState.error?.message)}
								/>
							);
						}}
					/>
				</Grid>
				<Grid item xs={4}>
					<Controller
						name="middleName"
						control={control}
						render={({ field, fieldState }) => {
							return (
								<TextInput
									label="Имя"
									value={field.value || ''}
									onChange={field.onChange}
									helperText={fieldState.error?.message}
									error={Boolean(fieldState.error?.message)}
								/>
							);
						}}
					/>
				</Grid>
				<Grid item xs={4}>
					<Controller
						name="lastName"
						control={control}
						render={({ field, fieldState }) => {
							return (
								<TextInput
									label="Отчество"
									value={field.value || ''}
									onChange={field.onChange}
									helperText={fieldState.error?.message}
									error={Boolean(fieldState.error?.message)}
								/>
							);
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<Controller
						name="hasNameChanged"
						control={control}
						render={({ field, fieldState }) => {
							return (
								<CheckBoxInput
									label="Менялось ли ФИО"
									value={field.value || false}
									onChange={field.onChange}
									error={fieldState.error?.message}
								/>
							);
						}}
					/>
				</Grid>
				{hasNameChanged && (
					<Grid container>
						<Grid item xs={4}>
							<Controller
								name="newFirstName"
								control={control}
								render={({ field, fieldState }) => {
									return (
										<TextInput
											label="Фамилия"
											value={field.value || ''}
											onChange={field.onChange}
											helperText={fieldState.error?.message}
											error={Boolean(fieldState.error?.message)}
										/>
									);
								}}
							/>
						</Grid>
						<Grid item xs={4}>
							<Controller
								name="newMiddleName"
								control={control}
								render={({ field, fieldState }) => {
									return (
										<TextInput
											label="Имя"
											value={field.value || ''}
											onChange={field.onChange}
											helperText={fieldState.error?.message}
											error={Boolean(fieldState.error?.message)}
										/>
									);
								}}
							/>
						</Grid>
						<Grid item xs={4}>
							<Controller
								name="newLastName"
								control={control}
								render={({ field, fieldState }) => {
									return (
										<TextInput
											label="Отчество"
											value={field.value || ''}
											onChange={field.onChange}
											helperText={fieldState.error?.message}
											error={Boolean(fieldState.error?.message)}
										/>
									);
								}}
							/>
						</Grid>
					</Grid>
				)}
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
				<Grid item xs={4}>
					<Controller
						name="birthDate"
						control={control}
						render={({ field, fieldState }) => {
							return (
								<DateInput
									label="Дата рождения"
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
						name="city"
						control={control}
						render={({ field, fieldState }) => {
							const value = field.value ? field.value : '';
							return (
								<SelectInput
									label="Город"
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
				<Grid container rowGap={6}>
					<Grid item xs={4}>
						<Controller
							name="phoneNumber"
							control={control}
							render={({ field, fieldState }) => {
								return (
									<TextInput
										label="Номер телефона"
										value={field.value || ''}
										onChange={field.onChange}
										helperText={fieldState.error?.message}
										error={Boolean(fieldState.error?.message)}
									/>
								);
							}}
						/>
					</Grid>
					<Grid item xs={4}>
						<Controller
							name="codeOSU"
							control={control}
							render={({ field, fieldState }) => {
								return (
									<TextInput
										label="Внутренний код OSU"
										value={field.value || ''}
										onChange={field.onChange}
										helperText={fieldState.error?.message}
										error={Boolean(fieldState.error?.message)}
									/>
								);
							}}
						/>
					</Grid>
					<Grid item xs={4}>
						<Controller
							name="inn"
							control={control}
							render={({ field, fieldState }) => {
								return (
									<TextInput
										label="ИНН"
										value={field.value || ''}
										onChange={field.onChange}
										helperText={fieldState.error?.message}
										error={Boolean(fieldState.error?.message)}
									/>
								);
							}}
						/>
					</Grid>
				</Grid>
			</Grid>
		</CardTemplate>
	);
};

export default ActionClientForm;
