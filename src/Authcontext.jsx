import { createContext, useContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from './lib/firebaseClient.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [role, setRole] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user)

            if (user) {
                const userDocRef = doc(db, 'users', user.uid)
                const userDocSnap = await getDoc(userDocRef)
                setRole(userDocSnap.exists() ? userDocSnap.data().role : 'customer')
            } else {
                setRole(null)
            }

            setLoading(false)
        })

        return unsubscribe
    }, [])

    async function register(name, email, password) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(userCredential.user, { displayName: name })

        await setDoc(doc(db, 'users', userCredential.user.uid), {
            name,
            email,
            role: 'customer',
            createdAt: new Date().toISOString(),
        })

        setRole('customer')
        return userCredential.user
    }

    async function login(email, password) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const userDocRef = doc(db, 'users', userCredential.user.uid)
        const userDocSnap = await getDoc(userDocRef)
        const userRole = userDocSnap.exists() ? userDocSnap.data().role : 'customer'
        setRole(userRole)
        return { user: userCredential.user, role: userRole }
    }

    function logout() {
        return signOut(auth)
    }

    const value = { currentUser, role, loading, register, login, logout }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}