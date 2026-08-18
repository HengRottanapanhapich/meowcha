import { useState } from 'react'
import { Link } from 'react-router-dom';
import styles from './Loginpage.module.css'
import logo from '../../assets/MEOWCHAGreen.svg'

function Loginpage () {
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
    }

    return (
        <div className={styles.loginContainer}>
        
            <div className={styles.logoContainer}>
                <Link to="/">
                    <img id={styles.logo} src={logo} alt="meowcha logo"></img>
                </Link>
            </div>
            <div className={styles.loginForm_container}>
                <form onSubmit={handleSubmit} className={styles.loginLabel_container}>
                    <h1>Login</h1>

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="********" value={formData.password} onChange={handleChange}/>

                    <p className={styles.dhAccount}>Don't have an account yet?<Link to='/Registerpage'>Register here!</Link></p>

                    <button type="submit">Send</button>
                </form>
            </div>

            <div className={styles.backgroundStyle}></div>
        </div>
    );
}

export default Loginpage