import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import NudgeCard from '../components/Feedback/NudgeCard'
import PostmortemPanel from '../components/Feedback/PostmortemPanel'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import { getSession } from '../services/firestoreService'

export default function SessionReview() {
	const { sessionId } = useParams()
	const navigate = useNavigate()
	const [session, setSession] = useState(null)
	const [loading, setLoading] = useState(true)
	const [tab, setTab] = useState('postmortem')

	useEffect(() => {
		getSession(sessionId).then((s) => {
			if (!s) {
				navigate('/dashboard')
				return
			}
			setSession(s)
			setLoading(false)
		})
	}, [sessionId, navigate])

	if (loading) return <LoadingSpinner fullPage />

	return (
		<div className="min-h-screen bg-slate-950 text-white">
			<div className="max-w-4xl mx-auto px-6 py-10">
				<div className="flex items-center justify-between mb-8">
					<div>
						<p className="text-slate-400 text-sm mb-1">
							<Link to="/dashboard" className="hover:text-white transition">
								← Dashboard
							</Link>
						</p>
						<h1 className="text-2xl font-bold">Session Review</h1>
						<p className="text-slate-400 text-sm">{session.problemId}</p>
					</div>
					<Link
						to="/practice"
						className="bg-green-500 text-slate-900 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-green-400 transition"
					>
						Practice Again
					</Link>
				</div>

				<div className="flex gap-1 bg-slate-900 rounded-lg p-1 mb-8 w-fit">
					{['postmortem', 'code', 'nudges'].map((t) => (
						<button
							key={t}
							onClick={() => setTab(t)}
							className={`px-4 py-2 rounded-md text-sm font-medium transition ${
								tab === t ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
							}`}
						>
							{t.charAt(0).toUpperCase() + t.slice(1)}
						</button>
					))}
				</div>

				{tab === 'postmortem' && <PostmortemPanel postmortem={session.postmortem} />}

				{tab === 'code' && (
					<div className="rounded-xl overflow-hidden border border-slate-800 h-[60vh]">
						<Editor
							height="100%"
							language={session.language || 'javascript'}
							value={session.finalCode || '// No code submitted'}
							theme="vs-dark"
							options={{ readOnly: true, minimap: { enabled: false }, fontSize: 14 }}
						/>
					</div>
				)}

				{tab === 'nudges' && (
					<div className="space-y-3">
						{session.nudges?.length > 0 ? (
							session.nudges.map((n) => <NudgeCard key={n.id || n.timestamp} nudge={n} />)
						) : (
							<p className="text-slate-500 text-center py-10">
								No nudges were needed in this session.
							</p>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
