import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/UI/Button'
import { useAuth } from '../context/AuthContext'

export default function Login() {
	const { login } = useAuth()
	const navigate = useNavigate()

	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	async function handleSubmit(e) {
		e.preventDefault()
		setError('')
		setLoading(true)
		try {
			await login(email, pass)
			navigate('/dashboard')
		} catch (err) {
			setError('Invalid email or password.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6 py-14">
			<div className="w-full max-w-md">
				<div className="mb-6">
					<Link to="/" className="text-sm text-slate-400 hover:text-slate-200">
						← Back to home
					</Link>
				</div>

				<div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-sm">
					<h1 className="text-2xl font-semibold">Welcome back</h1>
					<p className="mt-2 text-sm text-slate-400">Sign in to continue practicing.</p>

					{error && (
						<div className="mt-5 rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className="mt-6 space-y-4">
						<div>
							<label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								autoComplete="email"
								placeholder="you@example.com"
								className="w-full rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
							/>
						</div>
						<div>
							<label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
							<input
								type="password"
								value={pass}
								onChange={(e) => setPass(e.target.value)}
								required
								autoComplete="current-password"
								placeholder="••••••••"
								className="w-full rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
							/>
						</div>
						<Button type="submit" disabled={loading} className="w-full">
							{loading ? 'Signing in…' : 'Sign in'}
						</Button>
					</form>

					<p className="mt-6 text-sm text-slate-400">
						New here?{' '}
						<Link to="/signup" className="text-brand-500 hover:text-brand-600">
							Create an account
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}
