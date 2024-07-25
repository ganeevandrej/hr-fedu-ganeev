import React from 'react';
import { Grid, Skeleton } from '@mui/material';
import CardTemplate from './CardTemplate';

type Props = {
	countItems: number;
};

const GeneralSkeleton = ({ countItems }: Props) => {
	const arr = [...Array(countItems).keys()];

	return (
		<CardTemplate title="Общая информация">
			<Grid container rowGap={5}>
				{arr.length !== 0 &&
					arr.map((_, index) => {
						return (
							<Grid key={index} item xs={3}>
								<Skeleton width={'95%'} height={56} animation="wave" variant="rounded" />
							</Grid>
						);
					})}
			</Grid>
		</CardTemplate>
	);
};

export default GeneralSkeleton;
