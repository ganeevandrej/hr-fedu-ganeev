import React from 'react';
import { Box as MuiBox, Button, styled, Typography as MuiTypography } from '@mui/material';

const Box = styled(MuiBox)({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	height: '100%',
});

const Typography = styled(MuiTypography)(({ theme }) => ({
	color: theme.palette.common.black,
	maxWidth: 300,
	opacity: 0.5,
	height: 'fit-content',
	textAlign: 'center',
	fontFamily: 'InterBold',
}));

type Props = {
	title: string;
	onUpdate: () => void;
};

const DataNotFoundBox = ({ title, onUpdate }: Props) => {
	return (
		<Box>
			<Typography variant="h1">{title}</Typography>
			<Button
				sx={{
					marginTop: '30px',
				}}
				onClick={onUpdate}
				variant="contained"
				color="secondary"
				name={'Обновить'}
			>
				Обновить
			</Button>
		</Box>
	);
};

export default DataNotFoundBox;
