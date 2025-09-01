import React, { ReactNode, ErrorInfo } from "react";

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(): ErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error("Error Boundary Caught:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<main style={{ padding: "2rem", color: "red" }}>
					<h2>Something went wrong.</h2>
					<p>Please try again later or return to the homepage.</p>
				</main>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;