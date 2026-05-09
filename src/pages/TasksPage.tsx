import { Button, Card } from 'antd'

import { useState } from 'react'

import TaskFormModal from '../features/tasks/components/TaskFormModal'
import TaskTable from '../features/tasks/components/TaskTable'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal'

import type {
    Task,
    TaskFormValues,
} from '../features/tasks/task.types'

import {
    useAppDispatch,
    useAppSelector,
} from '../store/hooks'

import {
    addTask,
    updateTask,
    deleteTask,
    deleteManyTasks,
    updateTaskStatus,
    setPage,
} from '../store/slices/taskSlice'

import {
    selectFilteredTasks,
    selectPaginatedTasks,
} from '../store/selectors/taskSelectors'

function TasksPage() {
    const dispatch = useAppDispatch()

    // selector
    const tasks = useAppSelector(
        selectPaginatedTasks
    )

    const currentPage = useAppSelector(
        state => state.task.pagination.currentPage
    )

    const pageSize = useAppSelector(
        state => state.task.pagination.pageSize
    )

    const filteredTasks = useAppSelector(
        selectFilteredTasks
    )


    const total = filteredTasks.length

    // local state
    const [selectedRowKeys, setSelectedRowKeys] =
        useState<React.Key[]>([])

    const [open, setOpen] = useState(false)

    const [editingTask, setEditingTask] =
        useState<Task | null>(null)

    const [deleteModalOpen, setDeleteModalOpen] =
        useState(false)

    const [deleteIds, setDeleteIds] = useState<
        string[]
    >([])

    // create
    const handleCreate = () => {
        setEditingTask(null)

        setOpen(true)
    }

    // edit
    const handleEdit = (task: Task) => {
        setEditingTask(task)

        setOpen(true)
    }

    // delete modal
    const openDeleteModal = (
        ids: string[]
    ) => {
        setDeleteIds(ids)

        setDeleteModalOpen(true)
    }

    // confirm delete
    const handleConfirmDelete = () => {
        if (deleteIds.length === 1) {
            dispatch(deleteTask(deleteIds[0]))

            setSelectedRowKeys(prev =>
                prev.filter(
                    key => key !== deleteIds[0]
                )
            )
        }

        else {
            dispatch(deleteManyTasks(deleteIds))

            setSelectedRowKeys([])
        }

        setDeleteModalOpen(false)

        setDeleteIds([])
    }

    // change status
    const handleStatusChange = (
        id: string,
        status: Task['status']
    ) => {
        dispatch(
            updateTaskStatus({
                id,
                status,
            })
        )
    }

    // submit form
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
            dispatch(
                updateTask({
                    ...editingTask,
                    ...formattedValues,
                })
            )
        }

        else {
            dispatch(
                addTask({
                    id: crypto.randomUUID(),

                    createdAt:
                        new Date().toISOString(),

                    ...formattedValues,
                })
            )
        }

        setOpen(false)

        setEditingTask(null)

        setSelectedRowKeys([])
    }

    // close modal
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
                    <Button
                        danger
                        disabled={
                            !selectedRowKeys.length
                        }
                        onClick={() =>
                            openDeleteModal(
                                selectedRowKeys as string[]
                            )
                        }
                    >
                        Delete Selected
                    </Button>

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
                    onDelete={(id) =>
                        openDeleteModal([id])
                    }
                    onStatusChange={
                        handleStatusChange
                    }
                    currentPage={currentPage}
                    pageSize={pageSize}
                    total={total}
                    onPageChange={(page) =>
                        dispatch(setPage(page))
                    }
                />
            </Card>

            <TaskFormModal
                open={open}
                onCancel={handleCloseModal}
                onSubmit={handleSubmit}
                editingTask={editingTask}
            />

            <ConfirmDeleteModal
                open={deleteModalOpen}
                onCancel={() =>
                    setDeleteModalOpen(false)
                }
                onConfirm={handleConfirmDelete}
                title={
                    deleteIds.length > 1
                        ? 'Delete Selected Tasks'
                        : 'Delete Task'
                }
                description={
                    deleteIds.length > 1
                        ? `Are you sure you want to delete ${deleteIds.length} selected tasks?`
                        : 'Are you sure you want to delete this task?'
                }
            />
        </div>
    )
}

export default TasksPage