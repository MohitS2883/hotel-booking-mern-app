import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchPlace = async () => {
            try {
                const { data } = await axios.get('/places/' + id);
                setPlace(data);
            } catch (err) {
                console.log('Error fetching data:', err);
            }
        };

        fetchPlace();
    }, [id]);

    if (!place) return <div className='text-center mt-10'>Loading...</div>;

    console.log(place)
    const desc = place.description || "";
    const splitText = desc.split(/(?<=[!.])\s+/);
    const photoArr = place.photos || [];
    const perks = place.perks || []
    const extraInfo = place.extraInfo.split(/\n\n+/)
    console.log(place.extraInfo)

    return (
        <div className='container mx-auto px-4 py-6 bg-gray-100 rounded-xl'>
            <div className='py-2'>
                <h1 className='text-3xl font-bold mb-4'>{place.title}</h1>
                <a href={`https://maps.google.com?q=${place.address}`} target='_blank' className='block underline font-semibold'>{place.address}</a>
            </div>
            <div className='grid gap-4 grid-cols-[1fr_2fr] mb-6'>
                {photoArr.length > 0 ? (
                    <>
                        {photoArr[0] && (
                            <img
                                key={0}
                                src={`http://localhost:4000/uploads/${photoArr[0]}`}
                                alt={`Photo of ${place.title}`}
                                className='w-full h-48 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105'
                            />
                        )}
                        {photoArr[1] && (
                            <img
                                key={1}
                                src={`http://localhost:4000/uploads/${photoArr[1]}`}
                                alt={`Photo of ${place.title}`}
                                className='w-full h-48 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105'
                            />
                        )}
                    </>
                ) : (
                    <p className='text-center text-gray-500'>No photos available.</p>
                )}
            </div>

            <div className='flex flex-wrap gap-1 mb-6'>
                <div className='flex-1 p-4 rounded-2xl'>
                    <div className='pb-1'>
                        <strong className='text-xl'>Address:</strong><br/>
                        <a href={`https://maps.google.com?q=${place.address}`} target='_blank' className='underline'>{place.address}</a>
                    </div>
                    <div className='pb-1'>
                        <strong className='text-sm'>Checkin:</strong>
                        <p className='text-sm'>{place.checkIn}</p>
                    </div>
                    <div className='pb-1'>
                        <strong className='text-sm'>Checkout:</strong>
                        <p className='text-sm'>{place.checkOut}</p>
                    </div>
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
                    {photoArr.length > 2 && (
                    <div className='inline-flex items-center gap-2 py-2 px-4 duration-200 shadow-lg rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                        </svg>

                        <button className=' text-black px-4 py-2 rounded-2xl'>
                            Show More Photos
                        </button>
                    </div>
                )}


                </div>
                <div className='flex-1 bg-slate-300 p-4 rounded-2xl shadow-md'>
                    <strong className='text-xl'>Description:</strong><br />
                    <ul className='list-disc list-inside'>
                        {splitText.length > 0 && splitText.map((sen, index) => (
                            <li key={index} className='text-gray-950'>{sen}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='flex-1 bg-slate-300 p-4 rounded-2xl shadow-md'>
                    <strong className='text-xl'>Extra Info:</strong><br />
                    <ul className='list-disc list-inside'>
                        {extraInfo.length > 0 && extraInfo.map((sen, index) => (
                            <li key={index} className='text-gray-950'>{sen}</li>
                        ))}
                    </ul>
            </div>
            
        </div>
    );
}

export default PlacePage;
