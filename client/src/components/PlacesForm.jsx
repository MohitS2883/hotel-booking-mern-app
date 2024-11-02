import React from 'react'
import { useState } from 'react'
import Perks from '../components/Perks'
import Photos from '../components/Photos'
import axios from 'axios'
import {Navigate} from 'react-router-dom'
import AccountPageCard from './AccountPageCard'

function PlacesForm() {
    const [title,setTitle] = useState('')
    const [address,setAddress] = useState('')
    const [description,setDescription] = useState('')
    const [perks,setPerks] = useState('')
    const [extraInfo,setExtraInfo] = useState('')
    const [checkIn,setCheckIn] = useState('')
    const [checkOut,setCheckOut] = useState('')
    const [guestInfo,setGuestInfo] = useState(1)
    const [existingPhotos,setAddedPhotos] = useState([])
    const [redirect,setRedirect] = useState('')
    function inputHeader(text){
        return(
        <h2 className='text-2xl mt-4'>{text}</h2>
        )
    }
    function inputDescription(text){
        return(
        <p className='text-gray-700 text-sm'>{text}</p>
        )
    }
    function preInput(header,description){
        return(
        <>
            {inputHeader(header)}
            {inputDescription(description)}
        </>
        )
    }
    async function addNewPlace(e){
        e.preventDefault()
        const placeData = {title, address, existingPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, guestInfo}
        await axios.post('/places',placeData)
        setRedirect('/account/places')
    }
    if(redirect){
        return <Navigate to={redirect}/>
    }
    return (
        <>
        <AccountPageCard />
        <div className='px-5'>
            <form onSubmit={addNewPlace}>
                {preInput('Title','Title for your place')}
                <input type="text" placeholder='title, for example: My lovely apt'
                value={title}
                onChange={e => setTitle(e.target.value)}/>
                {preInput('Address','Address of your place')}
                <input type="text" placeholder='address'
                value={address} onChange={e => setAddress(e.target.value)}/>
                {preInput('Photos','more = better\n upload http photos no data: links')}
                <Photos existingPhotos={existingPhotos} onChange={setAddedPhotos}/>
                {preInput('Description','Description of the place')}
                <textarea value={description} onChange={e=>setDescription(e.target.value)}/>
                {preInput('Perks','Select all the perks of your place')}
                <div className='mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                <Perks selected={perks} onChange={setPerks} />
                </div>
                {preInput('Extra Info','house rules, etc')}
                <textarea value={extraInfo} onChange={e=> setExtraInfo(e.target.value)}/>
                {preInput('Check in & out times, max guests','Check in times, remember to have some time window for cleaning the room between guests')}
                <div className='grid gap-2 sm:grid-cols-3'>
                <div>
                    <h3 className='mt-2 -mb-1'>Check in time</h3>
                    <input type="text" placeholder='14:00'
                    value={checkIn} onChange={e=> setCheckIn(e.target.value)} />
                </div>
                <div>
                    <h3 className='mt-2 -mb-1'>Check out time</h3>
                    <input type="text" placeholder='14:00'
                    value={checkOut} onChange={e => setCheckOut(e.target.value)}/>
                </div>
                <div>
                    <h3 className='mt-2 -mb-1'>Max. no. of guests</h3>
                    <input type="number" placeholder='like 4?'
                    value={guestInfo} onChange={e => setGuestInfo(e.target.value)}/>
                </div>
                </div>
                <div className='w-full'>
                <button className="mt-4 w-full bg-gray-200 text-black px-4 py-2 rounded-2xl hover:bg-gray-800 hover:text-white transition-colors duration-200">Save</button>
                </div><br/>
            </form>

            </div>
        </>
    )
}

export default PlacesForm