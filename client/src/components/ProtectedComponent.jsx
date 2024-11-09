import {useContext} from "react";
import UserContext from '../context/userContext';
import {Navigate} from "react-router-dom";
import BookingContext from "../context/bookingContext.jsx";

const ProtectedComponent = ({children}) => {
    const {user} = useContext(UserContext)
    const {checkIn,checkOut,placeid} = useContext(BookingContext)

    if(!user){
        window.alert('Please Log In first')
        return <Navigate to={"/account"} />
    }
    if(!checkIn){
        window.alert('Check in missing')
        return <Navigate to={`/place/${placeid}`} />
    }
    if(!checkOut){
        window.alert('Check out missing')
        return <Navigate to={`/place/${placeid}`} />
    }
    return children
}

export  default ProtectedComponent