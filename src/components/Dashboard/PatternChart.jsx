import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	BarChart,
	Bar,
} from 'recharts'

export function ScoreTrendChart({ data }) {
	return (
		<ResponsiveContainer width="100%" height={220}>
			<LineChart data={data}>
				<CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
				<XAxis
					dataKey="session"
					tick={{ fill: '#64748b', fontSize: 12 }}
					label={{ value: 'Session', fill: '#64748b', fontSize: 12 }}
				/>
				<YAxis domain={[0, 10]} tick={{ fill: '#64748b', fontSize: 12 }} />
				<Tooltip
					contentStyle={{
						backgroundColor: '#1e293b',
						border: '1px solid #334155',
						borderRadius: 8,
					}}
					labelStyle={{ color: '#94a3b8' }}
				/>
				<Line
					type="monotone"
					dataKey="score"
					stroke="#22c55e"
					strokeWidth={2}
					dot={{ fill: '#22c55e', r: 4 }}
				/>
			</LineChart>
		</ResponsiveContainer>
	)
}

export function WeaknessBarChart({ data }) {
	return (
		<ResponsiveContainer width="100%" height={220}>
			<BarChart data={data} layout="vertical">
				<CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
				<XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} />
				<YAxis
					type="category"
					dataKey="weakness"
					tick={{ fill: '#94a3b8', fontSize: 11 }}
					width={140}
				/>
				<Tooltip
					contentStyle={{
						backgroundColor: '#1e293b',
						border: '1px solid #334155',
						borderRadius: 8,
					}}
				/>
				<Bar dataKey="freq" fill="#ef4444" fillOpacity={0.7} radius={[0, 4, 4, 0]} />
			</BarChart>
		</ResponsiveContainer>
	)
}
