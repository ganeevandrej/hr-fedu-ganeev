import { useNavigate } from 'react-router';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type Error = FetchBaseQueryError | SerializedError | undefined;

const useErrorHandler = (error: Error) => {
	const navigate = useNavigate();

	if (error) {
		if ('status' in error && error.status !== 401) {
			navigate('/error');
		}
	}
};

export { useErrorHandler };
