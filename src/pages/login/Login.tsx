import React, { useEffect, useState } from 'react';
import { FormProvider, Resolver, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useGetAuthQuery, useLoginMutation } from '@api/auth/authApi';
import Logo from '@assets/img/Logo.png';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { LoginRequestDto } from '@models/auth';
import { Box as MuiBox, CssBaseline, styled, Typography } from '@mui/material';
import LoginForm from './LoginForm';
import { useLoginSchema } from './LoginFormSetting';

const ContainerLogo = styled(MuiBox)(({ theme }) => ({
	width: theme.spacing(256),
	height: '100vh',
	display: 'flex',
	margin: 'auto',
	backgroundColor: theme.palette.background.paper,
}));

const ContainerForm = styled(MuiBox)(({ theme }) => ({
	width: theme.spacing(104),
	margin: 'auto',
	backgroundColor: theme.palette.background.default,
}));

const BlockLogo = styled(MuiBox)(({ theme }) => ({
	width: theme.spacing(113),
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	margin: 'auto',
}));

const Title = styled(Typography)(({ theme }) => ({
	fontSize: theme.spacing(17.5),
	marginTop: theme.spacing(9),
	textAlign: 'center',
	color: 'white',
	fontWeight: 700,
}));

const Login = () => {
	const [isAuth, setIsAuth] = useState(false);
	const navigate = useNavigate();

	const [login] = useLoginMutation();

	const { data } = useGetAuthQuery(undefined, { skip: !isAuth });

	useEffect(() => {
		if (data) {
			navigate('/tasks');
		}
	}, [data, navigate]);

	const { schema, defaultValues } = useLoginSchema();

	const formContext = useForm<LoginRequestDto>({
		defaultValues,
		mode: 'onSubmit',
		resolver: yupResolver(schema, undefined, { mode: 'async', raw: true }) as Resolver<LoginRequestDto>,
	});

	const handleSubmit = (data: LoginRequestDto) => {
		login({ body: data })
			.unwrap()
			.then(() => {
				setIsAuth(true);
			})
			.catch(() => {
				setIsAuth(false);
			});
	};

	return (
		<MuiBox display="flex">
			<CssBaseline />
			<ContainerLogo>
				<BlockLogo>
					<img src={Logo} alt="Logo" />
					<Title>Frontend education</Title>
				</BlockLogo>
			</ContainerLogo>
			<ContainerForm>
				<FormProvider {...formContext}>
					<form onSubmit={formContext.handleSubmit(handleSubmit)} id="login" name="login" noValidate>
						<LoginForm />
					</form>
				</FormProvider>
			</ContainerForm>
		</MuiBox>
	);
};

export default Login;
