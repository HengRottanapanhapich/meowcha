import {Routes, Route, useLocation} from 'react-router-dom'
import './App.css'

import Homepage from './pages/Homepage/Homepage.jsx'
// import Aboutpage from './pages/Aboutpage/Aboutpage.jsx'
import Contactpage from './pages/Contactpage/Contactpage.jsx'
import Registerpage from './pages/Registerpage/Registerpage.jsx'
import Navbar from './components/Navbar/Navbar.jsx'

function App() {
    const location = useLocation()

    const hideNavbar = ['/Registerpage', '/Loginpage']
    const showNavbar = !hideNavbar.includes(location.pathname)

    return(
        <>
        {showNavbar && <Navbar />}
        <Routes>
            <Route path='/' element={<Homepage/>}/>
            {/* <Route path='/Aboutpage' element={<Aboutpage/>}/> */}
            <Route path='/Contactpage' element={<Contactpage/>}/>
            {/* <Route path='/Shoppage' element={<Shoppage/>}/> */}
            <Route path='/Registerpage' element={<Registerpage/>}/>
            {/* <Route path='/Loginpage' element={<Loginpage/>}/> */}
        </Routes>
        </>
    );
}

export default App;