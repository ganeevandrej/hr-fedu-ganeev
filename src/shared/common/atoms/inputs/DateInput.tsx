import React from 'react';
import {
	alpha,
	Box as MuiBox,
	formHelperTextClasses,
	inputBaseClasses,
	InputLabel as MuiInputLabel,
	styled,
	Typography,
} from '@mui/material';
import { DesktopDatePicker, DesktopDatePickerProps } from '@mui/x-date-pickers';
import theme from '@styles/theme';

const Box = styled(MuiBox)({
	minHeight: 60,
});

const InputLabel = styled(MuiInputLabel)(({ theme }) => ({
	paddingBottom: theme.spacing(2.5),
	fontSize: theme.typography.h4.fontSize,
}));

const dateInputStyles = {
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
};

interface DateInputProps extends Omit<DesktopDatePickerProps<Date>, 'value' | 'error'> {
	value?: Date | null;
	error?: string;
}

const DateInput = ({ value, label, readOnly, error, onChange, ...rest }: DateInputProps) => {
	const readOnlyValue = value ? value.toLocaleDateString() : '--';

	return (
		<Box>
			<InputLabel>{label}</InputLabel>
			{readOnly ? (
				<Typography>{readOnlyValue}</Typography>
			) : (
				<DesktopDatePicker
					{...rest}
					value={value}
					sx={dateInputStyles}
					showDaysOutsideCurrentMonth
					onChange={onChange}
					slotProps={{
						openPickerButton: { color: 'secondary' },
						textField: { error: !!error, helperText: error, color: 'secondary' },
					}}
				/>
			)}
		</Box>
	);
};

export default DateInput;
