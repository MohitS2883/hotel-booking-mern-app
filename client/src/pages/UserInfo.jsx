import React, {useContext, useEffect, useState} from 'react';
import UserContext from "../context/userContext.jsx";
import axios from "axios";

function UserInfo() {
  const { user } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [userName,setUserName] = useState(user.name);
  const [userMail,setUserMail] = useState(user.email);

  async function handleChange(){
      try{
        let userData = JSON.parse(localStorage.getItem('user'));
        if(userData){
          userData.username = userName;
          userData.email = userMail;
          localStorage.setItem('user', JSON.stringify(userData));
        }
        const response = await axios.patch('/updateDeets',
            {userId:user.id,
              username:userName,
              email:userMail}
        )
        if(response.status === 200){
          alert('Update Successful');
        }else{
          console.log('Failed to update')
        }
        setEditMode(false);
      }catch(error){
        console.log(error)
        alert('Update failed. Please try again.')
      }
  }

  return (
      <div className="container mx-auto py-10">
        <div className="shadow-xl shadow-gray-700 p-8 rounded-xl bg-gray-200 max-w-lg mx-auto">
          <h1 className="text-center text-3xl font-bold text-gray-800 mb-4">User Info</h1>

          <button onClick={() => setEditMode(!editMode)} className="flex hover:underline">
            {editMode? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                        clipRule="evenodd"/>
                </svg>

            ) : (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path
                  d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"/>
              <path
                  d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"/>
            </svg>)}
            {editMode? 'Cancel' : 'Edit'}
          </button>

          <div className="text-gray-700 mt-4">
            {editMode ? (
                <>
                  <div className="py-2">
                    <h3 className="font-medium">Username:</h3>
                    <input
                        type="text"
                        name="name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="text-lg p-2 border border-gray-300 rounded w-full"
                    />
                  </div>
                  <div className="py-2">
                    <h3 className="font-medium">User Email:</h3>
                    <input
                        type="email"
                        name="email"
                        value={userMail}
                        onChange={(e)=>setUserMail(e.target.value)}
                        className="text-lg p-2 border border-gray-300 rounded w-full"
                    />
                  </div>
                  <div className={'text-center max-w-lg mx-auto'}>
                    <button
                        onClick={handleChange}
                        className={'bg-black text-white rounded-2xl p-2 w-full max-w-sm mt-2 hover:bg-gray-500 transition hover:scale-105 hover:delay-50'}>
                      Done
                    </button>
                  </div>
                </>
            ) : (
                <>
                  <div className="py-2">
                    <h3 className="font-medium">Username:</h3>
                    <p className="text-lg">{userName || 'Loading...'}</p>
                  </div>
                  <div className="py-2">
                    <h3 className="font-medium">User Email:</h3>
                    <p className="text-lg">{userMail || 'Loading...'}</p>
                  </div>
                  {/*<div className="py-2">*/}
                  {/*  <h3 className="font-medium">User Id:</h3>*/}
                  {/*  <p className="text-lg">{user.id || 'Loading...'}</p>*/}
                  {/*</div>*/}
                </>
            )}
          </div>
        </div>
      </div>
  );
}

export default UserInfo;
