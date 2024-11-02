import React from 'react'
import { useState } from 'react';
import axios from 'axios'

function Photos({existingPhotos,onChange}) {
  const [photoLink,setPhotoLink] = useState('')
    async function addPhotoByLink(e) {
        e.preventDefault();
        try {
            const { data } = await axios.post('/uploadByLink', { link: photoLink });
            onChange((prev) => [...prev, data.filename]); 
            setPhotoLink('');
        } catch (error) {
            console.error("Error uploading photo:", error);
        }
      }
      function uploadPhoto(e){
        const files = e.target.files
        const data = new FormData()
        for(let i = 0; i < files.length; i++){
          data.append('photos',files[i])
        }
        axios.post('/upload',data,{
          headers:{'Content-Type':'multipart/form-data'}
        }).then(response=>{
          const {data:filenames} = response
          onChange((prev) => [...prev, ...filenames])
        })
      }
  return (
    <>
    <div className="flex gap-2">
              <input
                type="text" 
                placeholder="Add using a link ....jpg" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                value={photoLink} onChange={e => setPhotoLink(e.target.value)}
              />
              <button 
                className="bg-gray-200 text-black px-4 rounded-2xl hover:bg-gray-800 hover:text-white transition-colors duration-200"
                onClick={addPhotoByLink}
              >
                Add Photo
              </button>
            </div>
            
            <div className='mt-2 grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4'>
              {existingPhotos.length > 0 && existingPhotos.map(link=>(
                <div className='h-32 flex' key={link}>
                  <img className='rounded-3xl w-full object-cover p-1' src={`http://localhost:4000/uploads/${link}`} alt="" />
                </div>
              ))}
              <label className='h-32 cursor-pointer flex items-center justify-center border bg-transparent rounded-2xl p-11 text-2xl text-gray-600 gap-2 hover:bg-gray-800 hover:text-white transition-colors duration-200'>
                <input multiple type="file" className='hidden' onChange={uploadPhoto} />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                  <path fillRule="evenodd" d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                </svg>
                  Upload
              </label>
            </div></>
  )
}

export default Photos