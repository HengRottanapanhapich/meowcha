import { useNavigate } from 'react-router-dom'
import styles from './Productcard.module.css'

function ProductCard({ product }) {
    const navigate = useNavigate()

    function handleCardClick() {
        navigate(`/Productdetail/${product.id}`)
    }

    function handleAddToCart(event) {
        event.stopPropagation()
    }

    return (
        <div className={styles.card} onClick={handleCardClick} role="button" tabIndex={0}>
            <div className={styles.imagePlaceholder}>
                {product.image && <img src={product.image} alt={product.name} />}
            </div>
            <div className={styles.infoRow}>
                <h4>{product.name}</h4>
                <span className={styles.price}>${Number(product.price || 0).toFixed(2)}</span>
            </div>
            <p className={styles.description}>{product.description}</p>
            <button className={styles.addToCart} onClick={handleAddToCart}>Add to cart</button>
        </div>
    )
}

export default ProductCard