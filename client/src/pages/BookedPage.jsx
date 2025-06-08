import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

export default function BookedPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

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

  const handleCancel = async () => {
    try {
      const response = await axios.delete(`/bookingsdelete?bookid=${id}`);
      if (response.status === 200) {
        setShowDialog(false)
        window.alert("Booking Cancelled!")

      } else {
        window.alert("Failed to cancel booking");
      }
    } catch (error) {
      window.alert("Error while cancelling booking:", error);
    }finally {
      window.location.href = "http://localhost:5173/account/bookings"
    }
  };


  return (
      <>
        {booking ? (
            <>
              <div className="flex items-center justify-center rounded-lg mt-1.5">
                <Link to="/account/bookings">
                  <button
                      className="bg-black text-white rounded-2xl py-2 px-4 w-full max-w-sm transition duration-300 ease-in-out hover:bg-gray-700">
                    Go Back to Bookings
                  </button>
                </Link>
              </div>

              <div className="container mx-auto py-10">
                <div className="shadow-xl border-black shadow-gray-300 p-8 rounded-xl bg-gray-200 max-w-lg mx-auto">
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

                <div className="flex flex-col items-center text-center mt-4 space-y-4">
                  <button className="text-gray-700 underline hover:text-black">
                    <Link to={`/place/${booking.place}`}>Click here for place details</Link>
                  </button>
                  <button
                      onClick={() => setShowDialog(true)}
                      className="bg-black text-white rounded-2xl py-2 px-4 w-full max-w-sm transition duration-300 ease-in-out hover:bg-red-700"
                  >
                    Cancel My Booking
                  </button>
                </div>

              </div>

              {showDialog && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                      <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Cancellation</h2>
                      <p className="text-gray-700 mb-6">Are you sure you want to cancel this booking?</p>
                      <div className="flex justify-end space-x-4">
                        <button
                            onClick={() => setShowDialog(false)}
                            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                        >
                          No
                        </button>
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          Yes, Cancel
                        </button>
                      </div>
                    </div>
                  </div>
              )}
            </>
        ) : (
            <p>Loading...</p>
        )}
      </>
  );
}
