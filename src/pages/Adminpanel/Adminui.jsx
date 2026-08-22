import styles from './Adminui.module.css'

export const C = {
    cream: '#fdfff5',
    creamDark: '#e7ebd6',
    white: '#ffffff',
    ink: '#2a3910',
    inkSoft: '#69765a',
    matcha: '#718729',
    line: '#dde3cd',
    danger: '#c0453a',
    clay: '#b9893c',
}

export const allCategoryOptions = ["Matcha", "Type of Matcha", "Brand", "Bowl", "Whisk", "Set"]
export const colorRelevantCategories = ["Bowl", "Whisk", "Set"]

export function PageHeader({ eyebrow, title, action }) {
    return (
        <div className={styles.pageHeader}>
            <div>
                <div className={styles.eyebrow}>{eyebrow}</div>
                <h1 className={styles.pageTitle}>{title}</h1>
            </div>
            {action}
        </div>
    )
}

export function PrimaryButton({ children, className, ...props }) {
    return (
        <button {...props} className={`${styles.primaryButton} ${className || ''}`}>
            {children}
        </button>
    )
}

export function GhostButton({ children, className, ...props }) {
    return (
        <button {...props} className={`${styles.ghostButton} ${className || ''}`}>
            {children}
        </button>
    )
}

export function Table({ columns, rows, renderActions, emptyLabel }) {
    return (
        <div className={styles.tableWrap}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {columns.map((c) => <th key={c}>{c}</th>)}
                        {renderActions && <th></th>}
                    </tr>
                </thead>
                <tbody>
                    {rows.length === 0 && (
                        <tr>
                            <td colSpan={columns.length + 1} className={styles.emptyRow}>
                                {emptyLabel || "Nothing here yet."}
                            </td>
                        </tr>
                    )}
                    {rows.map((row, i) => (
                        <tr key={row.key ?? i}>
                            {row.cells.map((cell, j) => <td key={j}>{cell}</td>)}
                            {renderActions && (
                                <td className={styles.tableActionsCell}>{renderActions(row.item)}</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export function IconLink({ children, danger, ...props }) {
    return (
        <button {...props} className={danger ? styles.iconLinkDanger : styles.iconLink}>
            {children}
        </button>
    )
}

export function Pill({ children }) {
    return <span className={styles.pill}>{children}</span>
}

export function ConfirmBar({ label, onConfirm, onCancel }) {
    return (
        <div className={styles.confirmBar}>
            <span className={styles.confirmLabel}>{label}</span>
            <button onClick={onConfirm} className={styles.confirmDeleteBtn}>Yes, delete</button>
            <button onClick={onCancel} className={styles.confirmCancelBtn}>Cancel</button>
        </div>
    )
}

export function Field({ label, className, ...props }) {
    return (
        <div>
            {label && <label className={styles.label}>{label}</label>}
            <input {...props} className={`${styles.input} ${className || ''}`} />
        </div>
    )
}

export function SearchInput({ value, onChange, placeholder }) {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Search..."}
            className={styles.searchInput}
        />
    )
}

export function FilterBar({ children }) {
    return <div className={styles.filterBar}>{children}</div>
}

export const labelStyle = styles.label
export const inputStyle = styles.input

export { styles as Adminuistyles }