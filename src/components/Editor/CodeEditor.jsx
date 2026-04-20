import Editor from '@monaco-editor/react'

export default function CodeEditor({ value, onChange, onCursorChange, language = 'javascript' }) {
	function handleMount(editor) {
		editor.onDidChangeCursorPosition((e) => {
			if (onCursorChange) {
				onCursorChange(e.position.lineNumber, e.position.column)
			}
		})
	}

	return (
		<Editor
			height="100%"
			language={language}
			value={value}
			theme="vs-dark"
			onChange={onChange}
			onMount={handleMount}
			options={{
				fontSize: 14,
				minimap: { enabled: false },
				scrollBeyondLastLine: false,
				wordWrap: 'on',
				lineNumbers: 'on',
				padding: { top: 12, bottom: 12 },
				fontFamily: "'Fira Code', 'Cascadia Code', monospace",
				fontLigatures: true,
				renderLineHighlight: 'line',
				smoothScrolling: true,
			}}
		/>
	)
}
