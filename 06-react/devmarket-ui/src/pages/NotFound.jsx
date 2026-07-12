import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <p>404 - Page Not Found</p>
      <Link to="/" className="text-gray-500 hover:text-gray-900">
        Return to Home.
      </Link>
    </div>
  );
};

export default NotFound;
