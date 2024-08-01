import React from 'react';
import { Box as MuiBox, Button as MuiButton, styled, Typography as MuiTypography } from '@mui/material';

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

const Button = styled(MuiButton)(({ theme }) => ({
	marginTop: theme.spacing(7.5),
}));

type Props = {
	title: string;
	textButton: string;
	onUpdate: () => void;
};

const DataNotFoundBox = ({ title, onUpdate, textButton }: Props) => {
	return (
		<Box>
			<Typography variant="h1">{title}</Typography>
			<Button onClick={onUpdate} variant="contained" color="secondary" name={textButton}>
				{textButton}
			</Button>
		</Box>
	);
};

export default DataNotFoundBox;
