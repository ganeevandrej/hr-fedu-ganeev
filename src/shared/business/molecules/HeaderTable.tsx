import React from 'react';
import Chips, { TypeChips } from '@business/molecules/Chips';
import { ClientPreviewDto } from '@models/clients';
import { Box as MuiBox, styled } from '@mui/material';
import HeaderTableActions from './HeaderTableActions';

const Container = styled(MuiBox)({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
});

const VerticalLine = styled(MuiBox)(({ theme }) => ({
	backgroundColor: '#BDC0E4',
	width: '2px',
	height: '40px',
	marginLeft: theme.spacing(6),
	marginRight: theme.spacing(6),
}));

type Props = {
	dataChips: TypeChips;
	deleteChips: () => void;
	deleteChip: (key: string) => void;
	openFilters: () => void;
	openActionClient?: (client?: ClientPreviewDto) => void;
};

const HeaderTable = ({ dataChips, deleteChip, deleteChips, openActionClient, openFilters }: Props) => {
	return (
		<Container>
			<HeaderTableActions openFilters={openFilters} openAddClient={openActionClient} />
			<VerticalLine />
			<Chips dataChips={dataChips} deleteChips={deleteChips} deleteChip={deleteChip} />
		</Container>
	);
};

export default HeaderTable;
