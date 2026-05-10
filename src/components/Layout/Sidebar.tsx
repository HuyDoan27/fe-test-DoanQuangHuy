import {
    CheckSquareOutlined,
    LayoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Layout, Menu, Tooltip } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

const { Sider } = Layout

interface SidebarProps {
    collapsed: boolean
    onToggle: () => void
}

const menuItems = [
    {
        key: '/',
        icon: <LayoutOutlined />,
        label: 'Dashboard',
    },
    {
        key: '/tasks',
        icon: <CheckSquareOutlined />,
        label: 'Tasks',
    },
]

function Sidebar({ collapsed, onToggle }: SidebarProps) {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <Sider
            collapsed={collapsed}
            width={220}
            collapsedWidth={64}
            theme="dark"
            style={{
                minHeight: '100vh',
                background: '#1A1A2E',
                position: 'relative',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Logo */}
            <div
                className="flex items-center gap-3 px-4 h-[64px] shrink-0"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            >
                <div
                    className="w-7 h-7 rounded-md flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{
                        background: 'linear-gradient(135deg, #7C6FE0, #A78BFA)',
                    }}
                >
                    T
                </div>
                {!collapsed && (
                    <span className="text-white font-semibold text-sm tracking-wide">
                        TaskBoard
                    </span>
                )}
            </div>

            {/* Menu */}
            <div className="flex-1 py-3">
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={({ key }) => navigate(key)}
                    style={{ background: 'transparent', border: 'none' }}
                />
            </div>

            {/* Footer */}
            <div
                className="shrink-0 px-3 py-3"
                style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            >
                {!collapsed ? (
                    <div className="flex items-center gap-3 px-2 py-2 rounded-lg"
                        style={{ background: 'rgba(255,255,255,0.04)' }}
                    >
                        <Avatar
                            size={28}
                            icon={<UserOutlined />}
                            style={{ background: '#7C6FE0'}}
                        />
                        <div className="flex-1 min-w-0">
                            <div className="text-white text-xs font-medium truncate">Doan Quang Huy</div>
                            <div className="text-[11px] truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>
                                Admin
                            </div>
                        </div>
                        <Tooltip title="Settings" placement="top">
                            <SettingOutlined
                                style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, cursor: 'pointer' }}
                            />
                        </Tooltip>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <Tooltip title="Doan Quang Huy" placement="right">
                            <Avatar
                                size={28}
                                icon={<UserOutlined />}
                                style={{ background: '#7C6FE0', cursor: 'pointer' }}
                            />
                        </Tooltip>
                    </div>
                )}
            </div>

            {/* Toggle */}
            <Button
                type="primary"
                shape="circle"
                size="small"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={onToggle}
                style={{
                    position: 'absolute',
                    right: -12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: '#7C6FE0',
                    borderColor: '#7C6FE0',
                    zIndex: 10,
                    width: 24,
                    height: 24,
                    minWidth: 24,
                    fontSize: 10,
                }}
            />
        </Sider>
    )
}

export default Sidebar