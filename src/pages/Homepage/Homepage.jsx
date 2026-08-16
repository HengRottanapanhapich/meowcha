import styles from './Homepage.module.css'
import { Link } from 'react-router-dom';

// import trustBarBackground from '../../assets/trustBarBackground.jpg'
import circleImg1 from '../../assets/guidance.jpg'
import circleImg2 from '../../assets/allOverTheWorld.jpg'
import circleImg3 from '../../assets/highQuality.jpg'
import topOpening from '../../assets/topOpening.jpg'
import hImg1 from '../../assets/hImg1.jpg'
import hImg2 from '../../assets/hImg2.jpg'
import contactImg from '../../assets/contactSection.jpg'

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
                        <div className={styles.circle}><img src={circleImg1} alt="" /></div>
                        <div className={styles.tTextContainer}>
                            <h4 className={styles.header}>variety</h4>
                            <p>you can find many types of matcha powder and supply</p>
                        </div>
                    </div>

                    <div  className={styles.circleWrapper}>
                        <div className={styles.circle}><img src={circleImg2} alt="" /></div>
                        <div className={styles.tTextContainer}>
                            <h4 className={styles.header}>All over the world</h4>
                            <p>find matcha from all around the world, find what suits you best</p>
                        </div>
                    </div>

                    <div  className={styles.circleWrapper}>
                        <div className={styles.circle}><img src={circleImg3} alt="" /></div>
                        <div className={styles.tTextContainer}>
                            <h4 className={styles.header}>Great deal</h4>
                            <p>get good discount and prices across all products</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id={styles.showContainer}>
            <div id={styles.topOpeningContainer}>
                <div id={styles.oTextContainer}>
                    <h2>Find what you need</h2>
                    <div id={styles.paraContainer}>
                        <p>Make every sip memorable. Rich aroma, smooth flavor, and a moment of calm in every cup, start your morning the way it's meant to be.</p>
                        <p>We source a wide variety of matcha from trusted growers around the world, so you can explore different origins and grades without compromising on quality. Whatever your taste or budget, there's a blend here for you.</p>
                    </div>
                </div>

                <div id={styles.oImg}><img src={topOpening} alt="" /></div>
            </div>

            <div id={styles.typeOfMatcha}>
                <div id={styles.typeHeaderContainer}><h2>Types of matcha:</h2></div>
                <div id={styles.matchaTypeWrapper}>
                    <div className={styles.matchaTypeContainer}>
                        <div className={styles.matchaType}><img src="" alt="" /></div>
                    </div>

                    <div className={styles.matchaTypeContainer}>
                        <div className={styles.matchaType}><img src="" alt="" /></div>
                    </div>

                    <div className={styles.matchaTypeContainer}>
                        <div className={styles.matchaType}><img src="" alt="" /></div>
                    </div>
                </div>
            </div>
        </div>

        <div id={styles.historySection}>
            <div id={styles.historyContainer}>
                <div id={styles.hImg1}><img src={hImg1} alt="" /></div>

                <div id={styles.sideSection}>
                    <div id={styles.hisTextContainer}>
                        <h2>Matcha History</h2>
                        <div id={styles.paraContainer1}>
                            <p>A common misconception that everyone made is thinking that matcha is originated from Japan,
                                but in reality it is originated from China.
                            </p>

                            <p>The idea to steam tea leaves, dry them, and grind them into a fine powder began during
                                the Tang Dynasty (618-907 AD) and became very popular during the Song Dynasty (960-1279 AD).
                            </p>

                            <p>But Japan refined, perfected, and is best known for modern matcha that we all know, and love .</p>
                        </div>
                    </div>

                    <div id={styles.hImg2}><img src={hImg2} alt="" /></div>
                </div>
            </div>
        </div>

        <div id={styles.contactContainer}>
            <div id={styles.contactImg}>
                <div id={styles.cTextContainer}>
                    <h1>Contact us</h1>
                    <p>Contact us if you ever need anything</p>
                    <div id={styles.centerButton1}><Link to="/Contactpagw"><button id={styles.contactButton}>Contact here</button></Link></div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Homepage;