import React from 'react';
import AccountPageCard from '../components/AccountPageCard';
import PlacesPage from './PlacesPage';
import LogOutButton from '../components/LogOutButton';
import MyBookings from "../components/MyBookings.jsx";


function AccommodationsPage() {
    

    return (
        <>
        <PlacesPage /><br/>
        <LogOutButton /><br/>
        </>
    );
}

export default AccommodationsPage;
