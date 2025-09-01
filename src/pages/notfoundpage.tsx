import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <main className="not-found">
      <h1 className="not-found__title">404 – Page Not Found</h1>
      <p className="not-found__message">
        Sorry, the page you're looking for does not exist.
      </p>
      <Link to="/" className="not-found__link">
        🔙 Go Back Home
      </Link>
    </main>
  );
};

export default NotFoundPage;