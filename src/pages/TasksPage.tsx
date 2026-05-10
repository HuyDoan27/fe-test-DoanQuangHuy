import { Button, Card, Col, DatePicker, Input, Row, Select } from 'antd'
import { DeleteOutlined, PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal'
import TaskFormModal from '../features/tasks/components/TaskFormModal'
import TaskTable from '../features/tasks/components/TaskTable'
import type { Task, TaskFormValues, } from '../types/task.types'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import useDebounce from '../store/hooks'
import { addTask, deleteManyTasks, deleteTask, resetFilters, setFilter, setPage, updateTask, updateTaskStatus } from '../store/slices/tasksSlice'
import { selectFilteredTasks, selectPaginatedTasks } from '../store/selectors/taskSelectors'

const { RangePicker } = DatePicker

function TasksPage() {
    const dispatch = useAppDispatch()

    // selectors
    const tasks = useAppSelector(selectPaginatedTasks)

    const filteredTasks = useAppSelector(selectFilteredTasks)

    const filters = useAppSelector(
        state => state.task.filters
    )

    const currentPage = useAppSelector(state => state.task.pagination.currentPage)

    const pageSize = useAppSelector(state => state.task.pagination.pageSize)

    const total = filteredTasks.length

    // debounce search
    const [searchValue, setSearchValue] =
        useState(filters.searchText)

    const debouncedSearch =
        useDebounce(searchValue, 300)

    useEffect(() => {
        dispatch(
            setFilter({
                searchText: debouncedSearch,
            })
        )

        dispatch(setPage(1))
    }, [debouncedSearch, dispatch])

    // local state
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

    const [open, setOpen] = useState(false)

    const [editingTask, setEditingTask] = useState<Task | null>(null)

    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const [deleteIds, setDeleteIds] = useState<string[]>([])

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
        } else {
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
        } else {
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
        <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900">
                        Tasks List
                    </h1>

                    <p className="text-slate-500 mt-1">
                        Manage your project tasks
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        danger
                        icon={<DeleteOutlined />}
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
                        icon={<PlusOutlined />}
                        onClick={handleCreate}
                    >
                        Add Task
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <Card className="shadow-sm">
                <Row gutter={[16, 16]}>
                    {/* Search */}
                    <Col xs={24} md={12} xl={7}>
                        <Input.Search
                            allowClear
                            placeholder="Search by title..."
                            prefix={<SearchOutlined />}
                            value={searchValue}
                            onChange={(e) =>
                                setSearchValue(
                                    e.target.value
                                )
                            }
                        />
                    </Col>

                    {/* Status */}
                    <Col xs={24} md={12} xl={6}>
                        <Select
                            mode="multiple"
                            allowClear
                            className="w-full"
                            placeholder="Filter by status"
                            value={filters.status}
                            onChange={(value) => {
                                dispatch(
                                    setFilter({
                                        status: value,
                                    })
                                )

                                dispatch(setPage(1))
                            }}
                            options={[
                                {
                                    label: 'Todo',
                                    value: 'todo',
                                },

                                {
                                    label: 'In Progress',
                                    value: 'in_progress',
                                },

                                {
                                    label: 'Done',
                                    value: 'done',
                                },
                            ]}
                        />
                    </Col>

                    {/* Priority */}
                    <Col xs={24} md={12} xl={4}>
                        <Select
                            allowClear
                            className="w-full"
                            placeholder="Filter by priority"
                            value={
                                filters.priority ||
                                undefined
                            }
                            onChange={(value) => {
                                dispatch(
                                    setFilter({
                                        priority:
                                            value || '',
                                    })
                                )

                                dispatch(setPage(1))
                            }}
                            options={[
                                {
                                    label: 'High',
                                    value: 'high',
                                },

                                {
                                    label: 'Medium',
                                    value: 'medium',
                                },

                                {
                                    label: 'Low',
                                    value: 'low',
                                },
                            ]}
                        />
                    </Col>

                    {/* Date Range */}
                    <Col xs={24} md={12} xl={5}>
                        <RangePicker
                            className="w-full"
                            value={
                                filters.dateRange
                                    ? [
                                        dayjs(
                                            filters
                                                .dateRange[0]
                                        ),
                                        dayjs(
                                            filters
                                                .dateRange[1]
                                        ),
                                    ]
                                    : null
                            }
                            onChange={(dates) => {
                                dispatch(
                                    setFilter({
                                        dateRange: dates
                                            ? [
                                                dates[0]?.format(
                                                    'YYYY-MM-DD'
                                                ) || '',
                                                dates[1]?.format(
                                                    'YYYY-MM-DD'
                                                ) || '',
                                            ]
                                            : null,
                                    })
                                )

                                dispatch(setPage(1))
                            }}
                        />
                    </Col>

                    {/* Reset */}
                    <Col xs={24} md={12} xl={2} className="flex justify-end">
                        <Button
                            icon={<ReloadOutlined />}
                            onClick={() => {
                                dispatch(
                                    resetFilters()
                                )

                                dispatch(setPage(1))

                                setSearchValue('')
                            }}
                        >
                            Reset Filters
                        </Button>
                    </Col>
                </Row>
            </Card>

            {/* Table */}
            <Card className=" border-0 shadow-sm">
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

            {/* Form Modal */}
            <TaskFormModal
                open={open}
                onCancel={handleCloseModal}
                onSubmit={handleSubmit}
                editingTask={editingTask}
            />

            {/* Delete Modal */}
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