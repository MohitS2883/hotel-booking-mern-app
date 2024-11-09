import React from 'react';
import BookingContext from "./bookingContext.jsx";

const BookingContextProvider = ({children}) =>{
    const [checkIn,setCheckIn] = React.useState('');
    const [checkOut,setCheckOut] = React.useState('');
    const [guests,setGuests] = React.useState(1);
    const [placeid,setId] = React.useState(1);
    React.useEffect(() => {
        setCheckIn('');
        setCheckOut('');
    }, [placeid]);
    return(
        <BookingContext.Provider value={{checkIn,checkOut,guests,placeid,setId,setCheckIn,setCheckOut,setGuests}}>
            {children}
        </BookingContext.Provider>
    )
}

export default BookingContextProvider