import React, { useState, useContext } from "react";
import {
    Card,
    Form,
    Icon,
    Button,
    Input,
    Layout,
    Row,
    Col,
    Spin,
    Modal
} from "antd";
import { FormComponentProps } from "antd/lib/form";
import { Redirect } from "react-router-dom";
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";

import { AuthContext } from "../Auth/AuthContext";

import HeaderLogin from "../Header/HeaderLogin";

import "../../App.less";
import logoDCCN from "../../assets/dccn-logo.png";

const { Content } = Layout;

function modalError(msg: string) {
    Modal.error({
        title: "Error",
        content: msg,
        onOk() {
            Modal.destroyAll();
        }
    });
}

const LoginForm: React.FC<FormComponentProps> = ({ form }) => {
    const authContext = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const { getFieldDecorator } = form;
    const antIcon = <Icon type="loading" style={{ fontSize: 24, margin: 10 }} spin />;

    const handleLoginResponse = (response: AxiosResponse) => {
        if (response.data) {
            if (response.data.error) {
                const error = new Error(response.data.error);
                setIsAuthenticated(() => false);
                setLoggingIn(() => false);
                setHasSubmitted(() => false);
                modalError(response.data.error);
                return error;
            }
            setIsAuthenticated(() => true);
            setLoggingIn(() => false);
            setHasSubmitted(() => false);
            setUsername(() => username);
            setPassword(() => password);
            authContext!.signIn(username, password);
        }
    };

    const handleLoginError = (error: AxiosError) => {
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
        setIsAuthenticated(() => false);
        setLoggingIn(() => false);
        setHasSubmitted(() => false);
        console.log(errorMessage);
        modalError(errorMessage);
        return error;
    };

    const handleLogin = (username: string, password: string) => {
        return new Promise((resolve) => {
            const config: AxiosRequestConfig = {
                url: "/login",
                method: "post",
                timeout: 2000,
                withCredentials: true,
                auth: {
                    username: username,
                    password: password
                },
                data: {
                    username: username,
                    password: password
                },
                responseType: "json"
            };

            resolve(
                axios(config)
                    .then(handleLoginResponse)
                    .catch(handleLoginError));
        });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setUsername(() => username);
        setPassword(() => password);
        setIsAuthenticated(() => false);
        setLoggingIn(() => true);
        setHasSubmitted(() => true);
        handleLogin(username, password);
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const username = e.target.value;
        setUsername(() => username);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setPassword(() => password);
    };

    return (
        <div>
            {/* {
                !authContext!.isAuthenticated &&
                <Button
                    onClick={() => authContext!.signIn("testuser", "testpassword")}>
                    Authenticate testuser
                </Button>
            } */}
            {
                isAuthenticated &&
                <Redirect to="/" />
            }
            {
                authContext!.isAuthenticated &&
                <Redirect to="/" />
            }
            {
                loggingIn && hasSubmitted && !isAuthenticated &&
                <Content style={{ background: "#f0f2f5", marginTop: "10px" }}>
                    <Spin indicator={antIcon} />
                </Content>
            }
            {
                !loggingIn && !hasSubmitted && !isAuthenticated &&
                <Content>
                    <HeaderLogin />
                    <Content className="Login">
                        <Row type="flex" justify="center" align="middle" style={{ width: "100%" }}>
                            <Col span={2}>
                            </Col>
                            <Col span={20} style={{ display: "flex", justifyContent: "center" }}>
                                <Card className="LoginCard">
                                    <div style={{ display: "flex", justifyContent: "center", margin: "0px 0px 20px 0px" }}>
                                        <img alt="Donders Institute" src={logoDCCN} height={64} />
                                    </div>
                                    <h2 style={{ display: "flex", justifyContent: "center", margin: "0px 0px 10px 0px" }}>
                                        Inventory Database
                                    </h2>
                                    <h1 style={{ display: "flex", justifyContent: "center", margin: "0px 0px 20px 0px" }}>
                                        Please login
                                    </h1>
                                    <div style={{ fontSize: "small", margin: "0px 0px 0px 0px" }}>

                                    </div>
                                    <Form className="login-form" onSubmit={handleSubmit} style={{ margin: "0px 0px 0px 0px" }}>
                                        <Form.Item style={{ margin: "0px 0px 0px 0px" }}>
                                            {getFieldDecorator("username", {
                                                rules: [{ required: true, message: "Please input your DCCN username" }]
                                            })(
                                                <Input
                                                    prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                                                    placeholder="User name"
                                                    onChange={handleUsernameChange}
                                                />,
                                            )}
                                        </Form.Item>
                                        <Form.Item style={{ margin: "0px 0px 10px 0px" }}>
                                            {getFieldDecorator("password", {
                                                rules: [{ required: true, message: "Please input your password" }]
                                            })(
                                                <Input
                                                    prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                                                    type="password"
                                                    placeholder="Password"
                                                    onChange={handlePasswordChange}
                                                />,
                                            )}
                                        </Form.Item>
                                        <Form.Item style={{ margin: "0px 0px 10px 0px" }}>
                                            <Button className="login-form-button" type="primary" htmlType="submit">
                                                Log in
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Card>
                            </Col>
                            <Col span={2}>
                            </Col>
                        </Row>
                    </Content>
                </Content>
            }
        </div>
    );
};

const Login = Form.create<FormComponentProps>()(LoginForm);

export default Login;
