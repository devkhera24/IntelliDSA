export function getAuthErrorMessage(error, context = 'login') {
	const code = error?.code || ''

	switch (code) {
		case 'auth/invalid-email':
			return 'Please enter a valid email address.'
		case 'auth/missing-email':
			return 'Email is required.'
		case 'auth/missing-password':
			return 'Password is required.'
		case 'auth/weak-password':
			return 'Password must be at least 6 characters.'
		case 'auth/email-already-in-use':
			return 'An account already exists with this email.'
		case 'auth/user-disabled':
			return 'This account has been disabled.'
		case 'auth/network-request-failed':
			return 'Network error. Check your connection and try again.'
		case 'auth/too-many-requests':
			return 'Too many attempts. Please wait a bit and try again.'

		// Login-focused errors that we intentionally collapse for safety.
		case 'auth/invalid-credential':
		case 'auth/wrong-password':
		case 'auth/user-not-found':
			return 'Invalid email or password.'

		case 'auth/operation-not-allowed':
			return 'Email/password sign-in is not enabled yet. Enable it in Firebase Auth.'

		default:
			return context === 'signup'
				? 'Could not create your account. Please try again.'
				: 'Could not sign in. Please try again.'
	}
}
