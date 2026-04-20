export default function Dashboard() {
	return (
		<div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
			<div className="mx-auto max-w-6xl">
				<div className="flex items-start justify-between gap-6 flex-wrap">
					<div>
						<h1 className="text-2xl font-semibold">Dashboard</h1>
						<p className="mt-1 text-sm text-slate-400">
							Protected route stub; real data appears in later steps.
						</p>
					</div>
					<div className="flex items-center gap-2">
						<div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm text-slate-300">
							Sessions: <span className="text-slate-100 font-medium">0</span>
						</div>
						<div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm text-slate-300">
							Avg score: <span className="text-slate-100 font-medium">—</span>
						</div>
					</div>
				</div>

				<div className="mt-8 grid gap-4 md:grid-cols-3">
					{['Recent sessions', 'Recommended problems', 'Your patterns'].map((title) => (
						<div key={title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
							<h2 className="text-sm font-semibold text-slate-200">{title}</h2>
							<p className="mt-2 text-sm text-slate-400">Coming in later steps.</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
