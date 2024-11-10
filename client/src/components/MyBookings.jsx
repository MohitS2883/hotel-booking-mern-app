import React, { useEffect, useState } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {format} from "date-fns";

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

    useEffect(() => {
        const displa = async () => {
            try {
                console.log(bookings);
            } catch (err) {
                console.error('Error displaying bookings:', err);
            }
        };
        displa();
    }, [bookings]);

    return (
        <div className="mt-4 px-8">
            {bookings.length > 0 ? (
                bookings.map((booking) => (
                    <Link
                        to={`/account/bookings/${booking._id}`}
                        key={booking._id}
                        className="shadow-sm shadow-black transition hover:scale-105 hover:delay-50 bg-gray-200 cursor-pointer p-4 rounded-2xl my-4 flex flex-col items-start"
                    >
                        <div className="booking-item">
                            <h3 className="text-lg font-semibold">{booking.name}</h3>
                            <p className="text-gray-700">Check-in: {format(new Date(booking.checkIn),'dd-MM-yyyy')}</p>
                            <p className="text-gray-700">Check-out: {format(new Date(booking.checkOut),'dd-MM-yyyy')}</p>
                            <p className="text-gray-700">Guests: {booking.guests}</p>
                            <p className="text-gray-700">Total Price: ${booking.totalPrice}</p>
                        </div>
                    </Link>
                ))
            ) : (
                <p>No bookings available</p>
            )}
        </div>


    );
}
