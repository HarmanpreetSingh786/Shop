/* eslint-disable react/prop-types */
import { Navigate } from "react-router";

function ProtectedRouteForAdmin({ children }) {
    const storedUser = localStorage.getItem('users');
    let user = null;
    try {
        user = JSON.parse(storedUser);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        // Handle the error here, maybe by redirecting to a generic error page
        return <Navigate to={'/error'} />;
    }

    if (user?.role === "admin") {
        return children;
    } else {
        return <Navigate to={'/login'} />;
    }
}

export default ProtectedRouteForAdmin;
