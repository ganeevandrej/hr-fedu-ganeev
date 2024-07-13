import React from 'react';
import { useNavigate } from 'react-router';
import ErrorBox from '@common/atoms/ErrorBox';

const ErrorPage = () => {
	const navigate = useNavigate();

	const handleRetry = () => {
		navigate('/tasks');
	};

	return <ErrorBox onClick={handleRetry} title="Произошла непредвиденная ошибка. Обратитесь к администратору." />;
};

export default ErrorPage;
