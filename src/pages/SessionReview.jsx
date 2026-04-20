export default function SessionReview() {
	return (
		<div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
			<div className="mx-auto max-w-6xl">
				<h1 className="text-2xl font-semibold">Session Review</h1>
				<p className="mt-1 text-sm text-slate-400">
					Postmortem panel + scoring will be implemented later.
				</p>

				<div className="mt-8 grid gap-4 md:grid-cols-3">
					<div className="md:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
						<h2 className="text-sm font-semibold text-slate-200">Postmortem</h2>
						<div className="mt-4 space-y-3">
							{Array.from({ length: 6 }).map((_, idx) => (
								<div key={idx} className="h-3 rounded bg-slate-800" />
							))}
						</div>
					</div>
					<div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
						<h2 className="text-sm font-semibold text-slate-200">Scores</h2>
						<div className="mt-4 space-y-3">
							{['Correctness', 'Efficiency', 'Clarity', 'Communication'].map((k) => (
								<div key={k} className="flex items-center justify-between">
									<span className="text-sm text-slate-300">{k}</span>
									<span className="text-sm font-medium text-slate-100">—</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
