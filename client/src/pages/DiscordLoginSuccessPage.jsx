import {useEffect, useContext, useState} from "react";
import { useLocation, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import UserContext from "../context/userContext";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default function Dashboard() {
    const query = useQuery();
    const token = query.get("token");
    const { setUser, user } = useContext(UserContext);
    const [isReadyToRedirect, setIsReadyToRedirect] = useState(false);

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
            console.log(decoded)
            console.log(token)
            console.log(user)
            localStorage.setItem("user", JSON.stringify(decoded));
            setIsReadyToRedirect(true);
        }
    }, [token, setUser]);

    if (isReadyToRedirect && user) {
        return <Navigate to="/" />;
    }

    if (!token) {
        return <Navigate to="/login" />;
    }

    return <p>Setting up your discord ...</p>;
}
