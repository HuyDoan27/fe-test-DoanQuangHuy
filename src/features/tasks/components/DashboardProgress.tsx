import { Card } from 'antd'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { useAppSelector } from '../../../store/hooks'
import { selectTaskStats } from '../../../store/selectors/taskSelectors'

const COLORS = [
    { key: 'Todo', color: '#9b8cf3' },
    { key: 'In Progress', color: '#4096ff' },
    { key: 'Done', color: '#22c55e' },
]

function DashboardProgress() {
    const { total, todo, inProgress, done } = useAppSelector(selectTaskStats)

    const data = [
        { name: 'Todo', value: todo },
        { name: 'In Progress', value: inProgress },
        { name: 'Done', value: done },
    ].filter(d => d.value > 0)

    const donePercent = total ? Math.round((done / total) * 100) : 0

    return (
        <Card
            title="Task Progress Overview"
            extra={
                <span className="text-violet-500 font-medium cursor-pointer hover:text-violet-600 transition-colors">
                    View All →
                </span>
            }
            className="rounded-2xl border-0 shadow-sm h-full"
        >
            <div className="relative pt-20">
                <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={75}
                            outerRadius={110}
                            paddingAngle={3}
                            dataKey="value"
                            strokeWidth={0}
                        >
                            {data.map((entry) => (
                                <Cell
                                    key={entry.name}
                                    fill={COLORS.find(c => c.key === entry.name)?.color}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => [`${value} tasks`, '']}
                            contentStyle={{
                                borderRadius: 10,
                                border: 'none',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                                fontSize: 13,
                            }}
                        />
                        <Legend
                            iconType="circle"
                            iconSize={8}
                            formatter={(value, entry: any) => (
                                <span style={{ color: '#64748b', fontSize: 13 }}>
                                    {value}
                                    <span style={{ color: '#94a3b8', marginLeft: 4 }}>
                                        ({entry.payload.value})
                                    </span>
                                </span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center label */}
                <div
                    className="absolute flex flex-col items-center justify-center pointer-events-none"
                    style={{ top: 90, left: '50%', transform: 'translateX(-50%)', height: 220 }}
                >
                    <span className="text-3xl font-bold text-slate-700">{donePercent}%</span>
                    <span className="text-xs text-slate-400 mt-0.5">Completed</span>
                </div>
            </div>

            {/* Summary row */}
            <div className="flex justify-around pt-2 border-t border-slate-100 mt-1">
                {COLORS.map(({ key, color }) => {
                    const val = key === 'Todo' ? todo : key === 'In Progress' ? inProgress : done
                    return (
                        <div key={key} className="flex flex-col items-center gap-0.5">
                            <span className="text-lg font-bold" style={{ color }}>{val}</span>
                            <span className="text-xs text-slate-400">{key}</span>
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}

export default DashboardProgress