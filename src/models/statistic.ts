import { TasksStatuses } from './tasks';

type StatisticDto = {
	name: TasksStatuses;
	value: number;
	color?: string;
};

type StatisticData = {
	name: string;
	value: number;
	color?: string;
};

type Statistic = {
	workers: StatisticData[];
	tasks: StatisticDto[];
};

export type { Statistic, StatisticData, StatisticDto };
