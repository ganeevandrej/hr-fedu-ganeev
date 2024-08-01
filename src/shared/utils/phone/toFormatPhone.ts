const toFormatPhone = (userPhone: string): string => {
	if (userPhone.length > 0) {
		const trimmedDigits = userPhone.substring(0, 11);
		return `+7(${trimmedDigits.substring(1, 4)})${trimmedDigits.substring(4, 7)}-${trimmedDigits.substring(7, 9)}-${trimmedDigits.substring(9, 11)}`;
	}

	return '';
};

export { toFormatPhone };
