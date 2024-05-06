import React from 'react';
import { useSelector } from 'react-redux';
import { TasksStatuses } from '@models/tasks';
import { Box as MuiBox, styled, Typography, useTheme } from '@mui/material';
import { RootState } from '@store/store';
import { getDictionaryValueByCode } from '@utils/dictionary/dictionaryParsing';

const Box = styled(MuiBox)(({ theme }) => ({
	width: 'fit-content',
	padding: theme.spacing(1, 3),
	borderRadius: theme.spacing(5),
	color: theme.palette.common.white,
}));

type ColorsMap = Map<TasksStatuses, string>;

type Props = {
	status: TasksStatuses;
};

const StatusTypography = ({ status }: Props) => {
	const theme = useTheme();
	const taskStatuses = useSelector((state: RootState) => state.dictionaries.taskStatuses);

	const colorsMap: ColorsMap = new Map([
		['rejected', theme.palette.status.rejected],
		['unassigned', theme.palette.status.unassigned],
	]);

	const statusValue = getDictionaryValueByCode(taskStatuses, status);

	return (
		<Box sx={{ backgroundColor: colorsMap.get(status), display: statusValue ? 'block' : 'none' }}>
			<Typography variant="subtitle1" sx={{ fontFamily: 'InterMedium' }}>
				{statusValue}
			</Typography>
		</Box>
	);
};

export default StatusTypography;
