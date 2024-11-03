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
        <div className='container mx-auto px-4 py-6'>
            <p className='text-3xl font-bold text-center mb-6'>{place.title}</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
                {photoArr.length > 0 ? (
                    photoArr.map((photo, index) => (
                        <img
                            key={index}
                            src={`http://localhost:4000/uploads/${photo}`}
                            alt={`Photo of ${place.title}`}
                            className='w-full h-48 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105'
                        />
                    ))
                ) : (
                    <p className='text-center text-gray-500'>No photos available.</p>
                )}
            </div>
            <div className='flex flex-wrap gap-1 mb-6'>
                <div className='flex-1 p-4 rounded-2xl'>
                    <div className='pb-1'>
                        <strong className='text-xl'>Address:</strong>
                        <p>{place.address}</p>
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
