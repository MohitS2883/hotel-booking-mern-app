import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [cancel, setCancel] = useState(false);

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

    const BookingCard = ({ booking }) => (
        <div
            key={booking._id}
            className="shadow-sm shadow-gray-950 hover:shadow-md hover:shadow-black hover:bg-gray-300 bg-gray-200 cursor-pointer p-4 rounded-2xl my-4 flex flex-col items-start"
        >
            <div className="booking-item flex justify-between items-center w-full">
                <div>
                    <h3 className="text-lg font-semibold">{booking.name}</h3>
                    <p className="text-gray-700">
                        Check-in: {format(new Date(booking.checkIn), 'dd-MM-yyyy')}
                    </p>
                    <p className="text-gray-700">
                        Check-out: {format(new Date(booking.checkOut), 'dd-MM-yyyy')}
                    </p>
                    <p className="text-gray-700">Guests: {booking.guests}</p>
                    <p className="text-gray-700">Total Price: ${booking.totalPrice}</p>
                </div>
                {cancel && (
                    <Link to={'/'}>
                        <button
                            className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600"
                            aria-label="Cancel Booking"
                        >
                            Cancel
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );

    return (
        <div className="mt-4 px-8">
            {/* Toggle Cancellation Mode */}
            <div className="mb-4 flex justify-center">
                <button
                    onClick={() => setCancel(!cancel)}
                    className="underline hover:text-gray-700"
                    aria-label="Toggle Cancel Mode"
                >
                    {cancel ? 'Exit Cancel Mode' : 'Wanna Cancel?'}
                </button>
            </div>

            {bookings.length > 0 ? (
                bookings.map((booking) => (
                    cancel ? (
                        <BookingCard key={booking._id} booking={booking} />
                    ) : (
                        <Link
                            to={`/account/bookings/${booking._id}`}
                            key={booking._id}
                        >
                            <BookingCard booking={booking} />
                        </Link>
                    )
                ))
            ) : (
                <p>No bookings available</p>
            )}
        </div>
    );
}
