export default function InterviewRoom() {
	return (
		<div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
			<div className="mx-auto max-w-6xl">
				<div className="flex items-start justify-between gap-6 flex-wrap">
					<div>
						<h1 className="text-2xl font-semibold">Interview Room</h1>
						<p className="mt-1 text-sm text-slate-400">
							Monaco editor + timer + nudges + heatmap will be wired later.
						</p>
					</div>
					<div className="flex items-center gap-2">
						<div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm text-slate-300">
							Timer: <span className="text-slate-100 font-medium">—</span>
						</div>
						<div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm text-slate-300">
							Nudges: <span className="text-slate-100 font-medium">off</span>
						</div>
					</div>
				</div>

				<div className="mt-8 grid gap-4 lg:grid-cols-3">
					<div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
						<div className="flex items-center justify-between">
							<h2 className="text-sm font-semibold text-slate-200">Editor</h2>
							<div className="h-8 w-28 rounded-lg bg-slate-800" />
						</div>
						<div className="mt-4 h-[360px] rounded-xl bg-slate-950/40 border border-slate-800" />
					</div>
					<div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
						<h2 className="text-sm font-semibold text-slate-200">Live feedback</h2>
						<div className="mt-4 space-y-3">
							{Array.from({ length: 4 }).map((_, idx) => (
								<div key={idx} className="rounded-xl border border-slate-800 bg-slate-950/30 p-4">
									<div className="h-2.5 w-20 rounded bg-slate-800" />
									<div className="mt-3 h-2.5 w-full rounded bg-slate-800" />
									<div className="mt-2 h-2.5 w-2/3 rounded bg-slate-800" />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
