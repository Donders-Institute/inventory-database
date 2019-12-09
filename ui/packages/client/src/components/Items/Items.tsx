import React, { useState } from "react";
import { Layout, Row, Col, BackTop, Card, Input, Table } from "antd";

import Header from "../Header/Header";
import Nav from "../Nav/Nav";

const { Search } = Input;
const { Content } = Layout;

interface InventoryItem {
    id: number;
}

const Items: React.FC = () => {

    const [inventory, setInventory] = useState([] as InventoryItem[]);

    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        setInventory(extra.currentDataSource);
    };

    const columns = [
        {
            title: "Id",
            key: "Id",
            dataIndex: "id" 
        },
        {
            title: "Description",
            key: "Description",
            dataIndex: "description"
        }
    ]; 

    // const inventory = [
    //     {
    //         Id: ""
    //     },
    //     {
    //         Description: ""
    //     }
    // ];

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
                                        <div>
                                        <Table
                                                pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ["10", "15", "20", "50", "100"] }}
                                                columns={columns}
                                                dataSource={inventory}
                                                size="middle"
                                                onChange={onChange} />
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
