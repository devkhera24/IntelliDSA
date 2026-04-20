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

	const { problem, code, scratchpad, durationSeconds, nudges = [] } = getJsonBody(req)
	if (!problem) {
		res.status(400).json({ error: 'Missing problem' })
		return
	}

	const systemPrompt = `You are conducting a technical interview debrief.
Evaluate the candidate's session fairly and return structured JSON feedback.

Scoring rubric (0–10 for each):
- approachScore:       Did they think before coding? Plan the algorithm first?
- complexityScore:     Did they analyze time/space complexity correctly?
- edgeCaseScore:       Did they handle edge cases (empty input, negatives, duplicates)?
- communicationScore:  Did their scratchpad show clear thinking? Would an interviewer follow their reasoning?
- overallScore:        Weighted average of the above

Be honest. A score of 7 means good but not perfect. Reserve 9–10 for truly exceptional work.

Return ONLY valid JSON, no markdown fences:`

	const userPrompt = `Problem: ${problem.title} (${problem.difficulty} | ${problem.category})
Expected concepts: ${problem.expectedConcepts?.join(', ') || ''}
Common mistakes to check for: ${problem.commonMistakes?.join(', ') || ''}

Session duration: ${Math.round((durationSeconds || 0) / 60)} minutes ${(durationSeconds || 0) % 60} seconds
(Time limit was ${Math.round((problem.timeLimit || 0) / 60)} minutes)

--- Final submitted code ---
${code || '(no code submitted)'}

--- Candidate thinking notes (scratchpad) ---
${scratchpad || '(no notes taken)'}

--- AI nudges the candidate received during the session ---
${nudges.length > 0 ? nudges.map((n) => `[${n.type}] ${n.message}`).join('\n') : 'No nudges were needed'}

Return this exact JSON structure:
{
  "approachScore": <0-10>,
  "complexityScore": <0-10>,
  "edgeCaseScore": <0-10>,
  "communicationScore": <0-10>,
  "overallScore": <0-10>,
  "strengths": ["<strength 1>", "<strength 2>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>"],
  "interviewerNote": "<2-3 sentence honest assessment from a real interviewer's perspective>"
}`

	try {
		const openai = new OpenAI({ apiKey })
		const response = await openai.chat.completions.create({
			model: 'gpt-4o',
			messages: [
				{ role: 'system', content: systemPrompt },
				{ role: 'user', content: userPrompt },
			],
			max_tokens: 500,
			temperature: 0.3,
			response_format: { type: 'json_object' },
		})

		const raw = response.choices?.[0]?.message?.content || 'null'
		res.status(200).json({ postmortem: JSON.parse(raw) })
	} catch (err) {
		console.error('api/postmortem error:', err)
		res.status(500).json({ error: 'Postmortem generation failed' })
	}
}
