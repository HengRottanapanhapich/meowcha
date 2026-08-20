import styles from './Categorycard.module.css'

function CategoryCard({ category, onClick, selected }) {
    return (
        <div className={styles.categoryCard} onClick={() => onClick && onClick(category)}>
            <div className={`${styles.circle} ${selected ? styles.circleSelected : ""}`}>
                {category.image && <img src={category.image} alt={category.name} />}
            </div>
            <p>{category.name}</p>
        </div>
    )
}


export default CategoryCard