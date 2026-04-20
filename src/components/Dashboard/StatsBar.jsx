function Stat({ label, value, sub }) {
	return (
		<div className="bg-slate-800 rounded-xl p-4 flex flex-col gap-1">
			<span className="text-slate-400 text-xs font-medium">{label}</span>
			<span className="text-white text-3xl font-bold">{value}</span>
			{sub && <span className="text-slate-500 text-xs">{sub}</span>}
		</div>
	)
}

export default function StatsBar({ totalSessions, avgScore, topWeakness }) {
	return (
		<div className="grid grid-cols-3 gap-4">
			<Stat label="Total Sessions" value={totalSessions ?? 0} sub="interviews practiced" />
			<Stat label="Avg Score" value={avgScore ? `${avgScore}/10` : '–'} sub="across all sessions" />
			<Stat label="Top Weakness" value={topWeakness || 'None yet'} sub="most flagged pattern" />
		</div>
	)
}
