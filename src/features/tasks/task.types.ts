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

export type TaskFormValues = Omit<Task, 'id'>