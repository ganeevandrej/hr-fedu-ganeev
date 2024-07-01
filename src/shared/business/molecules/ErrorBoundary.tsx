import React, { ReactNode } from 'react';
import ErrorBox from '@common/atoms/ErrorBox';

interface Props {
	children?: ReactNode;
}

interface State {
	hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
	public state: State = {
		hasError: false,
	};

	public static getDerivedStateFromError(): State {
		return { hasError: true };
	}

	handleRetry = () => {
		this.setState({ hasError: false });
	};

	render(): React.ReactNode {
		const { hasError } = this.state;

		if (hasError) {
			return (
				<ErrorBox onClick={this.handleRetry} title="Произошла непредвиденная ошибка. Обратитесь к администратору." />
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
