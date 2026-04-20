import { useCallback, useEffect, useRef, useState } from 'react'
import { getNudge } from '../services/aiService'
import { debounce } from '../utils/debounce'
import { MIN_CODE_LENGTH, NUDGE_INTERVAL } from '../utils/constants'

export function useLiveMonitor({ problem, code, scratchpad, elapsedSeconds, isActive }) {
	const [nudges, setNudges] = useState([])
	const [isAnalyzing, setIsAnalyzing] = useState(false)
	const lastSnapshotRef = useRef('')

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const analyze = useCallback(
		debounce(async (currentCode, currentScratch, elapsed) => {
			const snapshot = currentCode + currentScratch
			if (snapshot === lastSnapshotRef.current) return
			if (snapshot.trim().length < MIN_CODE_LENGTH) return
			lastSnapshotRef.current = snapshot

			setIsAnalyzing(true)
			try {
				const nudge = await getNudge({
					problem,
					code: currentCode,
					scratchpad: currentScratch,
					elapsedSeconds: elapsed,
					previousNudges: nudges.slice(-5),
				})
				if (nudge && nudge.type) {
					setNudges((prev) => [...prev, { ...nudge, timestamp: elapsed, id: Date.now() }])
				}
			} catch (err) {
				console.error('Live monitor error:', err)
			} finally {
				setIsAnalyzing(false)
			}
		}, NUDGE_INTERVAL),
		[problem]
	)

	useEffect(() => {
		if (isActive && problem) {
			analyze(code, scratchpad, elapsedSeconds)
		}
	}, [code, scratchpad, isActive])

	function clearNudges() {
		setNudges([])
	}

	return { nudges, isAnalyzing, clearNudges }
}
