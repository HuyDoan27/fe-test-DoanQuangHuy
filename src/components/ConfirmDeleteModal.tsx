import {
    ExclamationCircleFilled,
} from '@ant-design/icons'

import { Button, Modal } from 'antd'

interface Props {
    open: boolean

    title?: string

    description?: string

    confirmText?: string

    loading?: boolean

    onCancel: () => void

    onConfirm: () => void
}

function ConfirmDeleteModal({
    open,

    title = 'Delete Confirmation',

    description = 'Are you sure you want to delete this item?',

    confirmText = 'Delete',

    loading = false,

    onCancel,

    onConfirm,
}: Props) {
    return (
        <Modal
            open={open}
            footer={null}
            onCancel={onCancel}
            centered
            width={420}
        >
            <div className="pt-2">
                <div className="flex items-start gap-4">
                    <div
                        className="
                            w-12 h-12
                            rounded-full
                            bg-red-100
                            flex items-center justify-center
                            shrink-0
                        "
                    >
                        <ExclamationCircleFilled className="text-red-500 text-xl" />
                    </div>

                    <div className="flex-1">
                        <h2 className="text-lg font-semibold text-slate-800">
                            {title}
                        </h2>

                        <p className="text-slate-500 mt-1 leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                    <Button onClick={onCancel}>
                        Cancel
                    </Button>

                    <Button
                        danger
                        type="primary"
                        loading={loading}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmDeleteModal