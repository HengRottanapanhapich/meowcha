import styles from './Footer.module.css'
import logo from '../../assets/MEOWCHAGreen.svg'

import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

function Footer() {
    return(
        <>
        <footer>
            <div id={styles.footerContainer}>
                <div id={styles.columnWrapper}>
                    <div id={styles.footerColumn}>
                        <HashLink to="/#mainPage"><img id={styles.logo} src={logo} alt="Meowcha logo" /></HashLink>
                        <div>
                            <a href=""></a>
                            <a href=""></a>
                            <a href=""></a>
                        </div>
                    </div>

                    <div id={styles.columnContainer}>
                        <div className={styles.footerColum1}>
                            <ul className={styles.footerListContainer}>
                                <li className={styles.topText}>More about us!</li>
                                <HashLink to="/Aboutpage#getToKnowUs"><li>get to know us</li></HashLink>
                                <HashLink to="/aboutpage#ourAims"><li>Our aims</li></HashLink>
                                <HashLink to="/aboutpage#whatWeStandFor"><li>What we stand for</li></HashLink>
                            </ul>
                        </div>

                        <div className={styles.footerColum1}>
                            <ul className={styles.footerListContainer}>
                                <li className={styles.topText}>Contact us!</li>
                                <HashLink to='/Contactpage#contactUs'><li>contact us here!</li></HashLink>
                                <li><a href="">our email: ************.com</a></li>
                                <li><a href="">phone number: 000 000 000</a></li>
                            </ul>
                        </div>

                        <div className={styles.footerColum1}>
                            <ul className={styles.footerListContainer}>
                                <li className={styles.topText}>Shop with us!</li>
                                <HashLink to="/shoppage#browseOurShop"><li>Browse our shop!</li></HashLink>
                                <HashLink to="/shoppage#shopByCategory"><li>Shop by category!</li></HashLink>
                                <HashLink to="/shoppage#ourBestSeller"><li>Our best seller!</li></HashLink>
                            </ul>
                        </div>

                        <div className={styles.footerColum1}>
                            <ul className={styles.footerListContainer}>
                                <li className={styles.topText}>Where we are locationed</li>
                                <li><a href="https://www.google.com/maps/place/Cambodia/@12.1454395,104.9824451,7z/data=!3m1!4b1!4m6!3m5!1s0x310787bfd4dc3743:0xe4b7bfe089f41253!8m2!3d12.565679!4d104.990963!16zL20vMDF4Ymd4?entry=ttu&g_ep=EgoyMDI2MDYwOS4wIKXMDSoASAFQAw%3D%3D" target="_blank">Cambodia</a></li>
                                <li><a href="https://www.google.com/maps/place/Phnom+Penh/@11.5793642,104.8901867,11z/data=!3m1!4b1!4m6!3m5!1s0x3109513dc76a6be3:0x9c010ee85ab525bb!8m2!3d11.5563738!4d104.9282099!16zL20vMGRsd2o?entry=ttu&g_ep=EgoyMDI2MDYwOS4wIKXMDSoASAFQAw%3D%3D" target="_blank">Phnom Penh</a></li>
                                <li><a href="https://www.google.com/maps/place/Toul+Kork+District,+Phnom+Penh/@11.5694277,104.8769471,14z/data=!3m1!4b1!4m6!3m5!1s0x310951725d8c4835:0x2047e2df9364f385!8m2!3d11.5726398!4d104.899008!16s%2Fg%2F1v_s3c3d?entry=ttu&g_ep=EgoyMDI2MDYwOS4wIKXMDSoASAFQAw%3D%3D" target="_blank">Toul Kork</a></li>
                            </ul>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </footer>
        </>
    );
}

export default Footer;