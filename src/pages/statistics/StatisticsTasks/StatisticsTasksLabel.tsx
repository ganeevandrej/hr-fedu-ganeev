import React from 'react';
import { PieLabelRenderProps } from 'recharts';

const RADIAN = Math.PI / 180;

const StatisticsTasksLabel = (props: PieLabelRenderProps) => {
	const { cx = 0, cy = 0, midAngle, innerRadius = 0, outerRadius = 0, percent = 0 } = props;

	const minRadius = Number(innerRadius);
	const angle = Number(-midAngle);

	const radius = minRadius + (Number(outerRadius) - minRadius) * 0.5;
	const x = Number(cx) + radius * Math.cos(angle * RADIAN);
	const y = Number(cy) + radius * Math.sin(angle * RADIAN);

	return (
		<text x={x} y={y} fill="#74767C" textAnchor="middle" dominantBaseline="central">
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

export default StatisticsTasksLabel;
