import styles from './Sidebar.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Authcontext.jsx'


function Sidebar({ isOpen, onClose }) {
    const { currentUser, role, logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        await logout()
        onClose()
        navigate('/')
    }

    return (
        <>
            <div
                className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
                onClick={onClose}
            />
            <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
                <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </button>

                {currentUser && (
                    <div className={styles.profileBlock}>
                        <span className={styles.avatarCircle}>
                            {(currentUser.displayName || currentUser.email || '?').charAt(0).toUpperCase()}
                        </span>
                        <p className={styles.profileName}>
                            {currentUser.displayName || currentUser.email}
                        </p>
                    </div>
                )}

                <ul className={styles.sidebarLinks}>
                    {role !== 'admin' && (
                        <>
                            <li><Link to="/" onClick={onClose}>Home</Link></li>
                            <li><Link to="/AboutPage" onClick={onClose}>About</Link></li>
                            <li><Link to="/ContactPage" onClick={onClose}>Contact</Link></li>
                            <li><Link to="/ShopPage" onClick={onClose}>Shop</Link></li>
                        </>
                    )}
                    {role === 'admin' && (
                        <li><Link to="/AdminPanel" onClick={onClose}>Admin</Link></li>
                    )}
                </ul>

                <div className={styles.SideButtonContainer}>
                    {currentUser ? (
                        <button id={styles.logout} onClick={handleLogout}>Logout</button>
                    ) : (
                        <>
                            <Link to="/Loginpage" onClick={onClose}>
                                <button id={styles.login}>Login</button>
                            </Link>
                            <Link to="/Registerpage" onClick={onClose}>
                                <button id={styles.register}>Register</button>
                            </Link>
                        </>
                    )}
                </div>
            </aside>
        </>
    );
}

export default Sidebar;