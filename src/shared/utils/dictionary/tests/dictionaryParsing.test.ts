import { Dictionary } from '@models/dictionaries';
import { getDictionaryValueByCode } from '../dictionaryParsing';

describe('Dictionary parsing functions', () => {
	describe('getDictionaryValueByCode', () => {
		test('Happy path', () => {
			const dictionaryToParse: Dictionary[] = [
				{ code: '1', value: 'one' },
				{ code: '2', value: 'two' },
				{ code: '3', value: 'three' },
			];
			const code = '3';
			const expectValue = 'three';

			const result = getDictionaryValueByCode(dictionaryToParse, code);

			expect(result).toStrictEqual(expectValue);
		});

		test('Empty dictionary provided', () => {
			const dictionaryToParse: Dictionary[] = [];
			const code = '3';
			const expectValue = '';

			const result = getDictionaryValueByCode(dictionaryToParse, code);

			expect(result).toStrictEqual(expectValue);
		});

		test('Empty code provided', () => {
			const dictionaryToParse: Dictionary[] = [
				{ code: '1', value: 'one' },
				{ code: '2', value: 'two' },
				{ code: '3', value: 'three' },
			];
			const code = '';
			const expectValue = '';

			const result = getDictionaryValueByCode(dictionaryToParse, code);

			expect(result).toStrictEqual(expectValue);
		});
	});
});
