import React from 'react';
import { Box as MuiBox, Modal as MuiModal, styled } from '@mui/material';

const Box = styled(MuiBox)(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	borderRadius: theme.spacing(2.5),
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
}));

type Props = {
	open: boolean;
	onClose: () => void;
	width: number;
	children: React.ReactNode;
};

const Modal = ({ onClose, open, width, children }: Props) => {
	return (
		<MuiModal open={open} onClose={onClose}>
			<Box width={width}>{children}</Box>
		</MuiModal>
	);
};

export default Modal;
