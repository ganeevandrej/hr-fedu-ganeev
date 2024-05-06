import React from 'react';
import { Card as MuiCard, styled, Typography as MuiTypography } from '@mui/material';

const Card = styled(MuiCard)(({ theme }) => ({
	borderRadius: 10,
	backgroundColor: theme.palette.common.white,
	padding: theme.spacing(3, 5, 7, 5),
	boxShadow: 'none',
	width: '100%',
}));

const CardTitle = styled(MuiTypography)(({ theme }) => ({
	color: theme.palette.common.black,
	paddingBottom: theme.spacing(6),
}));

interface CardTemplateProps {
	title: string;
	children: React.ReactNode;
}

const CardTemplate = ({ title, children }: CardTemplateProps) => {
	return (
		<Card>
			<CardTitle variant="h2">{title}</CardTitle>
			{children}
		</Card>
	);
};

export default CardTemplate;
