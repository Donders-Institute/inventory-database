import React from "react";
import { Layout, Row, Col, BackTop, Card, Input, Button } from "antd";

import Header from "../Header/Header";
import Nav from "../Nav/Nav";

const { Content } = Layout;

const CategoryAdd: React.FC = () => {

    const addCategory = (event: any) => {
        //input added to the database
    }

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
                                            <h2>Add category</h2>
                                            <Row gutter={24}>
                                                <Col span={18}>
                                                    <Input id="categoryAdd" style={{width:"80%"}}></Input>
                                                </Col>
                                                <Col span={6}>
                                                    <Button type="primary" onClick={event => { addCategory(event); }}>Add</Button>
                                                </Col>
                                            </Row>
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

export default CategoryAdd;
