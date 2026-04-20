const styles = {
	easy: 'bg-green-900/50 text-green-400',
	medium: 'bg-yellow-900/50 text-yellow-400',
	hard: 'bg-red-900/50 text-red-400',
	default: 'bg-slate-800 text-slate-300',
}

export default function Badge({ label, children, variant = 'default', className = '' }) {
	const content = label ?? children
	return (
		<span
			className={[
				'text-xs px-2 py-0.5 rounded-full font-medium',
				styles[variant] || styles.default,
				className,
			]
				.filter(Boolean)
				.join(' ')}
		>
			{content}
		</span>
	)
}
