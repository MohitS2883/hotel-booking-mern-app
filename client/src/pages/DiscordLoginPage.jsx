import React, {useState, useContext, useEffect} from 'react'

import UserContext from "../context/userContext.jsx";
import {Navigate} from "react-router-dom";
import axios from "axios";

function DiscordLoginPage() {
    const {user,setUser} = useContext(UserContext);
    const [redirect,setRedirect] = useState(false);
    useEffect(()=>{
        if(user){
            setRedirect(true)
        }
    },[user])
    // const discordlogin = () => {
    //     // Redirect to Discord OAuth login URL
    //     window.location.href = "http://localhost:4000/auth/discord";
    // }
    async function discordlogin() {
        window.location.href = "http://localhost:4000/auth/discord"
        try{
            const data = await axios.get('/auth/discord/callback', {})
            console.log(data)

        }catch(e){
            console.log("Login Error",e)
            alert("Login failed. Sorry Backend problem.");

        }
    }
    if(redirect){
        console.log("user",user)
        return <Navigate to='/' />
    }
    return (
        <div>
            <h1>Click here for Discord Login:</h1>
            <div className={'py-2'}>
                <button
                    className={'bg-gray-200 rounded-md px-3 py-0.5 hover:bg-gray-300'}
                    onClick={discordlogin}
                >
                    Sign in via Discord
                </button>
            </div>
        </div>
    )
}

export default DiscordLoginPage;
