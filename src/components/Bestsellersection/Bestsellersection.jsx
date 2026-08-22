import { useEffect, useState } from 'react'
import styles from './Bestsellersection.module.css'
import ProductCard from '../Productcard/Productcard.jsx'
import { subscribeToCollection } from '../../lib/Firestorecrud'

function BestSellerSection() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const unsubscribe = subscribeToCollection('products', setProducts, 'name')
        return unsubscribe
    }, [])

    const bestSellers = products.filter((p) => p.isBestSeller)

    return (
        <div className={styles.section}>
            <h3>Best seller:</h3>

            {bestSellers.length === 0 ? (
                <p className={styles.emptyState}>No best sellers yet</p>
            ) : (
                <div className={styles.grid}>
                    {bestSellers.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default BestSellerSection