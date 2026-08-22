import { useEffect, useState } from 'react'
import styles from './Categorysection.module.css'
import CategoryCard from '../Categorycard/Categorycard.jsx'
import { subscribeToCollection } from '../../lib/Firestorecrud'

function CategorySection({ selectedCategory, onSelectCategory }) {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const unsubscribe = subscribeToCollection('categories', setCategories, 'name')
        return unsubscribe
    }, [])

    return (
        <div className={styles.categorySection}>
            <h2>Categories</h2>

            {categories.length === 0 ? (
                <p className={styles.emptyState}>No category yet</p>
            ) : (
                <div className={styles.categoryGrid}>
                    {categories.map(category => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            selected={selectedCategory === category.name}
                            onClick={(c) => onSelectCategory(c.name)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}


export default CategorySection