import { useState } from 'react'
import { Link } from 'react-router-dom';
import styles from './Registerpage.module.css'
import logo from '../../assets/MEOWCHA!(1).svg'
function Registerpage() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(formData)
        // send formData somewhere later (backend/API)
    }

    return(
        <div className={styles.registerContainer}>

            <div className={styles.logoContainer}>
                <Link to="/">
                    <img id={styles.logo} src={logo} alt="Bongkert logo"></img>
                </Link>
            </div>
            <div className={styles.registerForm_container}>
                <form onSubmit={handleSubmit} className={styles.registerLabel_container}>
                    <h1>Register</h1>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange}/>

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="********" value={formData.password} onChange={handleChange}/>

                    <label htmlFor="password">Confirm password</label>
                    <input type="password" id="password" name="password" placeholder="********" value={formData.password} onChange={handleChange}/>

                    <button type="submit">Send</button>
                </form>

            </div>

            <div className={styles.backgroundStyle}></div>
        </div>
    );
}

export default Registerpage