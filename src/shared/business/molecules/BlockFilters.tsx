import React from 'react';
import CloseIcon from '@mui/icons-material/DisabledByDefault';
import { Button as MuiButton, styled } from '@mui/material';
import { TasksRequestModel } from '@pages/tasks/filters/FiltersFormSetting';
import { formatDate } from '@utils/date/dateFormatting';

const Button = styled(MuiButton)(({ theme }) => ({
	backgroundColor: '#D0D2EC',
	borderRadius: theme.spacing(5),
	padding: theme.spacing(1, 6),
	textTransform: 'none',
	fontWeight: 400,
	fontSize: '14px',
	height: theme.spacing(5.5),
	lineHeight: theme.spacing(4),
	cursor: 'auto',
	marginRight: theme.spacing(8),
	'&:hover': {
		color: 'white',
		backgroundColor: '#D0D2EC',
	},
}));

type Props = {
	filters?: TasksRequestModel | null;
	handleFilterDelete: (key?: keyof TasksRequestModel) => void;
	hasValueNotEmpty: boolean;
};

const ButtonText = {
	startDate: 'Дата с:',
	endDate: 'Дата по:',
	priceFrom: 'Стоимость с:',
	priceTo: 'Стоимость по:',
};

const BlockFilters = ({ handleFilterDelete, filters, hasValueNotEmpty }: Props) => {
	const dataFilters = filters ? Object.entries(filters) : [];

	return (
		<>
			{hasValueNotEmpty && (
				<Button sx={{ cursor: 'pointer' }} onClick={() => handleFilterDelete()}>
					Сбросить фильтры
				</Button>
			)}
			{dataFilters.map(([key, value]) => {
				const keyFilter = key as keyof TasksRequestModel;
				const contentButton =
					value instanceof Date ? `${ButtonText[keyFilter]} ${formatDate(value)}` : `${ButtonText[keyFilter]} ${value}`;
				return (
					value && (
						<Button
							key={keyFilter}
							endIcon={
								<CloseIcon
									sx={{ cursor: 'pointer', borderRadius: '10px' }}
									onClick={() => handleFilterDelete(keyFilter)}
								/>
							}
						>
							{contentButton}
						</Button>
					)
				);
			})}
		</>
	);
};

export default BlockFilters;
