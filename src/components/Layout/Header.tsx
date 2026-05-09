import { Input, Badge, Avatar, Tooltip } from 'antd'
import { SearchOutlined, BellOutlined, FileTextOutlined } from '@ant-design/icons'

function Header() {
    return (
        <header className="h-[60px] bg-white border-b border-gray-100 flex items-center px-6 gap-4 shrink-0">
            {/* Search */}
            <div className="flex-1 max-w-[480px]">
                <Input
                    prefix={<SearchOutlined className="text-gray-400" />}
                    placeholder="Search tasks, projects..."
                    className="rounded-full bg-gray-50 border-gray-200 hover:border-[#7C6FE0] focus-within:border-[#7C6FE0]"
                    style={{ borderRadius: 999 }}
                />
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3 ml-auto">
                {/* Docs */}
                <Tooltip title="Documentation">
                    <button className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-[#7C6FE0] hover:bg-purple-50 transition-colors">
                        <FileTextOutlined style={{ fontSize: 17 }} />
                    </button>
                </Tooltip>

                {/* Notifications */}
                <Tooltip title="Notifications">
                    <button className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-[#7C6FE0] hover:bg-purple-50 transition-colors relative">
                        <Badge count={3} size="small" offset={[-2, 2]}>
                            <BellOutlined style={{ fontSize: 17, color: 'inherit' }} />
                        </Badge>
                    </button>
                </Tooltip>

                {/* Avatar */}
                <Avatar
                    size={36}
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=taskboard"
                    className="cursor-pointer ring-2 ring-[#7C6FE0]/30 hover:ring-[#7C6FE0] transition-all"
                />
            </div>
        </header>
    )
}

export default Header;