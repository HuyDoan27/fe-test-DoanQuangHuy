import {
    Button,
    Select,
    Space,
    Table,
    Avatar,
} from 'antd'

import {
    DeleteOutlined,
    EditOutlined,
    UserOutlined,
    CalendarOutlined,
} from '@ant-design/icons'

import type { ColumnsType } from 'antd/es/table'

import dayjs from 'dayjs'

import TaskPriorityTag from './TaskPriorityTag'
import TaskStatusTag from './TaskStatusTag'

import type { Task } from '../task.types'

interface Props {
    tasks: Task[]

    selectedRowKeys: React.Key[]

    currentPage: number

    pageSize: number

    total: number

    onPageChange: (page: number) => void

    onSelectChange: (
        keys: React.Key[]
    ) => void

    onEdit: (task: Task) => void

    onDelete: (id: string) => void

    onStatusChange: (
        id: string,
        status: Task['status']
    ) => void
}

function TaskTable({
    tasks,
    selectedRowKeys,
    currentPage,
    pageSize,
    total,
    onPageChange,
    onSelectChange,
    onEdit,
    onDelete,
    onStatusChange,
}: Props) {
    const columns: ColumnsType<Task> = [
        {
            title: 'Task',

            dataIndex: 'title',

            sorter: (a, b) =>
                a.title.localeCompare(
                    b.title
                ),

            render: (_, record) => (
                <div>
                    <div className="font-semibold text-slate-800">
                        {record.title}
                    </div>

                    {record.description && (
                        <p className="text-sm text-slate-400 mt-1 line-clamp-1">
                            {
                                record.description
                            }
                        </p>
                    )}
                </div>
            ),
        },

        {
            title: 'Status',

            width: 180,

            render: (_, record) => (
                <Select
                    value={record.status}
                    className="w-full"
                    onChange={(value) =>
                        onStatusChange(
                            record.id,
                            value
                        )
                    }
                    options={[
                        {
                            label: (
                                <TaskStatusTag status="todo" />
                            ),

                            value: 'todo',
                        },

                        {
                            label: (
                                <TaskStatusTag status="in_progress" />
                            ),

                            value: 'in_progress',
                        },

                        {
                            label: (
                                <TaskStatusTag status="done" />
                            ),

                            value: 'done',
                        },
                    ]}
                />
            ),
        },

        {
            title: 'Priority',

            dataIndex: 'priority',

            width: 140,

            sorter: (a, b) =>
                a.priority.localeCompare(
                    b.priority
                ),

            render: (priority) => (
                <TaskPriorityTag
                    priority={priority}
                />
            ),
        },

        {
            title: 'Assignee',

            dataIndex: 'assignee',

            width: 180,

            render: (assignee) => (
                <div className="flex items-center gap-2">
                    <Avatar
                        size="small"
                        icon={<UserOutlined />}
                    />

                    <span className="text-slate-600">
                        {assignee ||
                            'Unassigned'}
                    </span>
                </div>
            ),
        },

        {
            title: 'Due Date',

            dataIndex: 'dueDate',

            width: 170,

            sorter: (a, b) =>
                new Date(
                    a.dueDate || ''
                ).getTime() -
                new Date(
                    b.dueDate || ''
                ).getTime(),

            render: (dueDate) => (
                <div className="flex items-center gap-2 text-slate-500">
                    <CalendarOutlined />

                    <span>
                        {dueDate
                            ? dayjs(
                                  dueDate
                              ).format(
                                  'DD MMM YYYY'
                              )
                            : '-'}
                    </span>
                </div>
            ),
        },

        {
            title: 'Actions',

            width: 120,

            align: 'center',

            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        className="
                            hover:!bg-blue-50
                            hover:!text-blue-500
                        "
                        onClick={() =>
                            onEdit(record)
                        }
                    />

                    <Button
                        danger
                        type="text"
                        icon={
                            <DeleteOutlined />
                        }
                        className="
                            hover:!bg-red-50
                        "
                        onClick={() =>
                            onDelete(record.id)
                        }
                    />
                </Space>
            ),
        },
    ]

    return (
        <Table
            rowKey="id"
            columns={columns}
            dataSource={tasks}
            rowSelection={{
                selectedRowKeys,

                onChange: onSelectChange,
            }}
            pagination={{
                current: currentPage,

                pageSize,

                total,

                onChange: onPageChange,

                showSizeChanger: false,

                showTotal: (total) =>
                    `Total ${total} tasks`,
            }}
        />
    )
}

export default TaskTable