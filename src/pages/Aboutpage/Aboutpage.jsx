import styles from './Aboutpage.module.css'
import img1 from '../../assets/aboutImg2.png'
import img2 from '../../assets/aboutImg3.jpg'
import img3 from '../../assets/aboutImg4.jpg'

function Aboutpage() {
    return(
        <>
        <div id={styles.aboutHeroContainer}>
            <div id={styles.heroImg}>
                <div id={styles.heroHeader}><h1>ABOUT US</h1></div>
            </div>
        </div>

        <div id={styles.aboutContainer}>
            <div id={styles.section1}>
                <div id={styles.textContainer1}>
                    <h2>Get to know us</h2>
                    <div id={styles.paraContainer1}>
                        <p>It all starter with a love for matcha.</p>

                        <p>What began as a simple appreciation for its aroma, its ritual, and the calm it brings turned into something bigger
                            a desire to share the same joy with others.
                        </p>
                    </div>
                </div>

                <div id={styles.img1}><img src={img1} alt="" /></div>
            </div>

            <div id={styles.section2}>
                <div id={styles.textWrapper1}>
                    <div id={styles.textContainer2}>
                        <h2>Our aims</h2>
                        <div id={styles.paraContainer2}>
                            <p>We wanted to create a space where anyone, whether new to matcha or a longtime lover of it, could explore where 
                                it comes from, how it's made, and why it's been cherished for centuries.
                            </p>

                            <p>Matcha isn't just a drink to us, it's a trandition rooted in mindfulness, craftsmanship, and connection. With Japanese 
                                tea ceremonies to the way it's grown, harvested and stone-ground today, every cup carries a story. Our goal is to bring 
                                that story to you one sip one moment of calm, at a time.
                            </p>
                        </div>
                    </div>
                </div>
                

                <div id={styles.img2}><img src={img2} alt="" /></div>
            </div>

            <div id={styles.section3}>
                <div id={styles.img3}><img src={img3} alt="" /></div>

                <div id={styles.textWrapper2}>
                    <div id={styles.textContainer3}>
                        <h2>What we stand for</h2>
                        <div id={styles.paraContainer3}>
                            <p>At the heart of everything we do is a simple belief matcha should be enjoyed the way it was meant to be pure, mindful, and made with 
                                care. That belief shapes every choice we make, from the matcha we choose to sell to the way we talk to our customers.
                            </p>

                            <p>We don't cut corners. We prepare everything with care, our value are made for our customers.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </>
    );
}

export default Aboutpage