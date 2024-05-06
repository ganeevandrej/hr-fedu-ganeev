import { trimString } from '../stringFormatting';

describe('String formatting functions', () => {
	describe('trimString', () => {
		test('no max length provided - long string', () => {
			const stringToTrim = 'string contains 26 symbols';
			const expectString = 'string contains...';

			const result = trimString(stringToTrim);

			expect(result).toStrictEqual(expectString);
		});

		test('no max length provided - short string', () => {
			const stringToTrim = 'string';

			const result = trimString(stringToTrim);

			expect(result).toStrictEqual(stringToTrim);
		});

		test('max length provided - long string', () => {
			const stringToTrim = 'string contains 26 symbols';
			const expectString = 'string contains 26 s...';

			const result = trimString(stringToTrim, 20);

			expect(result).toStrictEqual(expectString);
		});

		test('max length provided - short string', () => {
			const stringToTrim = 'string';

			const result = trimString(stringToTrim, 20);

			expect(result).toStrictEqual(stringToTrim);
		});

		test('empty string provided', () => {
			const stringToTrim = '';

			const result = trimString(stringToTrim);

			expect(result).toStrictEqual(stringToTrim);
		});

		test('string with space on max length provided', () => {
			const stringToTrim = 'string with space on max length';
			const expectString = 'string...';

			const result = trimString(stringToTrim, 7);

			expect(result).toStrictEqual(expectString);
		});
	});
});
