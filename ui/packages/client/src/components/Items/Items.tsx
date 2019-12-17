import React, { useContext, useState, useEffect } from "react";
import { Layout, Row, Col, BackTop, Icon, Spin, Card, Table, Input } from "antd";

import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import { AuthContext } from "../Auth/AuthContext";
import { Item, ItemList } from "../../types/types";
import { fetchDummyItemList } from "./fetch";

const { Content } = Layout;

const Items: React.FC = () => {
    const authContext = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [itemList, setItemList] = useState([] as ItemList);
    const [filteredItemList, setFilteredItemList] = useState([] as ItemList);
    const [searchText, setSearchText] = useState("");
    const antIcon = <Icon type="loading" style={{ fontSize: 24, margin: 10 }} spin />;

    useEffect(() => {
        const fetchData = async (Itemname: string, password: string) => {
            const newItemList = await fetchDummyItemList(Itemname, password);
            setItemList(newItemList);
            setFilteredItemList(newItemList);
            setIsLoading(false);
            console.log(newItemList);
        };
        fetchData(authContext!.username, authContext!.password);
    }, [authContext]);

    const handleSearch = (event: any) => {
        setSearchText(event.target.value);
    };

    useEffect(() => {
        if (searchText === "") {
            setFilteredItemList(itemList);
        } else {
            const newFilteredItemList = [] as ItemList;
            if (itemList) {
                for (let i = 0; i < itemList.length; i++) {
                    // Search on columns id, serialNumber and category
                    if (itemList[i].id.includes(searchText) || itemList[i].serialNumber.includes(searchText) || itemList[i].category.includes(searchText)) {
                        newFilteredItemList!.push(itemList[i]);
                    }
                }
                setFilteredItemList(newFilteredItemList);
            }
        }
    }, [searchText]);

    const columns = [
        {
            title: "Count",
            key: "count",
            dataIndex: "count",
            sorter: (a: Item, b: Item) => a.count - b.count,
            render: (count: number) => (
                <span>
                    <a href={"/item_view/" + count}>{count}</a>
                </span>
            )
        },
        {
            title: "Id",
            key: "id",
            dataIndex: "id",
            sorter: (a: Item, b: Item) => a.id.localeCompare(b.id),
            render: (id: string, row: Item) => (
                <span>
                    <a href={"/item_view/" + row.count}>{id}</a>
                </span>
            )
        },
        {
            title: "Serial Number",
            key: "serialNumber",
            dataIndex: "serialNumber",
            sorter: (a: Item, b: Item) => a.serialNumber.localeCompare(b.serialNumber),
            render: (serialNumber: string) => (
                <span>
                    {serialNumber}
                </span>
            )
        },
        {
            title: "Description",
            key: "description",
            dataIndex: "description",
            sorter: (a: Item, b: Item) => a.description.localeCompare(b.description),
            render: (description: string) => (
                <span>
                    {description}
                </span>
            )
        },
        {
            title: "Type",
            key: "type",
            dataIndex: "type",
            sorter: (a: Item, b: Item) => a.userName.localeCompare(b.userName),
            render: (type: string) => (
                <span>
                    {type}
                </span>
            )
        },
        {
            title: "Category",
            key: "category",
            dataIndex: "category",
            sorter: (a: Item, b: Item) => a.userName.localeCompare(b.userName),
            render: (category: string, row: Item) => (
                <span>
                    <a href={"/category_view/" + row.categoryCount}>{category}</a>
                </span>
            )
        },
        {
            title: "User",
            key: "userName",
            dataIndex: "userName",
            sorter: (a: Item, b: Item) => a.userName.localeCompare(b.userName),
            render: (userName: string, row: Item) => (
                <span>
                    <a href={"https://intranet.donders.ru.nl/apps/projects/users/view/" + userName}><Icon type="user" /></a>&nbsp;
                    <a href={"mailto:" + row.userEmail}><Icon type="mail" /></a>&nbsp;
                    <a href={"/item_view/" + userName}><Icon type="filter" /></a>&nbsp;
                    {userName}
                </span>
            )
        },
        {
            title: "Room",
            key: "roomNumber",
            dataIndex: "roomNumber",
            sorter: (a: Item, b: Item) => a.roomNumber.localeCompare(b.roomNumber),
            render: (roomNumber: string, row: Item) => (
                <span>
                    <a href={"https://intranet.donders.ru.nl/floormaps/?id=" + row.roomId}>
                        <Icon type="border" />
                    </a>&nbsp;
                    {roomNumber}
                </span>
            )
        },
        {
            title: "Hostname",
            key: "hostName",
            dataIndex: "hostName",
            sorter: (a: Item, b: Item) => a.hostName.localeCompare(b.hostName),
            render: (hostName: string) => (
                <span>
                    {hostName}
                </span>
            )
        },
        {
            title: "Commment",
            key: "comment",
            dataIndex: "comment",
            sorter: (a: Item, b: Item) => a.comment.localeCompare(b.comment),
            render: (comment: string) => (
                <span>
                    {comment}
                </span>
            )
        },
        {
            title: "Date out of guarantee",
            key: "dateOutOfGuarantee",
            dataIndex: "dateOutOfGuarantee",
            sorter: (a: Item, b: Item) => a.dateOutOfGuarantee.localeCompare(b.dateOutOfGuarantee),
            render: (dateOutOfGuarantee: string) => (
                <span>
                    {dateOutOfGuarantee}
                </span>
            )
        },
        {
            title: "Actions",
            key: "count",
            width: "10%",
            render: (count: number) => (
                <span>
                    <a href={"/item_view/" + count}>
                        <Icon type="eye" />
                    </a>&nbsp;
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
                        <Layout style={{ padding: "0px", background: "#fff", marginTop: "10px", marginBottom: "10px", minHeight: "900px" }}>
                            <Nav />
                            <Content>
                                <div style={{ padding: "10px 10px 10px 0px" }}>
                                    <Card
                                        className="NormalCard"
                                        size="small"
                                    >
                                        <Content>
                                            <h2>View items</h2>
                                            <Input
                                                placeholder="Seach id, serial number, category"
                                                onChange={event => { handleSearch(event); }}
                                                style={{ width: 400 }}
                                            />
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
                                                    dataSource={filteredItemList!}
                                                    size='middle'
                                                    style={{ width: "100%" }}
                                                    className={"table-items table"}
                                                />
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

export default Items;
