import React from "react";
import { Layout, Row, Col, BackTop, Card, Input } from "antd";

import Header from "../Header/Header";
import Nav from "../Nav/Nav";

const { Search } = Input;
const { Content } = Layout;

const Items: React.FC = () => {
    return (
        <Content style={{ background: "none" }}>
            <Header />
            <Layout className="NormalLayout" style={{ padding: "0px" }}>
                <Row>
                    <Col span={24}>
                        <Layout style={{ padding: "0px", background: "#fff", marginTop: "10px", marginBottom: "10px" }}>
                            <Nav />
                            <Content>
                                <div style={{ padding: "10px 10px 10px 0px" }}>
                                    <Card
                                        className="NormalCard"
                                        size="small"
                                    >
                                        <div style={{ marginBottom: "20px" }}>
                                            <h2>Quick edit item</h2>
                                            <Search
                                                placeholder="Item number"
                                                onSearch={(value: any) => console.log(value)}
                                                style={{ width: 300 }}
                                            />
                                        </div>
                                        <div style={{ marginBottom: "20px" }}>
                                            <h2>View items</h2>
                                        </div>
                                    </Card>
                                </div>
                            </Content>
                        </Layout>
                    </Col>
                </Row>
                <BackTop />
            </Layout >
        </Content>
    );
};

export default Items;
