import React from 'react';
import { NumericFormatProps, PatternFormat } from 'react-number-format';
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
import theme from '@styles/theme';

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
		lineHeight: 0,
		justifyContent: 'center',
		padding: `0 ${theme.spacing(2)}`,
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

const maskedInputStyles = {
	width: '80%',
	[`& .${inputBaseClasses.root}`]: {
		'& .MuiInputBase-input.Mui-disabled': {
			WebkitTextFillColor: theme.palette.common.black,
			lineHeight: 1,
			color: theme.palette.common.black,
		},
		display: 'flex',
		justifyContent: 'center',
		padding: `0`,
		background: 'transparent',
		'&:hover': {
			'& fieldset': {
				border: 'none',
			},
		},
		'& fieldset': {
			border: 'none',
		},
		'&.Mui-focused fieldset': {
			border: 'none',
		},
		'&.Mui-focused': {
			background: 'transparent',
			border: 'none',
		},
	},
	[`& .${inputBaseClasses.input}`]: {
		height: 24,
		padding: 0,
		paddingRight: 0,
		textOverflow: 'ellipsis',
	},
	[`& .${inputBaseClasses.disabled}`]: {
		background: 'transparent',
		padding: 0,
		paddingRight: 0,
		textOverflow: 'ellipsis',
	},
	[`& .${formHelperTextClasses.root}`]: {
		overflowWrap: 'break-word',
		fontSize: theme.typography.h6.fontSize,
		margin: 0,
		paddingTop: 0,
	},
};

interface AmountProps extends Omit<TextFieldProps, 'value' | 'label' | 'disabled' | 'readOnly'> {
	value: number | null;
	label?: string;
	disabled?: boolean;
	readOnly?: boolean;
}

interface CustomProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
}

const PhoneNumberMaskedInput = (value: number) =>
	React.forwardRef<NumericFormatProps, CustomProps>(function NumericFormatCustom({ name, onChange, ...rest }, ref) {
		const firstNumber = value.toString().slice(0, 1);

		return (
			<PatternFormat
				{...rest}
				getInputRef={ref}
				format={`${firstNumber === '7' ? '+' : ''}# (###) ###-##-##`}
				onValueChange={(values) => {
					onChange({
						target: {
							name: name,
							value: values.value,
						},
					});
				}}
				allowEmptyFormatting
			/>
		);
	});

const MaskedInput = ({ label, value, disabled, readOnly, helperText, error, onChange }: AmountProps) => {
	return (
		<Box>
			<InputLabel>{label}</InputLabel>
			{!value ? (
				<Typography>{'--'}</Typography>
			) : (
				<TextField
					disabled={disabled || readOnly}
					placeholder="0.00"
					value={value}
					onChange={onChange}
					sx={maskedInputStyles}
					InputProps={{
						/* eslint-disable @typescript-eslint/no-explicit-any */
						inputComponent: PhoneNumberMaskedInput(value) as any,
					}}
					helperText={helperText}
					error={!!error}
				/>
			)}
		</Box>
	);
};

export default MaskedInput;
