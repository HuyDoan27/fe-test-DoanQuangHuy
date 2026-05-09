import {
    Button,
    Popconfirm,
    Select,
    Space,
    Table,
} from 'antd'

import type { ColumnsType } from 'antd/es/table'

import TaskPriorityTag from './TaskPriorityTag'
import TaskStatusTag from './TaskStatusTag'

import type { Task } from '../task.types'

interface Props {
    tasks: Task[]

    selectedRowKeys: React.Key[]

    onSelectChange: (keys: React.Key[]) => void

    onEdit: (task: Task) => void

    onDelete: (id: number) => void

    onStatusChange: (
        id: number,
        status: Task['status']
    ) => void
}

function TaskTable({
    tasks,
    selectedRowKeys,
    onSelectChange,
    onEdit,
    onDelete,
    onStatusChange,
}: Props) {
    const columns: ColumnsType<Task> = [
        {
            title: 'Title',
            dataIndex: 'title',

            sorter: (a, b) =>
                a.title.localeCompare(b.title),
        },

        {
            title: 'Status',

            render: (_, record) => (
                <Select
                    value={record.status}
                    style={{ width: 150 }}
                    onChange={(value) =>
                        onStatusChange(record.id, value)
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

            sorter: (a, b) =>
                a.priority.localeCompare(
                    b.priority
                ),

            render: (priority) => (
                <TaskPriorityTag priority={priority} />
            ),
        },

        {
            title: 'Assignee',
            dataIndex: 'assignee',
        },

        {
            title: 'Due Date',
            dataIndex: 'dueDate',

            sorter: (a, b) =>
                new Date(a.dueDate || '').getTime() -
                new Date(b.dueDate || '').getTime(),
        },

        {
            title: 'Actions',

            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => onEdit(record)}
                    >
                        Edit
                    </Button>

                    <Popconfirm
                        title="Delete task?"
                        onConfirm={() =>
                            onDelete(record.id)
                        }
                    >
                        <Button danger type="link">
                            Delete
                        </Button>
                    </Popconfirm>
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
                pageSize: 10,

                showTotal: (total) =>
                    `Total ${total} tasks`,
            }}
        />
    )
}

export default TaskTable