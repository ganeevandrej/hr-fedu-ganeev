import { StateSnackbar } from '@models/snackbar';

const statesSnackbar: StateSnackbar = {
	successCompleted: {
		title: 'Успешно',
		text: 'Заявка закрыта',
		status: 'success',
	},
	successAssign: {
		title: 'Успешно',
		text: 'Заявка отправлена исполнителю',
		status: 'success',
	},
	successArchive: {
		title: 'Успешно',
		text: 'Заявка заархивирована',
		status: 'success',
	},
	successReturn: {
		title: 'Успешно',
		text: 'Заявка отправлена исполнителю',
		status: 'success',
	},
	successRejection: {
		title: 'Успешно',
		text: ' Заявка отклонена',
		status: 'success',
	},
	validationError: {
		title: 'Ошибка валидации',
		text: 'Проверьте корректность введенных значений',
		status: 'error',
	},
	technicalError: {
		title: 'Произошла техническая ошибка',
		text: 'Обратитесь к администратору',
		status: 'error',
	},
};

export { statesSnackbar };
