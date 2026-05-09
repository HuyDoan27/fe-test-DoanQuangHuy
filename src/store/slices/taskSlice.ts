import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'

import type { Task } from '../../features/tasks/task.types'

import { mockTasks } from '../../features/tasks/data/mockTasks'

interface TaskState {
    items: Task[]

    filters: {
        searchText: string

        status: Task['status'][]

        priority: Task['priority'] | null

        dateRange: [string, string] | null
    }

    pagination: {
        currentPage: number

        pageSize: number
    }
}

const initialState: TaskState = {
    items: mockTasks,

    filters: {
        searchText: '',

        status: [],

        priority: null,

        dateRange: null,
    },

    pagination: {
        currentPage: 1,

        pageSize: 10,
    },
}

const taskSlice = createSlice({
    name: 'task',

    initialState,

    reducers: {
        addTask: (
            state,
            action: PayloadAction<Task>
        ) => {
            state.items.unshift(action.payload)
        },

        updateTask: (
            state,
            action: PayloadAction<Task>
        ) => {
            const index =
                state.items.findIndex(
                    task =>
                        task.id ===
                        action.payload.id
                )

            if (index !== -1) {
                state.items[index] =
                    action.payload
            }
        },

        deleteTask: (
            state,
            action: PayloadAction<string>
        ) => {
            state.items = state.items.filter(
                task =>
                    task.id !==
                    action.payload
            )
        },

        deleteManyTasks: (
            state,
            action: PayloadAction<string[]>
        ) => {
            state.items = state.items.filter(
                task =>
                    !action.payload.includes(
                        task.id
                    )
            )
        },

        updateTaskStatus: (
            state,
            action: PayloadAction<{
                id: string

                status: Task['status']
            }>
        ) => {
            const task = state.items.find(
                task =>
                    task.id ===
                    action.payload.id
            )

            if (task) {
                task.status =
                    action.payload.status
            }
        },

        setFilter: (
            state,
            action: PayloadAction<
                Partial<
                    TaskState['filters']
                >
            >
        ) => {
            state.filters = {
                ...state.filters,

                ...action.payload,
            }
        },

        resetFilters: state => {
            state.filters = {
                searchText: '',

                status: [],

                priority: null,

                dateRange: null,
            }
        },

        setPage: (
            state,
            action: PayloadAction<number>
        ) => {
            state.pagination.currentPage =
                action.payload
        },
    },
})

export const {
    addTask,
    updateTask,
    deleteTask,
    deleteManyTasks,
    updateTaskStatus,
    setFilter,
    resetFilters,
    setPage,
} = taskSlice.actions

export default taskSlice.reducer