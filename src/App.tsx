import AuthLayout from './_auth/AuthLayout'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import RootLayout from './_root/RootLayout'
import { Home } from './_root/pages'
import AddClient from './_root/pages/AddClient'
import AppointmentDetails from './_root/pages/AppointmentDetails'
import Appointments from './_root/pages/Appointments'
import ClientDetails from './_root/pages/ClientDetails'
import Clients from './_root/pages/Clients'
import CreateAppointment from './_root/pages/CreateAppointment'
import EditAppointment from './_root/pages/EditAppointment'
import EditClient from './_root/pages/EditClient'
import Messages from './_root/pages/Messages'
import Profile from './_root/pages/Profile'
import UpdateProfile from './_root/pages/UpdateProfile'
import './globals.css'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <main className = "flex h-screen">
        <Routes>
            <Route element = {<AuthLayout/>}>
                <Route path="/sign-in" element={<SigninForm />} />
                <Route path="/sign-up" element={<SignupForm />} />
            </Route>

            <Route element = {<RootLayout/>}>
                <Route index element = {<Home/>}/>
                <Route path = "/appointments" element = {<Appointments/>}/>
                <Route path = "/appointments/:id" element = {<AppointmentDetails/>}/>
                <Route path = "/update-appointment/:id" element = {<EditAppointment/>}/>
                <Route path = "/create-appointment" element = {<CreateAppointment/>}/>
                <Route path = "/clients" element = {<Clients/>}/>
                <Route path = "/clients/:id" element = {<ClientDetails/>}/>
                <Route path = "/add-client" element = {<AddClient/>}/>
                <Route path = "/edit-clients/:id" element = {<EditClient/>}/>
                <Route path = "/messages" element = {<Messages/>}/>
                <Route path = "/profile/:id" element = {<Profile/>}/>
                <Route path = "/update-profile/:id" element = {<UpdateProfile/>}/>

            </Route>
            

        </Routes>
    </main>
  )
}

export default App