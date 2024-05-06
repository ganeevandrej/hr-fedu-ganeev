import React from 'react';
import { ClientTypes } from '@models/tasks';
import { Box as MuiBox, styled, Typography, useTheme } from '@mui/material';
import { clientTypesDictionary } from '@pages/tasks/constants';

const Box = styled(MuiBox)(({ theme }) => ({
	width: 'fit-content',
	padding: theme.spacing(1, 3),
	borderRadius: theme.spacing(5),
	color: theme.palette.common.white,
}));

type ColorsMap = Map<ClientTypes, string>;

type Props = {
	type: ClientTypes;
	isExpiring?: boolean;
};

const ClientTypeTypography = ({ type, isExpiring }: Props) => {
	const theme = useTheme();

	const colorsMap: ColorsMap = new Map([
		['standard', theme.palette.type.standard],
		['premium', theme.palette.type.premium],
	]);

	const color = isExpiring && type === 'standard' ? theme.palette.type.expiring : colorsMap.get(type);

	return (
		<Box sx={{ backgroundColor: color }}>
			<Typography variant="subtitle1" sx={{ fontFamily: 'InterMedium' }}>
				{clientTypesDictionary[type]}
			</Typography>
		</Box>
	);
};

export default ClientTypeTypography;
