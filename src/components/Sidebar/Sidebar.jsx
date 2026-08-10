import styles from './Sidebar.module.css'
import logo from '../../assets/MEOWCHA!(1).svg'
import { Link } from 'react-router-dom';


function Sidebar({ isOpen, onClose }) {
    return (
        <>
            <div
                className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
            />
            <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
                <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </button>

                <ul className={styles.sidebarLinks}>
                    <li><Link to="/" onClick={onClose}>Home</Link></li>
                    <li><Link to="/AboutPage" onClick={onClose}>About</Link></li>
                    <li><Link to="/ContactPage" onClick={onClose}>Contact</Link></li>
                    <li><Link to="/ShopPage" onClick={onClose}>Shop</Link></li>
                </ul>

                <div className={styles.SideButtonContainer}>
                    <button id={styles.login}>Login</button>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;