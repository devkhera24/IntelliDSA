import OpenAI from 'openai'

function getJsonBody(req) {
	if (typeof req.body === 'object' && req.body !== null) return req.body
	try {
		return JSON.parse(req.body || '{}')
	} catch {
		return {}
	}
}

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.status(405).json({ error: 'Method Not Allowed' })
		return
	}

	const apiKey = process.env.OPENAI_API_KEY
	if (!apiKey) {
		res.status(500).json({ error: 'Server missing OPENAI_API_KEY' })
		return
	}

	const { problem, code, scratchpad, elapsedSeconds, previousNudges = [] } = getJsonBody(req)
	if (!problem) {
		res.status(400).json({ error: 'Missing problem' })
		return
	}

	const totalSeconds = problem.timeLimit
	const percentComplete = Math.round(((elapsedSeconds || 0) / totalSeconds) * 100)

	const systemPrompt = `You are a senior software engineer silently observing a technical interview.
Your role is to give ONE short, specific, non-blocking nudge to the candidate.

Rules:
- Only comment on CONCEPTUAL issues — never syntax errors or typos
- If the candidate is on the right track and needs no guidance, return null
- Never repeat a nudge already given in this session
- Be direct but supportive. Tone: experienced mentor, not critic
- Consider how much time has passed when judging urgency
- Nudge types:
    "hint"    → gentle direction toward better approach
    "warning" → candidate is going down a wrong path
    "flag"    → interview red flag behavior (e.g. jumping to code without planning)

Return ONLY a valid JSON object, no markdown, no explanation:
{ "type": "hint" | "warning" | "flag" | null, "message": "message under 25 words" }

If no nudge needed, return: { "type": null, "message": null }`

	const userPrompt = `Problem: ${problem.title} (${problem.difficulty} | ${problem.category})
Expected concepts to demonstrate: ${problem.expectedConcepts?.join(', ') || ''}
Common mistakes to watch for: ${problem.commonMistakes?.join(', ') || ''}

Time elapsed: ${elapsedSeconds || 0}s out of ${totalSeconds}s (${Number.isFinite(percentComplete) ? percentComplete : 0}% through)

--- Candidate's current code ---
${code || '(no code written yet)'}

--- Candidate's thinking scratchpad ---
${scratchpad || '(nothing written)'}

--- Previous nudges already given (DO NOT repeat these) ---
${previousNudges.length > 0 ? previousNudges.map((n) => `• ${n.message}`).join('\n') : 'None yet'}

Provide one nudge or null.`

	try {
		const openai = new OpenAI({ apiKey })
		const response = await openai.chat.completions.create({
			model: 'gpt-4o',
			messages: [
				{ role: 'system', content: systemPrompt },
				{ role: 'user', content: userPrompt },
			],
			max_tokens: 100,
			temperature: 0.4,
			response_format: { type: 'json_object' },
		})

		const raw = response.choices?.[0]?.message?.content || '{}'
		const parsed = JSON.parse(raw)

		if (!parsed.type) {
			res.status(200).json({ nudge: null })
			return
		}

		res.status(200).json({ nudge: parsed })
	} catch (err) {
		console.error('api/nudge error:', err)
		res.status(200).json({ nudge: null })
	}
}
