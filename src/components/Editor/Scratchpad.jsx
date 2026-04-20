export default function Scratchpad({
	value,
	onChange,
	language,
	onLanguageChange,
	languageOptions = [],
}) {
	return (
		<div className="flex flex-col h-full">
			<div className="flex items-center justify-between gap-3 px-3 py-2 bg-slate-800 border-b border-slate-700">
				<div className="min-w-0">
					<span className="text-xs text-slate-400 font-medium tracking-wide uppercase">
						Thinking Scratchpad
					</span>
					<span className="ml-2 text-xs text-slate-500">— think out loud here, AI reads this too</span>
				</div>
				{onLanguageChange && languageOptions.length > 0 && (
					<label className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
						<span className="text-slate-500">Language</span>
						<select
							value={language}
							onChange={(e) => onLanguageChange(e.target.value)}
							className="bg-slate-900 border border-slate-600 rounded-md px-2 py-1 text-slate-200 focus:outline-none"
						>
							{languageOptions.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
					</label>
				)}
			</div>
			<textarea
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="flex-1 bg-slate-900 text-slate-300 p-4 resize-none focus:outline-none font-mono text-sm leading-relaxed"
				placeholder={`Write your thought process here...
e.g. 'Ok, this looks like a graph problem. I'll try BFS first.
Time complexity should be O(V+E). Edge cases: empty graph, disconnected nodes...'`}
				spellCheck={false}
			/>
		</div>
	)
}
