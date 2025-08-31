# Hotel Booking MERN App

A full-stack hotel booking application built using the MERN stack (MongoDB, Express.js, React, Node.js) with Discord OAuth authentication.

## Features

- **User Authentication**: Secure login and registration using Discord OAuth.
- **Hotel Management**: Add, edit, and delete hotel listings.
- **Booking System**: Users can book rooms, view their bookings, and manage them.
- **Future Plans**:
  - Admin dashboard for managing users, bookings, and hotels
  - Rating system for hotels
  - Prevent double bookings

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js (running on port 4000)
- **Database**: MongoDB
- **Authentication**: Discord OAuth
- **Styling**: Tailwind CSS

## Installation

### Backend

1. Clone the repository:

   ```bash
   git clone https://github.com/MohitS2883/hotel-booking-mern-app.git
   cd hotel-booking-mern-app
   ```

2. Navigate to the backend directory and install dependencies:

   ```bash
   cd api
   npm install
   ```

3. Create a `.env` file in the `api/` directory and add the following environment variables:

   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   DISCORD_CLIENT_ID=your_discord_client_id
   DISCORD_CLIENT_SECRET=your_discord_client_secret
   DISCORD_REDIRECT_URI=your_discord_redirect_uri
   ```

4. Start the backend server:

   ```bash
   nodemon index.mjs
   ```

### Frontend

1. Navigate to the frontend directory and install dependencies:

   ```bash
   cd client
   npm install
   ```

2. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend will be available on a port like `5173` or `5174`.

---

## Usage

- Visit the frontend URL (e.g., `http://localhost:5173`) to access the application.
- Use Discord OAuth to log in or register.
- Browse available hotels, make bookings, and manage your profile.

---

## Known Issues

- Discord OAuth: Currently experiencing issues with Discord OAuth authentication. Contributions are welcome.

---

## License

This project is open-source and available under the MIT License.
