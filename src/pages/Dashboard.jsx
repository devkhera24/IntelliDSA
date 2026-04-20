import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SessionCard from '../components/Dashboard/SessionCard'
import StatsBar from '../components/Dashboard/StatsBar'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import { useAuth } from '../context/AuthContext'
import { deleteSession, getPatterns, getUserSessions, seedProblems } from '../services/firestoreService'
import { getTopWeaknesses } from '../utils/scoreAggregator'

export default function Dashboard() {
	const { user, logout } = useAuth()
	const navigate = useNavigate()
	const [sessions, setSessions] = useState([])
	const [patterns, setPatterns] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [seeding, setSeeding] = useState(false)
	const [seeded, setSeeded] = useState(false)

	useEffect(() => {
		async function load() {
			setError(null)
			try {
				const [s, p] = await Promise.all([getUserSessions(user.uid), getPatterns(user.uid)])
				setSessions(s)
				setPatterns(p)
			} catch (err) {
				console.error('Dashboard load error:', err)
				setError(err?.message || 'Failed to load dashboard data')
			} finally {
				setLoading(false)
			}
		}
		load()
	}, [user.uid])

	async function handleDelete(sessionId) {
		await deleteSession(sessionId)
		setSessions((prev) => prev.filter((s) => s.id !== sessionId))
	}

	async function handleSeed() {
		setSeeding(true)
		await seedProblems()
		setSeeding(false)
		setSeeded(true)
	}

	async function handleLogout() {
		await logout()
		navigate('/')
	}

	const topWeakness = useMemo(() => {
		if (!patterns?.weaknessFrequency) return null
		const top = getTopWeaknesses(patterns.weaknessFrequency, 1)
		return top[0]?.weakness || null
	}, [patterns])

	if (loading) return <LoadingSpinner fullPage />

	return (
		<div className="min-h-screen bg-slate-950 text-white">
			{/* Nav */}
			<nav className="flex items-center justify-between px-8 py-4 bg-slate-900 border-b border-slate-800">
				<span className="text-green-400 font-bold text-lg">MockMate</span>
				<div className="flex items-center gap-4">
					<Link to="/patterns" className="text-slate-400 hover:text-white text-sm transition">
						Patterns
					</Link>
					<Link
						to="/practice"
						className="bg-green-500 text-slate-900 font-semibold px-4 py-2 rounded-lg hover:bg-green-400 transition text-sm"
					>
						Practice →
					</Link>
					<button
						onClick={handleLogout}
						className="text-slate-400 hover:text-red-400 text-sm transition"
					>
						Logout
					</button>
				</div>
			</nav>

			<main className="max-w-4xl mx-auto px-6 py-10">
				{error && (
					<div className="mb-6 rounded-xl border border-red-900/60 bg-red-950/40 p-4 text-sm text-red-200">
						<div className="font-semibold">Couldn't load dashboard data</div>
						<div className="mt-1 text-red-200/80">{error}</div>
						<div className="mt-3 text-red-200/70">
							If this is Firestore permissions, re-check your rules for `sessions` + `patterns`.
						</div>
					</div>
				)}
				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-2xl font-bold">
							Welcome back, {user.displayName?.split(' ')[0] || 'coder'}
						</h1>
						<p className="text-slate-400 text-sm mt-1">Here's your interview performance summary</p>
					</div>
					{/* One-time seed button — remove after first seed */}
					{!seeded && (
						<button
							onClick={handleSeed}
							disabled={seeding}
							className="text-xs bg-slate-800 border border-slate-600 text-slate-400 px-3 py-2 rounded-lg hover:border-green-500 hover:text-green-400 transition"
						>
							{seeding ? 'Seeding…' : '⚙️ Seed Problems (run once)'}
						</button>
					)}
				</div>

				<StatsBar
					totalSessions={sessions.length}
					avgScore={
						patterns
							? Object.values(patterns.categoryScores || {}).reduce((a, b) => a + b, 0) /
								(Object.keys(patterns.categoryScores || {}).length || 1)
							: null
					}
					topWeakness={topWeakness}
				/>

				<div className="mt-10">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-lg font-semibold">Recent Sessions</h2>
						<Link to="/practice" className="text-green-400 text-sm hover:underline">
							+ New Session
						</Link>
					</div>
					{sessions.length === 0 ? (
						<div className="bg-slate-900 border border-slate-800 rounded-xl p-10 text-center text-slate-500">
							<p className="text-4xl mb-3">🎯</p>
							<p>No sessions yet. Start your first mock interview!</p>
							<Link
								to="/practice"
								className="mt-4 inline-block bg-green-500 text-slate-900 font-semibold px-6 py-2 rounded-lg text-sm hover:bg-green-400 transition"
							>
								Browse Problems
							</Link>
						</div>
					) : (
						<div className="flex flex-col gap-3">
							{sessions.slice(0, 10).map((s) => (
								<SessionCard key={s.id} session={s} problemTitle={s.problemId} onDelete={handleDelete} />
							))}
						</div>
					)}
				</div>
			</main>
		</div>
	)
}
