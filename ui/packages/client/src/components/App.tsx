import React from "react";
import { Switch, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Login from "./Login/Login";

import Items from "./Items/Items";
import ItemView from "./ItemView/ItemView";
import ItemsAdd from "./ItemsAdd/ItemsAdd";
import ItemEdit from "./ItemEdit/ItemEdit";
import Categories from "./Categories/Categories";
import CategoryView from "./CategoryView/CategoryView";
import CategoryAdd from "./CategoryAdd/CategoryAdd";
import CategoryEdit from "./CategoryEdit/CategoryEdit";
import Users from "./Users/Users";
import UserView from "./UserView/UserView";
import BorrowItemsManage from "./BorrowItemsManage/BorrowItemsManage";
import LabItemsManage from "./LabItemsManage/LabItemsManage";
import Report from "./Report/Report";

import NotFound from "./NotFound/NotFound";

import "../App.less";

const App: React.FC = () => {
    return (
        <Switch>
            <Route path="/login" exact={true} component={Login} />
            <ProtectedRoute path="/" exact={true} component={Items} />
            <ProtectedRoute path="/items" exact={true} component={Items} />
            <ProtectedRoute path="/items_add" exact={true} component={ItemsAdd} />
            <ProtectedRoute path="/item_view/:id" exact={true} component={ItemView} />
            <ProtectedRoute path="/item_edit/:id" exact={true} component={ItemEdit} />
            <ProtectedRoute path="/categories" exact={true} component={Categories} />
            <ProtectedRoute path="/category_add" exact={true} component={CategoryAdd} />
            <ProtectedRoute path="/category_view/:id" exact={true} component={CategoryView} />
            <ProtectedRoute path="/category_edit/:id" exact={true} component={CategoryEdit} />
            <ProtectedRoute path="/users" exact={true} component={Users} />
            <ProtectedRoute path="/user_view/:id" exact={true} component={UserView} />
            <ProtectedRoute path="/borrow_items_manage" exact={true} component={BorrowItemsManage} />
            <ProtectedRoute path="/lab_items_manage" exact={true} component={LabItemsManage} />
            <ProtectedRoute path="/report" exact={true} component={Report} />
            <ProtectedRoute component={NotFound} />
        </Switch>
    );
};

export default App;
