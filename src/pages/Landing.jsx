import { Link } from 'react-router-dom'
import Badge from '../components/UI/Badge'
import Button from '../components/UI/Button'
import { useAuth } from '../context/AuthContext'

export default function Landing() {
	const { user, logout } = useAuth()

	async function handleLogout() {
		await logout()
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
			<header className="sticky top-0 z-10 border-b border-slate-800/80 bg-slate-950/50 backdrop-blur">
				<div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="h-9 w-9 rounded-xl bg-slate-900 border border-slate-800 grid place-items-center">
							<span className="text-brand-500 font-bold">M</span>
						</div>
						<div>
							<div className="text-sm text-slate-300">MockMate</div>
							<div className="text-xs text-slate-500">Agentic interview coach</div>
						</div>
					</div>

					<nav className="flex items-center gap-2">
						{user ? (
							<>
								<Button as={Link} to="/dashboard" variant="secondary" size="sm">
									Dashboard
								</Button>
								<Button onClick={handleLogout} variant="ghost" size="sm">
									Log out
								</Button>
							</>
						) : (
							<>
								<Button as={Link} to="/login" variant="ghost" size="sm">
									Log in
								</Button>
								<Button as={Link} to="/signup" size="sm">
									Create account
								</Button>
							</>
						)}
					</nav>
				</div>
			</header>

			<main className="mx-auto max-w-6xl px-6 py-16">
				<div className="max-w-3xl">
					<div className="flex flex-wrap items-center gap-2 mb-6">
						<Badge>Live nudges</Badge>
						<Badge>Keystroke heatmap</Badge>
						<Badge>Postmortems</Badge>
					</div>

					<h1 className="text-4xl md:text-5xl font-bold tracking-tight">
						Practice interviews like it’s the real thing.
					</h1>
					<p className="mt-5 text-lg text-slate-300 leading-relaxed">
						MockMate watches how you solve problems in real time and helps you improve your process—
						not just the final answer.
					</p>

					<div className="mt-8 flex flex-wrap items-center gap-3">
						<Button as={Link} to="/signup" size="lg">
							Start practicing
						</Button>
						<Button as={Link} to="/dashboard" variant="secondary" size="lg">
							Go to dashboard
						</Button>
					</div>
				</div>

				<div className="mt-12 grid gap-4 md:grid-cols-3">
					{[
						{
							title: 'Process-first feedback',
							desc: 'Nudges trigger during hesitation so you learn faster in the moment.',
						},
						{
							title: 'Session postmortems',
							desc: 'After submit, get a clean breakdown of strengths and gaps to focus next.',
						},
						{
							title: 'Pattern tracking',
							desc: 'Spot recurring weaknesses across sessions using lightweight dashboards.',
						},
					].map((card) => (
						<div
							key={card.title}
							className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
						>
							<h2 className="text-lg font-semibold">{card.title}</h2>
							<p className="mt-2 text-sm text-slate-400 leading-relaxed">{card.desc}</p>
						</div>
					))}
				</div>
			</main>
		</div>
	)
}
