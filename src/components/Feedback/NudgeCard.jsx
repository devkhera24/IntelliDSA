const CONFIG = {
	hint: { icon: '💡', bg: 'bg-blue-900/40', border: 'border-blue-600', text: 'text-blue-300' },
	warning: {
		icon: '⚠️',
		bg: 'bg-yellow-900/40',
		border: 'border-yellow-600',
		text: 'text-yellow-300',
	},
	flag: { icon: '🚩', bg: 'bg-red-900/40', border: 'border-red-600', text: 'text-red-300' },
}

function formatTime(seconds) {
	const m = Math.floor(seconds / 60)
	const s = seconds % 60
	return `${m}:${String(s).padStart(2, '0')}`
}

export default function NudgeCard({ nudge }) {
	const cfg = CONFIG[nudge.type] || CONFIG.hint
	return (
		<div className={`${cfg.bg} border ${cfg.border} rounded-lg p-3 text-sm`}>
			<div className="flex items-start gap-2">
				<span className="text-base leading-none mt-0.5">{cfg.icon}</span>
				<div>
					<p className={`${cfg.text} leading-snug`}>{nudge.message}</p>
					<p className="text-slate-500 text-xs mt-1">at {formatTime(nudge.timestamp)}</p>
				</div>
			</div>
		</div>
	)
}
