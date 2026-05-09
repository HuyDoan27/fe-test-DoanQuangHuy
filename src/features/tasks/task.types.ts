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
    id: number

    title: string

    description?: string

    status: TaskStatus

    priority: TaskPriority

    assignee?: string

    dueDate?: string

    tags?: string[]
}

/**
 * Values used inside Antd Form
 * DatePicker returns Dayjs, not string
 */
export interface TaskFormValues {
    title: string

    description?: string

    status: TaskStatus

    priority: TaskPriority

    assignee?: string

    dueDate?: Dayjs

    tags?: string[]
}