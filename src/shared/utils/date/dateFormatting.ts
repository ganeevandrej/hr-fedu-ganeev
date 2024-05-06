import { format, isValid } from 'date-fns';

/**
 * Преобразование даты из формата Date в строку 'dd.MM.yyyy'
 * @param date Дата
 */
const formatDate = (date?: Date): string => (date && isValid(date) ? format(date, 'dd.MM.yyyy') : '');

export { formatDate };
