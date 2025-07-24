import { Navigate } from "react-router-dom";
import useIsAuthenticated from "../../MyContext/IsAuth";

export default function ProtectedRoute({ children }) {
    const { isLoggedIn ,loading } = useIsAuthenticated();

    if (loading) {
        return <div className="text-center mt-20 text-lg font-semibold">Checking login...</div>;
    }

    if (!isLoggedIn) {
        // Redirect to login if not authenticated
        return <Navigate to="/getoption" replace />;
    }

    // Show the protected page if logged in
    return children;
}
