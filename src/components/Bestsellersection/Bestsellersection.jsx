import styles from './Bestsellersection.module.css'
import ProductCard from '../ProductCard/Productcard.jsx'

const mockBestSellers = [
    { id: 1, name: "Matcha powder", price: 25.00, image: "", description: "High quality matcha powder, straight from Japan." },
    { id: 2, name: "Pink bowl", price: 40.00, image: "", description: "High quality pink aesthetic matcha bowl, with a mix of white and pink together." },
    { id: 3, name: "Smiski matcha set", price: 10.00, image: "", description: "Highly hand-crafted Smiski set." },
    { id: 4, name: "Smiski matcha set", price: 10.00, image: "", description: "Highly hand-crafted Smiski set." },
]

function BestSellerSection() {
    return (
        <div className={styles.section}>
            <h3>Best seller:</h3>

            {mockBestSellers.length === 0 ? (
                <p className={styles.emptyState}>No best sellers yet</p>
            ) : (
                <div className={styles.grid}>
                    {mockBestSellers.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default BestSellerSection