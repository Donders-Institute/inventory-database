import React from "react";
import { Switch, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Items from "./Items/Items";
import Login from "./Login/Login";
import NotFound from "./NotFound/NotFound";

import "../App.less";

const App: React.FC = () => {
    return (
        <Switch>
            <Route path="/login" exact={true} component={Login} />
            <ProtectedRoute path="/" exact={true} component={Items} />
            <ProtectedRoute component={NotFound} />
        </Switch>
    );
};

export default App;
