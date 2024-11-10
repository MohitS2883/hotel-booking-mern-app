import React, { useContext, useState } from 'react';
import LogOutButton from '../components/LogOutButton';
import AccountPageCard from '../components/AccountPageCard';
import MyBookings from "../components/MyBookings.jsx";

function BookingsPage() {

    return (
        <>
        <AccountPageCard />
        <MyBookings />
        <LogOutButton />
        </>
    );
}

export default BookingsPage;
