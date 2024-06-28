import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import AmountInput from '@common/atoms/inputs/AmountInput';
import DateInput from '@common/atoms/inputs/DateInput';
import MaskedInput from '@common/atoms/inputs/MaskedInput';
import TextInput from '@common/atoms/inputs/TextInput';
import CardTemplate from '@common/molecules/CardTemplate';
import { CompleteTaskRequestModel, TaskDto } from '@models/tasks';
import { Grid } from '@mui/material';
import { isExecutorTask } from '@pages/tasks/typeGuards/executorTypeGuards';
import { RootState } from '@store/store';
import { getDictionaryValueByCode } from '@utils/dictionary/dictionaryParsing';
import { defaultValues } from './taskCompletionFormSettings';

type Props<T> = {
	taskData: T;
};

const TaskCompletionGeneral = <T extends TaskDto>({ taskData }: Props<T>) => {
	const executorTaskData = taskData && isExecutorTask(taskData) ? taskData : undefined;
	const workTypes = useSelector((state: RootState) => state.dictionaries.workTypes);

	const { reset } = useFormContext<CompleteTaskRequestModel>();

	useEffect(() => {
		if (executorTaskData) {
			reset(defaultValues);
		}
	}, [executorTaskData, reset]);

	return (
		<CardTemplate title="Общая информация">
			<Grid container rowGap={8}>
				<Grid item xs={3}>
					<TextInput readOnly label="ФИО клиента" value={executorTaskData?.clientFullName || '--'} />
				</Grid>
				<Grid item xs={3}>
					<DateInput
						readOnly
						label="Дата создания заявки"
						value={executorTaskData?.createdDate ? new Date(executorTaskData?.createdDate) : null}
					/>
				</Grid>
				<Grid item xs={3}>
					<DateInput
						readOnly
						label="Крайний срок исполнения заявки"
						value={executorTaskData?.createdDate ? new Date(executorTaskData?.deadlineDate) : null}
					/>
				</Grid>
				<Grid item xs={3}>
					<TextInput
						readOnly
						label="Вид работ"
						value={getDictionaryValueByCode(workTypes, executorTaskData?.workType || '') || '--'}
					/>
				</Grid>
				<Grid item xs={3}>
					<TextInput readOnly label="Внутренний код OSU" value={executorTaskData?.codeOSU || '--'} />
				</Grid>
				<Grid item xs={3}>
					<AmountInput
						disabled
						readOnly
						label="Рекомендованная стоимость работ"
						value={executorTaskData?.recommendedPrice || '--'}
					/>
				</Grid>
				<Grid item xs={3}>
					<AmountInput
						disabled
						readOnly
						label="Желаемая стоимость работ"
						value={executorTaskData?.preferablePrice || '--'}
					/>
				</Grid>
				<Grid item xs={3}>
					<MaskedInput
						readOnly
						label="Телефон для связи"
						value={executorTaskData?.phoneNumber ? Number(executorTaskData.phoneNumber) : null}
					/>
				</Grid>
				<Grid item xs={3}>
					<AmountInput
						disabled
						readOnly
						label="Минимальная стоимость работ"
						value={executorTaskData?.minimalPrice || '--'}
					/>
				</Grid>
			</Grid>
		</CardTemplate>
	);
};

export default TaskCompletionGeneral;
