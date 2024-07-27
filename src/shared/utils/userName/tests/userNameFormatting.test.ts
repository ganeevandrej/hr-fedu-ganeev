import { formatUserName } from '../userNameFormatting';

describe('User Name formatting functions', () => {
	describe('formatUserName', () => {
		test('full user name', () => {
			const userName = 'Иванов Иван Иванович';
			const expectUserName = 'Иванов И.И.';

			const result = formatUserName(userName);

			expect(result).toStrictEqual(expectUserName);
		});

		test('empty user name', () => {
			const userName = '';
			const expectUserName = '-';

			const result = formatUserName(userName);

			expect(result).toStrictEqual(expectUserName);
		});
	});
});
