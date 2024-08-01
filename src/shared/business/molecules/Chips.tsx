import React from 'react';
import DeleteIcon from '@mui/icons-material/DisabledByDefault';
import { Chip as MuiChip, styled } from '@mui/material';

const Chip = styled(MuiChip)(({ theme }) => ({
	backgroundColor: theme.palette.secondary.main,
	padding: theme.spacing(0, 6),
	display: 'flex',
	justifyContent: 'space-between',
	color: 'white',
}));

type Chip = {
	key: string;
	label: string;
};

export type TypeChips = Chip[];

type Props = {
	dataChips: TypeChips;
	deleteChips: () => void;
	deleteChip: (key: string) => void;
};

const Chips = ({ dataChips, deleteChips, deleteChip }: Props) => {
	return (
		<>
			{dataChips.length > 0 && <Chip label="Сбросить фильтры" color="secondary" onClick={deleteChips} />}
			{dataChips.map(({ label, key }) => {
				return (
					<Chip
						sx={{ marginLeft: '24px' }}
						key={key}
						label={label}
						color="secondary"
						deleteIcon={<DeleteIcon sx={{ color: '#F1F3F8' }} />}
						onDelete={() => deleteChip(key)}
					/>
				);
			})}
		</>
	);
};

export default Chips;
