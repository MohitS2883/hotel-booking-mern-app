import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Booking from "../components/Booking.jsx";
import ExtraInfo from "../components/ExtraInfo.jsx";
import BookingContext from "../context/bookingContext.jsx";

function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [showAllPhotos,setShowAllPhotos] = useState(false)
    const {setId} = React.useContext(BookingContext);
    setId(id)

    useEffect(() => {
        if (id) {
            setId(id);
            const fetchPlace = async () => {
                try {
                    const response = await axios.get(`/places/${id}`);
                    setPlace(response.data);
                } catch (err) {
                    console.error('Error fetching data:', err);
                }
            };
            fetchPlace();
        }
    }, [id, setId]);

    if (!place) return <div className='text-center mt-10'>Loading...</div>;

    if(showAllPhotos) {
        return (
            <>
                <div className="absolute inset-0 min-h-screen bg-black">
                    <div className="p-8 bg-black">
                        <div className="p-2 rounded-2xl flex sticky top-3 z-10 bg-gray-500 text-center">
                            <button
                                className="flex gap-2 py-2 px-4 rounded-2xl bg-transparent text-black hover:bg-gray-500"
                                onClick={() => setShowAllPhotos(!showAllPhotos)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="size-6">
                                    <path
                                        fillRule="evenodd"
                                        d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            <strong className="p-1 text-center text-2xl">Photos of {place.title}</strong>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                            {place?.photos?.length > 0 && place.photos.map(photo => (
                                <div key={photo.id} className="aspect-square">
                                    <img
                                        className="w-full h-full object-cover rounded-2xl transition-transform transform hover:scale-105"
                                        src={`http://localhost:4000/uploads/${photo}`}
                                        alt=""
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const desc = place.description || "";
    const splitText = desc.split(/(?<=[!.])\s+/);
    const photoArr = place.photos || [];
    const perks = place.perks || []
    const extraInfo = place.extraInfo.split(/\n\n+/)

    return (
        <div className='container mx-auto px-4 py-6 bg-gray-100 rounded-xl'>
            <div className='py-2'>
                <h1 className='text-3xl font-bold mb-4'>{place.title}</h1>
                <div className={'flex'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd"
                              d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                              clipRule="evenodd"/>
                    </svg>
                    <a href={`https://maps.google.com?q=${place.address}`} target='_blank'
                       className='block underline font-semibold'>{place.address}</a>
                </div>
            </div>
            <div className='grid gap-4 grid-cols-2 mb-6'>
                {photoArr.length > 0 ? (
                    <>
                        {photoArr[0] && (
                            <img
                                key={0}
                                src={`http://localhost:4000/uploads/${photoArr[0]}`}
                                alt={`Photo of ${place.title}`}
                                className='w-full h-full object-cover rounded-lg shadow-lg'
                            />
                        )}
                        {photoArr[1] && (
                            <img
                                key={1}
                                src={`http://localhost:4000/uploads/${photoArr[1]}`}
                                alt={`Photo of ${place.title}`}
                                className='w-full h-full object-cover rounded-lg shadow-lg'
                            />
                        )}
                    </>
                ) : (
                    <p className='text-center text-gray-500'>No photos available.</p>
                )}
            </div>

            <div className='flex flex-wrap gap-1 mb-6'>
                <div className='flex-1 p-4 rounded-2xl'>
                    <div className={'flex justify-around mb-5'}>
                        <div className='pb-1'>
                            <strong className='text-xl'>Address:</strong><br/>
                            <div className={'flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="size-6">
                                    <path fillRule="evenodd"
                                          d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                          clipRule="evenodd"/>
                                </svg>
                                <a href={`https://maps.google.com?q=${place.address}`} target='_blank'
                                   className='underline'>{place.address}</a>
                            </div>
                        </div>
                        <div className='pb-1'>
                            <strong className='text-sm'>Checkin:</strong>
                            <div className={'flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="size-6">
                                    <path fillRule="evenodd"
                                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                                          clipRule="evenodd"/>
                                </svg>
                                <p className='text-sm p-0.5'>{place.checkIn}</p>
                            </div>
                        </div>
                        <div className='pb-1'>
                            <strong className='text-sm'>Checkout:</strong>
                            <div className={'flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="size-6">
                                    <path fillRule="evenodd"
                                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                                          clipRule="evenodd"/>
                                </svg>
                                <p className='text-sm p-0.5'>{place.checkOut}</p>
                            </div>
                        </div>
                    </div>
                    <div className={'flex justify-around mb-4'}>
                        <div className='pb-1'>
                            <strong className='text-sm'>Max Guests:</strong>
                            <p className='text-sm'>{place.maxGuests}</p>
                        </div>
                        <div className='pb-1'>
                            <strong className='text-sm'>Perks:</strong>
                            <ul className='list-disc list-inside'>
                                {perks.length > 0 && perks.map((sen, index) => (
                                    <li key={index} className='text-gray-950'>{sen}</li>
                                ))}
                            </ul>
                        </div>
                        <div className='pb-1'>
                            <strong className='text-sm'>Price:</strong>
                            <p className='text-sm'>{place.currency}{place.cost}</p>
                        </div>
                    </div>
                    <div className={'flex justify-around mb-4'}>
                        {photoArr.length > 2 && (
                            <div
                                className='inline-flex items-center gap-2 py-2 px-4 duration-200 shadow-lg rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="size-6">
                                    <path fillRule="evenodd"
                                          d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                          clipRule="evenodd"/>
                                </svg>

                                <button onClick={() => setShowAllPhotos(!showAllPhotos)}
                                        className=' text-black px-4 py-2 rounded-2xl'>
                                    Show More Photos
                                </button>
                            </div>
                        )}
                    </div>


                </div>
                <div className='flex-1 bg-slate-300 p-4 rounded-2xl shadow-md'>
                    <strong className='text-xl'>Description:</strong><br/>
                    <ul className='list-disc list-inside'>
                        {splitText.length > 0 && splitText.map((sen, index) => (
                            <li key={index} className='text-gray-950'>{sen}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <ExtraInfo extraInfo={extraInfo}/><br/>
            <Booking place={place}/>
        </div>
    );
}

export default PlacePage;
