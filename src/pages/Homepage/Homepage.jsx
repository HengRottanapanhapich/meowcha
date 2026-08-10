import styles from "./Homepage.module.css"
import { Link } from 'react-router-dom';

function Homepage() {
    return(
        <>
        <div id={styles.heroWrapper}>
            <div id={styles.heroImage}>
                <div id={styles.hTextWrapper}>
                    <div id={styles.hTextContainer}>
                        <h1>MEOWCHA!</h1>
                        <p>Make matcha memory with us!</p>
                        <Link to="/Shoppage"><button id={styles.heroButton}>Get started!</button></Link>
                    </div>
                </div>
            </div>
        </div>

        <div id={styles.trustBar}>
            <div>
                
            </div>
        </div>
        </>
    );
}

export default Homepage;