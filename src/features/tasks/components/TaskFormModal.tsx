import {
    DatePicker,
    Form,
    Input,
    Modal,
    Radio,
    Select,
    Row,
    Col,
} from 'antd'

import { useEffect } from 'react'

import dayjs from 'dayjs'

import {
    PRIORITY_OPTIONS,
    STATUS_OPTIONS,
} from '../task.constants'

import type {
    Task,
    TaskFormValues,
} from '../task.types'

const { TextArea } = Input

interface Props {
    open: boolean

    onCancel: () => void

    onSubmit: (
        values: TaskFormValues
    ) => void

    editingTask: Task | null
}

function TaskFormModal({
    open,
    onCancel,
    onSubmit,
    editingTask,
}: Props) {
    const [form] = Form.useForm()

    useEffect(() => {
        if (editingTask) {
            form.setFieldsValue({
                ...editingTask,

                dueDate: editingTask.dueDate
                    ? dayjs(
                        editingTask.dueDate
                    )
                    : undefined,
            })
        }

        else {
            form.resetFields()

            form.setFieldsValue({
                status: 'todo',

                priority: 'medium',
            })
        }
    }, [editingTask, form, open])

    return (
        <Modal
            open={open}
            title={
                <div className="text-xl font-semibold text-slate-800">
                    {editingTask
                        ? 'Edit Task'
                        : 'Create Task'}
                </div>
            }
            okText={
                editingTask
                    ? 'Update'
                    : 'Create'
            }
            onCancel={onCancel}
            onOk={() => form.submit()}
            destroyOnClose
            width={700}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onSubmit}
                className="mt-6"
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,

                            message:
                                'Please enter title',
                        },
                    ]}
                >
                    <Input
                        size="large"
                        placeholder="Enter task title"
                    />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                >
                    <TextArea
                        rows={4}
                        placeholder="Enter task description"
                    />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[
                                {
                                    required: true,

                                    message:
                                        'Please select status',
                                },
                            ]}
                        >
                            <Select
                                size="large"
                                placeholder="Select status"
                                options={
                                    STATUS_OPTIONS
                                }
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Priority"
                            name="priority"
                            rules={[
                                {
                                    required: true,

                                    message:
                                        'Please select priority',
                                },
                            ]}
                        >
                            <Radio.Group
                                options={
                                    PRIORITY_OPTIONS
                                }
                                optionType="button"
                                buttonStyle="solid"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Assignee"
                            name="assignee"
                        >
                            <Input
                                size="large"
                                placeholder="Enter assignee name"
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Due Date"
                            name="dueDate"
                        >
                            <DatePicker
                                size="large"
                                className="w-full"
                                placeholder="Select due date"
                                disabledDate={(
                                    current
                                ) =>
                                    current &&
                                    current <
                                    dayjs().startOf(
                                        'day'
                                    )
                                }
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    label="Tags"
                    name="tags"
                >
                    <Select
                        mode="tags"
                        size="large"
                        placeholder="Add tags"
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default TaskFormModal