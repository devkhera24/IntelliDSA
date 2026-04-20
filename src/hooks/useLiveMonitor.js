import { useCallback, useEffect, useRef, useState } from 'react'
import { getNudge } from '../services/aiService'
import { MIN_CODE_LENGTH, NUDGE_INTERVAL } from '../utils/constants'

export function useLiveMonitor({ problem, code, scratchpad, elapsedSeconds, isActive }) {
	const [nudges, setNudges] = useState([])
	const [isAnalyzing, setIsAnalyzing] = useState(false)
	const [error, setError] = useState(null)
	const inFlightRef = useRef(false)
	const lastTickRef = useRef(null)
	const latestRef = useRef({ code: '', scratchpad: '', elapsedSeconds: 0 })
	const nudgesRef = useRef([])

	useEffect(() => {
		latestRef.current = { code: code || '', scratchpad: scratchpad || '', elapsedSeconds: elapsedSeconds || 0 }
	}, [code, scratchpad, elapsedSeconds])

	useEffect(() => {
		nudgesRef.current = nudges
	}, [nudges])

	const analyzeNow = useCallback(async () => {
		if (!isActive || !problem) return
		if (inFlightRef.current) return

		const { code: currentCode, scratchpad: currentScratch, elapsedSeconds: elapsed } = latestRef.current
		const snapshot = String(currentCode || '') + String(currentScratch || '')
		if (snapshot.trim().length < MIN_CODE_LENGTH) return

		const now = Date.now()
		if (lastTickRef.current && now - lastTickRef.current < NUDGE_INTERVAL - 50) return
		lastTickRef.current = now

		inFlightRef.current = true
		setIsAnalyzing(true)
		setError(null)
		try {
			const nudge = await getNudge({
				problem,
				code: currentCode,
				scratchpad: currentScratch,
				elapsedSeconds: elapsed,
				previousNudges: nudgesRef.current.slice(-5),
			})
			if (nudge && nudge.type) {
				setNudges((prev) => [...prev, { ...nudge, timestamp: elapsed, id: Date.now() }])
			}
		} catch (err) {
			const message = err?.message || 'Nudge request failed'
			setError(message)
		} finally {
			setIsAnalyzing(false)
			inFlightRef.current = false
		}
	}, [isActive, problem])

	useEffect(() => {
		if (!isActive || !problem) return
		lastTickRef.current = null
		setError(null)

		const interval = setInterval(() => {
			analyzeNow()
		}, NUDGE_INTERVAL)

		return () => clearInterval(interval)
	}, [isActive, problem, analyzeNow])

	function clearNudges() {
		setNudges([])
	}

	return { nudges, isAnalyzing, error, clearNudges }
}
