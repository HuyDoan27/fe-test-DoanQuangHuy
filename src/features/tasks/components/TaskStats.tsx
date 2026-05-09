import { Card, Col, Row, Statistic } from "antd";

function TaskStats() {
    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
                <Card>
                    <Statistic title="Total Tasks" value={20} />
                </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
                <Card>
                    <Statistic title="Todo" value={8} />
                </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
                <Card>
                    <Statistic title="In Progress" value={7} />
                </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
                <Card>
                    <Statistic title="Done" value={5} />
                </Card>
            </Col>
        </Row>
    );
}

export default TaskStats;