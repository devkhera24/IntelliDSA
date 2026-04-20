export function getTopWeaknesses(weaknessFrequency, count = 3) {
	return Object.entries(weaknessFrequency || {})
		.sort(([, a], [, b]) => b - a)
		.slice(0, count)
		.map(([weakness, freq]) => ({ weakness, freq }))
}

export function getScoreTrend(sessions) {
	return sessions
		.filter((s) => s.postmortem)
		.slice(0, 10)
		.reverse()
		.map((s, i) => ({
			session: i + 1,
			score: s.postmortem.overallScore,
			label: s.postmortem ? `#${i + 1}` : '',
		}))
}

export function getCategoryRadarData(categoryScores) {
	return Object.entries(categoryScores || {}).map(([category, score]) => ({
		category: category.charAt(0).toUpperCase() + category.slice(1),
		score: parseFloat(score.toFixed(1)),
		fullMark: 10,
	}))
}
