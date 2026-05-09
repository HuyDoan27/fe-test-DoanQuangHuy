import { Card, Avatar } from 'antd'

import {
    UserOutlined,
    CalendarOutlined,
} from '@ant-design/icons'

import dayjs from 'dayjs'

import TaskStatusTag from './TaskStatusTag'

import { useAppSelector } from '../../../store/hooks'

import { selectAllTasks } from '../../../store/selectors/taskSelectors'

function RecentTaskTable() {
    const tasks = useAppSelector(
        selectAllTasks
    )

    const recentTasks = [...tasks]
        .sort(
            (a, b) =>
                new Date(
                    b.createdAt
                ).getTime() -
                new Date(
                    a.createdAt
                ).getTime()
        )
        .slice(0, 5)

    return (
        <Card
            title="5 Tasks Recently Added"
            extra={
                <button
                    className="
                        text-violet-500
                        hover:text-violet-600
                        text-sm
                        font-medium
                    "
                >
                    View All →
                </button>
            }
            className="rounded-2xl border-0 shadow-sm h-full"
        >
            <div className="space-y-1">
                {recentTasks.map((task) => (
                    <div
                        key={task.id}
                        className="
                            flex items-start gap-4
                            rounded-2xl
                            border border-slate-100
                            p-2
                            transition-all
                            hover:border-violet-200
                            hover:shadow-sm
                        "
                    >
                        <Avatar
                            size={48}
                            className="!bg-violet-100 !text-violet-600 !font-semibold shrink-0"
                        >
                            {task.title
                                .slice(0, 2)
                                .toUpperCase()}
                        </Avatar>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <h3
                                        className="
                                            font-semibold
                                            text-slate-800
                                            truncate
                                        "
                                    >
                                        {task.title}
                                    </h3>

                                    {task.description && (
                                        <p
                                            className="
                                                text-sm
                                                text-slate-400
                                                mt-1
                                                line-clamp-1
                                            "
                                        >
                                            {
                                                task.description
                                            }
                                        </p>
                                    )}
                                </div>

                                <TaskStatusTag
                                    status={
                                        task.status
                                    }
                                />
                            </div>

                            <div
                                className="
                                    flex items-center gap-4
                                    mt-3
                                    text-sm text-slate-500
                                "
                            >
                                <div className="flex items-center gap-1">
                                    <UserOutlined />

                                    <span>
                                        {task.assignee ||
                                            'Unassigned'}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <CalendarOutlined />

                                    <span>
                                        {task.dueDate
                                            ? dayjs(
                                                  task.dueDate
                                              ).format(
                                                  'DD MMM YYYY'
                                              )
                                            : '-'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default RecentTaskTable