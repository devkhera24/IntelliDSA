async function postJson(url, payload) {
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	})

	if (!res.ok) {
		throw new Error(`Request failed: ${res.status}`)
	}

	return res.json()
}

// ─── LIVE NUDGE ──────────────────────────────────────────
// Called every ~15s during an active session
export async function getNudge({ problem, code, scratchpad, elapsedSeconds, previousNudges = [] }) {
	try {
		const data = await postJson('/api/nudge', {
			problem,
			code,
			scratchpad,
			elapsedSeconds,
			previousNudges,
		})
		return data?.nudge || null
	} catch (err) {
		console.error('getNudge error:', err)
		return null
	}
}

// ─── POSTMORTEM ───────────────────────────────────────────
// Called once when user submits their solution
export async function generatePostmortem({ problem, code, scratchpad, durationSeconds, nudges }) {
	try {
		const data = await postJson('/api/postmortem', {
			problem,
			code,
			scratchpad,
			durationSeconds,
			nudges,
		})
		return data?.postmortem || null
	} catch (err) {
		console.error('generatePostmortem error:', err)
		return null
	}
}
