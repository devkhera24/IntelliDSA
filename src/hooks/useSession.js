import { useState } from 'react'
import {
	createSession,
	deleteSession,
	getSession,
	getUserSessions,
	saveSession,
} from '../services/firestoreService'

export function useSession() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	async function startSession(userId, problemId) {
		setLoading(true)
		try {
			const sessionId = await createSession({ userId, problemId })
			return sessionId
		} catch (err) {
			setError(err.message)
			return null
		} finally {
			setLoading(false)
		}
	}

	async function submitSession(sessionId, data) {
		setLoading(true)
		try {
			await saveSession(sessionId, data)
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	async function fetchUserSessions(userId) {
		setLoading(true)
		try {
			return await getUserSessions(userId)
		} catch (err) {
			setError(err.message)
			return []
		} finally {
			setLoading(false)
		}
	}

	async function fetchSession(sessionId) {
		return await getSession(sessionId)
	}

	async function removeSession(sessionId) {
		await deleteSession(sessionId)
	}

	return { loading, error, startSession, submitSession, fetchUserSessions, fetchSession, removeSession }
}
