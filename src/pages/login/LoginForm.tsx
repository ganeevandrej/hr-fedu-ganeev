import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextInput from '@common/atoms/inputs/TextInput';
import { LoginRequestDto } from '@models/auth';
import { Box as MuiBox, Button, Card as MuiCard, Grid, styled } from '@mui/material';

const Card = styled(MuiCard)(({ theme }) => ({
	borderRadius: 10,
	backgroundColor: theme.palette.common.white,
	padding: theme.spacing(6, 6, 12, 6),
	boxShadow: 'none',
}));

const Box = styled(MuiBox)(({ theme }) => ({
	marginRight: theme.spacing(8),
	marginLeft: theme.spacing(8),
}));

const BlockSubmit = styled(MuiCard)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'flex-end',
	marginTop: theme.spacing(8),
}));

const LoginForm = () => {
	const { control } = useFormContext<LoginRequestDto>();

	return (
		<Box>
			<Card>
				<Grid container rowGap={11}>
					<Grid item xs={12}>
						<Controller
							name="login"
							control={control}
							render={({ field, fieldState }) => {
								return (
									<TextInput
										label="Логин"
										width="100%"
										value={field.value}
										onChange={field.onChange}
										error={!!fieldState.error?.message}
										helperText={fieldState.error?.message}
									/>
								);
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<Controller
							name="password"
							control={control}
							render={({ field, fieldState }) => {
								return (
									<TextInput
										label="Пароль"
										width="100%"
										type="password"
										value={field.value}
										onChange={field.onChange}
										error={!!fieldState.error?.message}
										helperText={fieldState.error?.message}
									/>
								);
							}}
						/>
					</Grid>
				</Grid>
			</Card>
			<BlockSubmit>
				<Button type="submit" variant="contained" color="secondary" form="login" name="login">
					Войти
				</Button>
			</BlockSubmit>
		</Box>
	);
};

export default LoginForm;
