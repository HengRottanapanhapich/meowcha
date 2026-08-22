import { useState } from "react"
import styles from './Imageuploadfield.module.css'
import { Adminuistyles as ui } from '../Adminui'
import { uploadImageToCloudinary } from "../../../lib/cloudinaryUpload"

function Imageuploadfield({ value, onChange }) {
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState("")

    async function handleFileChange(event) {
        const file = event.target.files[0]
        if (!file) return

        setUploading(true)
        setError("")
        try {
            const url = await uploadImageToCloudinary(file)
            onChange(url)
        } catch (err) {
            setError("Upload failed - try again.")
        } finally {
            setUploading(false)
            
            event.target.value = ""
        }
    }

    return (
        <div>
            <label className={ui.label}>Product image</label>
            <label className={styles.uploadBox}>
                {value ? (
                    <img src={value} alt="Product" className={styles.previewImage} />
                ) : uploading ? (
                    "Uploading..."
                ) : (
                    <>Click to upload<br />a product photo</>
                )}
                <input type="file" accept="image/*" onChange={handleFileChange} className={styles.hiddenInput} />
            </label>
            {error && <p className={styles.errorText}>{error}</p>}
            {value && (
                <button type="button" onClick={() => onChange("")} className={styles.removeButton}>
                    Remove photo
                </button>
            )}
        </div>
    )
}

export default Imageuploadfield