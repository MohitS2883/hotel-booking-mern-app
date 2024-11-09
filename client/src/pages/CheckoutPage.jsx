import React, { useEffect, useState } from 'react';
import BookingContext from "../context/bookingContext.jsx";
import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";

export default function CheckoutPage() {
    const [place, setPlace] = useState(null);
    const { checkIn, checkOut, guests, placeid } = React.useContext(BookingContext);
    let days, price;

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const response = await axios.get(`/places/${placeid}`);
                setPlace(response.data);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        if (placeid) {
            fetchPlace();
        }
    }, [placeid]);

    if (checkIn && checkOut && place) {
        days = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
        price = place.cost * (days + 1) * guests;
    }

    if (!place) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto py-10">
            <div className="shadow-lg p-8 rounded-xl bg-white max-w-lg mx-auto">
                <h1 className="text-center text-3xl font-bold text-gray-800 mb-4">Your Booking</h1>
                <div className="text-gray-700">
                    <h2 className="text-xl font-semibold py-2">{place.title}</h2>

                    <div className="py-2">
                        <h3 className="font-medium">Check In:</h3>
                        <p className="text-lg">{checkIn ? format(new Date(checkIn), 'dd/MM/yyyy') : 'N/A'}</p>
                    </div>
                    <div className="py-2">
                        <h3 className="font-medium">Check Out:</h3>
                        <p className="text-lg">{checkOut ? format(new Date(checkOut), 'dd/MM/yyyy') : 'N/A'}</p>
                    </div>

                    <div className="py-2">
                        <h3 className="font-medium">Guests:</h3>
                        <p className="text-lg">{guests}</p>
                    </div>

                    <div className="py-2">
                        <h3 className="font-medium">Total Price:</h3>
                        <p className="text-lg">{place.currency}{price}</p>
                    </div>
                </div>

                <div className="flex justify-center mt-4">
                    <button className="bg-black text-white rounded-2xl p-2 w-full max-w-sm mt-2 hover:bg-gray-500 transition hover:scale-105 hover:delay-50">
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
}
