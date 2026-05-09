import type { Dayjs } from 'dayjs'

export type TaskStatus =
    | 'todo'
    | 'in_progress'
    | 'done'

export type TaskPriority =
    | 'high'
    | 'medium'
    | 'low'

export interface Task {
    id: string

    title: string

    description?: string

    status: TaskStatus

    priority: TaskPriority

    assignee?: string

    dueDate?: string

    createdAt: string

    tags?: string[]
}

export interface TaskFormValues {
    title: string

    description?: string

    status: TaskStatus

    priority: TaskPriority

    assignee?: string

    dueDate?: Dayjs

    tags?: string[]
}