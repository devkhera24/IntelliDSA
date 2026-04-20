import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CodeEditor from '../components/Editor/CodeEditor'
import KeystrokeHeatmap from '../components/Editor/KeystrokeHeatmap'
import Scratchpad from '../components/Editor/Scratchpad'
import Timer from '../components/Editor/Timer'
import NudgeSidebar from '../components/Feedback/NudgeSidebar'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import { useAuth } from '../context/AuthContext'
import { useKeystrokeTracker } from '../hooks/useKeystrokeTracker'
import { useLiveMonitor } from '../hooks/useLiveMonitor'
import { useSession } from '../hooks/useSession'
import { useTimer } from '../hooks/useTimer'
import { generatePostmortem } from '../services/aiService'
import { getProblem, updatePatterns, updateUserStats } from '../services/firestoreService'

export default function InterviewRoom() {
	const { problemId } = useParams()
	const { user } = useAuth()
	const navigate = useNavigate()

	const LANGUAGE_OPTIONS = [
		{ value: 'javascript', label: 'JavaScript' },
		{ value: 'typescript', label: 'TypeScript' },
		{ value: 'python', label: 'Python' },
		{ value: 'java', label: 'Java' },
		{ value: 'cpp', label: 'C++' },
		{ value: 'c', label: 'C' },
		{ value: 'go', label: 'Go' },
		{ value: 'csharp', label: 'C#' },
	]

	const [problem, setProblem] = useState(null)
	const [code, setCode] = useState('')
	const [scratchpad, setScratchpad] = useState('')
	const [language, setLanguage] = useState('javascript')
	const [sessionId, setSessionId] = useState(null)
	const [sessionStarted, setSessionStarted] = useState(false)
	const [submitting, setSubmitting] = useState(false)
	const [loadingProblem, setLoadingProblem] = useState(true)

	const timer = useTimer(problem?.timeLimit || 0)
	const { recordKeystroke, getHeatmapData, getEvents } = useKeystrokeTracker()
	const [heatmapData, setHeatmapData] = useState({})

	const { nudges, isAnalyzing } = useLiveMonitor({
		problem,
		code,
		scratchpad,
		elapsedSeconds: timer.elapsed,
		isActive: sessionStarted && !timer.isExpired,
	})

	const { startSession, submitSession } = useSession()

	useEffect(() => {
		async function load() {
			const p = await getProblem(problemId)
			if (!p) {
				navigate('/practice')
				return
			}
			setProblem(p)
			setCode(p.starterCode || '')
			setLoadingProblem(false)
		}
		load()
	}, [problemId, navigate])

	useEffect(() => {
		const interval = setInterval(() => {
			setHeatmapData(getHeatmapData())
		}, 3000)
		return () => clearInterval(interval)
	}, [getHeatmapData])

	async function handleStart() {
		const id = await startSession(user.uid, problemId)
		if (!id) return
		setSessionId(id)
		setSessionStarted(true)
		timer.start()
	}

	async function handleSubmit() {
		if (submitting) return
		setSubmitting(true)
		timer.pause()

		try {
			const postmortem = await generatePostmortem({
				problem,
				code,
				scratchpad,
				durationSeconds: timer.elapsed,
				nudges,
			})

			if (!postmortem || !sessionId) {
				setSubmitting(false)
				timer.start()
				return
			}

			await submitSession(sessionId, {
				userId: user.uid,
				problemId,
				finalCode: code,
				scratchpadContent: scratchpad,
				nudges,
				keystrokeEvents: getEvents(),
				postmortem,
			})
			await updatePatterns(user.uid, postmortem, problem.category)
			await updateUserStats(user.uid, postmortem.overallScore)
			navigate(`/review/${sessionId}`)
		} catch (err) {
			console.error('Submit error:', err)
			setSubmitting(false)
			timer.start()
		}
	}

	function handleCursorChange(line, col) {
		recordKeystroke(line, col)
	}

	if (loadingProblem) return <LoadingSpinner fullPage />

	return (
		<div className="flex flex-col h-screen bg-slate-950 overflow-hidden">
			<header className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 shrink-0">
				<div className="flex items-center gap-4">
					<button
						onClick={() => navigate('/practice')}
						className="text-slate-400 hover:text-white text-sm transition"
					>
						← Back
					</button>
					<h1 className="text-white font-semibold text-sm">{problem.title}</h1>
					<span
						className={`text-xs px-2 py-0.5 rounded-full font-medium ${
							problem.difficulty === 'easy'
								? 'bg-green-900/50 text-green-400'
								: problem.difficulty === 'medium'
									? 'bg-yellow-900/50 text-yellow-400'
									: 'bg-red-900/50 text-red-400'
						}`}
					>
						{problem.difficulty}
					</span>
				</div>

				<div className="flex items-center gap-4">
					<Timer
						minutes={timer.minutes}
						seconds={timer.seconds}
						urgency={timer.urgency}
						isRunning={timer.isRunning}
					/>
					{!sessionStarted ? (
						<button
							onClick={handleStart}
							className="bg-green-500 hover:bg-green-400 text-slate-900 font-semibold px-4 py-2 rounded-lg text-sm transition"
						>
							Start Interview
						</button>
					) : (
						<button
							onClick={handleSubmit}
							disabled={submitting}
							className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded-lg text-sm transition flex items-center gap-2"
						>
							{submitting ? (
								<>
									<LoadingSpinner />
									Analyzing…
								</>
							) : (
								'Submit Solution'
							)}
						</button>
					)}
				</div>
			</header>

			<div className="flex flex-1 overflow-hidden min-h-0">
				<div className="w-[28%] bg-slate-900 border-r border-slate-800 overflow-y-auto p-5 shrink-0 min-h-0">
					<div className="flex flex-wrap gap-2 mb-4">
						<span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">
							{problem.category}
						</span>
						{problem.companies.slice(0, 3).map((c) => (
							<span key={c} className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">
								{c}
							</span>
						))}
					</div>
					<pre className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed font-sans">
						{problem.prompt}
					</pre>

					{sessionStarted && (
						<div className="mt-6 pt-4 border-t border-slate-800">
							<p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-2">
								Hints
							</p>
							<ul className="space-y-1">
								{problem.hints.map((h, i) => (
									<li key={i} className="text-xs text-slate-400 flex gap-2">
										<span className="text-slate-600">{i + 1}.</span>
										<span>{h}</span>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>

				<div className="flex-1 flex overflow-hidden min-w-0 min-h-0">
					<div className="w-10 bg-slate-950 border-r border-slate-800 shrink-0 min-h-0">
						<KeystrokeHeatmap heatmapData={heatmapData} totalLines={40} />
					</div>

					<div className="flex-1 flex flex-col overflow-hidden min-w-0 min-h-0">
						<div className="shrink-0 px-3 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-3">
							<div className="text-xs text-slate-400 font-medium tracking-wide uppercase">Code Editor</div>
							<label className="flex items-center gap-2 text-xs text-slate-400">
								<span className="text-slate-500">Language</span>
								<select
									value={language}
									onChange={(e) => setLanguage(e.target.value)}
									className="bg-slate-950 border border-slate-700 rounded-md px-2 py-1 text-slate-200 focus:outline-none"
								>
									{LANGUAGE_OPTIONS.map((opt) => (
										<option key={opt.value} value={opt.value}>
											{opt.label}
										</option>
									))}
								</select>
							</label>
						</div>
						<div className="flex-[3] overflow-hidden min-h-0">
							<CodeEditor
								value={code}
								onChange={(val) => setCode(val || '')}
								onCursorChange={handleCursorChange}
								language={language}
							/>
						</div>
						<div className="flex-1 overflow-hidden min-h-0">
							<Scratchpad
								value={scratchpad}
								onChange={setScratchpad}
								language={language}
								onLanguageChange={setLanguage}
								languageOptions={LANGUAGE_OPTIONS}
							/>
						</div>
					</div>
				</div>

				<div className="w-64 bg-slate-900 border-l border-slate-800 shrink-0 overflow-hidden min-h-0">
					<NudgeSidebar nudges={nudges} isAnalyzing={isAnalyzing} />
				</div>
			</div>
		</div>
	)
}
