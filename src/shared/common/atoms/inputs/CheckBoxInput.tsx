import React from 'react';
import {
	Box as MuiBox,
	Checkbox as MuiCheckbox,
	checkboxClasses,
	FormControlLabel,
	FormHelperText as MuiFormHelperText,
	InputProps,
	styled,
} from '@mui/material';

const Box = styled(MuiBox)(({ theme }) => ({
	fontSize: theme.typography.h4.fontSize,
}));

const Checkbox = styled(MuiCheckbox)(({ theme }) => ({
	color: theme.palette.secondary.main,
	[`& .${checkboxClasses.root}`]: {
		width: '25px',
		height: '25px',
		color: theme.palette.secondary.main,
		[`& .${checkboxClasses.checked}`]: {
			color: theme.palette.common.black,
		},
	},
}));

const FormHelperText = styled(MuiFormHelperText)(({ theme }) => ({
	width: '80%',
	overflowWrap: 'break-word',
	fontSize: theme.typography.h6.fontSize,
	margin: theme.spacing(0),
	paddingTop: theme.spacing(1),
	color: theme.palette.error.main,
}));

interface CheckBoxInputProps extends Omit<InputProps, 'value' | 'error' | 'label'> {
	value: boolean;
	label?: string;
	error?: string;
}

const CheckBoxInput = ({ value, label, error, onChange }: CheckBoxInputProps) => {
	return (
		<Box>
			<FormControlLabel control={<Checkbox checked={value} onChange={onChange} color="secondary" />} label={label} />
			<FormHelperText>{error}</FormHelperText>
		</Box>
	);
};

export default CheckBoxInput;
