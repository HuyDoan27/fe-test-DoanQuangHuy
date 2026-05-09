import {
    Card,
    Col,
    Row,
    Statistic,
} from 'antd'

import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    FileTextOutlined,
    SyncOutlined,
} from '@ant-design/icons'

import { useAppSelector } from '../../../store/hooks'

import { selectTaskStats } from '../../../store/selectors/taskSelectors'

function TaskStats() {
    const {
        total,
        todo,
        inProgress,
        done,
    } = useAppSelector(selectTaskStats)

    const stats = [
        {
            title: 'Total Tasks',
            value: total,
            icon: <FileTextOutlined />,
            color:
                'from-violet-500 to-purple-500',
            bg: 'bg-violet-50',
            iconColor: 'text-violet-600',
        },

        {
            title: 'Todo',
            value: todo,
            icon: <ClockCircleOutlined />,
            color: 'from-amber-400 to-orange-400',
            bg: 'bg-orange-50',
            iconColor: 'text-orange-500',
        },

        {
            title: 'In Progress',
            value: inProgress,
            icon: <SyncOutlined spin />,
            color: 'from-blue-500 to-cyan-500',
            bg: 'bg-blue-50',
            iconColor: 'text-blue-500',
        },

        {
            title: 'Done',
            value: done,
            icon: <CheckCircleOutlined />,
            color: 'from-emerald-500 to-green-500',
            bg: 'bg-emerald-50',
            iconColor: 'text-emerald-500',
        },
    ]

    return (
        <Row gutter={[16, 16]}>
            {stats.map((item) => (
                <Col
                    key={item.title}
                    xs={24}
                    sm={12}
                    lg={6}
                >
                    <Card
                        className="
                            rounded-2xl
                            border-0
                            shadow-sm
                            hover:shadow-md
                            transition-all
                            duration-300
                        "
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm font-medium mb-2">
                                    {item.title}
                                </p>

                                <h2 className="text-3xl font-bold text-slate-800">
                                    {item.value}
                                </h2>
                            </div>

                            <div
                                className={`
                                    w-14 h-14 rounded-2xl
                                    flex items-center justify-center
                                    text-2xl
                                    ${item.bg}
                                    ${item.iconColor}
                                `}
                            >
                                {item.icon}
                            </div>
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default TaskStats