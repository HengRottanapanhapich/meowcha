import styles from "./Navbar.module.css"
import logo from "../../assets/MEOWCHA!(1).svg"

import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar'
import { useAuth } from '../../Authcontext.jsx'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false); // sidebar
    const [profileOpen, setProfileOpen] = useState(false); // dropdown
    const dropdownRef = useRef(null)

    const { currentUser, role, logout } = useAuth()
    const navigate = useNavigate()

    // close the dropdown when clicking anywhere outside of it
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setProfileOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    async function handleLogout() {
        await logout()
        setProfileOpen(false)
        navigate('/')
    }

    const initials = currentUser?.displayName
        ? currentUser.displayName.charAt(0).toUpperCase()
        : currentUser?.email?.charAt(0).toUpperCase() || '?'

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
                            {role === 'admin' && <li><Link to="/AdminPanel">Admin</Link></li>}
                        </ul>
                    </nav>
                </div>
                
                <div className={styles.logoContainer}>
                    <Link to="/">
                        <img id={styles.logo} src={logo} alt="meowcha logo"></img>
                    </Link>
                </div>

                {currentUser ? (
                    <div className={styles.profileContainer} ref={dropdownRef}>
                        <button
                            className={styles.profileButton}
                            onClick={() => setProfileOpen((open) => !open)}
                            aria-label="Account menu"
                        >
                            <span className={styles.avatarCircle}>{initials}</span>
                        </button>

                        {profileOpen && (
                            <div className={styles.profileDropdown}>
                                <p className={styles.profileName}>
                                    {currentUser.displayName || currentUser.email}
                                </p>
                                <Link to="/Shoppage" className={styles.dropdownLink} onClick={() => setProfileOpen(false)}>
                                    My orders
                                </Link>
                                <button className={styles.logoutButton} onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={styles.navButtonContainer}>
                        <Link to="/Registerpage"><button id={styles.register}>Register</button></Link>
                        <Link to="/Loginpage"><button id={styles.login}>Login</button></Link>
                    </div>
                )}


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