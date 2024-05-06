import { Dictionary } from '@models/dictionaries';

/**
 * Извлечение значения из словаря по коду
 * @param dictionary Массив словарей
 * @param code Код в формате строки
 */
const getDictionaryValueByCode = (dictionary: Dictionary[], code: string) => {
	if (!dictionary.length || !code) return '';
	return dictionary.find((el) => el.code === code)!.value;
};

export { getDictionaryValueByCode };
