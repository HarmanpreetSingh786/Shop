/* eslint-disable react/prop-types */
import { Navigate } from "react-router";

function ProtectedRouteForUser ({ children }) {
    let users = null;
    try {
        users = JSON.parse(localStorage.getItem('users'));
    } catch (error) {
        console.error("Error parsing user data:", error);
        // Handle the error gracefully, such as redirecting to a generic error page
        return <Navigate to={'/error'}/>;
    }

    if (users && users.role === "user") {
        return children;
    } else {
        // Handle the case when user is not found or the role is not "user"
        return <Navigate to={'/login'}/>;
    }
}

export default ProtectedRouteForUser;
