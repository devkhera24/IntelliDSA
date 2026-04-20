import { Link } from 'react-router-dom'
import Button from '../components/UI/Button'

export default function Signup() {
	return (
		<div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6 py-14">
			<div className="w-full max-w-md">
				<div className="mb-6">
					<Link to="/" className="text-sm text-slate-400 hover:text-slate-200">
						← Back to home
					</Link>
				</div>

				<div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-sm">
					<h1 className="text-2xl font-semibold">Create your account</h1>
					<p className="mt-2 text-sm text-slate-400">
						UI polished now; signup functionality comes in Step 3.
					</p>

					<div className="mt-6 space-y-4">
						<div>
							<label className="block text-xs font-medium text-slate-300 mb-1">Display name</label>
							<input
								type="text"
								disabled
								placeholder="Jane Doe"
								className="w-full rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600"
							/>
						</div>
						<div>
							<label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
							<input
								type="email"
								disabled
								placeholder="you@example.com"
								className="w-full rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600"
							/>
						</div>
						<div>
							<label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
							<input
								type="password"
								disabled
								placeholder="••••••••"
								className="w-full rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600"
							/>
						</div>
						<Button disabled className="w-full">
							Create account (Step 3)
						</Button>
					</div>

					<p className="mt-6 text-sm text-slate-400">
						Already have an account?{' '}
						<Link to="/login" className="text-brand-500 hover:text-brand-600">
							Log in
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}
