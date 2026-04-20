export default function LoadingSpinner({ fullPage = false }) {
	if (fullPage) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-slate-900">
				<div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
			</div>
		)
	}
	return (
		<div className="flex items-center justify-center p-4">
			<div className="w-6 h-6 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
		</div>
	)
}
