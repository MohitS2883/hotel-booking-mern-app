import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

export default function BookedPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`/bookingidspecific?placeid=${id}`);
        setBooking(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchBookings();
  }, [id]);

  return (
      <>
        {booking ? (
            <>
              <div className="flex items-center justify-center rounded-lg mt-2 mb-2">
                <Link to="/account/bookings">
                  <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out">
                    Go Back to Bookings
                  </button>
                </Link>
              </div>

              <div className="container mx-auto py-10">
                <div className="shadow-lg p-8 rounded-xl bg-white max-w-lg mx-auto">
                  <h1 className="text-center text-3xl font-bold text-gray-800 mb-4">Your Booking</h1>
                  <div className="text-gray-700">
                    <h2 className="text-xl font-semibold py-2">{booking.name}</h2>
                    <div className="py-2">
                      <h3 className="font-medium">Check In:</h3>
                      <p className="text-lg">{booking.checkIn ? format(new Date(booking.checkIn), 'dd-MM-yyyy') : 'N/A'}</p>
                    </div>
                    <div className="py-2">
                      <h3 className="font-medium">Check Out:</h3>
                      <p className="text-lg">{booking.checkOut ? format(new Date(booking.checkOut), 'dd-MM-yyyy') : 'N/A'}</p>
                    </div>
                    <div className="py-2">
                      <h3 className="font-medium">Guests:</h3>
                      <p className="text-lg">{booking.guests ? booking.guests : 'N/A'}</p>
                    </div>
                    <div className="py-2">
                      <h3 className="font-medium">Booked on:</h3>
                      <p className="text-lg">{format(new Date(new Date(booking.bookeddate)), 'dd-MM-yyyy HH:mm')} IST</p>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button className="underline">
                    <Link to={`/place/${booking.place}`}>Click here for place details</Link>
                  </button>
                </div>
              </div>
            </>
        ) : (
            <p>Loading...</p>
        )}
      </>
  );
}
