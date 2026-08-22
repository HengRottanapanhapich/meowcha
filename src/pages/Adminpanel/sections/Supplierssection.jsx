import { useEffect, useState } from "react"
import {
    C, PageHeader, PrimaryButton, GhostButton, Table, IconLink, Pill, ConfirmBar,
    Field, FilterBar, SearchInput, Adminuistyles as ui,
} from "../Adminui"
import { subscribeToCollection, addDocument, updateDocument, deleteDocument } from "../../../lib/Firestorecrud"

function emptySupplier() {
    return { name: "", email: "", phone: "", categories: [] }
}

function Supplierssection({ categories }) {
    const [suppliers, setSuppliers] = useState([])
    const [formOpen, setFormOpen] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [draft, setDraft] = useState(emptySupplier())
    const [confirmDeleteId, setConfirmDeleteId] = useState(null)
    const [query, setQuery] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("All")
    
    const categoryOptions = (categories || []).map((c) => c.name)

    useEffect(() => {
        const unsubscribe = subscribeToCollection("suppliers", setSuppliers, "name")
        return unsubscribe
    }, [])

    function openAdd() {
        setEditingId(null)
        setDraft(emptySupplier())
        setFormOpen(true)
    }
    function openEdit(s) {
        setEditingId(s.id)
        setDraft({ name: s.name, email: s.email, phone: s.phone, categories: [...(s.categories || [])] })
        setFormOpen(true)
    }
    function toggleCat(cat) {
        setDraft((d) => ({
            ...d,
            categories: d.categories.includes(cat) ? d.categories.filter((c) => c !== cat) : [...d.categories, cat],
        }))
    }
    async function save() {
        if (!draft.name.trim()) return
        if (editingId == null) {
            await addDocument("suppliers", draft)
        } else {
            await updateDocument("suppliers", editingId, draft)
        }
        setFormOpen(false)
    }
    async function remove(id) {
        await deleteDocument("suppliers", id)
        setConfirmDeleteId(null)
    }

    const filtered = suppliers.filter((s) => {
        const q = query.trim().toLowerCase()
        const matchesQuery = !q || s.name.toLowerCase().includes(q) || (s.email || "").toLowerCase().includes(q)
        const matchesCategory = categoryFilter === "All" || (s.categories || []).includes(categoryFilter)
        return matchesQuery && matchesCategory
    })

    return (
        <div>
            <PageHeader
                eyebrow="Sourcing"
                title="Suppliers"
                action={!formOpen && <PrimaryButton onClick={openAdd}>+ Add supplier</PrimaryButton>}
            />

            {formOpen && (
                <div style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 12, padding: 24, marginBottom: 22 }}>
                    <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 17, marginBottom: 16 }}>
                        {editingId == null ? "New supplier" : "Edit supplier"}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                        <Field label="Company name" placeholder="e.g. Uji Green Co." value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
                        <Field label="Phone number" placeholder="+81 75-000-1122" value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
                        <Field label="Email" placeholder="hello@company.jp" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
                    </div>
                    <div>
                        <label className={ui.label}>Supplies which categories?</label>
                        <div style={{ fontSize: 12, color: C.inkSoft, marginBottom: 8 }}>A supplier can be linked to more than one category — select all that apply.</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {categoryOptions.length === 0 && (
                                <p style={{ fontSize: 12.5, color: C.inkSoft, margin: 0 }}>
                                    No categories yet — add one in the Categories tab first.
                                </p>
                            )}
                            {categoryOptions.map((cat) => {
                                const on = draft.categories.includes(cat)
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => toggleCat(cat)}
                                        style={{
                                            padding: "7px 14px", borderRadius: 20, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
                                            border: `1.5px solid ${on ? C.matcha : C.line}`, background: on ? C.matcha : C.white, color: on ? C.white : C.inkSoft,
                                        }}
                                    >
                                        {cat}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                    <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
                        <PrimaryButton onClick={save}>Save supplier</PrimaryButton>
                        <GhostButton onClick={() => setFormOpen(false)}>Cancel</GhostButton>
                    </div>
                </div>
            )}

            {!formOpen && (
                <FilterBar>
                    <SearchInput value={query} onChange={setQuery} placeholder="Search by company or email…" />
                    <select className={ui.select} style={{ width: 200, background: C.white }} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                        <option value="All">All categories</option>
                        {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                </FilterBar>
            )}

            <Table
                columns={["Company", "Contact", "Categories supplied"]}
                emptyLabel="No suppliers match your filters."
                rows={filtered.map((s) => ({
                    key: s.id,
                    item: s,
                    cells: [
                        s.name,
                        <div key={s.id}>
                            <div>{s.email}</div>
                            <div style={{ color: C.inkSoft, fontSize: 12 }}>{s.phone}</div>
                        </div>,
                        <div key={s.id + "c"}>{(s.categories || []).map((c) => <Pill key={c}>{c}</Pill>)}</div>,
                    ],
                }))}
                renderActions={(s) =>
                    confirmDeleteId === s.id ? (
                        <ConfirmBar label="Delete this supplier?" onConfirm={() => remove(s.id)} onCancel={() => setConfirmDeleteId(null)} />
                    ) : (
                        <>
                            <IconLink onClick={() => openEdit(s)}>Edit</IconLink>
                            <IconLink danger onClick={() => setConfirmDeleteId(s.id)}>Delete</IconLink>
                        </>
                    )
                }
            />
        </div>
    )
}

export default Supplierssection