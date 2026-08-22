import styles from './Adminsidebar.module.css'
import { useAuth } from "../../../Authcontext.jsx"
import { useNavigate } from "react-router-dom"

const items = [
    { key: "products", label: "Products", hint: "Add, edit, remove" },
    { key: "categories", label: "Categories", hint: "Matcha, Bowl, Whisk…" },
    { key: "suppliers", label: "Suppliers", hint: "Companies & sourcing" },
    { key: "users", label: "Users", hint: "Enable / disable" },
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
                <div className={styles.brandName}>Meowcha</div>
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