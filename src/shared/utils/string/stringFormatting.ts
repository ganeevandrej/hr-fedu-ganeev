/**
 * Сокращение длины строки до максимальной
 * @param string
 * @param maxLength Максимальная длина строки(по умолчанию = 15)
 */
const trimString = (string: string, maxLength: number = 15): string =>
	string.length > maxLength ? `${string.substring(0, maxLength).trim()}...` : string;

export { trimString };
