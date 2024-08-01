import { ClientsPreviewDto } from '@models/clients';
import { sortClients } from '../sortClients';

describe('Sorting clients', () => {
	describe('test for sorting', () => {
		test('empty array', () => {
			const data: ClientsPreviewDto = [];

			const result = sortClients(data);

			expect(result).toStrictEqual([]);
		});
		test('not empty array', () => {
			const data: ClientsPreviewDto = [
				{
					id: 'Fedu-1',
					clientType: 'premium',
					userFullName: 'Иванов Иван Иванович',
					phoneNumber: '73429452332',
					city: 'Калининград',
				},
				{
					id: 'Fedu-2',
					clientType: 'standard',
					userFullName: 'Петров Иван Иванович',
					phoneNumber: '73412356566',
					city: 'Москва',
				},
				{
					id: 'Fedu-3',
					clientType: 'premium',
					userFullName: 'Сергеев Сергей Сергеевич',
					phoneNumber: '73477684332',
					city: 'Самара',
				},
				{
					id: 'Fedu-4',
					clientType: 'standard',
					userFullName: 'Иванов Петр Иванович',
					phoneNumber: '79265858484',
					city: 'Москва',
				},
				{
					id: 'Fedu-5',
					clientType: 'standard',
					userFullName: 'Иванова Екатерина Сергеевна',
					phoneNumber: '734244444444',
					city: 'Санкт-Петербург',
				},
				{
					id: 'Fedu-6',
					clientType: 'premium',
					userFullName: 'Володин Иван Сергеевич',
					phoneNumber: '73429411111',
					city: 'Вологда',
				},
				{
					id: 'Fedu-7',
					clientType: 'premium',
					userFullName: 'Петрова Елизавета Петровна',
					phoneNumber: '73424565534',
					city: 'Тверь',
				},
			];

			const result = sortClients(data);

			expect(result).toStrictEqual([
				{
					id: 'Fedu-6',
					clientType: 'premium',
					userFullName: 'Володин Иван Сергеевич',
					phoneNumber: '73429411111',
					city: 'Вологда',
				},
				{
					id: 'Fedu-1',
					clientType: 'premium',
					userFullName: 'Иванов Иван Иванович',
					phoneNumber: '73429452332',
					city: 'Калининград',
				},

				{
					id: 'Fedu-7',
					clientType: 'premium',
					userFullName: 'Петрова Елизавета Петровна',
					phoneNumber: '73424565534',
					city: 'Тверь',
				},

				{
					id: 'Fedu-3',
					clientType: 'premium',
					userFullName: 'Сергеев Сергей Сергеевич',
					phoneNumber: '73477684332',
					city: 'Самара',
				},

				{
					id: 'Fedu-4',
					clientType: 'standard',
					userFullName: 'Иванов Петр Иванович',
					phoneNumber: '79265858484',
					city: 'Москва',
				},

				{
					id: 'Fedu-5',
					clientType: 'standard',
					userFullName: 'Иванова Екатерина Сергеевна',
					phoneNumber: '734244444444',
					city: 'Санкт-Петербург',
				},

				{
					id: 'Fedu-2',
					clientType: 'standard',
					userFullName: 'Петров Иван Иванович',
					phoneNumber: '73412356566',
					city: 'Москва',
				},
			]);
		});
	});
});
