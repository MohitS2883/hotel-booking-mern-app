import {useContext} from "react";
import UserContext from '../context/userContext';
import {Navigate} from "react-router-dom";

const ProtectAccountData = ({children}) => {
    const {user} = useContext(UserContext)

    if(!user){
        window.alert('Please Log In first')
        return <Navigate to={"/account"} />
    }

    return children
}

export  default ProtectAccountData