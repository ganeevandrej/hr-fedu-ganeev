import React from 'react';
import { ClientPreviewDto } from '@models/clients';
import AddIcon from '@mui/icons-material/Add';
import FilterIcon from '@mui/icons-material/FilterList';
import { IconButton } from '@mui/material';

type Props = {
	openFilters: () => void;
	openAddClient?: (client?: ClientPreviewDto) => void;
};

const HeaderTableActions = ({ openAddClient, openFilters }: Props) => {
	return (
		<>
			<IconButton onClick={openFilters}>
				<FilterIcon sx={{ color: '#BDC0E4' }} />
			</IconButton>
			{openAddClient && (
				<IconButton sx={{ marginLeft: '8px' }} onClick={() => openAddClient()}>
					<AddIcon sx={{ color: '#BDC0E4' }} stroke="currentColor" />
				</IconButton>
			)}
		</>
	);
};

export default HeaderTableActions;
