import {
	doc,
	setDoc,
	getDoc,
	collection,
	getDocs,
	addDoc,
	deleteDoc,
	query,
	where,
	orderBy,
	serverTimestamp,
	updateDoc,
	increment,
} from 'firebase/firestore'
import { db } from './firebase'
import { PROBLEMS } from './problemBank'

// ─── SEED ───────────────────────────────────────────────
export async function seedProblems() {
	for (const problem of PROBLEMS) {
		await setDoc(doc(db, 'problems', problem.id), problem)
	}
	console.log('✅ Problems seeded to Firestore')
}

// ─── PROBLEMS ────────────────────────────────────────────
export async function getProblems(filters = {}) {
	const snapshot = await getDocs(collection(db, 'problems'))
	let problems = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
	if (filters.difficulty) problems = problems.filter((p) => p.difficulty === filters.difficulty)
	if (filters.category) problems = problems.filter((p) => p.category === filters.category)
	if (filters.company) problems = problems.filter((p) => p.companies.includes(filters.company))
	return problems
}

export async function getProblem(problemId) {
	const snap = await getDoc(doc(db, 'problems', problemId))
	return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

// ─── SESSIONS ────────────────────────────────────────────
export async function createSession({ userId, problemId }) {
	const ref = await addDoc(collection(db, 'sessions'), {
		userId,
		problemId,
		startedAt: serverTimestamp(),
		submittedAt: null,
		finalCode: '',
		scratchpadContent: '',
		nudges: [],
		keystrokeEvents: [],
		postmortem: null,
	})
	return ref.id
}

export async function saveSession(sessionId, data) {
	await setDoc(
		doc(db, 'sessions', sessionId),
		{
			...data,
			submittedAt: serverTimestamp(),
		},
		{ merge: true }
	)
}

export async function getUserSessions(userId) {
	const q = query(
		collection(db, 'sessions'),
		where('userId', '==', userId),
		where('submittedAt', '!=', null),
		orderBy('submittedAt', 'desc')
	)
	const snap = await getDocs(q)
	return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function getSession(sessionId) {
	const snap = await getDoc(doc(db, 'sessions', sessionId))
	return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function deleteSession(sessionId) {
	await deleteDoc(doc(db, 'sessions', sessionId))
}

// ─── PATTERNS ────────────────────────────────────────────
export async function updatePatterns(userId, postmortem, category) {
	const ref = doc(db, 'patterns', userId)
	const snap = await getDoc(ref)
	const existing = snap.exists()
		? snap.data()
		: {
			weaknessFrequency: {},
			categoryScores: {},
			sessionCount: 0,
			lastUpdated: null,
		}

	postmortem.weaknesses.forEach((w) => {
		existing.weaknessFrequency[w] = (existing.weaknessFrequency[w] || 0) + 1
	})

	const prevScore = existing.categoryScores[category] || 0
	const prevCount = existing.sessionCount || 0
	existing.categoryScores[category] =
		prevCount === 0
			? postmortem.overallScore
			: (prevScore * prevCount + postmortem.overallScore) / (prevCount + 1)

	await setDoc(ref, {
		...existing,
		sessionCount: (existing.sessionCount || 0) + 1,
		lastUpdated: serverTimestamp(),
	})
}

export async function getPatterns(userId) {
	const snap = await getDoc(doc(db, 'patterns', userId))
	return snap.exists() ? snap.data() : null
}

// ─── USER ────────────────────────────────────────────────
export async function updateUserStats(userId, overallScore) {
	const ref = doc(db, 'users', userId)
	const snap = await getDoc(ref)
	if (!snap.exists()) return
	const data = snap.data()
	const newTotal = (data.totalSessions || 0) + 1
	const newAvg = ((data.avgScore || 0) * (newTotal - 1) + overallScore) / newTotal
	await updateDoc(ref, {
		totalSessions: increment(1),
		avgScore: parseFloat(newAvg.toFixed(1)),
	})
}
