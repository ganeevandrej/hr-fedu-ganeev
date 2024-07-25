import React from 'react';
import { Grid } from '@mui/material';
import FormSkeleton from './FormSkeleton';
import GeneralSkeleton from './GeneralSkeleton';

type Props = {
	title: string;
	countGeneralItems: number;
	hasComment?: boolean;
};

const SkeletonTemplate = ({ title, countGeneralItems, hasComment }: Props) => {
	const formSkeleton = hasComment ? <FormSkeleton hasComment title={title} /> : <FormSkeleton title={title} />;

	return (
		<Grid container rowGap={6}>
			<Grid item xs={12}>
				<GeneralSkeleton countItems={countGeneralItems} />
			</Grid>
			<Grid item xs={12}>
				{formSkeleton}
			</Grid>
		</Grid>
	);
};

export default SkeletonTemplate;
