import React from 'react';
import CardTemplate from '@common/molecules/CardTemplate';
import { StatisticData } from '@models/statistic';
import { Box } from '@mui/material';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import StatisticsTasksLabel from './StatisticsTasksLabel';
import StatisticsTasksLegend from './StatisticsTasksLegend';

type Props = {
	data: StatisticData[];
};

const StatisticsTasks = ({ data }: Props) => {
	return (
		<Box width={530} height={295}>
			<CardTemplate title="Метрика по статсусам заявок">
				<PieChart width={465} height={220}>
					<Pie
						data={data}
						cx="110"
						cy="110"
						outerRadius={105}
						labelLine={false}
						label={StatisticsTasksLabel}
						dataKey="value"
					>
						{data.map(({ name, color }) => (
							<Cell key={name} fill={color} />
						))}
					</Pie>
					<Legend
						wrapperStyle={{ left: '257px' }}
						align="right"
						verticalAlign="top"
						fill="#74767C"
						content={<StatisticsTasksLegend />}
						layout="vertical"
						iconSize={18}
						iconType="circle"
					/>
					<Tooltip />
				</PieChart>
			</CardTemplate>
		</Box>
	);
};

export default StatisticsTasks;
