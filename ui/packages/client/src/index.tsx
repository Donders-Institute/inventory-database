import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import App from "./components/App";
import { AuthProvider } from "./components/Auth/AuthContext";
import { NavProvider, KeyValues } from "./components/Nav/NavContext";

import "./index.less";

const Root: React.FC = () => {

    // Set auth context

    const signIn = (username: string, password: string) => {
        setAuthContext(state => (
            {
                ...state,
                username: username,
                password: password,
                isAuthenticated: true
            }
        ));
    };

    const signOut = () => {
        setAuthContext(state => (
            {
                ...state,
                username: "",
                password: "",
                isAuthenticated: false
            }
        ));
    };

    const [authContext, setAuthContext] = useState({
        username: "",
        password: "",
        isAuthenticated: false,
        signIn: signIn,
        signOut: signOut
    });

    // Set the navigation context

    const setKey = (key: (typeof KeyValues)[number]) => {
        setNavContext(state => (
            {
                ...state,
                key: key
            }
        ));
    };

    const [navContext, setNavContext] = useState({
        key: "NAV_ITEMS" as (typeof KeyValues)[number],
        setKey: setKey
    });

    return (
        <AuthProvider value={authContext}>
            <NavProvider value={navContext}>
                <Router>
                    <App />
                </Router>
            </NavProvider>
        </AuthProvider>
    );
};

render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
