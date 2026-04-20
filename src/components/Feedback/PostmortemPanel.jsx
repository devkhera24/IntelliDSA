import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts'

const scoreColor = (s) => (s >= 7 ? '#22c55e' : s >= 4 ? '#eab308' : '#ef4444')

function ScoreBar({ label, score }) {
	return (
		<div>
			<div className="flex justify-between text-sm mb-1">
				<span className="text-slate-300">{label}</span>
				<span className="font-bold" style={{ color: scoreColor(score) }}>
					{score}/10
				</span>
			</div>
			<div className="h-2 bg-slate-800 rounded-full overflow-hidden">
				<div
					className="h-full rounded-full transition-all duration-700"
					style={{ width: `${score * 10}%`, backgroundColor: scoreColor(score) }}
				/>
			</div>
		</div>
	)
}

export default function PostmortemPanel({ postmortem }) {
	if (!postmortem) return null

	const radarData = [
		{ subject: 'Approach', score: postmortem.approachScore },
		{ subject: 'Complexity', score: postmortem.complexityScore },
		{ subject: 'Edge Cases', score: postmortem.edgeCaseScore },
		{ subject: 'Communication', score: postmortem.communicationScore },
	]

	return (
		<div className="space-y-8">
			<div className="flex flex-col md:flex-row gap-8 items-center">
				<div className="w-64 h-64">
					<ResponsiveContainer width="100%" height="100%">
						<RadarChart data={radarData}>
							<PolarGrid stroke="#334155" />
							<PolarAngleAxis
								dataKey="subject"
								tick={{ fill: '#94a3b8', fontSize: 12 }}
							/>
							<Radar name="Score" dataKey="score" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
						</RadarChart>
					</ResponsiveContainer>
				</div>
				<div className="flex-1 space-y-4">
					<ScoreBar label="Approach & Planning" score={postmortem.approachScore} />
					<ScoreBar label="Time/Space Complexity" score={postmortem.complexityScore} />
					<ScoreBar label="Edge Case Coverage" score={postmortem.edgeCaseScore} />
					<ScoreBar label="Communication (Scratchpad)" score={postmortem.communicationScore} />
					<div className="pt-2 border-t border-slate-700">
						<ScoreBar label="Overall Score" score={postmortem.overallScore} />
					</div>
				</div>
			</div>

			<div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
				<p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-2">
					What a Real Interviewer Would Say
				</p>
				<p className="text-slate-200 leading-relaxed italic">"{postmortem.interviewerNote}"</p>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div className="bg-green-900/20 border border-green-800 rounded-xl p-4">
					<p className="text-green-400 font-semibold text-sm mb-3">✅ Strengths</p>
					<ul className="space-y-2">
						{(postmortem.strengths || []).map((s, i) => (
							<li key={i} className="text-slate-300 text-sm flex gap-2">
								<span className="text-green-500 mt-0.5">•</span>
								{s}
							</li>
						))}
					</ul>
				</div>
				<div className="bg-red-900/20 border border-red-800 rounded-xl p-4">
					<p className="text-red-400 font-semibold text-sm mb-3">⚠️ Weaknesses</p>
					<ul className="space-y-2">
						{(postmortem.weaknesses || []).map((w, i) => (
							<li key={i} className="text-slate-300 text-sm flex gap-2">
								<span className="text-red-500 mt-0.5">•</span>
								{w}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}
