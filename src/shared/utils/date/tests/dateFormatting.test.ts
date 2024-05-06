import { formatDate } from '../dateFormatting';

describe('Date formatting functions', () => {
	describe('formatDateForForm', () => {
		test('Happy path', () => {
			const dateToParse = new Date('2023-02-01');
			const expectDate = '01.02.2023';

			const result = formatDate(dateToParse);

			expect(result).toStrictEqual(expectDate);
		});

		test('no data provided', () => {
			const dateToParse = undefined;
			const expectDate = '';

			const result = formatDate(dateToParse);

			expect(result).toStrictEqual(expectDate);
		});
	});
});
