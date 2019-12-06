import React from "react";
import { Layout, Row, Col, BackTop } from "antd";

import Header from "../Header/Header";

const { Content } = Layout;

const CategoryView: React.FC = () => {
    return (
        <Content style={{ background: "none" }}>
            <Header />
            <Layout className="NormalLayout" style={{ padding: "0px" }}>
                <Row>
                    <Col span={24}>
                        <Layout style={{ padding: '0px', marginTop: "20px", marginBottom: "20px" }}>
                            <Content>

                            </Content>
                        </Layout>
                    </Col>
                </Row>
                <BackTop />
            </Layout>
        </Content>
    );
};

export default CategoryView;
