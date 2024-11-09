import React from 'react';
import {differenceInCalendarDays} from "date-fns"
import BookingContext from "../context/bookingContext.jsx";
import {useNavigate} from "react-router-dom";

export default function Booking({ place }) {
    const [maxDate, setMaxDate] = React.useState('');
    const [pagcIn,setPagcIn] = React.useState('');
    const [pagcOut,setPagcOut] = React.useState('');
    const [pagguest,setPagguest] = React.useState(1);
    const {checkIn,checkOut,guests,placeid,setCheckIn,setCheckOut,setGuests} = React.useContext(BookingContext);
    const navigate = useNavigate()


    React.useEffect(() => {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + 3);
        const maxDateFormatted = currentDate.toISOString().split('T')[0];
        setMaxDate(maxDateFormatted);
    }, []);
    function handleCheckOut() {
        navigate(`/place/${placeid}/checkout`)
    }
    let days,price
    if(checkIn && checkOut){
        days = differenceInCalendarDays(new Date(checkOut),new Date(checkIn))
        price = place.cost * (days+1) * guests
    }
    return (
        <div className="bg-white shadow p-4 rounded-md">
            <div className="text-2xl mb-2 text-center">
                Price: {place.currency}{place.cost} / per night
            </div>
            <div className="grid grid-cols-2 gap-1">
                <span className="bg-white flex flex-col items-center text-center pb-2">
                    <label>Check in:</label>
                    <input
                        value={pagcIn}
                        onChange={(e) => {setCheckIn(e.target.value);setPagcIn(e.target.value)}}
                        className="bg-gray-200 border border-black rounded-md focus:bg-white focus:outline-none p-1"
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                    />
                </span>
                <span className="bg-white flex flex-col items-center text-center pb-2">
                    <label>Check out:</label>
                    <input
                        value={pagcOut}
                        onChange={(e) => {setCheckOut(e.target.value);setPagcOut(e.target.value)}}
                        className="bg-gray-200 border border-black rounded-md focus:bg-white focus:outline-none p-1"
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        max={maxDate}
                    />
                </span>
            </div>
            <span className="bg-white flex flex-col items-center text-center pb-2">
                <label>No. of Guests:</label>
                <input
                    value={pagguest}
                    onChange={(e) => {setGuests(Number(e.target.value));setPagguest(e.target.value)}}
                    className="bg-gray-200 border border-black rounded-md focus:bg-white focus:outline-none p-1"
                    type="number"
                />
            </span>
            <button onClick={() => handleCheckOut()}
                className="bg-black text-white rounded-2xl p-2 w-full mt-2 hover:bg-gray-500">
                Book This Place
                {days >= 0 && (
                    <span> {days+1} {days>1?'days':'day'}, {place.currency}{price}</span>
                )}
            </button>
        </div>

    );
}
