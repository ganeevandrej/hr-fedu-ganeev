/**
 * Преобразоване полного имени в укороченное
 * @param value Строка полного имени
 */
const formatUserName = (value: string) => {
	if (value) {
		const [surname, name, lastName] = value.split(' ');
		const firstName = name && name.charAt(0) + '.';
		const middleName = lastName && lastName.charAt(0) + '.';
		return `${surname} ${firstName}${middleName}`;
	}

	return '-';
};

export { formatUserName };
