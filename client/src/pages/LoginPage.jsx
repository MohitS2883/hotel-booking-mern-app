import {useContext, useEffect, useState} from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/userContext";


export default function LoginPage(){
    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')
    const [redirect,setRedirect] = useState(false)
    const {setUser,user} = useContext(UserContext)
    useEffect(() => {
        if (user) {
            setRedirect(true);
        }
    }, [user])
    async function loginUser(e) {
        e.preventDefault();
        try {
            const { data } = await axios.post('/login', {
                email,
                pass
            }, { withCredentials: true });

            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            alert('Login successful');
            setEmail('');
            setPass('');
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please check your credentials and try again.");
        }
    }

    if(redirect){
        console.log("user",user)
        return <Navigate to='/' />
    }
    return (
        <>
            <div className="mt-16 grow flex items-center justify-around">
                <div className="mb-64">
                    <h1 className="text-4xl text-center mb-4">Login</h1>
                    <form className="max-w-md mx-auto" onSubmit={loginUser}>
                        <input type="email" placeholder="your@email.com"
                               value={email}
                               onChange={e => setEmail(e.target.value)}/>
                        <input type="password" placeholder="password"
                               value={pass}
                               onChange={e => setPass(e.target.value)}/>
                        <button className="bg-black text-white rounded-2xl p-2 w-full">Login</button>
                        <div className="text-center py-2 text-gray-500">
                            Don't have an account yet? <Link className="underline text-black hover:text-gray-700"
                                                             to={'/register'}>Register now</Link>
                        </div>
                        <br/>
                        <div className='flex items-center justify-center'>
                            <Link to='/login/discord' href="" className='flex items-center gap-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 24" strokeWidth={1.5}
                                     stroke="currentColor" className="size-10">
                                    <path
                                        d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
                                </svg>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}