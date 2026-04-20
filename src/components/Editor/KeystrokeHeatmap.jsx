export default function KeystrokeHeatmap({ heatmapData, totalLines = 30 }) {
	if (!heatmapData || Object.keys(heatmapData).length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-full text-slate-600 text-xs p-2">
				<div className="writing-mode-vertical text-center">Start typing to see hesitation map</div>
			</div>
		)
	}

	return (
		<div
			className="flex flex-col h-full px-1 py-2 gap-0.5 overflow-hidden"
			title="Hesitation heatmap — brighter = more pause time on that line"
		>
			<div className="text-xs text-slate-500 text-center mb-1">Hesitation</div>
			{Array.from({ length: totalLines }, (_, i) => i + 1).map((line) => {
				const intensity = heatmapData[line] || 0
				const opacity = intensity > 0 ? 0.2 + intensity * 0.8 : 0.05
				const color = intensity > 0.7 ? '#ef4444' : intensity > 0.4 ? '#f97316' : '#22c55e'

				return (
					<div
						key={line}
						className="flex-1 rounded-sm min-h-[2px]"
						style={{ backgroundColor: color, opacity }}
						title={`Line ${line}: intensity ${Math.round(intensity * 100)}%`}
					/>
				)
			})}
			<div className="flex justify-between text-[9px] text-slate-600 mt-1">
				<span>low</span>
				<span>high</span>
			</div>
		</div>
	)
}
