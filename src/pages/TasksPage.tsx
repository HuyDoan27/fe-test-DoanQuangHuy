import { Button, Card, Popconfirm } from 'antd'

import { useState } from 'react'

import TaskFormModal from '../features/tasks/components/TaskFormModal'
import TaskTable from '../features/tasks/components/TaskTable'

import { mockTasks } from '../features/tasks/data/mockTasks'

import type {
    Task,
    TaskFormValues,
} from '../features/tasks/task.types'

function TasksPage() {
    const [tasks, setTasks] =
        useState<Task[]>(mockTasks)

    const [selectedRowKeys, setSelectedRowKeys] =
        useState<React.Key[]>([])

    const [open, setOpen] = useState(false)

    const [editingTask, setEditingTask] =
        useState<Task | null>(null)

    const handleCreate = () => {
        setEditingTask(null)
        setOpen(true)
    }

    const handleEdit = (task: Task) => {
        setEditingTask(task)
        setOpen(true)
    }

    const handleDelete = (id: number) => {
        setTasks((prev) =>
            prev.filter((task) => task.id !== id)
        )

        // remove deleted row from selected rows
        setSelectedRowKeys((prev) =>
            prev.filter((key) => key !== id)
        )
    }

    const handleBulkDelete = () => {
        setTasks((prev) =>
            prev.filter(
                (task) =>
                    !selectedRowKeys.includes(task.id)
            )
        )

        setSelectedRowKeys([])
    }

    const handleStatusChange = (
        id: number,
        status: Task['status']
    ) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        status,
                    }
                    : task
            )
        )
    }

    const handleSubmit = (
        values: TaskFormValues
    ) => {
        const formattedValues = {
            ...values,

            dueDate: values.dueDate
                ? values.dueDate.format(
                    'YYYY-MM-DD'
                )
                : undefined,
        }

        if (editingTask) {
            setTasks((prev) =>
                prev.map((task) =>
                    task.id === editingTask.id
                        ? {
                            ...task,
                            ...formattedValues,
                        }
                        : task
                )
            )
        }

        else {
            setTasks((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    ...formattedValues,
                },
            ])
        }

        setOpen(false)
        setEditingTask(null)
        setSelectedRowKeys([])
    }

    const handleCloseModal = () => {
        setOpen(false)
        setEditingTask(null)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900">
                        Tasks
                    </h1>

                    <p className="text-slate-500 mt-1">
                        Manage your project tasks
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Popconfirm
                        title="Delete selected tasks?"
                        description={`Are you sure to delete ${selectedRowKeys.length} selected tasks?`}
                        onConfirm={handleBulkDelete}
                        okText="Delete"
                        cancelText="Cancel"
                        disabled={
                            !selectedRowKeys.length
                        }
                    >
                        <Button
                            danger
                            disabled={
                                !selectedRowKeys.length
                            }
                        >
                            Delete Selected
                        </Button>
                    </Popconfirm>

                    <Button
                        type="primary"
                        onClick={handleCreate}
                    >
                        Add Task
                    </Button>
                </div>
            </div>

            <Card className="rounded-2xl border-0 shadow-sm">
                <TaskTable
                    tasks={tasks}
                    selectedRowKeys={
                        selectedRowKeys
                    }
                    onSelectChange={
                        setSelectedRowKeys
                    }
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onStatusChange={
                        handleStatusChange
                    }
                />
            </Card>

            <TaskFormModal
                open={open}
                onCancel={handleCloseModal}
                onSubmit={handleSubmit}
                editingTask={editingTask}
            />
        </div>
    )
}

export default TasksPage