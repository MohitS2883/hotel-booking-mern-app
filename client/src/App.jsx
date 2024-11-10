import './App.css'
import { Route, Routes } from "react-router-dom"
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import ErrorPage from './pages/ErrorPage'
import UserContextProvider from './context/UserContextProvider'
import AccountPage from './pages/AccountPage'
import BookingsPage from './pages/BookingsPage'
import AccommodationsPage from './pages/AccommodationsPage'
import PlacesForm from './components/PlacesForm'
import PlacePage from './pages/PlacePage'
import BookingContextProvider from "./context/BookingContextProvider.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import ProtectedComponent from "./components/ProtectedComponent.jsx";
import BookedPage from "./pages/BookedPage.jsx";
import ProtectAccountData from "./components/ProtectAccountData.jsx";

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <UserContextProvider>
        <BookingContextProvider >
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<IndexPage />} />
              <Route path='login' element={<LoginPage />} />
              <Route path='register' element={<RegisterPage />} />
              <Route path='error' element={<ErrorPage />} />
              <Route path='account' element={<AccountPage />} />
              <Route path='account/bookings' element={<BookingsPage />} />
              <Route path='account/bookings/:id' element={<BookedPage />} />
              <Route path='account/places' element={<AccommodationsPage />} />
              <Route path='account/places/new' element={<PlacesForm />} />
              <Route path='account/places/:id' element={<PlacesForm />} />
              <Route path='/place/:id' element={<PlacePage />} />
              <Route path='/place/:id/checkout' element={
                <ProtectedComponent>
                  <CheckoutPage />
                </ProtectedComponent>
              } />
            </Route>
          </Routes>
        </BookingContextProvider>
      </UserContextProvider>
    </>
  )
}

export default App;
