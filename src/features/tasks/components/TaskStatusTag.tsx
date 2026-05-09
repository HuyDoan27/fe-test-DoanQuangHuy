import { Tag } from 'antd'
import type { TaskStatus } from '../task.types'

interface Props {
    status: TaskStatus
}

const colorMap = {
    todo: 'default',
    in_progress: 'processing',
    done: 'success',
}

const labelMap = {
    todo: 'Todo',
    in_progress: 'In Progress',
    done: 'Done',
}

function TaskStatusTag({ status }: Props) {
    return (
        <Tag color={colorMap[status]}>
            {labelMap[status]}
        </Tag>
    )
}

export default TaskStatusTag