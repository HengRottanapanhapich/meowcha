import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import styles from './Productdetailpage.module.css'
import { subscribeToDocument } from '../../lib/Firestorecrud'

const colorRelevantCategories = ["Bowl", "Whisk", "Set"]

function Productdetailpage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState(undefined) // undefined = loading, null = not found
    const [selectedColor, setSelectedColor] = useState(null)

    useEffect(() => {
        const unsubscribe = subscribeToDocument('products', id, (data) => {
            setProduct(data)
            if (data?.colors?.length) setSelectedColor(data.colors[0])
        })
        return unsubscribe
    }, [id])

    if (product === undefined) {
        return <div className={styles.stateContainer}><p>Loading...</p></div>
    }

    if (product === null) {
        return (
            <div className={styles.stateContainer}>
                <p>We couldn't find that product.</p>
                <Link to="/Shoppage" className={styles.backLink}>Back to shop</Link>
            </div>
        )
    }

    const showColors = colorRelevantCategories.includes(product.category) && (product.colors || []).length > 0
    const showSetItems = product.category === "Set" && (product.setItems || []).length > 0

    return (
        <div className={styles.pageContainer}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>← Back</button>

            <div className={styles.detailGrid}>
                <div className={styles.imageBlock}>
                    {product.image ? (
                        <img src={product.image} alt={product.name} />
                    ) : (
                        <div className={styles.imagePlaceholder} />
                    )}
                </div>

                <div className={styles.infoBlock}>
                    <span className={styles.categoryLabel}>{product.category}</span>
                    <h1 className={styles.name}>{product.name}</h1>
                    <p className={styles.price}>${Number(product.price || 0).toFixed(2)}</p>

                    {product.description && (
                        <p className={styles.description}>{product.description}</p>
                    )}

                    {showColors && (
                        <div className={styles.section}>
                            <p className={styles.sectionLabel}>Color</p>
                            <div className={styles.colorRow}>
                                {product.colors.map((color) => (
                                    <button
                                        key={color}
                                        className={selectedColor === color ? styles.colorPillOn : styles.colorPill}
                                        onClick={() => setSelectedColor(color)}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {showSetItems && (
                        <div className={styles.section}>
                            <p className={styles.sectionLabel}>Set includes</p>
                            <ul className={styles.setList}>
                                {product.setItems.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <p className={styles.stock}>
                        {Number(product.stock) > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </p>

                    <button className={styles.addToCart} disabled={Number(product.stock) <= 0}>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Productdetailpage