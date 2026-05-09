import { Tag } from 'antd'
import type { TaskPriority } from '../task.types'

interface Props {
    priority: TaskPriority
}

const colorMap = {
    high: 'error',
    medium: 'warning',
    low: 'success',
}

function TaskPriorityTag({ priority }: Props) {
    return (
        <Tag color={colorMap[priority]}>
            {priority.toUpperCase()}
        </Tag>
    )
}

export default TaskPriorityTag