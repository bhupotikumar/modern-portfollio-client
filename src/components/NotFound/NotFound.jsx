import { Link } from "react-router";

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center p-6 bg-white rounded-2xl shadow-xl max-w-md">
                <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
                <p className="text-gray-500 mb-6">
                    Oops! The page you are looking for does not exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;