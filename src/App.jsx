import {Routes, Route, useLocation} from 'react-router-dom'
import './App.css'

import Homepage from './pages/Homepage/Homepage.jsx'
import Aboutpage from './pages/Aboutpage/Aboutpage.jsx'
import Contactpage from './pages/Contactpage/Contactpage.jsx'
import Shoppage from './pages/Shoppage/Shoppage.jsx'
import Productdetailpage from './pages/Productdetailpage/Productdetailpage.jsx'
import Loginpage from './pages/Loginpage/Loginpage.jsx'
import Registerpage from './pages/Registerpage/Registerpage.jsx'
import AdminPanel from './pages/Adminpanel/Adminpanel.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import Protectedroute from './components/Protectedroute/Protectedroute.jsx'
import Customeronlyroute from './components/Customeronlyroute/Customeronlyroute.jsx'
import { AuthProvider } from './Authcontext.jsx'

function App() {
    const location = useLocation()

    const hideChrome = ['/Registerpage', '/Loginpage', '/AdminPanel']
    const showNavbar = !hideChrome.includes(location.pathname)
    const showFooter = !hideChrome.includes(location.pathname)

    return(
        <AuthProvider>
            {showNavbar && <Navbar />}
            <Routes>
                <Route path='/' element={<Customeronlyroute><Homepage/></Customeronlyroute>}/>
                <Route path='/Aboutpage' element={<Customeronlyroute><Aboutpage/></Customeronlyroute>}/>
                <Route path='/Contactpage' element={<Customeronlyroute><Contactpage/></Customeronlyroute>}/>
                <Route path='/Shoppage' element={<Customeronlyroute><Shoppage/></Customeronlyroute>}/>
                <Route path='/Productdetail/:id' element={<Customeronlyroute><Productdetailpage/></Customeronlyroute>}/>
                <Route path='/Registerpage' element={<Registerpage/>}/>
                <Route path='/Loginpage' element={<Loginpage/>}/>
                <Route
                    path='/AdminPanel'
                    element={
                        <Protectedroute requireAdmin>
                            <AdminPanel/>
                        </Protectedroute>
                    }
                />
            </Routes>

            {showFooter && <Footer/>}
        </AuthProvider>
    );
}

export default App;