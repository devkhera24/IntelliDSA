export default function Button({
	children,
	as: Comp = 'button',
	variant = 'primary',
	size = 'md',
	className = '',
	...props
}) {
	const base =
		'inline-flex items-center justify-center font-semibold rounded-lg transition focus:outline-none disabled:opacity-50'
	const variants = {
		primary: 'bg-green-500 hover:bg-green-400 text-slate-900',
		secondary: 'bg-slate-700 hover:bg-slate-600 text-white',
		danger: 'bg-red-600 hover:bg-red-500 text-white',
		ghost: 'text-slate-400 hover:text-white',
	}
	const sizes = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2',
		lg: 'px-6 py-3 text-lg',
	}

	const classes = [base, variants[variant] || variants.primary, sizes[size] || sizes.md, className]
		.filter(Boolean)
		.join(' ')

	return (
		<Comp className={classes} {...props}>
			{children}
		</Comp>
	)
}
