import React from "react";
import { Layout, Row, Col, Card } from "antd";

import Header from "../Header/Header";
import notFound from "../../assets/notfound.jpg";

const { Content } = Layout;

const NotFound: React.FC = () => {
    return (
        <Content style={{ background: "none" }}>
            <Header />
            <Layout className="NormalLayout" style={{ padding: "0px" }}>
                <Row>
                    <Col span={24}>
                        <Layout style={{ padding: "0px", marginTop: "20px", marginBottom: "20px" }}>
                            <Content>
                                <Card
                                    style={{ borderRadius: 4, boxShadow: "1px 1px 1px #ddd" }}
                                    className="shadow"
                                >
                                    <h1>Not Found</h1>
                                    <div>
                                        <img alt="Not Found" src={notFound} width={300} />
                                    </div>
                                </Card>
                            </Content>
                        </Layout>
                    </Col>
                </Row>
            </Layout>
        </Content>
    );
};

export default NotFound;
