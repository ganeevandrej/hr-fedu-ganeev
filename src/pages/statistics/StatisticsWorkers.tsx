import React from 'react';
import CardTemplate from '@common/molecules/CardTemplate';
import { StatisticData } from '@models/statistic';
import { Box } from '@mui/material';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

type Props = {
	data: StatisticData[];
};

const StatisticsWorkers = ({ data }: Props) => {
	return (
		<Box width={830} height={580}>
			<CardTemplate title="Метрика по работе рабочих">
				<BarChart width={790} height={466} data={data}>
					<CartesianGrid stroke="#ccc" strokeDasharray="3" />
					<XAxis dataKey="name" tick={{ fontSize: 12 }} />
					<YAxis />
					<Tooltip />
					<Bar dataKey="value" barSize={40} background={{ fill: '#E5E5E5' }} fill="#A0A5D8" />
				</BarChart>
			</CardTemplate>
		</Box>
	);
};

export default StatisticsWorkers;
