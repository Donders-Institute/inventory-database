import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Layout, Row, Col, Icon, Menu, Button, Modal } from "antd";
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";

import { AuthContext } from "../Auth/AuthContext";
import { NavContext } from "../Nav/NavContext";

import "../../App.less";

import logoDCCN from "../../assets/donders-logo.svg";

const { SubMenu } = Menu;

function modalError(msg: string) {
    Modal.error({
        title: "Error",
        content: msg,
        onOk() {
            Modal.destroyAll();
        }
    });
}

const Header: React.FC = () => {
    const authContext = useContext(AuthContext);
    const userName = authContext!.username;
    const navContext = useContext(NavContext);

    const handleLogoutResponse = (response: AxiosResponse) => {
        authContext!.signOut();
    };

    const handleLogoutError = (error: AxiosError) => {
        var errorMessage = "could not connect to inventory database ui server";
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            if (error.response.data) {
                errorMessage = JSON.stringify(error.response.data, null, 2);
            }
        } else {
            console.log(error.message);
            errorMessage = error.message;
        }
        modalError(errorMessage);
        return error;
    };

    const handleLogout = () => {
        return new Promise((resolve) => {
            const config: AxiosRequestConfig = {
                url: "/logout",
                method: "post",
                timeout: 2000,
                withCredentials: true,
                auth: {
                    username: authContext!.username,
                    password: authContext!.password
                },
                responseType: "json"
            };

            resolve(
                axios(config)
                    .then(handleLogoutResponse)
                    .catch(handleLogoutError));
        });
    };

    return (
        <Layout>
            <div>
                <Layout>
                    <Layout.Header className="App-header-top"></Layout.Header>
                </Layout>
                <Layout>
                    <Layout.Header className="App-header">
                        <Row type="flex" justify="space-between">
                            <Col>
                                <Menu
                                    className="App-header-menu"
                                    theme="dark"
                                    mode="horizontal"
                                    selectedKeys={[]}
                                >
                                    <Menu.Item key="NAV_HOME" style={{ float: "left" }}>
                                        <NavLink to="/" onClick={() => {
                                            navContext!.setKey("NAV_ITEMS");
                                        }}>
                                            <img alt="DCCN" src={logoDCCN} style={{ width: "20px", height: "20px", verticalAlign: "middle", marginRight: "10px" }} />
                                            <span style={{ margin: "0px 10px 0px 0px" }}>INVENTORY DATABASE</span>
                                        </NavLink>
                                    </Menu.Item>
                                </Menu>
                            </Col>
                            <Col>
                                <Menu
                                    className="App-header-menu"
                                    theme="dark"
                                    mode="horizontal"
                                    selectedKeys={[]}
                                >
                                    <SubMenu
                                        key="NAV_PROFILE"
                                        title={
                                            <span>
                                                <Icon type="user" style={{ marginRight: "4px" }} />
                                                <span>{userName}</span>
                                                <Icon type="caret-down" style={{ margin: "0px" }} />
                                            </span>
                                        }
                                        style={{ float: "right" }}
                                    >
                                        <Menu.Item key="NAV_PROFILE_LOGOUT">
                                            <Button size="small" onClick={handleLogout} style={{ color: "#fff" }}>
                                                Log out
                                            </Button>
                                        </Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </Col>
                        </Row>
                    </Layout.Header>
                </Layout>
            </div>
        </Layout >
    );
};

export default Header;
