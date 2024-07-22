type StatusSnackbar = 'success' | 'error';
type FieldSnackbar = 'successCompleted' | 'successAssign' | 'validationError' | 'technicalError';

type ValueSnackbar = {
	title: string;
	text: string;
	status: StatusSnackbar;
};

type StateSnackbar = Record<FieldSnackbar, ValueSnackbar>;

export { ValueSnackbar, StateSnackbar };