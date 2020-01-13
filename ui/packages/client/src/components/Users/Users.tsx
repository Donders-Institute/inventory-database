import React, { useContext, useState, useEffect } from "react";
import { Layout, Row, Col, BackTop, Icon, Spin, Card, Table } from "antd";

import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import { AuthContext } from "../Auth/AuthContext";
import { User, UserList } from "../../types/types";
import { fetchUserList } from "./fetch";

const { Content } = Layout;

const Users: React.FC = () => {
    const authContext = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [userList, setUserList] = useState([] as UserList);
    const antIcon = <Icon type="loading" style={{ fontSize: 24, margin: 10 }} spin />;

    useEffect(() => {
        const fetchData = async (username: string, password: string) => {
            const newUserList = await fetchUserList(username, password);
            setUserList(newUserList);
            setIsLoading(false);
            console.log(newUserList);
        };
        fetchData(authContext!.username, authContext!.password);
    }, [authContext]);

    const columns = [
        {
            title: "User name",
            key: "userName",
            dataIndex: "userName",
            sorter: (a: User, b: User) => a.userName.localeCompare(b.userName),
            render: (userName: string, row: User) => (
                <span>
                    <a href={"https://intranet.donders.ru.nl/apps/projects/users/view/" + userName}><Icon type="user" /></a>&nbsp;
                    <a href={"mailto:" + row.email}><Icon type="mail" /></a>&nbsp;
                    <a href={"/item_view/" + userName}><Icon type="filter" /></a>&nbsp;
                    {userName}
                </span>
            )
        },
        {
            title: "Name",
            key: "displayName",
            dataIndex: "displayName",
            sorter: (a: User, b: User) => a.displayName.localeCompare(b.displayName),
            render: (displayName: string) => (
                <span>
                    {displayName}
                </span>
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
                                            <h2>View users</h2>
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
                                                    dataSource={userList!}
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

export default Users;
