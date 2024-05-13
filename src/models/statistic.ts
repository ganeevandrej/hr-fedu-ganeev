import { TasksStatuses } from './tasks';

type StatisticDto = {
	name: TasksStatuses;
	value: number;
	color?: string;
};

export type { StatisticDto };
