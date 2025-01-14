import React, { ReactNode } from 'react';
import { Dictionary } from '@models/dictionaries';
import {
	Box as MuiBox,
	inputBaseClasses,
	InputLabel as MuiInputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	selectClasses,
	styled,
	Typography as MuiTypography,
} from '@mui/material';
import theme from '@styles/theme';

const Box = styled(MuiBox)(({ theme }) => ({
	minHeight: 60,
	fontSize: theme.typography.h4.fontSize,
}));

const InputLabel = styled(MuiInputLabel)(({ theme }) => ({
	paddingBottom: theme.spacing(2.5),
	fontSize: theme.typography.h4.fontSize,
}));

const Typography = styled(MuiTypography)(({ theme }) => ({
	color: theme.palette.grey[300],
}));

const selectInputStyles = (error?: boolean) => {
	return {
		height: 40,
		width: '80%',
		'& fieldset': {
			borderColor: error ? theme.palette.error.main : theme.palette.secondary.main,
		},
		'&:hover': {
			'&& fieldset': {
				borderColor: theme.palette.secondary.main,
			},
		},
		'&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
			border: 0,
		},
		'&.Mui-focused': {
			border: `2px solid ${theme.palette.secondary.main}`,
			'&:hover': {
				'&& fieldset': {
					border: 0,
				},
			},
		},
		[`& .${selectClasses.icon}`]: {
			color: theme.palette.secondary.main,
		},
		[`& .${inputBaseClasses.input}`]: {
			height: 40,
			padding: `0 ${theme.spacing(2)}`,
			paddingRight: theme.spacing(2),
			textOverflow: 'ellipsis',
		},
	};
};

interface SelectProps {
	value?: string;
	label?: string;
	disabled?: boolean;
	options: Dictionary[];
	onChange: (event: SelectChangeEvent<unknown>, child: ReactNode) => void;
	error?: boolean;
}

const SelectInput = ({ options, onChange, disabled, label, value, error }: SelectProps) => {
	return (
		<Box>
			<InputLabel>{label}</InputLabel>
			<Select
				value={value}
				disabled={disabled}
				onChange={onChange}
				displayEmpty
				renderValue={(value) => value || <Typography>Введите...</Typography>}
				sx={selectInputStyles(error)}
			>
				{options.map((option) => (
					<MenuItem key={option.code} value={option.value}>
						{option.value}
					</MenuItem>
				))}
			</Select>
		</Box>
	);
};

export default SelectInput;
