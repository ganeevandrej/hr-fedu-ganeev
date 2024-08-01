import React from 'react';
import { Skeleton, TableCell, TableRow } from '@mui/material';

type Props = {
	countItems: number;
};

const TableSkeleton = ({ countItems }: Props) => {
	const arr = [...Array(countItems).keys()];

	return (
		<TableRow>
			<TableCell colSpan={6}>
				{arr.length !== 0 && arr.map((_, index) => <Skeleton key={index} animation="wave" height="40px" />)}
			</TableCell>
		</TableRow>
	);
};

export default TableSkeleton;
