import DashboardProgress from "../features/tasks/components/DashboardProgress";
import RecentTaskTable from "../features/tasks/components/RecentTaskTable";
import TaskStats from "../features/tasks/components/TaskStats";

function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900">
                        Dashboard
                    </h1>

                    <p className="text-gray-400 mt-2 text-lg">
                        Overview of your task management system
                    </p>
                </div>
            </div>

            <TaskStats />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <DashboardProgress />

                <RecentTaskTable />
            </div>
        </div>
    );
}

export default DashboardPage;