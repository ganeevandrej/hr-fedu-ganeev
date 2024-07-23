import React, { ChangeEvent } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import {
	alpha,
	Box as MuiBox,
	formHelperTextClasses,
	iconButtonClasses,
	InputAdornment,
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

interface AmountProps extends Omit<TextFieldProps, 'value' | 'label' | 'disabled' | 'readOnly'> {
	value: number | null | string;
	label?: string;
	width?: string;
	disabled?: boolean;
	readOnly?: boolean;
}

interface CustomProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(function NumericFormatCustom(
	{ name, onChange, ...rest },
	ref,
) {
	return (
		<NumericFormat
			{...rest}
			getInputRef={ref}
			onValueChange={(values) => {
				onChange({
					target: {
						name: name,
						value: values.value,
					},
				});
			}}
			decimalScale={2}
			fixedDecimalScale
			decimalSeparator=","
		/>
	);
});

const AmountInput = ({
	value,
	label,
	width,
	disabled,
	onChange,
	placeholder,
	readOnly,
	helperText,
	error,
}: AmountProps) => {
	const readOnlyValue = typeof value === 'number' ? `${value.toFixed(2).replace('.', ',')} руб.` : value;

	const handleAmountInputChange =
		(fieldOnChange?: ControllerRenderProps['onChange']) =>
		async (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			if (fieldOnChange) {
				fieldOnChange(event.target.value ? Number(event.target.value) : null);
			}
		};

	return (
		<Box>
			<InputLabel>{label}</InputLabel>
			{readOnly ? (
				<Typography>{readOnlyValue}</Typography>
			) : (
				<TextField
					disabled={disabled}
					placeholder={placeholder || '0,00'}
					value={value}
					sx={{ width: width }}
					onChange={handleAmountInputChange(onChange)}
					InputProps={{
						endAdornment: <InputAdornment position="end">руб.</InputAdornment>,
						/* eslint-disable @typescript-eslint/no-explicit-any */
						inputComponent: NumericFormatCustom as any,
					}}
					helperText={helperText}
					error={!!error}
				/>
			)}
		</Box>
	);
};

export default AmountInput;
