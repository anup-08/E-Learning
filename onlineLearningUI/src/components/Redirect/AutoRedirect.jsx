import { useLocation , useNavigate } from "react-router-dom";
import useIsAuthenticated from "../../MyContext/IsAuth";
import { useEffect } from "react";


export default function AutoRedirect() {
    const { isLoggedIn } = useIsAuthenticated();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Don't redirect on login or signup page
        if (!isLoggedIn && !["/login", "/signup"].includes(location.pathname)) {
            const timer = setTimeout(() => {
                navigate("/getoption");
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, navigate, location]);

    return null;
}
