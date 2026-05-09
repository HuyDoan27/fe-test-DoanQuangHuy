import type { Task } from '../task.types'

export const mockTasks: Task[] = [
    {
        id: 1,
        title: 'Design landing page',
        status: 'todo',
        priority: 'high',
        assignee: 'Alice',
        dueDate: '2026-05-20',
        tags: ['design'],
    },

    {
        id: 2,
        title: 'Implement authentication',
        status: 'in_progress',
        priority: 'medium',
        assignee: 'Bob',
        dueDate: '2026-05-24',
        tags: ['backend'],
    },

    {
        id: 3,
        title: 'Fix responsive layout',
        status: 'done',
        priority: 'low',
        assignee: 'Carol',
        dueDate: '2026-05-18',
        tags: ['frontend'],
    },
]