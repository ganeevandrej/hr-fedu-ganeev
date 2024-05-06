import React from 'react';
import {
	Box as MuiBox,
	InputLabel as MuiInputLabel,
	styled,
	TextField as MuiTextField,
	TextFieldProps,
	Typography,
} from '@mui/material';

const Box = styled(MuiBox)({
	height: '100%',
});

const InputLabel = styled(MuiInputLabel)(({ theme }) => ({
	paddingBottom: theme.spacing(2.5),
	fontSize: theme.typography.h4.fontSize,
}));

const TextField = styled(MuiTextField)(({ theme }) => ({
	width: '100%',
	paddingBottom: theme.spacing(1),
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderColor: theme.palette.secondary.main,
		},
		'&:hover fieldset': {
			borderColor: theme.palette.secondary.main,
		},
		'&.Mui-focused fieldset': {
			border: `2px solid ${theme.palette.secondary.main}`,
			background: 'transparent',
		},
		'*::-webkit-scrollbar': {
			width: '0.4em',
		},
		'*::-webkit-scrollbar-thumb': {
			backgroundColor: theme.palette.secondary.main,
			borderRadius: theme.spacing(5),
		},
	},
	'& .MuiFormHelperText-root': {
		textAlign: 'right',
	},
}));

interface InputProps extends Omit<TextFieldProps, 'label' | 'disabled' | 'readOnly' | 'value'> {
	label?: string;
	disabled?: boolean;
	readOnly?: boolean;
	rows?: number;
	maxLength?: number;
	value?: string | null;
}

const MultilineTextInput = ({ label, readOnly, value, error, onChange, rows = 4, maxLength = 2000 }: InputProps) => {
	const readOnlyValue = typeof value === 'string' ? value : '--';

	return (
		<Box>
			{label && <InputLabel>{label}</InputLabel>}
			{readOnly ? (
				<Typography>{readOnlyValue}</Typography>
			) : (
				<TextField
					value={value}
					onChange={onChange}
					error={!!error}
					multiline
					rows={rows}
					inputProps={{ maxLength }}
					helperText={`${value?.length || '0'}/${maxLength}`}
				/>
			)}
		</Box>
	);
};

export default MultilineTextInput;
