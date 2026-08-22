import { useEffect, useState } from "react"
import badgeStyles from './Userssection.module.css'
import { PageHeader, Table, IconLink, FilterBar, SearchInput, Adminuistyles as ui } from "../Adminui"
import { subscribeToCollection, updateDocument } from "../../../lib/Firestorecrud"

function StatusBadge({ status }) {
    const active = status !== "disabled"
    return (
        <span className={active ? badgeStyles.statusActive : badgeStyles.statusDisabled}>
            {active ? "Active" : "Disabled"}
        </span>
    )
}

function Userssection() {
    const [users, setUsers] = useState([])
    const [query, setQuery] = useState("")

    useEffect(() => {
        const unsubscribe = subscribeToCollection("users", setUsers, "createdAt")
        return unsubscribe
    }, [])

    async function toggleStatus(user) {
        await updateDocument("users", user.id, {
            status: user.status === "disabled" ? "active" : "disabled",
        })
    }

    const filtered = users.filter((u) => {
        const q = query.trim().toLowerCase()
        if (!q) return true
        return (u.name || "").toLowerCase().includes(q) || (u.email || "").toLowerCase().includes(q)
    })

    return (
        <div>
            <PageHeader eyebrow="Accounts" title="Users" />
            <div className={ui.infoBanner}>
                View only — accounts are created through sign-up and secured by Firebase. Admins can disable an account but cannot edit emails or passwords here.
            </div>
            <FilterBar>
                <SearchInput value={query} onChange={setQuery} placeholder="Search by name or email…" />
            </FilterBar>
            <Table
                columns={["Name", "Email", "Role", "Status"]}
                emptyLabel="No users match your search."
                rows={filtered.map((u) => ({
                    key: u.id,
                    item: u,
                    cells: [u.name || "—", u.email, u.role, <StatusBadge key={u.id} status={u.status} />],
                }))}
                renderActions={(u) => (
                    <IconLink danger={u.status !== "disabled"} onClick={() => toggleStatus(u)}>
                        {u.status === "disabled" ? "Enable" : "Disable"}
                    </IconLink>
                )}
            />
        </div>
    )
}

export default Userssection