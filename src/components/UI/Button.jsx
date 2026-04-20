const base =
	'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed'

const sizes = {
	sm: 'h-9 px-3 text-sm',
	md: 'h-10 px-4 text-sm',
	lg: 'h-11 px-5 text-base',
}

const variants = {
	primary:
		'bg-brand-500 text-slate-950 hover:bg-brand-600 border border-transparent',
	secondary:
		'bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700',
	ghost:
		'bg-transparent text-slate-200 hover:bg-slate-800/60 border border-transparent',
}

export default function Button({
	as: Comp = 'button',
	variant = 'primary',
	size = 'md',
	className = '',
	...props
}) {
	const classes = [base, sizes[size] ?? sizes.md, variants[variant] ?? variants.primary, className]
		.filter(Boolean)
		.join(' ')

	return <Comp className={classes} {...props} />
}
