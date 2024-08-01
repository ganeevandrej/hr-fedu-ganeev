import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { alpha, Button as MuiButton, styled } from '@mui/material';

const Button = styled(MuiButton)(({ theme }) => ({
	padding: theme.spacing(1),
	width: theme.spacing(7.5),
	minWidth: theme.spacing(7.5),
	height: theme.spacing(7.5),
	backgroundColor: theme.palette.button.delete,
	'&:hover': {
		backgroundColor: alpha(theme.palette.button.delete, 0.7),
	},
}));

type Props = {
	handleClick: () => void;
};

const EditButton = ({ handleClick }: Props) => {
	return (
		<Button disableTouchRipple>
			<EditIcon fontSize="small" onClick={handleClick} />
		</Button>
	);
};

export default EditButton;
