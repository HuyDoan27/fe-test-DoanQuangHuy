import { Card, Tag } from 'antd'

const recentTasks = [
    {
        id: 1,
        title: 'Design landing page mockup',
        assignee: 'Alice',
        dueDate: 'Mar 20',
        status: 'In Progress',
        color: 'processing',
        short: 'UI',
    },
    {
        id: 2,
        title: 'API integration research',
        assignee: 'Bob',
        dueDate: 'Mar 22',
        status: 'Todo',
        color: 'default',
        short: 'AP',
    },
    {
        id: 3,
        title: 'Database schema design',
        assignee: 'Carol',
        dueDate: 'Mar 18',
        status: 'Done',
        color: 'success',
        short: 'DB',
    },
    {
        id: 4,
        title: 'Write unit tests for auth',
        assignee: 'Unassigned',
        dueDate: 'Mar 25',
        status: 'Todo',
        color: 'default',
        short: 'UT',
    },
    {
        id: 5,
        title: 'Code review sprint 3',
        assignee: 'Dave',
        dueDate: 'Mar 19',
        status: 'In Progress',
        color: 'processing',
        short: 'CR',
    },
]

function TaskTable() {
    return (
        <Card
            title="5 Tasks Recently Added"
            extra={
                <button className="text-violet-500 hover:text-violet-600 text-sm font-medium">
                    View All →
                </button>
            }
            className="rounded-2xl border-0 shadow-sm"
        >
            <div className="grid gap-1">
                {recentTasks.map((task) => (
                    <div
                        key={task.id}
                        className="
                            grid grid-cols-[auto_1fr_auto]
                            items-center
                            gap-4
                            rounded-2xl
                            border border-slate-100
                            p-4
                            hover:border-violet-200
                            hover:shadow-sm
                            transition-all
                        "
                    >
                        {/* Avatar */}
                        <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 font-semibold shrink-0">
                            {task.short}
                        </div>

                        {/* Content */}
                        <div className="min-w-0">
                            <h3 className="font-semibold text-slate-800 truncate">
                                {task.title}
                            </h3>

                            <p className="text-sm text-slate-400 truncate">
                                Assigned: {task.assignee} · Due {task.dueDate}
                            </p>
                        </div>

                        {/* Status */}
                        <div className="shrink-0">
                            <Tag color={task.color}>{task.status}</Tag>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default TaskTable