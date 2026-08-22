import { useEffect, useState } from 'react'
import styles from './Categorybrowsesection.module.css'
import ProductCard from '../Productcard/Productcard.jsx'
import { subscribeToCollection } from '../../lib/Firestorecrud'

function CategoryBrowseSection({ category, onClear }) {
    const [allProducts, setAllProducts] = useState([])

    useEffect(() => {
        const unsubscribe = subscribeToCollection('products', setAllProducts, 'name')
        return unsubscribe
    }, [])

    const products = allProducts.filter((p) => p.category === category)

    return (
        <div className={styles.section}>
            <div className={styles.headerRow}>
                <h3>{category}:</h3>
                <button className={styles.clearBtn} onClick={onClear}>
                    Clear filter x
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