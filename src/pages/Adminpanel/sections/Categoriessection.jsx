import { useEffect, useState } from "react"
import styles from './Categoriessection.module.css'
import {
    PageHeader, PrimaryButton, GhostButton, IconLink, ConfirmBar, Field, Adminuistyles as ui,
} from "../Adminui"
import { subscribeToCollection, addDocument, updateDocument, deleteDocument } from "../../../lib/Firestorecrud"

function emptyCategory() {
    return { name: "" }
}

function Categoriessection() {
    const [categories, setCategories] = useState([])
    const [formOpen, setFormOpen] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [draft, setDraft] = useState(emptyCategory())
    const [confirmDeleteId, setConfirmDeleteId] = useState(null)

    useEffect(() => {
        const unsubscribe = subscribeToCollection("categories", setCategories, "name")
        return unsubscribe
    }, [])

    function openAdd() {
        setEditingId(null)
        setDraft(emptyCategory())
        setFormOpen(true)
    }
    function openEdit(c) {
        setEditingId(c.id)
        setDraft({ name: c.name })
        setFormOpen(true)
    }
    async function save() {
        if (!draft.name.trim()) return
        if (editingId == null) {
            await addDocument("categories", draft)
        } else {
            await updateDocument("categories", editingId, draft)
        }
        setFormOpen(false)
    }
    async function remove(id) {
        await deleteDocument("categories", id)
        setConfirmDeleteId(null)
    }

    return (
        <div>
            <PageHeader
                eyebrow="Organization"
                title="Categories"
                action={!formOpen && <PrimaryButton onClick={openAdd}>+ Add category</PrimaryButton>}
            />

            {formOpen && (
                <div className={ui.formCard}>
                    <div className={ui.formCardTitle}>
                        {editingId == null ? "New category" : "Edit category"}
                    </div>
                    <Field label="Category name" placeholder="e.g. Bowl" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
                    <div className={ui.formActions}>
                        <PrimaryButton onClick={save}>Save category</PrimaryButton>
                        <GhostButton onClick={() => setFormOpen(false)}>Cancel</GhostButton>
                    </div>
                </div>
            )}

            <div className={styles.list}>
                {categories.length === 0 && (
                    <div className={styles.emptyState}>No categories yet — add your first one.</div>
                )}
                {categories.map((c) => (
                    <div key={c.id} className={styles.categoryCard}>
                        <div className={styles.categoryHeader}>
                            <span className={styles.categoryName}>{c.name}</span>
                            <div>
                                {confirmDeleteId === c.id ? (
                                    <ConfirmBar label="Delete this category?" onConfirm={() => remove(c.id)} onCancel={() => setConfirmDeleteId(null)} />
                                ) : (
                                    <>
                                        <IconLink onClick={() => openEdit(c)}>Edit</IconLink>
                                        <IconLink danger onClick={() => setConfirmDeleteId(c.id)}>Delete</IconLink>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categoriessection