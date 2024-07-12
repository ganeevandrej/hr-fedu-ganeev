import { TasksPreviewDto } from '@models/tasks';
import { sortTasks } from '../sortTasks';

describe('Sorting tasks', () => {
	describe('test for sorting', () => {
		test('emptyArray', () => {
			const data: TasksPreviewDto = [];

			const result = sortTasks(data, true);

			expect(result).toStrictEqual([]);
		});
		test('adminTask', () => {
			const data: TasksPreviewDto = [
				{
					id: 'Fedu-1',
					createdDate: '2024-03-31T21:00:00.000Z',
					status: 'unassigned',
					workType: 'tourism_service',
					preferablePrice: 234234.2,
				},
				{
					id: 'Fedu-2',
					createdDate: '2024-03-31T21:00:00.000Z',
					status: 'rejected',
					workType: 'psychologist_service',
					preferablePrice: 342342.56,
				},
				{
					id: 'Fedu-3',
					createdDate: '2024-01-31T21:00:00.000Z',
					status: 'rejected',
					workType: 'psychologist_service',
					preferablePrice: 342.12,
				},
				{
					id: 'Fedu-4',
					createdDate: '2024-02-14T10:43:07.121Z',
					status: 'unassigned',
					workType: 'tourism_service',
					preferablePrice: 45.6,
				},
				{
					id: 'Fedu-5',
					createdDate: '2024-02-14T21:00:00.000Z',
					status: 'rejected',
					workType: 'tutoring',
					preferablePrice: 45456,
				},
			];

			const result = sortTasks(data, true);

			expect(result).toStrictEqual([
				{
					id: 'Fedu-3',
					createdDate: '2024-01-31T21:00:00.000Z',
					status: 'rejected',
					workType: 'psychologist_service',
					preferablePrice: 342.12,
				},
				{
					id: 'Fedu-5',
					createdDate: '2024-02-14T21:00:00.000Z',
					status: 'rejected',
					workType: 'tutoring',
					preferablePrice: 45456,
				},
				{
					id: 'Fedu-2',
					createdDate: '2024-03-31T21:00:00.000Z',
					status: 'rejected',
					workType: 'psychologist_service',
					preferablePrice: 342342.56,
				},
				{
					id: 'Fedu-4',
					createdDate: '2024-02-14T10:43:07.121Z',
					status: 'unassigned',
					workType: 'tourism_service',
					preferablePrice: 45.6,
				},
				{
					id: 'Fedu-1',
					createdDate: '2024-03-31T21:00:00.000Z',
					status: 'unassigned',
					workType: 'tourism_service',
					preferablePrice: 234234.2,
				},
			]);
		});
		test('ExecutorTask', () => {
			const data: TasksPreviewDto = [
				{
					id: 'Fedu-1',
					deadlineDate: '2024-03-31T21:00:00.000Z',
					clientType: 'standard',
					workType: 'tourism_service',
					preferablePrice: 234234.2,
				},
				{
					id: 'Fedu-2',
					deadlineDate: '2024-03-31T21:00:00.000Z',
					clientType: 'premium',
					workType: 'psychologist_service',
					preferablePrice: 342342.56,
				},
				{
					id: 'Fedu-3',
					deadlineDate: '2024-01-31T21:00:00.000Z',
					clientType: 'premium',
					workType: 'psychologist_service',
					preferablePrice: 4556.6,
				},
				{
					id: 'Fedu-4',
					deadlineDate: '2024-02-14T10:43:07.121Z',
					clientType: 'standard',
					workType: 'tourism_service',
					preferablePrice: 45.6,
				},
				{
					id: 'Fedu-5',
					deadlineDate: '2024-02-14T21:00:00.000Z',
					clientType: 'premium',
					workType: 'tutoring',
					preferablePrice: 45456,
				},
			];

			const result = sortTasks(data, false);

			expect(result).toStrictEqual([
				{
					id: 'Fedu-3',
					deadlineDate: '2024-01-31T21:00:00.000Z',
					clientType: 'premium',
					workType: 'psychologist_service',
					preferablePrice: 4556.6,
				},
				{
					id: 'Fedu-5',
					deadlineDate: '2024-02-14T21:00:00.000Z',
					clientType: 'premium',
					workType: 'tutoring',
					preferablePrice: 45456,
				},
				{
					id: 'Fedu-2',
					deadlineDate: '2024-03-31T21:00:00.000Z',
					clientType: 'premium',
					workType: 'psychologist_service',
					preferablePrice: 342342.56,
				},
				{
					id: 'Fedu-4',
					deadlineDate: '2024-02-14T10:43:07.121Z',
					clientType: 'standard',
					workType: 'tourism_service',
					preferablePrice: 45.6,
				},
				{
					id: 'Fedu-1',
					deadlineDate: '2024-03-31T21:00:00.000Z',
					clientType: 'standard',
					workType: 'tourism_service',
					preferablePrice: 234234.2,
				},
			]);
		});
	});
});
