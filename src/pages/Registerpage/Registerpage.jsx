import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from './Registerpage.module.css'
import logo from '../../assets/MEOWCHAGreen.svg'
import { useAuth } from '../../Authcontext.jsx'

function Registerpage() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const { register } = useAuth()
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
            await register(formData.name, formData.email, formData.password)
            // new accounts are always customers, so straight to Shop
            navigate('/Shoppage')
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setError('An account with this email already exists.')
            } else if (err.code === 'auth/weak-password') {
                setError('Password should be at least 6 characters.')
            } else {
                setError('Something went wrong. Please try again.')
            }
        } finally {
            setSubmitting(false)
        }
    }

    return(
        <div className={styles.registerContainer}>
            <div className={styles.logoContainer}>
                <Link to="/">
                    <img id={styles.logo} src={logo} alt="Meowcha logo"></img>
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

                    {error && <p className={styles.errorText}>{error}</p>}

                    <p className={styles.dhAccount}>Already have an account?<Link to='/Loginpage'>Login here!</Link></p>

                    <button type="submit" disabled={submitting}>
                        {submitting ? 'Creating account...' : 'Send'}
                    </button>
                </form>
            </div>

            <div className={styles.backgroundStyle}></div>
        </div>
    );
}

export default Registerpage