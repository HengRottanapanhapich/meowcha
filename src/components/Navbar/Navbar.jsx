import styles from "./Navbar.module.css"
import logo from "../../assets/MEOWCHA!(1).svg"

import { useState } from "react"
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <>
        <header>
            <div className={styles.containerNav}>

                <div className={styles.navWrapper}>
                    <nav className="narbar">
                        <ul className={styles.navLinks}>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/AboutPage">About</Link></li>
                            <li><Link to ="/ContactPage">Contact</Link></li>
                            <li><Link to ="/ShopPage">Shop</Link></li>
                        </ul>
                    </nav>
                </div>
                
                <div className={styles.logoContainer}>
                    <Link to="/">
                        <img id={styles.logo} src={logo} alt="meowcha logo"></img>
                    </Link>
                </div>

                <div className={styles.navButtonContainer}>
                    <Link to="/Registerpage"><button id={styles.register}>Register</button></Link>
                    <Link to="/Loginpage"><button id={styles.login}>Login</button></Link>
                </div>


                <div className={styles.hamburgerContainer}>
                    <button
                        className={styles.hamburger}
                        onClick={() => setIsOpen(true)}
                        aria-label="Open menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                        </svg>
                    </button>
                </div>
            </div>

            <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </header>
        </>
    );
}

export default Navbar;