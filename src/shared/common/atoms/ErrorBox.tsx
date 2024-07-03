import React from 'react';
import { Box as MuiBox, Button, styled, Typography as MuiTypography } from '@mui/material';

const Box = styled(MuiBox)({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	height: '100vh',
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
	onClick: () => void;
};

const ErrorBox = ({ title, onClick }: Props) => {
	const handleClick = () => {
		onClick();
	};

	return (
		<Box>
			<Typography variant="h1">{title}</Typography>
			<Button
				sx={{
					marginTop: '40px',
				}}
				onClick={handleClick}
				variant="contained"
				color="secondary"
				name={'Обновить'}
			>
				Попробовать снова
			</Button>
		</Box>
	);
};

export default ErrorBox;
