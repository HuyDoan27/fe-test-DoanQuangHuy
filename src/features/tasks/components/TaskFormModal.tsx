import {
    DatePicker,
    Form,
    Input,
    Modal,
    Radio,
    Select,
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
                    ? dayjs(editingTask.dueDate)
                    : undefined,
            })
        } else {
            form.resetFields()
        }
    }, [editingTask, form, open])

    return (
        <Modal
            open={open}
            title={
                editingTask
                    ? 'Edit Task'
                    : 'Create Task'
            }
            okText={
                editingTask
                    ? 'Update'
                    : 'Create'
            }
            onCancel={onCancel}
            onOk={() => form.submit()}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onSubmit}
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
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                >
                    <TextArea rows={4} />
                </Form.Item>

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
                        options={STATUS_OPTIONS}
                    />
                </Form.Item>

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
                    />
                </Form.Item>

                <Form.Item
                    label="Assignee"
                    name="assignee"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Due Date"
                    name="dueDate"
                >
                    <DatePicker className="w-full" />
                </Form.Item>

                <Form.Item
                    label="Tags"
                    name="tags"
                >
                    <Select mode="tags" />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default TaskFormModal