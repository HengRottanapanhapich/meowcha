import styles from './Categorybrowsesection.module.css'
import ProductCard from '../Productcard/Productcard.jsx'

const mockProductsByCategory = {
    "Matcha": [
        { id: 101, name: "Ceremonial Matcha", price: 24.99, image: "", description: "Smooth, vibrant, rich in umami." },
        { id: 102, name: "Culinary Matcha", price: 14.99, image: "", description: "Perfect for lattes and baking." },
    ],
    "Whisk": [
        { id: 103, name: "Bamboo Whisk (Chasen)", price: 12.50, image: "", description: "100-prong whisk, hand-carved." },
    ],
    "Bowl": [
        { id: 104, name: "Pink bowl", price: 40.00, image: "", description: "Aesthetic pink and white matcha bowl." },
    ],
    "Matcha set": [
        { id: 105, name: "Ceremonial Starter Set", price: 38.00, image: "", description: "Everything a first-timer needs." },
    ],
}

function CategoryBrowseSection({ category, onClear }) {
    const products = mockProductsByCategory[category] || []

    return (
        <div className={styles.section}>
            <div className={styles.headerRow}>
                <h3>{category}:</h3>
                <button className={styles.clearBtn} onClick={onClear}>
                    Clear filter ✕
                </button>
            </div>

            {products.length === 0 ? (
                <p className={styles.emptyState}>No category yet</p>
            ) : (
                <div className={styles.grid}>
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default CategoryBrowseSection