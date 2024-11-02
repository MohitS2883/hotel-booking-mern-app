import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountPageCard from '../components/AccountPageCard';
import axios from 'axios';

function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <>
      <AccountPageCard />
      <div className="text-center">
        <Link
          className="inline-flex bg-black text-white rounded-2xl p-2 w-full max-w-sm mt-2 gap-2"
          to={'/account/places/new'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Add new Place
        </Link>
      </div>
      <div className="mt-4 px-8">
        {places.length > 0 &&
          places.map((place) => (
            <div
              key={place._id}
              className="bg-gray-200 p-4 rounded-2xl my-4 flex flex-col items-start"
            >
              <div className="w-full h-48 overflow-hidden rounded-lg mb-2">
                {place.photos.length > 0 && (
                  <img
                    className="w-full h-full object-cover"
                    src={`http://localhost:4000/uploads/${place.photos[0]}`}
                    alt={place.title}
                  />
                )}
              </div>
              <h3 className="text-lg font-semibold">{place.title}</h3>
              <p className="text-gray-700 mt-2">{place.description}</p>
            </div>
          ))}
      </div>
    </>
  );
}

export default PlacesPage;