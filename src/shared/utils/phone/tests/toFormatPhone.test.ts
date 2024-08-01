import { toFormatPhone } from '../toFormatPhone';

describe('convert string to phone number', () => {
	describe('examination', () => {
		test('success', () => {
			const phoneNumber = '73429411111';
			const expectValue = '+7(342)941-11-11';

			const result = toFormatPhone(phoneNumber);

			expect(result).toStrictEqual(expectValue);
		});
		test('success', () => {
			const phoneNumber = '73429411111';
			const expectValue = '+7(342)941-11-11';

			const result = toFormatPhone(phoneNumber);

			expect(result).toStrictEqual(expectValue);
		});
		test('empty line', () => {
			const phoneNumber = '';
			const expectValue = '';

			const result = toFormatPhone(phoneNumber);

			expect(result).toStrictEqual(expectValue);
		});
		test('more than 11', () => {
			const phoneNumber = '73429411111';
			const expectValue = '+7(342)941-11-11';

			const result = toFormatPhone(phoneNumber);

			expect(result).toStrictEqual(expectValue);
		});
	});
});
