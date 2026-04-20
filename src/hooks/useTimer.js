import { useEffect, useRef, useState } from 'react'

export function useTimer(initialSeconds) {
	const [timeLeft, setTimeLeft] = useState(initialSeconds)
	const [isRunning, setIsRunning] = useState(false)
	const [elapsed, setElapsed] = useState(0)
	const intervalRef = useRef(null)

	useEffect(() => {
		setIsRunning(false)
		setTimeLeft(initialSeconds)
		setElapsed(0)
	}, [initialSeconds])

	useEffect(() => {
		if (isRunning) {
			intervalRef.current = setInterval(() => {
				setTimeLeft((t) => {
					if (t <= 1) {
						setIsRunning(false)
						clearInterval(intervalRef.current)
						return 0
					}
					return t - 1
				})
				setElapsed((e) => e + 1)
			}, 1000)
		} else {
			clearInterval(intervalRef.current)
		}
		return () => clearInterval(intervalRef.current)
	}, [isRunning])

	function start() {
		setIsRunning(true)
	}
	function pause() {
		setIsRunning(false)
	}
	function reset() {
		setIsRunning(false)
		setTimeLeft(initialSeconds)
		setElapsed(0)
	}

	const minutes = Math.floor(timeLeft / 60)
	const seconds = timeLeft % 60
	const isExpired = timeLeft === 0
	const urgency = timeLeft < 120 ? 'critical' : timeLeft < 300 ? 'warning' : 'normal'

	return { timeLeft, elapsed, minutes, seconds, isRunning, isExpired, urgency, start, pause, reset }
}
