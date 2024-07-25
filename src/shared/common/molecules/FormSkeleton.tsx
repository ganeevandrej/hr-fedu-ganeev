import React from 'react';
import CardTemplate from '@common/molecules/CardTemplate';
import { Grid, Skeleton } from '@mui/material';

type Props = {
	hasComment?: boolean;
	title: string;
};

const FormSkeleton = ({ title, hasComment }: Props) => {
	const arr = [...Array(hasComment ? 3 : 4).keys()];

	const commentSkeleton = hasComment && (
		<Grid item xs={12}>
			<CardTemplate title="Комментарий">
				<Skeleton animation="wave" variant="rounded" width={'100%'} height={96} />
			</CardTemplate>
		</Grid>
	);

	return (
		<Grid container rowGap={8}>
			<CardTemplate title={title}>
				<Grid container rowGap={5}>
					{arr.length !== 0 &&
						arr.map((_, index) => {
							return (
								<Grid key={index} item xs={4}>
									<Skeleton width={'95%'} height={80} animation="wave" variant="rounded" />
								</Grid>
							);
						})}
				</Grid>
			</CardTemplate>
			{commentSkeleton}
		</Grid>
	);
};

export default FormSkeleton;
