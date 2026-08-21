import styles from './Shoppage.module.css'
import { useState } from 'react'
import CategorySection from '../../components/Categorysection/Categorysection.jsx'
import BestSellerSection from '../../components/Bestsellersection/Bestsellersection.jsx'
import CategoryBrowseSection from '../../components/Categorybrowsesection/Categorybrowsesection.jsx'


function Shoppage() {
    // null = no category picked yet, so Best Seller stays as the default view
    const [selectedCategory, setSelectedCategory] = useState(null)

    function handleSelectCategory(categoryName) {
        // clicking the same category again clears the filter
        setSelectedCategory(prev => (prev === categoryName ? null : categoryName))
    }

    return(
        <>
        <div id='browseOurShop' className={styles.shopHeroContainer}>
            <div id={styles.heroBackgroundImg}>
                <div id={styles.textContainer1}>
                    <h2>FIND YOUR CALM, FIND YOU MORNING</h2>
                    <p>We offer a variety of product to chose from</p>
                </div>
            </div>
        </div>

        <div id='shopByCategory' className={styles.categoryS}>
            <CategorySection
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
            />
        </div>
        

        <div className={styles.productArea}>
            <div className={styles.promoBanner}>
                <div id={styles.textContainer2}><p>GET OFFER FROM 20 to 50%</p></div>
            </div>

            <div id='ourBestSeller' className={styles.bestSeller}><BestSellerSection /></div>

            {selectedCategory && (
                <CategoryBrowseSection
                    category={selectedCategory}
                    onClear={() => setSelectedCategory(null)}
                />
            )}
        </div>

        </>
    );
}

export default Shoppage;

