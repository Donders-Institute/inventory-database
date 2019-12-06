import React from "react";
import { Layout, Card, Icon } from "antd";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const { Content } = Layout;

const Items: React.FC = () => {
    return (
        <Content style={{ background: "#f0f2f5" }}>
            <Header />
            <Footer />
        </Content>
    );
};

export default Items;
