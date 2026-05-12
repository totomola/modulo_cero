import { createContext, useContext, useState, useEffect } from 'react'
import { auth, db } from '../firebase/config'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const docRef = doc(db, 'users', firebaseUser.uid)
                const docSnap = await getDoc(docRef)
                setUser({ uid: firebaseUser.uid, email: firebaseUser.email, ...docSnap.data() })
            } else {
                setUser(null)
            }
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const register = async (email, password, name, phone) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const uid = userCredential.user.uid
        await setDoc(doc(db, 'users', uid), { name, phone, email })
        setUser({ uid, email, name, phone })
    }

    const login = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password)
    }

    const logout = async () => {
        await signOut(auth)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, register, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)