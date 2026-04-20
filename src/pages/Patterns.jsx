export default function Patterns() {
	return (
		<div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
			<div className="mx-auto max-w-6xl">
				<h1 className="text-2xl font-semibold">Patterns</h1>
				<p className="mt-1 text-sm text-slate-400">
					Recharts-based insights will be wired later.
				</p>

				<div className="mt-8 grid gap-4 md:grid-cols-3">
					{['Weakness trends', 'Category mix', 'Difficulty spread'].map((title) => (
						<div key={title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
							<h2 className="text-sm font-semibold text-slate-200">{title}</h2>
							<div className="mt-4 h-36 rounded-xl bg-slate-950/40 border border-slate-800" />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
