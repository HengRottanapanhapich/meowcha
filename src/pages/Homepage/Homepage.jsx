import styles from './Homepage.module.css'
import { Link } from 'react-router-dom';

// import trustBarBackground from '../../assets/trustBarBackground.jpg'
import circleImg1 from '../../assets/guidance.jpg'
import circleImg2 from '../../assets/allOverTheWorld.jpg'
import circleImg3 from '../../assets/highQuality.jpg'

function Homepage() {
    return(
        <>
        <div id={styles.heroWrapper}>
            <div id={styles.heroImage}>
                <div id={styles.hTextWrapper}>
                    <div id={styles.hTextContainer}>
                        <p>Make</p>
                        <h1>MEOWCHA!</h1>
                        <div id={styles.paraRight}><p>memory with us!</p></div>
                        <div id={styles.centerButton}><Link to="/Shoppage"><button id={styles.heroButton}>Get started!</button></Link></div>
                    </div>
                </div>
            </div>
        </div>

        <div id={styles.trustBarContainer}>
            <div id={styles.trustBarBackground}>
                <div id={styles.circleContainer}>
                    <div  className={styles.circleWrapper}>
                        <div className={styles.circle}><img src="" alt="" /></div>
                        <div className={styles.tTextContainer}>
                            <h4 className={styles.header}>variety</h4>
                            <p>you can find many types of matcha powder and supply</p>
                        </div>
                    </div>

                    <div  className={styles.circleWrapper}>
                        <div className={styles.circle}><img src="" alt="" /></div>
                        <div className={styles.tTextContainer}>
                            <h4 className={styles.header}>All over the world</h4>
                            <p>find matcha from all around the world, find what suits you best</p>
                        </div>
                    </div>

                    <div  className={styles.circleWrapper}>
                        <div className={styles.circle}><img src="" alt="" /></div>
                        <div className={styles.tTextContainer}>
                            <h4 className={styles.header}>Great deal</h4>
                            <p>get good discount and prices across all products</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        </>
    );
}

export default Homepage;