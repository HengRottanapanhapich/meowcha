import styles from './Productcard.module.css'

function ProductCard({ product }) {
    return (
        <div className={styles.card}>
            <div className={styles.imagePlaceholder}>
                {product.image && <img src={product.image} alt={product.name} />}
            </div>
            <div className={styles.infoRow}>
                <h4>{product.name}</h4>
                <span className={styles.price}>${product.price.toFixed(2)}</span>
            </div>
            <p className={styles.description}>{product.description}</p>
            <button className={styles.addToCart}>Add to cart</button>
        </div>
    )
}

export default ProductCard