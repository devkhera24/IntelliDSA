export default function ProblemSelect() {
	return (
		<div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
			<div className="mx-auto max-w-6xl">
				<h1 className="text-2xl font-semibold">Problem Bank</h1>
				<p className="mt-1 text-sm text-slate-400">
					Problem selection stub; Firestore seeding comes in later steps.
				</p>

				<div className="mt-8 grid gap-4 md:grid-cols-3">
					{Array.from({ length: 6 }).map((_, idx) => (
						<div
							key={idx}
							className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
						>
							<div className="flex items-center justify-between">
								<div className="h-2.5 w-24 rounded bg-slate-800" />
								<div className="h-6 w-14 rounded-full bg-slate-800" />
							</div>
							<div className="mt-4 h-2.5 w-40 rounded bg-slate-800" />
							<div className="mt-2 h-2.5 w-32 rounded bg-slate-800" />
							<div className="mt-6 h-9 w-full rounded-lg bg-slate-800" />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
