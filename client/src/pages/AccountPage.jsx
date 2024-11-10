import React, { useContext } from 'react';
import LogOutButton from '../components/LogOutButton';
import AccountPageCard from '../components/AccountPageCard';
import UserContext from "../context/userContext.jsx";
import { Navigate } from "react-router-dom";
import UserInfo from "./UserInfo.jsx";

function AccountPage() {
    const { user, ready } = useContext(UserContext);

    if (!ready) {
        return <div>Loading...</div>;  // Display loading while user data is being fetched
    }

    if (!user) {
        return <Navigate to="/" />;  // Redirect to home if the user is not logged in after loading
    }

    return (
        <>
            <AccountPageCard />
            <UserInfo />
            <LogOutButton />
        </>
    );
}

export default AccountPage;
