import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ScoreTrendChart, WeaknessBarChart } from '../components/Dashboard/PatternChart'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import { getPatterns, getUserSessions } from '../services/firestoreService'
import { getScoreTrend, getTopWeaknesses } from '../utils/scoreAggregator'

export default function Patterns() {
	const { user } = useAuth()
	const [sessions, setSessions] = useState([])
	const [patterns, setPatterns] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		Promise.all([getUserSessions(user.uid), getPatterns(user.uid)]).then(([s, p]) => {
			setSessions(s)
			setPatterns(p)
			setLoading(false)
		})
	}, [user.uid])

	const trendData = useMemo(() => getScoreTrend(sessions), [sessions])
	const weaknesses = useMemo(
		() => getTopWeaknesses(patterns?.weaknessFrequency, 8),
		[patterns]
	)
	const top3 = weaknesses.slice(0, 3)

	if (loading) return <LoadingSpinner fullPage />

	return (
		<div className="min-h-screen bg-slate-950 text-white">
			<div className="max-w-4xl mx-auto px-6 py-10">
				<div className="flex items-center justify-between mb-8">
					<div>
						<p className="text-slate-400 text-sm mb-1">
							<Link to="/dashboard" className="hover:text-white">
								← Dashboard
							</Link>
						</p>
						<h1 className="text-2xl font-bold">Your Patterns</h1>
						<p className="text-slate-400 text-sm">Based on {sessions.length} sessions</p>
					</div>
					<Link
						to="/practice"
						className="bg-green-500 text-slate-900 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-green-400 transition"
					>
						Practice Now
					</Link>
				</div>

				{sessions.length < 2 ? (
					<div className="bg-slate-900 border border-slate-800 rounded-xl p-10 text-center text-slate-500">
						<p className="text-4xl mb-3">📈</p>
						<p>Complete at least 2 sessions to see your patterns.</p>
					</div>
				) : (
					<div className="space-y-8">
						{top3.length > 0 && (
							<div className="bg-red-900/20 border border-red-800 rounded-xl p-5">
								<p className="text-red-400 font-semibold mb-3">
									⚠️ Your Top Recurring Weaknesses
								</p>
								<div className="flex flex-col gap-2">
									{top3.map((w, i) => (
										<div key={i} className="flex items-center justify-between">
											<span className="text-slate-300 text-sm">{w.weakness}</span>
											<span className="text-red-400 text-sm font-medium">flagged {w.freq}x</span>
										</div>
									))}
								</div>
							</div>
						)}

						<div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
							<h2 className="text-lg font-semibold mb-4">Score Over Time</h2>
							<ScoreTrendChart data={trendData} />
						</div>

						{weaknesses.length > 0 && (
							<div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
								<h2 className="text-lg font-semibold mb-4">Weakness Frequency</h2>
								<WeaknessBarChart data={weaknesses} />
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
