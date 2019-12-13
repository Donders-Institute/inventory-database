import React from "react";
import { Layout, Row, Col, BackTop, Card, Form, Input } from "antd";

import Header from "../Header/Header";
import Nav from "../Nav/Nav";

const { Content } = Layout;

const ItemAdd: React.FC = () => {
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
                                            <h1>ADD ITEM</h1>
                                            <Row gutter={24}>
                                                <Col span={7}>
                                                    <h2 style={{ marginBottom: 20 }}>Required Information</h2>
                                                    <h4>Inventory ID</h4>
                                                    <Input style={{ width: "80%", marginBottom: 30 }}></Input>
                                                    <h4>Product Type</h4>
                                                </Col>
                                                <Col span={7}>
                                                    <h2 style={{ marginBottom: 20 }}>Supplier details</h2>
                                                    <h4>Supplier</h4>
                                                    <Input style={{ width: "80%", marginBottom: 30 }}></Input>
                                                </Col>
                                                <Col span={7}>
                                                    <h2 style={{ marginBottom: 20 }}>Pricing and Warranty</h2>
                                                    <h4>Guarantee Period</h4>
                                                    <Input style={{ width: "80%", marginBottom: 30 }}></Input>
                                                </Col>
                                                <Col span={3}></Col>
                                            </Row>
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

export default ItemAdd;
