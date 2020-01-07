import React from "react";
import { Layout, Row, Col, BackTop, Card, Form, Input, Button } from "antd";

import Header from "../Header/Header";
import Nav from "../Nav/Nav";

const { Content } = Layout;

const ItemsAdd: React.FC = () => {
    return (
        <Content style={{ background: "none" }}>
            <Header />
            <Layout className="NormalLayout" style={{ padding: "0px" }}>
                <Row>
                    <Col span={24}>
                        <Layout style={{ padding: "0px", background: "#fff", marginTop: "10px", marginBottom: "10px", minHeight: "900px" }}>
                            <Nav />
                            <Content>
                                <div style={{ margin: "10px 10px 10px 0px" }}>
                                    <Card
                                        className="NormalCard"
                                        size="small"
                                    >
                                        <Form>
                                            <h2>Add items</h2>
                                            <div className="ad">
                                                <Row gutter={24}>
                                                    <Col span={6}>
                                                        <h4 style={{ marginLeft: 10 }}>ID</h4>
                                                        <Input style={{ width: "90%", marginBottom: 20, marginLeft: "10px" }}></Input>
                                                    </Col>
                                                    <Col span={6}>
                                                        <h4>Serial Number</h4>
                                                        <Input style={{ width: "90%", marginBottom: 20 }}></Input>
                                                    </Col>
                                                    <Col span={6}>
                                                        <h4>Type</h4>
                                                        <Input style={{ width: "90%", marginBottom: 20 }}></Input>
                                                    </Col>
                                                    <Col span={3}>
                                                        <Button type="primary" icon="download" size="large" style={{ marginTop: "80%" }}>
                                                            
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Form>
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

export default ItemsAdd;