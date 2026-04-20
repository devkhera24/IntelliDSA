import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/UI/Button'
import { useAuth } from '../context/AuthContext'
import { seedProblems } from '../services/firestoreService'

export default function Dashboard() {
	const { user, logout } = useAuth()
	const navigate = useNavigate()
	const [seeding, setSeeding] = useState(false)
	const [seeded, setSeeded] = useState(false)

	async function handleLogout() {
		await logout()
		navigate('/')
	}

	async function handleSeed() {
		setSeeding(true)
		try {
			await seedProblems()
			setSeeded(true)
		} finally {
			setSeeding(false)
		}
	}

	return (
		<div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
			<div className="mx-auto max-w-6xl">
				<div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
					<div>
						<div className="text-xs text-slate-500">Signed in as</div>
						<div className="text-sm text-slate-200">
							{user?.displayName || 'Anonymous'}
							<span className="text-slate-500"> · </span>
							<span className="text-slate-400">{user?.email}</span>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Button as={Link} to="/practice" variant="secondary" size="sm">
							Practice
						</Button>
						<Button as={Link} to="/patterns" variant="secondary" size="sm">
							Patterns
						</Button>
						<Button onClick={handleLogout} variant="ghost" size="sm">
							Log out
						</Button>
					</div>
				</div>

				<div className="flex items-start justify-between gap-6 flex-wrap">
					<div>
						<h1 className="text-2xl font-semibold">Dashboard</h1>
						<p className="mt-1 text-sm text-slate-400">
							Protected route stub; real data appears in later steps.
						</p>
					</div>
					<div className="flex items-center gap-2">
						<div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm text-slate-300">
							Sessions: <span className="text-slate-100 font-medium">0</span>
						</div>
						<div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm text-slate-300">
							Avg score: <span className="text-slate-100 font-medium">—</span>
						</div>
					</div>
				</div>

				<div className="mt-8 grid gap-4 md:grid-cols-3">
					{['Recent sessions', 'Recommended problems', 'Your patterns'].map((title) => (
						<div key={title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
							<h2 className="text-sm font-semibold text-slate-200">{title}</h2>
							<p className="mt-2 text-sm text-slate-400">Coming in later steps.</p>
						</div>
					))}
				</div>

				{import.meta.env.DEV && (
					<div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
						<div className="flex items-center justify-between gap-4 flex-wrap">
							<div>
								<h2 className="text-sm font-semibold text-slate-200">Developer tools</h2>
								<p className="mt-2 text-sm text-slate-400">
									One-time setup: seed the 20 problems into Firestore.
								</p>
							</div>
							{!seeded ? (
								<Button onClick={handleSeed} disabled={seeding} variant="secondary" size="sm">
									{seeding ? 'Seeding…' : 'Seed Problems (run once)'}
								</Button>
							) : (
								<div className="text-sm text-brand-500">Seeded.</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
