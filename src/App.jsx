import {Routes, Route, useLocation} from 'react-router-dom'
import './App.css'

import Homepage from './pages/Homepage/Homepage.jsx'
import Aboutpage from './pages/Aboutpage/Aboutpage.jsx'
import Contactpage from './pages/Contactpage/Contactpage.jsx'
import Shoppage from './pages/Shoppage/Shoppage.jsx'
import Loginpage from './pages/Loginpage/Loginpage.jsx'
import Registerpage from './pages/Registerpage/Registerpage.jsx'
// import AdminPanel from './pages/AdminPanel/AdminPanel.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
// import Protectedroute from './components/Protectedroute/Protectedroute.jsx'
import { AuthProvider } from './Authcontext.jsx'

function App() {
    const location = useLocation()

    const hideNavbar = ['/Registerpage', '/Loginpage']
    const showNavbar = !hideNavbar.includes(location.pathname)

    const hideFooter = ['/RegisterPage', '/LoginPage']
    const showFooter = !hideFooter.includes(location.pathname)

    return(
        <AuthProvider>
            {showNavbar && <Navbar />}
            <Routes>
                <Route path='/' element={<Homepage/>}/>
                <Route path='/Aboutpage' element={<Aboutpage/>}/>
                <Route path='/Contactpage' element={<Contactpage/>}/>
                <Route path='/Shoppage' element={<Shoppage/>}/>
                <Route path='/Registerpage' element={<Registerpage/>}/>
                <Route path='/Loginpage' element={<Loginpage/>}/>
                {/* <Route
                    path='/AdminPanel'
                    element={
                        <Protectedroute requireAdmin>
                            <AdminPanel/>
                        </Protectedroute>
                    }
                /> */}
            </Routes>
            {showFooter && <Footer/>}
        </AuthProvider>
    );
}

export default App;