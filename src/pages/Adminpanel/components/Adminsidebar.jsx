import styles from './Adminsidebar.module.css'
import { useAuth } from "../../../Authcontext.jsx"
import { useNavigate } from "react-router-dom"
import logo from '../../../assets/MEOWCHA!(1).svg'

const items = [
    { key: "products", label: "Products"},
    { key: "categories", label: "Categories"},
    { key: "suppliers", label: "Suppliers"},
    { key: "users", label: "Users"},
]

function Adminsidebar({ section, setSection }) {
    const { logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        await logout()
        navigate("/")
    }

    return (
        <aside className={styles.sidebar}>
            <div className={styles.brand}>
                <div className={styles.brandName}><img src={logo} alt="meowcha logo" /></div>
                <div className={styles.brandSub}>Admin Console</div>
            </div>
            <nav className={styles.nav}>
                {items.map((it) => {
                    const active = section === it.key
                    return (
                        <button
                            key={it.key}
                            onClick={() => setSection(it.key)}
                            className={active ? styles.navItemActive : styles.navItem}
                        >
                            <div className={styles.navItemLabel}>{it.label}</div>
                            <div className={styles.navItemHint}>{it.hint}</div>
                        </button>
                    )
                })}
            </nav>

            <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
            </button>
        </aside>
    )
}

export default Adminsidebar