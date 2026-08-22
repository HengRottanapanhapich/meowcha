import { useEffect, useState } from "react"
import {
    C, PageHeader, PrimaryButton, GhostButton, Table, IconLink, Pill, ConfirmBar,
    Field, FilterBar, SearchInput, colorRelevantCategories, Adminuistyles as ui,
} from "../Adminui"
import ImageUploadField from "../components/Imageuploadfield"
import { subscribeToCollection, addDocument, updateDocument, deleteDocument } from "../../../lib/Firestorecrud"

function emptyProduct(categories, suppliers) {
    return {
        name: "", price: "", stock: "",
        category: categories[0]?.name || "",
        supplier: suppliers[0]?.name || "",
        description: "", setItems: [], colors: [], image: "", isBestSeller: false,
    }
}

function Productssection({ categories, suppliers, colorOptions, addColorOption }) {
    const [products, setProducts] = useState([])
    const [formOpen, setFormOpen] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [draft, setDraft] = useState(emptyProduct(categories, suppliers))
    const [newSetItem, setNewSetItem] = useState("")
    const [newColorName, setNewColorName] = useState("")
    const [confirmDeleteId, setConfirmDeleteId] = useState(null)
    const [query, setQuery] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("All")

    useEffect(() => {
        const unsubscribe = subscribeToCollection("products", setProducts, "name")
        return unsubscribe
    }, [])

    function openAdd() {
        setEditingId(null)
        setDraft(emptyProduct(categories, suppliers))
        setFormOpen(true)
    }
    function openEdit(p) {
        setEditingId(p.id)
        setDraft({
            name: p.name, price: p.price, stock: p.stock, category: p.category, supplier: p.supplier,
            description: p.description, setItems: [...(p.setItems || [])], colors: [...(p.colors || [])],
            image: p.image || "", isBestSeller: !!p.isBestSeller,
        })
        setFormOpen(true)
    }
    async function save() {
        if (!draft.name.trim()) return
        if (editingId == null) {
            await addDocument("products", draft)
        } else {
            await updateDocument("products", editingId, draft)
        }
        setFormOpen(false)
    }
    async function remove(id) {
        await deleteDocument("products", id)
        setConfirmDeleteId(null)
    }
    function addSetItem() {
        if (!newSetItem.trim()) return
        setDraft((d) => ({ ...d, setItems: [...d.setItems, newSetItem.trim()] }))
        setNewSetItem("")
    }
    function removeSetItem(i) {
        setDraft((d) => ({ ...d, setItems: d.setItems.filter((_, idx) => idx !== i) }))
    }
    function addNewColorOption() {
        const name = newColorName.trim()
        if (!name) return
        addColorOption(name)
        setDraft((d) => (d.colors.includes(name) ? d : { ...d, colors: [...d.colors, name] }))
        setNewColorName("")
    }

    const isSet = draft.category === "Set"

    const filtered = products.filter((p) => {
        const q = query.trim().toLowerCase()
        const matchesQuery = !q || p.name.toLowerCase().includes(q)
        const matchesCategory = categoryFilter === "All" || p.category === categoryFilter
        return matchesQuery && matchesCategory
    })

    return (
        <div>
            <PageHeader
                eyebrow="Catalog"
                title="Products"
                action={!formOpen && <PrimaryButton onClick={openAdd}>+ Add product</PrimaryButton>}
            />

            {formOpen && (
                <div style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 12, padding: 24, marginBottom: 24 }}>
                    <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 17, marginBottom: 16 }}>
                        {editingId == null ? "New product" : "Edit product"}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 24 }}>
                        <div>
                            <ImageUploadField value={draft.image} onChange={(url) => setDraft({ ...draft, image: url })} />
                            <div style={{ marginTop: 16 }}>
                                <Field label="Stock quantity" placeholder="e.g. 42" value={draft.stock} onChange={(e) => setDraft({ ...draft, stock: e.target.value })} />
                            </div>
                        </div>

                        <div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                                <Field label="Product name" placeholder="Ceremonial Starter Set" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
                                <Field label="Price" placeholder="38.00" value={draft.price} onChange={(e) => setDraft({ ...draft, price: e.target.value })} />
                            </div>

                            <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, fontSize: 13.5, color: C.ink, cursor: "pointer" }}>
                                <input type="checkbox" checked={draft.isBestSeller} onChange={(e) => setDraft({ ...draft, isBestSeller: e.target.checked })} style={{ width: 16, height: 16, cursor: "pointer" }} />
                                Mark as best seller
                            </label>

                            <div style={{ marginBottom: 16 }}>
                                <label className={ui.label}>Category</label>
                                <select className={ui.select} value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })}>
                                    {categories.map((c) => (
                                        <option key={c.id} value={c.name}>{c.name}</option>
                                    ))}
                                </select>
                            </div>

                            {colorRelevantCategories.includes(draft.category) && (
                                <div style={{ marginBottom: 16 }}>
                                    <label className={ui.label}>Colors available</label>
                                    <div style={{ fontSize: 12, color: C.inkSoft, marginBottom: 8 }}>Select all colors this product comes in — stock is shared across all of them.</div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                                        {colorOptions.map((col) => {
                                            const on = draft.colors.includes(col)
                                            return (
                                                <button
                                                    key={col}
                                                    onClick={() => setDraft((d) => ({ ...d, colors: on ? d.colors.filter((c) => c !== col) : [...d.colors, col] }))}
                                                    style={{
                                                        padding: "7px 14px", borderRadius: 20, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
                                                        border: `1.5px solid ${on ? C.matcha : C.line}`, background: on ? C.matcha : C.white, color: on ? C.white : C.inkSoft,
                                                    }}
                                                >
                                                    {col}
                                                </button>
                                            )
                                        })}
                                    </div>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        <input
                                            value={newColorName}
                                            onChange={(e) => setNewColorName(e.target.value)}
                                            placeholder="Don't see the color? Add a new one…"
                                            className={ui.input}
                                            style={{ flex: 1, maxWidth: 260, background: C.white }}
                                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addNewColorOption())}
                                        />
                                        <button onClick={addNewColorOption} style={{ padding: "0 16px", borderRadius: 8, border: `1px solid ${C.matcha}`, background: C.white, color: C.matcha, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                                            + Add color
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div style={{ marginBottom: 16 }}>
                                <label className={ui.label}>Supplier</label>
                                <select className={ui.select} value={draft.supplier} onChange={(e) => setDraft({ ...draft, supplier: e.target.value })}>
                                    {suppliers.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
                                </select>
                            </div>

                            <div style={{ marginBottom: 16 }}>
                                <label className={ui.label}>Description</label>
                                <textarea
                                    rows={4}
                                    placeholder="Shown on the product detail page — flavor notes, origin, how to use it…"
                                    className={ui.input}
                                    style={{ resize: "none", fontFamily: "inherit" }}
                                    value={draft.description}
                                    onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                                />
                            </div>

                            {isSet && (
                                <div style={{ background: C.creamDark, border: `1px solid ${C.line}`, borderRadius: 10, padding: 16, marginBottom: 8 }}>
                                    <label className={ui.label}>Set includes</label>
                                    <div style={{ fontSize: 12, color: C.inkSoft, marginBottom: 10 }}>Listed separately from the description, shown as a checklist on the product page.</div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
                                        {draft.setItems.map((item, i) => (
                                            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: C.white, border: `1px solid ${C.line}`, borderRadius: 7, padding: "8px 12px" }}>
                                                <span style={{ fontSize: 13 }}>• {item}</span>
                                                <button onClick={() => removeSetItem(i)} style={{ background: "none", border: "none", color: C.danger, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Remove</button>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        <input
                                            value={newSetItem}
                                            onChange={(e) => setNewSetItem(e.target.value)}
                                            placeholder="e.g. Bamboo scoop (chashaku)"
                                            className={ui.input}
                                            style={{ flex: 1, background: C.white }}
                                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSetItem())}
                                        />
                                        <button onClick={addSetItem} style={{ padding: "0 16px", borderRadius: 8, border: `1px solid ${C.matcha}`, background: C.white, color: C.matcha, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                                            + Add item
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
                                <PrimaryButton onClick={save}>Save product</PrimaryButton>
                                <GhostButton onClick={() => setFormOpen(false)}>Cancel</GhostButton>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!formOpen && (
                <FilterBar>
                    <SearchInput value={query} onChange={setQuery} placeholder="Search by product name…" />
                    <select className={ui.select} style={{ width: 200, background: C.white }} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                        <option value="All">All categories</option>
                        {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                </FilterBar>
            )}

            <Table
                columns={["Name", "Price", "Stock", "Category", "Color", "Supplier"]}
                emptyLabel="No products match your filters."
                rows={filtered.map((p) => ({
                    key: p.id,
                    item: p,
                    cells: [
                        <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            {p.image ? (
                                <img src={p.image} alt={p.name} style={{ width: 34, height: 34, borderRadius: 7, objectFit: "cover", flexShrink: 0 }} />
                            ) : (
                                <div style={{ width: 34, height: 34, borderRadius: 7, background: C.creamDark, flexShrink: 0 }} />
                            )}
                            <div>
                                <div>{p.name}</div>
                                {p.isBestSeller && <span style={{ fontSize: 10.5, fontWeight: 700, color: C.clay }}>★ Best seller</span>}
                            </div>
                        </div>,
                        `$${Number(p.price || 0).toFixed(2)}`,
                        p.stock,
                        <Pill key={p.id + "cat"}>{p.category}</Pill>,
                        colorRelevantCategories.includes(p.category) && (p.colors || []).length > 0
                            ? <div key={p.id + "colors"}>{p.colors.map((c) => <Pill key={c}>{c}</Pill>)}</div>
                            : <span style={{ color: C.inkSoft }}>—</span>,
                        p.supplier,
                    ],
                }))}
                renderActions={(p) =>
                    confirmDeleteId === p.id ? (
                        <ConfirmBar label="Delete this product?" onConfirm={() => remove(p.id)} onCancel={() => setConfirmDeleteId(null)} />
                    ) : (
                        <>
                            <IconLink onClick={() => openEdit(p)}>Edit</IconLink>
                            <IconLink danger onClick={() => setConfirmDeleteId(p.id)}>Delete</IconLink>
                        </>
                    )
                }
            />
        </div>
    )
}

export default Productssection