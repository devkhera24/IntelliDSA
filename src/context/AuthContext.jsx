import { createContext, useContext, useEffect, useState } from 'react'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	updateProfile,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../services/firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (firebaseUser) => {
			setUser(firebaseUser)
			setLoading(false)
		})
		return unsub
	}, [])

	async function signup(email, password, displayName) {
		const cred = await createUserWithEmailAndPassword(auth, email, password)
		await updateProfile(cred.user, { displayName })

		await setDoc(doc(db, 'users', cred.user.uid), {
			displayName,
			email,
			createdAt: serverTimestamp(),
			totalSessions: 0,
			avgScore: 0,
		})

		return cred
	}

	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password)
	}

	function logout() {
		return signOut(auth)
	}

	return (
		<AuthContext.Provider value={{ user, loading, signup, login, logout }}>
			{!loading && children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	return useContext(AuthContext)
}
