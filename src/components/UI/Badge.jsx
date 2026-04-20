export default function Badge({ children, className = '' }) {
	return (
		<span
			className={[
				'inline-flex items-center rounded-full border border-slate-700 bg-slate-800/60 px-2.5 py-1 text-xs font-medium text-slate-200',
				className,
			]
				.filter(Boolean)
				.join(' ')}
		>
			{children}
		</span>
	)
}
