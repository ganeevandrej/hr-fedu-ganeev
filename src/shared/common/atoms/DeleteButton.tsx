import React from 'react';
import BlockIcon from '@mui/icons-material/Block';
import { alpha, Button as MuiButton, styled } from '@mui/material';

const Button = styled(MuiButton)(({ theme }) => ({
	padding: theme.spacing(1),
	width: 30,
	minWidth: 30,
	height: 30,
	backgroundColor: theme.palette.button.delete,
	'&:hover': {
		backgroundColor: alpha(theme.palette.button.delete, 0.7),
	},
}));

const DeleteButton = () => {
	return (
		<Button disableTouchRipple>
			<BlockIcon fontSize="small" />
		</Button>
	);
};

export default DeleteButton;
