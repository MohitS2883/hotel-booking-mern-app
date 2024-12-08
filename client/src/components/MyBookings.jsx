import React, { useEffect, useState } from 'react';
import axios from "axios";
import BookingCard from "./BookingCard.jsx";

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('/userbookings');
                setBookings(response.data);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchBookings();
    }, []);

    return (
        <div className="mt-4 px-8">
            {bookings.length > 0 ? (
                bookings.map((booking) => (
                    <BookingCard key={booking._id} booking={booking} /> // Added key prop here
                ))
            ) : (
                <p>No bookings available</p>
            )}
        </div>
    );
}
