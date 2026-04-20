export default function Timer({ minutes, seconds, urgency, isRunning }) {
	const colors = {
		normal: 'text-green-400',
		warning: 'text-yellow-400',
		critical: 'text-red-400 animate-pulse',
	}

	return (
		<div className={`font-mono text-2xl font-bold tabular-nums ${colors[urgency]}`}>
			{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
			{!isRunning && <span className="text-xs ml-2 text-slate-500">paused</span>}
		</div>
	)
}
