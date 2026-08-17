import { useState } from 'react'
import styles from './Contactpage.module.css'

function Contactpage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        message: '',
    })

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }))
    }

    function handleSubmit(event) {
        event.preventDefault() // stops the page from reloading
        console.log(formData)
        // this is where you'd send formData to a server, e.g. via fetch()
    }
    return(
        <>
        <div className={styles.contactContainer}>
            <div className={styles.cWrapper}>
                <div className={styles.cTextContainer}>
                    <div id={styles.cHContainer}><h1>Contact</h1></div>
                    <div id={styles.cPContainer}><p>Contact us if you have any trouble, or if you want to do business with us. We will get back to you as soon as possible.</p></div>
                </div>
            </div>
            
            <div className={styles.contactForm_container}>
                <form onSubmit={handleSubmit} className={styles.contactLabel_container}>
                    <h1>Contact us</h1>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <label htmlFor="phoneNumber">Phone number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Phone number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                    <label htmlFor="message">Message</label>
                    <textarea
                        name="message"
                        id="message"
                        rows="6"
                        placeholder="Tell us what you need, we will get back to you as soon as possible"
                        value={formData.message}
                        onChange={handleChange}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
            <div className={styles.bottomContainer}>
                
            </div>
        </div>
        </>
    );
}

export default Contactpage