import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
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
