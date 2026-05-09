import { Card, Progress } from 'antd'

import { useAppSelector } from '../../../store/hooks'

import { selectTaskStats } from '../../../store/selectors/taskSelectors'

function DashboardProgress() {
    const {
        total,
        todo,
        inProgress,
        done,
    } = useAppSelector(selectTaskStats)

    const totalTasks = total || 1

    const todoPercent = Math.round(
        (todo / totalTasks) * 100
    )

    const inProgressPercent = Math.round(
        (inProgress / totalTasks) * 100
    )

    const donePercent = Math.round(
        (done / totalTasks) * 100
    )

    const progressData = [
        {
            title: 'Todo',
            percent: todoPercent,
            color: '#9b8cf3',
            count: todo,
        },

        {
            title: 'In Progress',
            percent: inProgressPercent,
            color: '#4096ff',
            count: inProgress,
        },

        {
            title: 'Done',
            percent: donePercent,
            color: '#22c55e',
            count: done,
        },
    ]

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
            <div className="space-y-6">
                {progressData.map((item) => (
                    <div key={item.title}>
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <span className="font-medium text-slate-700">
                                    {item.title}
                                </span>

                                <span className="ml-2 text-sm text-slate-400">
                                    ({item.count} tasks)
                                </span>
                            </div>

                            <span
                                className="font-semibold"
                                style={{
                                    color: item.color,
                                }}
                            >
                                {item.percent}%
                            </span>
                        </div>

                        <Progress
                            percent={
                                item.percent
                            }
                            showInfo={false}
                            strokeColor={
                                item.color
                            }
                            trailColor="#f1f5f9"
                        />
                    </div>
                ))}

                <div className="pt-6 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold tracking-wide text-slate-400">
                            OVERALL COMPLETION
                        </span>

                        <span className="text-violet-500 font-bold text-lg">
                            {donePercent}%
                        </span>
                    </div>

                    <Progress
                        percent={donePercent}
                        showInfo={false}
                        strokeColor="#8b5cf6"
                        strokeWidth={10}
                        trailColor="#ede9fe"
                    />
                </div>
            </div>
        </Card>
    )
}

export default DashboardProgress