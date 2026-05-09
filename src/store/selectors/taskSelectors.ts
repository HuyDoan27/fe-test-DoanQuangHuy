import { createSelector } from '@reduxjs/toolkit'

import type { RootState } from '../store'

export const selectTaskState = (
    state: RootState
) => state.task

export const selectAllTasks =
    createSelector(
        [selectTaskState],

        taskState => taskState.items
    )

export const selectFilters =
    createSelector(
        [selectTaskState],

        taskState => taskState.filters
    )

export const selectPagination =
    createSelector(
        [selectTaskState],

        taskState =>
            taskState.pagination
    )

export const selectFilteredTasks =
    createSelector(
        [selectAllTasks, selectFilters],

        (tasks, filters) => {
            return tasks.filter(task => {
                const matchesSearch =
                    task.title
                        .toLowerCase()
                        .includes(
                            filters.searchText.toLowerCase()
                        )

                const matchesStatus =
                    !filters.status.length ||
                    filters.status.includes(
                        task.status
                    )

                const matchesPriority =
                    !filters.priority ||
                    task.priority ===
                        filters.priority

                let matchesDate = true

                if (
                    filters.dateRange &&
                    task.dueDate
                ) {
                    const [
                        start,
                        end,
                    ] = filters.dateRange

                    matchesDate =
                        task.dueDate >=
                            start &&
                        task.dueDate <= end
                }

                return (
                    matchesSearch &&
                    matchesStatus &&
                    matchesPriority &&
                    matchesDate
                )
            })
        }
    )

export const selectPaginatedTasks =
    createSelector(
        [
            selectFilteredTasks,
            selectPagination,
        ],

        (tasks, pagination) => {
            const start =
                (pagination.currentPage -
                    1) *
                pagination.pageSize

            const end =
                start +
                pagination.pageSize

            return tasks.slice(start, end)
        }
    )

export const selectTaskStats =
    createSelector(
        [selectAllTasks],

        tasks => {
            return {
                total: tasks.length,

                todo: tasks.filter(
                    task =>
                        task.status ===
                        'todo'
                ).length,

                inProgress:
                    tasks.filter(
                        task =>
                            task.status ===
                            'in_progress'
                    ).length,

                done: tasks.filter(
                    task =>
                        task.status ===
                        'done'
                ).length,
            }
        }
    )