import React from 'react';
import { Box as MuiBox, CircularProgress, styled } from '@mui/material';

const Box = styled(MuiBox)({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	height: '100%',
});

const LoaderBox = () => {
	return (
		<Box>
			<CircularProgress color="secondary" />
		</Box>
	);
};

export default LoaderBox;
