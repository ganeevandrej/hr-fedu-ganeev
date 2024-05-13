import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import AmountInput from '@common/atoms/inputs/AmountInput';
import MaskedInput from '@common/atoms/inputs/MaskedInput';
import TextInput from '@common/atoms/inputs/TextInput';
import CardTemplate from '@common/molecules/CardTemplate';
import { TaskDto } from '@models/tasks';
import { Checkbox as MuiCheckbox, checkboxClasses, FormControlLabel, Grid, styled } from '@mui/material';
import { isAdminTask } from '@pages/tasks/typeGuards/adminTypeGuards';
import { RootState } from '@store/store';
import { getDictionaryValueByCode } from '@utils/dictionary/dictionaryParsing';
import { EmployeeAssignmentRequestModel, getDefaultValues } from './employeeAssignmentFormSettings';

const Checkbox = styled(MuiCheckbox)(({ theme }) => ({
	color: theme.palette.secondary.main,
	[`& .${checkboxClasses.root}`]: {
		color: theme.palette.secondary.main,
		[`& .${checkboxClasses.checked}`]: {
			color: theme.palette.common.black,
		},
	},
}));

type Props<T> = {
	taskData: T;
};

const EmployeeAssignmentGeneral = <T extends TaskDto>({ taskData }: Props<T>) => {
	const navigate = useNavigate();
	const workTypes = useSelector((state: RootState) => state.dictionaries.workTypes);
	const adminTaskData = taskData && isAdminTask(taskData) ? taskData : undefined;

	const { reset } = useFormContext<EmployeeAssignmentRequestModel>();

	useEffect(() => {
		if (adminTaskData) {
			if (adminTaskData.rejectReason) navigate('/tasks');
			reset(getDefaultValues(adminTaskData?.createdDate));
		}
	}, [adminTaskData, reset, navigate]);

	return (
		<CardTemplate title="Общая информация">
			<Grid container rowGap={8}>
				<Grid item xs={3}>
					<TextInput readOnly label="ФИО клиента" value={adminTaskData?.clientFullName || '--'} />
				</Grid>
				<Grid item xs={3}>
					<TextInput readOnly label="Дата создания заявки" value={adminTaskData?.createdDate.slice(0, 10) || '--'} />
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

export default EmployeeAssignmentGeneral;
