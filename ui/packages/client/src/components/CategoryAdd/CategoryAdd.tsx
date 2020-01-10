import React, { useContext, useState, useEffect } from "react";
import { Layout, Row, Col, BackTop, Card, Input, Button, Icon, Spin } from "antd";

import Header from "../Header/Header";
import Nav from "../Nav/Nav";

import { AuthContext } from "../Auth/AuthContext";
import { Category, CategoryList } from "../../types/types";
import { fetchDummyCategoryListCount } from "./fetch";
import { postDummyCategoryList } from "./post";

const { Content } = Layout;

const CategoryAdd: React.FC = () => {
    const authContext = useContext(AuthContext);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([] as CategoryList);
    const antIcon = <Icon type="loading" style={{ fontSize: 24, margin: 10 }} spin />;

    // Count the number of categories in the database
    useEffect(() => {
        const fetchData = async (username: string, password: string) => {
            const newCount = await fetchDummyCategoryListCount(username, password);
            setCount(newCount);
            setIsLoading(false);
        };
        fetchData(authContext!.username, authContext!.password);
    }, [authContext]);

    const handleChange = (event: any) => {
        // Store the new category in a list which has only one item
        const newCategory = { count: count + 1, description: event.target.value } as Category;
        const newCategoryList = [newCategory] as CategoryList;
        setCategoryList(categoryList => newCategoryList);
    }

    const addCategory = (event: any) => {
        postDummyCategoryList(authContext!.username, authContext!.password, categoryList);
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
                                            {isLoading &&
                                                <Content>
                                                    <div>Loading ...</div>
                                                    <Spin indicator={antIcon} />
                                                </Content>
                                            }
                                            {!isLoading &&
                                                <Row gutter={24}>
                                                    <Col span={18}>
                                                        <Input
                                                            placeholder="Search id, serial number, category"
                                                            onChange={event => { handleChange(event); }}
                                                            style={{ width: "80%" }}
                                                        />
                                                    </Col>
                                                    <Col span={6}>
                                                        <Button type="primary" onClick={event => { addCategory(event); }}>Add</Button>
                                                    </Col>
                                                </Row>
                                            }
                                        </div>
                                    </Card>
                                </div>
                            </Content>
                        </Layout>
                    </Col>
                </Row>
                <BackTop />
            </Layout >
        </Content >
    );
};

export default CategoryAdd;
