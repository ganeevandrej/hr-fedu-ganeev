import React from 'react';
import { useGetStatisticsQuery } from '@api/statistics/statisticsApi';
import LoaderBox from '@common/atoms/LoaderBox';
import { useErrorHandler } from '@common/hooks/useErrorHandler';
import { Box as MuiBox, styled, Typography as MuiTypography } from '@mui/material';
import useAppSelector from '@store/hooks/useAppSelector';
import { getDictionaryValueByCode } from '@utils/dictionary/dictionaryParsing';
import { formatUserName } from '@utils/userName/userNameFormatting';
import StatisticsTasks from './StatisticsTasks/StatisticsTasks';
import StatisticsWorkers from './StatisticsWorkers';

const Box = styled(MuiBox)({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
});

const Container = styled(MuiBox)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	width: '100vw',
	padding: theme.spacing(0, 5),
}));

const Typography = styled(MuiTypography)(({ theme }) => ({
	color: theme.palette.common.black,
	padding: theme.spacing(4, 0, 3.5, 1),
	fontFamily: 'InterBold',
}));

const Statistics = () => {
	const taskStatuses = useAppSelector((state) => state.dictionaries.taskStatuses);
	const { data, isLoading, error } = useGetStatisticsQuery();

	useErrorHandler(error);

	const { workers, tasks } = data || { workers: [], tasks: [] };

	const dataTasks = tasks.map((item) => {
		return {
			...item,
			name: getDictionaryValueByCode(taskStatuses, item.name),
		};
	});

	const dataWorkers = workers.map((item) => {
		return {
			...item,
			name: formatUserName(item.name),
		};
	});

	return isLoading ? (
		<LoaderBox />
	) : (
		<Container>
			<Typography variant="h1">Статистика</Typography>
			<Box>
				<StatisticsWorkers data={dataWorkers} />
				<StatisticsTasks data={dataTasks} />
			</Box>
		</Container>
	);
};

export default Statistics;
