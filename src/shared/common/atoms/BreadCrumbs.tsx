import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Breadcrumbs as MuiBreadcrumbs, Link, styled, Typography } from '@mui/material';

export interface BreadcrumbItem {
	label: string;
	to?: string;
}

interface Props {
	items: BreadcrumbItem[];
	title: string;
}

const Breadcrumbs = styled(MuiBreadcrumbs)({
	marginTop: '8px',
});

const BreadCrumbs: React.FC<Props> = ({ items, title }) => {
	return (
		<Breadcrumbs aria-label="breadcrumb">
			{items.map((item, index) => (
				<Link key={index} underline="hover" component={RouterLink} color="inherit" to="/tasks">
					{item.label}
				</Link>
			))}
			<Typography>{title}</Typography>
		</Breadcrumbs>
	);
};

export default BreadCrumbs;
