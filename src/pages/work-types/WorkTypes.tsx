import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useGetClientsQuery } from '@api/clients/clientsApi';
import LoaderBox from '@common/atoms/LoaderBox';
import { Box as MuiBox, styled, Typography as MuiTypography } from '@mui/material';

const Box = styled(MuiBox)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	width: '100vw',
	padding: theme.spacing(0, 5),
}));

const Typography = styled(MuiTypography)(({ theme }) => ({
	color: theme.palette.common.black,
	padding: theme.spacing(4, 0, 3.5, 1),
	fontFamily: 'InterBold',
}));

// TODO: нету реализации на макетах, решил сделать так

const WorkTypes = () => {
	const navigate = useNavigate();

	const { data, isLoading } = useGetClientsQuery({});

	useEffect(() => {
		if (data) {
			navigate('/tasks');
		}
	}, [data, navigate]);

	return isLoading ? (
		<LoaderBox />
	) : (
		<Box>
			<Typography variant="h1">Виды Работ</Typography>
		</Box>
	);
};

export default WorkTypes;
