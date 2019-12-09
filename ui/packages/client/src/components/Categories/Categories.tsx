import React, { useContext, useState, useEffect } from "react";
import { Layout, Row, Col, BackTop, Icon, Spin, Card, Table } from "antd";

import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import { AuthContext } from "../Auth/AuthContext";
import { Category, CategoryList } from "../../types/types";
import { fetchDummyCategoryList } from "./fetch";

const { Content } = Layout;

const Categories: React.FC = () => {
    const authContext = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([] as CategoryList);
    const antIcon = <Icon type="loading" style={{ fontSize: 24, margin: 10 }} spin />;

    useEffect(() => {
        const fetchData = async (Categoryname: string, password: string) => {
            const newCategoryList = await fetchDummyCategoryList(Categoryname, password);
            setCategoryList(newCategoryList);
            setIsLoading(false);
            console.log(newCategoryList);
        };
        fetchData(authContext!.username, authContext!.password);
    }, [authContext]);

    const columns = [
        {
            title: "Name",
            key: "description",
            dataIndex: "description",
            sorter: (a: Category, b: Category) => a.description.localeCompare(b.description),
            render: (description: string, row: Category) => (
                <span>
                    <a href={"/category_view/" + row.count}>{description}</a>
                </span>
            )
        },
        {
            title: "Actions",
            key: "count",
            width: "10%",
            render: (count: number) => (
                <span>
                    <a href={"/item_edit/" + count}>
                        <Icon type="edit" />
                    </a>
                </span >
            )
        }
    ];

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
                                        <Content>
                                            <h2>View categories</h2>
                                            {isLoading &&
                                                <Content>
                                                    <div>Loading ...</div>
                                                    <Spin indicator={antIcon} />
                                                </Content>
                                            }
                                            {!isLoading &&
                                                <Table
                                                    pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ["10", "15", "20", "50", "100"] }}
                                                    columns={columns}
                                                    dataSource={categoryList!}
                                                    size='middle'
                                                    style={{ width: "100%" }} />
                                            }
                                        </Content>
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

export default Categories;
