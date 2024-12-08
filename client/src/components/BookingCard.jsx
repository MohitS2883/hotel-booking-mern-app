import {format} from "date-fns";
import {Link} from "react-router-dom";
import React from "react";

export default function BookingCard({ booking }){
    return (
        <div
            key={booking._id}
            className="shadow-sm shadow-gray-950 bg-gray-200 p-4 rounded-2xl my-4 flex flex-col items-start"
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
                <Link to={`/account/bookings/${booking._id}`}>
                    <button
                        className="bg-black text-white rounded-md px-4 py-2 hover:bg-gray-500"
                        aria-label="Cancel Booking"
                    >
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    )
}