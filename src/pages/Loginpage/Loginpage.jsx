import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from './Loginpage.module.css'
import logo from '../../assets/MEOWCHAGreen.svg'
import { useAuth } from '../../Authcontext.jsx'

function Loginpage () {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const { login } = useAuth()
    const navigate = useNavigate()

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setError('')
        setSubmitting(true)

        try {
            const { role } = await login(formData.email, formData.password)

            // user's main page after login is the Shop, not the Homepage
            // admins get sent straight to the admin panel instead
            if (role === 'admin') {
                navigate('/AdminPanel')
            } else {
                navigate('/Shoppage')
            }
        } catch (err) {
            setError('Incorrect email or password. Please try again.')
        } finally {
            setSubmitting(false)
        }
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

                    {error && <p className={styles.errorText}>{error}</p>}

                    <p className={styles.dhAccount}>Don't have an account yet?<Link to='/Registerpage'>Register here!</Link></p>

                    <button type="submit" disabled={submitting}>
                        {submitting ? 'Logging in...' : 'Send'}
                    </button>
                </form>
            </div>

            <div className={styles.backgroundStyle}></div>
        </div>
    );
}

export default Loginpage