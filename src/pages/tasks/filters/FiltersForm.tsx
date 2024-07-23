import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import AmountInput from '@common/atoms/inputs/AmountInput';
import DateInput from '@common/atoms/inputs/DateInput';
import { RoleType } from '@harness/navigation/Router';
import { Box, Card as MuiCard, styled, Typography } from '@mui/material';
import { TasksRequestModel } from './FiltersFormSetting';

const Card = styled(MuiCard)(({ theme }) => ({
	borderRadius: theme.spacing(2.5),
	backgroundColor: theme.palette.common.white,
	padding: theme.spacing(3, 5, 7, 5),
	boxShadow: 'none',
	width: '100%',
}));

const HorizontalLine = styled(MuiCard)(({ theme }) => ({
	width: theme.spacing(13),
	height: '1px',
	backgroundColor: '#74767C',
	alignSelf: 'center',
	margin: theme.spacing(0, 2),
}));

type Props = {
	role: RoleType;
};

const FiltersForm = ({ role }: Props) => {
	const { control } = useFormContext<TasksRequestModel>();

	return (
		<Card>
			<Box>
				<Typography>{role === 'admin' ? 'Дата создания' : 'Крайний срок'}</Typography>
				<Box sx={{ display: 'flex' }}>
					<Controller
						name="startDate"
						control={control}
						render={({ field, fieldState }) => (
							<DateInput
								value={field.value || null}
								width="100%"
								placeholder="Дата с"
								onChange={field.onChange}
								error={fieldState.error?.message}
							/>
						)}
					/>
					<HorizontalLine />
					<Controller
						name="endDate"
						control={control}
						render={({ field, fieldState }) => {
							return (
								<DateInput
									value={field.value || null}
									placeholder="Дата по"
									width="100%"
									onChange={field.onChange}
									error={fieldState.error?.message}
								/>
							);
						}}
					/>
				</Box>
				<Box sx={{ marginTop: '24px' }}>
					<Typography>Желаемая стоимость</Typography>
					<Box sx={{ display: 'flex' }}>
						<Controller
							name="priceFrom"
							control={control}
							render={({ field, fieldState }) => {
								return (
									<AmountInput
										value={field.value || ''}
										placeholder="Стоимость с"
										width="100%"
										onChange={field.onChange}
										error={!!fieldState.error?.message}
										helperText={fieldState.error?.message}
									/>
								);
							}}
						/>
						<HorizontalLine />
						<Controller
							name="priceTo"
							control={control}
							render={({ field, fieldState }) => {
								return (
									<AmountInput
										value={field.value || null}
										placeholder="Стоимость по"
										onChange={field.onChange}
										width="100%"
										error={!!fieldState.error?.message}
										helperText={fieldState.error?.message}
									/>
								);
							}}
						/>
					</Box>
				</Box>
			</Box>
		</Card>
	);
};

export default FiltersForm;
