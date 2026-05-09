import { Card, Progress } from "antd";

const progressData = [
    {
        title: "Todo",
        percent: 33,
        color: "#9b8cf3",
    },
    {
        title: "In Progress",
        percent: 42,
        color: "#4096ff",
    },
    {
        title: "Done",
        percent: 25,
        color: "#22c55e",
    },
];

function DashboardProgress() {
    return (
        <Card
            title="Task Progress Overview"
            extra={<span className="text-violet-500">View All →</span>}
            className="rounded-2xl border-0 shadow-sm h-full"
        >
            <div className="space-y-6">
                {progressData.map((item) => (
                    <div key={item.title}>
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-slate-700">
                                {item.title}
                            </span>

                            <span
                                className="font-semibold"
                                style={{ color: item.color }}
                            >
                                {item.percent}%
                            </span>
                        </div>

                        <Progress
                            percent={item.percent}
                            showInfo={false}
                            strokeColor={item.color}
                        />
                    </div>
                ))}

                <div className="pt-6 border-t">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 font-semibold tracking-wide text-xs">
                            OVERALL COMPLETION
                        </span>

                        <span className="text-violet-500 font-bold">
                            25%
                        </span>
                    </div>

                    <Progress
                        percent={25}
                        showInfo={false}
                        strokeColor="#8b5cf6"
                    />
                </div>
            </div>
        </Card>
    );
}

export default DashboardProgress;