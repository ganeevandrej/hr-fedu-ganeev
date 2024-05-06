import React, { ReactNode } from 'react';
import { setLocale } from 'yup';
import { INTEGER, MAX_LENGTH, POSITIVE, REQUIRED } from './constants';

interface Props {
	children: ReactNode;
}

export const YupProvider = ({ children }: Props) => {
	setLocale({
		mixed: {
			required: REQUIRED,
		},
		number: {
			positive: POSITIVE,
			integer: INTEGER,
		},
		string: {
			max: MAX_LENGTH,
		},
	});

	return <>{children}</>;
};

YupProvider.displayName = 'YupProvider';
