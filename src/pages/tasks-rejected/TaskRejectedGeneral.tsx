import React from 'react';
import AmountInput from '@common/atoms/inputs/AmountInput';
import MaskedInput from '@common/atoms/inputs/MaskedInput';
import TextInput from '@common/atoms/inputs/TextInput';
import CardTemplate from '@common/molecules/CardTemplate';
import { TaskDto } from '@models/tasks';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import { isAdminTask } from '@pages/tasks/typeGuards/adminTypeGuards';
import useAppSelector from '@store/hooks/useAppSelector';
import { formatDate } from '@utils/date/dateFormatting';
import { getDictionaryValueByCode } from '@utils/dictionary/dictionaryParsing';

type Props<T> = {
	taskData?: T;
};

const TaskRejectedGeneral = <T extends TaskDto>({ taskData }: Props<T>) => {
	const workTypes = useAppSelector((state) => state.dictionaries.workTypes);
	const adminTaskData = taskData && isAdminTask(taskData) ? taskData : undefined;

	const formattedDate = formatDate(new Date(adminTaskData?.createdDate ?? ''));

	return (
		<CardTemplate title="Общая информация">
			<Grid container rowGap={8}>
				<Grid item xs={3}>
					<TextInput readOnly label="ФИО клиента" value={adminTaskData?.clientFullName || '--'} />
				</Grid>
				<Grid item xs={3}>
					<TextInput readOnly label="Дата создания заявки" value={formattedDate || '--'} />
				</Grid>
				<Grid item xs={3}>
					<TextInput
						readOnly
						label="Вид работ"
						value={getDictionaryValueByCode(workTypes, adminTaskData?.workType || '') || '--'}
					/>
				</Grid>
				<Grid item xs={3}>
					<AmountInput
						disabled
						readOnly
						label="Желаемая стоимость работ"
						value={adminTaskData?.preferablePrice || '--'}
					/>
				</Grid>
				<Grid item xs={3}>
					<MaskedInput
						readOnly
						label="Телефон для связи"
						value={adminTaskData?.phoneNumber ? Number(adminTaskData.phoneNumber) : null}
					/>
				</Grid>
				<Grid item xs={3}>
					<TextInput readOnly label="Внутренний код OSU" value={adminTaskData?.codeOSU || '--'} />
				</Grid>
				<Grid item xs={3} display="flex">
					<FormControlLabel
						control={<Checkbox disabled checked={adminTaskData?.clientType === 'premium'} color="secondary" />}
						label="Премиум клиент"
					/>
				</Grid>
			</Grid>
		</CardTemplate>
	);
};

export default TaskRejectedGeneral;
