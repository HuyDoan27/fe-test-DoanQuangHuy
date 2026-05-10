import { BellOutlined } from '@ant-design/icons';
import { Avatar, Badge, Breadcrumb, Tooltip } from 'antd';
import { useLocation } from 'react-router-dom';

const routeLabels: Record<string, string> = {
    '/': 'Dashboard',
    '/tasks': 'Tasks',
};

function Header() {
    const location = useLocation();
    const label = routeLabels[location.pathname] ?? 'Page';

    return (
        <header className="h-[50px] bg-white border-b border-gray-100 flex items-center px-6 shrink-0">
            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { title: <span className="text-gray-400">TaskBoard</span> },
                    { title: <span className="text-gray-700 font-medium">{label}</span> },
                ]}
            />

            {/* Right */}
            <div className="flex items-center gap-2 ml-auto">
                <Tooltip title="Notifications" placement="bottom">
                    <button className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-[#7C6FE0] hover:bg-purple-50 transition-colors">
                        <Badge count={3} size="small" offset={[-2, 2]}>
                            <BellOutlined style={{ fontSize: 16 }} />
                        </Badge>
                    </button>
                </Tooltip>

                <div className="w-px h-5 bg-gray-200 mx-1" />

                <Avatar
                    size={34}
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=taskboard"
                    className="cursor-pointer ring-2 ring-[#7C6FE0]/20 hover:ring-[#7C6FE0]/50 transition-all"
                />
            </div>
        </header>
    )
}

export default Header;