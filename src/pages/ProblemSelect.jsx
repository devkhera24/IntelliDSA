import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import { getProblems } from '../services/firestoreService'
import { CATEGORIES, COMPANIES, DIFFICULTIES } from '../utils/constants'

const diffColor = { easy: 'text-green-400', medium: 'text-yellow-400', hard: 'text-red-400' }

export default function ProblemSelect() {
	const navigate = useNavigate()
	const [problems, setProblems] = useState([])
	const [loading, setLoading] = useState(true)
	const [filterDiff, setFilterDiff] = useState('all')
	const [filterCat, setFilterCat] = useState('all')
	const [filterComp, setFilterComp] = useState('all')

	useEffect(() => {
		getProblems().then((p) => {
			setProblems(p)
			setLoading(false)
		})
	}, [])

	const filtered = useMemo(() => {
		return problems.filter((p) => {
			if (filterDiff !== 'all' && p.difficulty !== filterDiff) return false
			if (filterCat !== 'all' && p.category !== filterCat) return false
			if (filterComp !== 'all' && !p.companies.includes(filterComp)) return false
			return true
		})
	}, [problems, filterDiff, filterCat, filterComp])

	if (loading) return <LoadingSpinner fullPage />

	const Select = ({ value, onChange, options, label }) => (
		<select
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className="bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
		>
			<option value="all">All {label}</option>
			{options.map((o) => (
				<option key={o} value={o}>
					{o.charAt(0).toUpperCase() + o.slice(1)}
				</option>
			))}
		</select>
	)

	return (
		<div className="min-h-screen bg-slate-950 text-white">
			<div className="max-w-4xl mx-auto px-6 py-10">
				<h1 className="text-2xl font-bold mb-2">Choose a Problem</h1>
				<p className="text-slate-400 text-sm mb-8">{filtered.length} problems available</p>

				<div className="flex flex-wrap gap-3 mb-8">
					<Select
						value={filterDiff}
						onChange={setFilterDiff}
						options={DIFFICULTIES}
						label="Difficulties"
					/>
					<Select
						value={filterCat}
						onChange={setFilterCat}
						options={CATEGORIES}
						label="Categories"
					/>
					<Select
						value={filterComp}
						onChange={setFilterComp}
						options={COMPANIES}
						label="Companies"
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{filtered.map((p) => (
						<button
							key={p.id}
							onClick={() => navigate(`/interview/${p.id}`)}
							className="bg-slate-900 border border-slate-800 hover:border-green-500/50 rounded-xl p-5 text-left transition group"
						>
							<div className="flex items-start justify-between mb-2">
								<h3 className="text-white font-semibold group-hover:text-green-400 transition">
									{p.title}
								</h3>
								<span className={`text-xs font-medium ${diffColor[p.difficulty]}`}>
									{p.difficulty}
								</span>
							</div>
							<div className="flex flex-wrap gap-2 mt-3">
								<span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">
									{p.category}
								</span>
								{p.companies.slice(0, 2).map((c) => (
									<span key={c} className="text-xs bg-slate-800 text-slate-500 px-2 py-1 rounded">
										{c}
									</span>
								))}
								<span className="text-xs text-slate-500 ml-auto">
									{Math.round(p.timeLimit / 60)}min
								</span>
							</div>
						</button>
					))}
				</div>
			</div>
		</div>
	)
}
