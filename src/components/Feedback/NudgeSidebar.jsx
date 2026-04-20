import LoadingSpinner from '../UI/LoadingSpinner'
import NudgeCard from './NudgeCard'

export default function NudgeSidebar({ nudges, isAnalyzing, error }) {
	return (
		<div className="flex flex-col h-full">
			<div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between">
				<span className="text-sm font-semibold text-white">Live Coach</span>
				{isAnalyzing && (
					<div className="flex items-center gap-2 text-xs text-slate-400">
						<LoadingSpinner />
						<span>analyzing…</span>
					</div>
				)}
			</div>

			<div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
				{error && (
					<div className="rounded-xl border border-red-900/60 bg-red-950/40 p-3 text-xs text-red-200">
						<div className="font-semibold">Live nudges unavailable</div>
						<div className="mt-1 text-red-200/80">{error}</div>
						<div className="mt-2 text-red-200/70">
							If you're running locally, ensure `OPENAI_API_KEY` is set and keep using `npm run dev`.
						</div>
					</div>
				)}
				{nudges.length === 0 && !isAnalyzing && (
					<div className="text-slate-500 text-xs text-center mt-8 px-4">
						<p className="text-2xl mb-2">🧠</p>
						<p>Start coding and I'll watch your process.</p>
						<p className="mt-2 text-slate-600">Nudges typically appear ~15s into an active session.</p>
					</div>
				)}
				{nudges.map((n) => (
					<NudgeCard key={n.id} nudge={n} />
				))}
			</div>
		</div>
	)
}
