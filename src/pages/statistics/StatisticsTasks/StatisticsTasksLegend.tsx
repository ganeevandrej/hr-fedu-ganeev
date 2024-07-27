import React from 'react';
import { List as MuiList, ListItem as MuiListItem, styled, Typography as MuiTypography } from '@mui/material';
import { Props } from 'recharts/types/component/DefaultLegendContent';

const List = styled(MuiList)({
	margin: 0,
	padding: 0,
});

const ListItem = styled(MuiListItem)(({ theme }) => ({
	paddingBottom: theme.spacing(2.5),
	listStyleType: 'none',
}));

const Marker = styled(MuiTypography)(({ theme }) => ({
	display: 'inline-block',
	width: theme.spacing(4.5),
	height: theme.spacing(4.5),
	borderRadius: '50%',
}));

const Title = styled(MuiTypography)(({ theme }) => ({
	color: '#74767C',
	marginLeft: theme.spacing(3),
}));

const StatisticsTasksLegend = (props: Props) => {
	const { payload } = props;

	return (
		<List>
			{payload &&
				payload.map((entry, index) => {
					return (
						<ListItem key={`item-${index}`}>
							<Marker sx={{ backgroundColor: entry.color }}></Marker>
							<Title>{entry.value}</Title>
						</ListItem>
					);
				})}
		</List>
	);
};

export default StatisticsTasksLegend;
