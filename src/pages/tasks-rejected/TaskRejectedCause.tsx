import React from 'react';
import MultilineTextInput from '@common/atoms/inputs/MultilineTextInput';
import TextInput from '@common/atoms/inputs/TextInput';
import CardTemplate from '@common/molecules/CardTemplate';
import { TaskDto } from '@models/tasks';
import { Grid } from '@mui/material';
import { isAdminTask } from '@pages/tasks/typeGuards/adminTypeGuards';
import useAppSelector from '@store/hooks/useAppSelector';
import { getDictionaryValueByCode } from '@utils/dictionary/dictionaryParsing';

type Props<T> = {
	taskData?: T;
};

const TaskRejectedCause = <T extends TaskDto>({ taskData }: Props<T>) => {
	const workTypes = useAppSelector((state) => state.dictionaries.rejectReasons);
	const adminTaskData = taskData && isAdminTask(taskData) ? taskData : undefined;

	return (
		<CardTemplate title="Причины отклонения">
			<Grid container rowGap={8}>
				<Grid item xs={12}>
					<TextInput
						readOnly
						label="Причина отклонения"
						value={getDictionaryValueByCode(workTypes, adminTaskData?.rejectReason || '') || '--'}
					/>
				</Grid>
				<Grid item xs={12}>
					<MultilineTextInput readOnly label="Комментарий" value={adminTaskData?.comment || '--'} />
				</Grid>
			</Grid>
		</CardTemplate>
	);
};

export default TaskRejectedCause;
