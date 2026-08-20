import styles from './Categorysection.module.css'
import CategoryCard from '../Categorycard/Categorycard.jsx'

const mockCategories = [
    { id: 1, name: "Matcha", image: "" },
    { id: 2, name: "Whisk", image: "" },
    { id: 3, name: "Bowl", image: "" },
    { id: 4, name: "Matcha set", image: "" },
]

function CategorySection({ selectedCategory, onSelectCategory }) {
    return (
        <div className={styles.categorySection}>
            <h2>Categories</h2>

            {mockCategories.length === 0 ? (
                <p className={styles.emptyState}>No category yet</p>
            ) : (
                <div className={styles.categoryGrid}>
                    {mockCategories.map(category => (
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