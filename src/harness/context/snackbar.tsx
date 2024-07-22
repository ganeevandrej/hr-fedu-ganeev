import React, { createContext, useContext, useState } from 'react';
import { ValueSnackbar } from '@models/snackbar';
import { Alert, Snackbar } from '@mui/material';
import AlertTitle from '@mui/material/AlertTitle';

type Props = {
	children: React.ReactNode;
};

interface SnackbarContextType {
	showSnackbar: (value: ValueSnackbar) => void;
}

const SnackbarContext = createContext<SnackbarContextType>({ showSnackbar: () => {} });

const defaultValues: ValueSnackbar = {
	text: '',
	title: '',
	status: 'success',
};

const SnackbarProvider = ({ children }: Props) => {
	const [open, setOpen] = useState(false);
	const [snackbar, setSnackbar] = useState<ValueSnackbar>(defaultValues);

	const showSnackbar = (values: ValueSnackbar) => {
		setSnackbar(values);
		setOpen(true);
	};

	const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const SnackbarValueContext = {
		showSnackbar,
	};

	const { title, status, text } = snackbar;

	return (
		<SnackbarContext.Provider value={SnackbarValueContext}>
			{children}
			<Snackbar
				open={open}
				autoHideDuration={5000}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				onClose={handleClose}
			>
				<Alert color={status} variant="filled" icon={false}>
					<AlertTitle>{title}</AlertTitle>
					{text}
				</Alert>
			</Snackbar>
		</SnackbarContext.Provider>
	);
};

const useSnackbar = (): SnackbarContextType => {
	return useContext(SnackbarContext);
};

export default SnackbarProvider;
export { useSnackbar };
