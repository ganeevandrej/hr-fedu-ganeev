import React from 'react';
import {
	alpha,
	Box as MuiBox,
	formHelperTextClasses,
	iconButtonClasses,
	inputAdornmentClasses,
	inputBaseClasses,
	InputLabel as MuiInputLabel,
	styled,
	TextField as MuiTextField,
	TextFieldProps,
	Typography,
} from '@mui/material';

const Box = styled(MuiBox)({
	minHeight: 60,
});

const InputLabel = styled(MuiInputLabel)(({ theme }) => ({
	paddingBottom: theme.spacing(2.5),
	fontSize: theme.typography.h4.fontSize,
}));

const TextField = styled(MuiTextField)(({ theme }) => ({
	width: '80%',
	padding: 0,
	[`& .${inputBaseClasses.root}`]: {
		display: 'flex',
		justifyContent: 'center',
		padding: theme.spacing(0, 2),
		background: alpha(theme.palette.primary.main, 0.1),
		'&:hover': {
			'& fieldset': {
				borderColor: theme.palette.secondary.main,
			},
			[`& .${inputAdornmentClasses.root} .${iconButtonClasses.root}`]: {
				opacity: 1,
			},
		},
		[`& .${inputAdornmentClasses.positionEnd}`]: {
			[`& .${iconButtonClasses.root}`]: {
				height: 28,
				width: 28,
				opacity: 0,
			},
		},
		'& fieldset': {
			borderColor: theme.palette.secondary.main,
		},
		'&.Mui-focused fieldset': {
			borderColor: theme.palette.secondary.main,
		},
		'&.Mui-focused': {
			background: 'transparent',
			border: theme.palette.secondary.main,
		},
	},
	[`& .${inputBaseClasses.input}`]: {
		height: 40,
		padding: 0,
		paddingRight: theme.spacing(2),
		textOverflow: 'ellipsis',
	},
	[`& .${formHelperTextClasses.root}`]: {
		overflowWrap: 'break-word',
		fontSize: theme.typography.h6.fontSize,
		margin: 0,
		paddingTop: theme.spacing(1),
	},
}));

interface InputProps extends Omit<TextFieldProps, 'label' | 'disabled' | 'readOnly'> {
	label?: string;
	disabled?: boolean;
	readOnly?: boolean;
}

const TextInput = ({ label, readOnly, value, helperText, error, onChange }: InputProps) => {
	const readOnlyValue = typeof value === 'string' ? value : '--';

	return (
		<Box>
			<InputLabel>{label}</InputLabel>
			{readOnly ? (
				<Typography>{readOnlyValue}</Typography>
			) : (
				<TextField placeholder="Введите..." value={value} onChange={onChange} helperText={helperText} error={!!error} />
			)}
		</Box>
	);
};

export default TextInput;
