import { Link } from 'react-router-dom'

const scoreColor = (s) => (s >= 7 ? 'text-green-400' : s >= 4 ? 'text-yellow-400' : 'text-red-400')

export default function SessionCard({ session, problemTitle, onDelete }) {
	const pm = session.postmortem
	const date = session.submittedAt?.toDate?.()?.toLocaleDateString() || 'Unknown date'

	return (
		<div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center justify-between">
			<div>
				<p className="text-white font-medium">{problemTitle || session.problemId}</p>
				<p className="text-slate-500 text-sm">{date}</p>
			</div>
			{pm && (
				<div className="flex items-center gap-6">
					<span className={`text-2xl font-bold ${scoreColor(pm.overallScore)}`}>
						{pm.overallScore}/10
					</span>
					<Link
						to={`/review/${session.id}`}
						className="text-sm text-blue-400 hover:text-blue-300 transition"
					>
						View →
					</Link>
					<button
						onClick={() => onDelete(session.id)}
						className="text-sm text-slate-500 hover:text-red-400 transition"
					>
						Delete
					</button>
				</div>
			)}
		</div>
	)
}
