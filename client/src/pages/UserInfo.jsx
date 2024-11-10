import React, { useContext } from 'react'
import UserContext from "../context/userContext.jsx";
import { format } from "date-fns";

function UserInfo() {
  const { user } = useContext(UserContext);
  return (
      <>
        <div className="container mx-auto py-10">
          <div className="shadow-xl shadow-gray-700 p-8 rounded-xl bg-gray-200 max-w-lg mx-auto">
            <h1 className="text-center text-3xl font-bold text-gray-800 mb-4">User Info</h1>
            <div className="text-gray-700">
              <div className="py-2">
                <h3 className="font-medium">Username:</h3>
                <p className="text-lg">{user.name ? user.name : 'Loading...'}</p>
              </div>
              <div className="py-2">
                <h3 className="font-medium">User Email:</h3>
                <p className="text-lg">{user.email ? user.email : 'Loading...'}</p>
              </div>
            </div>
            <div className="text-center text-gray-500 mt-4">
              <p>Don't worry, you've logged in! Your info will appear shortly...</p>
            </div>
          </div>
        </div>
      </>
  )
}

export default UserInfo;
