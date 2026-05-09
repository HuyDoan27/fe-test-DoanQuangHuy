import {
    BarChartOutlined,
    CheckSquareOutlined,
    FolderOpenOutlined,
    InboxOutlined,
    LayoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusOutlined,
    SettingOutlined,
    TeamOutlined,
} from '@ant-design/icons'
import { Button, Layout, Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'

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
    {
        key: '/inbox',
        icon: <InboxOutlined />,
        label: 'Inbox',
    },
    {
        key: '/teams',
        icon: <TeamOutlined />,
        label: 'Teams',
    },
    {
        key: '/analytics',
        icon: <BarChartOutlined />,
        label: 'Analytics',
    },
    {
        key: '/settings',
        icon: <SettingOutlined />,
        label: 'Settings',
    },
]

const projectItems = [
    {
        key: 'project-1',
        icon: <FolderOpenOutlined />,
        label: 'Main Project',
    },
    {
        key: 'project-2',
        icon: <FolderOpenOutlined />,
        label: 'Landing Page Pro...',
    },
    {
        key: 'project-3',
        icon: <FolderOpenOutlined />,
        label: 'Yellow Branding',
    },
]

function Sidebar({ collapsed, onToggle }: SidebarProps) {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <Sider
            collapsed={collapsed}
            width={240}
            collapsedWidth={72}
            theme="dark"
            style={{
                minHeight: '100vh',
                background: '#1A1A2E',
                position: 'relative',
            }}
        >
            {/* Logo */}
            <div
                className="flex items-center gap-3 px-5 h-[72px]"
                style={{
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}
            >
                <div className="w-8 h-8 rounded-lg bg-[#7C6FE0] flex items-center justify-center text-white font-bold">
                    T
                </div>

                {!collapsed && (
                    <span className="text-white font-semibold text-[15px]">
                        TaskBoard
                    </span>
                )}
            </div>

            {/* Add button */}
            <div className="p-4">
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    block={!collapsed}
                    shape={collapsed ? 'circle' : 'default'}
                    style={{
                        background: '#7C6FE0',
                        borderColor: '#7C6FE0',
                    }}
                >
                    {!collapsed && 'Add New'}
                </Button>
            </div>

            {/* Main menu */}
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[location.pathname]}
                items={menuItems}
                onClick={({ key }) => navigate(key)}
                style={{
                    background: '#1A1A2E',
                    border: 'none',
                }}
            />

            {/* Projects */}
            {!collapsed && (
                <>
                    <div className="px-6 pt-6 pb-2 text-[11px] uppercase tracking-widest text-white/30">
                        Projects
                    </div>

                    <Menu
                        theme="dark"
                        mode="inline"
                        items={projectItems}
                        style={{
                            background: '#1A1A2E',
                            border: 'none',
                        }}
                    />
                </>
            )}

            {/* Toggle */}
            <Button
                type="primary"
                shape="circle"
                icon={
                    collapsed ? (
                        <MenuUnfoldOutlined />
                    ) : (
                        <MenuFoldOutlined />
                    )
                }
                onClick={onToggle}
                style={{
                    position: 'absolute',
                    right: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: '#7C6FE0',
                    borderColor: '#7C6FE0',
                }}
            />
        </Sider>
    )
}

export default Sidebar