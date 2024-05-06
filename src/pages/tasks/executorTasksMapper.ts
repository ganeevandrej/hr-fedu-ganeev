import { ExecutorTaskModel, ExecutorTasksPreviewDto } from '@models/tasks';
import { differenceInWeeks } from 'date-fns';

const mapExecutorTasksFromDto = (dto: ExecutorTasksPreviewDto): ExecutorTaskModel[] =>
	dto?.map((task) => {
		const isExpiring = differenceInWeeks(task.deadlineDate, new Date()) < 1;
		return { ...task, isExpiring };
	});

export default mapExecutorTasksFromDto;
