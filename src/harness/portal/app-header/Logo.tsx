import React from 'react';
import logo from '@assets/img/Logo.png';
import { Box as MuiBox, styled, Typography as MuiTypography } from '@mui/material';

const Box = styled(MuiBox)({
	display: 'flex',
	alignItems: 'center',
});

const Typography = styled(MuiTypography)(({ theme }) => ({
	color: theme.palette.common.white,
	fontWeight: theme.typography.fontWeightBold,
	minWidth: 250,
	[theme.breakpoints.down('sm')]: {
		display: 'none',
	},
}));

const Logo = () => {
	return (
		<Box>
			<img style={{ maxWidth: 25, marginRight: 13 }} src={logo} alt="logo" />
			<Typography variant="h2">Frontend education</Typography>
		</Box>
	);
};

export default Logo;
