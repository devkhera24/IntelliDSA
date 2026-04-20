import { useCallback, useRef } from 'react'

// Each event: { line, col, pauseBefore, charCount, timestamp }
// pauseBefore = ms since last keypress (high value = hesitation)

export function useKeystrokeTracker() {
	const eventsRef = useRef([])
	const lastEventTime = useRef(null)
	const lineCountRef = useRef({})

	const recordKeystroke = useCallback((lineNumber, colNumber) => {
		const now = Date.now()
		const pause = lastEventTime.current ? now - lastEventTime.current : 0
		lastEventTime.current = now

		const event = { line: lineNumber, col: colNumber, pauseBefore: pause, timestamp: now }
		eventsRef.current.push(event)

		lineCountRef.current[lineNumber] = (lineCountRef.current[lineNumber] || 0) + pause
	}, [])

	const getHeatmapData = useCallback(() => {
		const raw = lineCountRef.current
		const values = Object.values(raw)
		if (values.length === 0) return {}
		const maxPause = Math.max(...values)
		if (maxPause === 0) return {}

		const normalized = {}
		Object.entries(raw).forEach(([line, pause]) => {
			normalized[line] = parseFloat((pause / maxPause).toFixed(2))
		})
		return normalized
	}, [])

	function getEvents() {
		return eventsRef.current
	}

	function reset() {
		eventsRef.current = []
		lineCountRef.current = {}
		lastEventTime.current = null
	}

	return { recordKeystroke, getHeatmapData, getEvents, reset }
}
