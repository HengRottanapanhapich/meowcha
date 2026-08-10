import {Routes, Route, useLocation} from 'react-router-dom'
import './App.css'

import Homepage from "./pages/Homepage/Homepage.jsx"

import Navbar from './components/Navbar/Navbar.jsx'

function App() {
    return(
        <>
        <Navbar></Navbar>
        <Routes>
            <Route path='/' element={<Homepage/>}/>
            {/* <Route path='/AboutPage' element={<AboutPage/>}/> */}
            {/* <Route path='/ContactPage' element={<ContactPage/>}/> */}
            {/* <Route path='/ShopPage' element={<ShopPage/>}/> */}
            {/* <Route path='/RegisterPage' element={<RegisterPage/>}/> */}
            {/* <Route path='/LoginPage' element={<LoginPage/>}/> */}
        </Routes>
        </>
    );
}

export default App;