import React from "react";
import { Layout, Row, Col, BackTop, Card } from "antd";

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
                                        <tr>
                                            <td style={{ width: "400px", height: "300px" }}>
                                                <hr>Required Information</hr>
                                                <div id="">
                                                    <label>Inventory ID</label>
                                                </div>
                                            </td>
                                            <td style={{ width: "400px", height: "300px" }}>
                                            </td>
                                            <td style={{ width: "400px", height: "300px" }}>
                                            </td>

                                        </tr>
                                        {/* <div style={{ marginBottom: "20px" }}>
                                            <h2>Add item</h2>
                                            <h1>Required information</h1>
                                            <Input id="Inventory_ID" style={{ width: "200px" }} placeholder="Inventory ID" />
                                        </div> */}
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
