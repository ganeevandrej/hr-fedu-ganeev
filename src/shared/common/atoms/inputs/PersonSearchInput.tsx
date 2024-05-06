import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
	alpha,
	Autocomplete,
	Box as MuiBox,
	iconButtonClasses,
	inputAdornmentClasses,
	inputBaseClasses,
	InputLabel as MuiInputLabel,
	InputProps,
	styled,
	TextField,
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
	fontWeight: theme.typography.fontWeightLight,
	overflowWrap: 'break-word',
	color: theme.palette.error.main,
	margin: 0,
	paddingTop: theme.spacing(1),
}));

const personSearchInputStyles = (error?: boolean) => {
	return {
		width: '80%',
		padding: 0,
		[`& .${inputBaseClasses.root}`]: {
			display: 'flex',
			height: 40,
			justifyContent: 'center',
			alignContent: 'center',
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
				borderColor: error ? theme.palette.error.main : theme.palette.secondary.main,
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
		'& .MuiAutocomplete-popupIndicator': { transform: 'none' },
		[`& .MuiSvgIcon-root`]: {
			color: theme.palette.secondary.main,
		},
	};
};

interface OptionsModel {
	label: string | null;
}

interface PersonSearchInputProps extends Omit<InputProps, 'label' | 'disabled' | 'readOnly' | 'onChange'> {
	label?: string;
	disabled?: boolean;
	readOnly?: boolean;
	options: OptionsModel[];
	onChange: (value: string | null) => void;
	error?: boolean;
	helperText?: string;
}

const PersonSearchInput = ({ label, value, options, error, helperText, onChange }: PersonSearchInputProps) => {
	return (
		<Box>
			<InputLabel>{label}</InputLabel>
			<Autocomplete
				value={value ? options.find((option) => option.label === value) || null : null}
				options={options}
				renderInput={(params) => <TextField placeholder="Введите..." {...params} />}
				onChange={(_, data) => {
					onChange(data ? data?.label : null);
				}}
				popupIcon={<SearchIcon />}
				sx={personSearchInputStyles(error)}
			/>
			<Typography variant="h6">{helperText}</Typography>
		</Box>
	);
};

export default PersonSearchInput;
