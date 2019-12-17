import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Layout, Card, Menu } from "antd";

import { NavContext } from "./NavContext";
import "../../App.less";

const { Sider } = Layout;

const Nav: React.FC = () => {

    const navContext = useContext(NavContext);
    const selectedKeys = [navContext!.key];

    return (
        <Sider
            width="240px"
            style={{
                background: "transparent"
            }}
        >
            <div style={{ padding: "10px 10px 10px 0px" }}>
                <Card
                    className="NormalCard"
                    size="small"
                >
                    <Menu
                        mode="inline"
                        selectedKeys={selectedKeys}
                        style={{ height: "100%" }}
                    >
                        <Menu.Item key="NAV_ITEMS" className="MenuItem">
                            <NavLink to="/items" onClick={() => { navContext!.setKey("NAV_ITEMS"); }}>
                                View items
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="NAV_ITEMS_ADD" className="MenuItem">
                            <NavLink to="/items_add" onClick={() => { navContext!.setKey("NAV_ITEMS_ADD"); }}>
                                Add items
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="NAV_CATEGORIES" className="MenuItem">
                            <NavLink to="/categories" onClick={() => { navContext!.setKey("NAV_CATEGORIES"); }}>
                                View categories
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="NAV_CATEGORY_ADD" className="MenuItem">
                            <NavLink to="/category_add" onClick={() => { navContext!.setKey("NAV_CATEGORY_ADD"); }}>
                                Add category
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="NAV_USERS" className="MenuItem">
                            <NavLink to="/users" onClick={() => { navContext!.setKey("NAV_USERS"); }}>
                                View users
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="NAV_BORROW_ITEMS_MANAGE" className="MenuItem">
                            <NavLink to="/borrow_items_manage" onClick={() => { navContext!.setKey("NAV_BORROW_ITEMS_MANAGE"); }}>
                                Manage borrow items
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="NAV_LAB_ITEMS_MANAGE" className="MenuItem">
                            <NavLink to="/lab_items_manage" onClick={() => { navContext!.setKey("NAV_LAB_ITEMS_MANAGE"); }}>
                                Manage lab items
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="NAV_REPORT" className="MenuItem">
                            <NavLink to="/report" onClick={() => { navContext!.setKey("NAV_REPORT"); }}>
                                Get report
                            </NavLink>
                        </Menu.Item>
                    </Menu>
                </Card >
            </div>
        </Sider>
    );
};

export default Nav;