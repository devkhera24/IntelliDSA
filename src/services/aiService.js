async function postJson(url, payload) {
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	})

	if (!res.ok) {
		let details = ''
		try {
			const data = await res.json()
			details = data?.error ? `: ${data.error}` : ''
		} catch {
			// ignore
		}
		throw new Error(`Request failed: ${res.status}${details}`)
	}

	return res.json()
}

// ─── LIVE NUDGE ──────────────────────────────────────────
// Called every ~15s during an active session
export async function getNudge({ problem, code, scratchpad, elapsedSeconds, previousNudges = [] }) {
	const data = await postJson('/api/nudge', {
		problem,
		code,
		scratchpad,
		elapsedSeconds,
		previousNudges,
	})
	return data?.nudge || null
}

// ─── POSTMORTEM ───────────────────────────────────────────
// Called once when user submits their solution
export async function generatePostmortem({ problem, code, scratchpad, language, durationSeconds, nudges }) {
	try {
		const data = await postJson('/api/postmortem', {
			problem,
			code,
			scratchpad,
			language,
			durationSeconds,
			nudges,
		})
		return data?.postmortem || null
	} catch (err) {
		console.error('generatePostmortem error:', err)
		return null
	}
}
