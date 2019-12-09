import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { User, UserList } from "./types";

export const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Fake fetcher for testing purposes
export const fetchDummyUserList = async (username: string, password: string) => {
    console.log("Fetching users ...");
    await timeout(2000);
    const userList = [
        {
            userName: "rutvdee",
            displayName: "Rutger van Deelen"
        }
    ] as unknown as UserList;
    return userList;
};

const handleGetUsersResponse = (response: AxiosResponse) => {
    return response;
};

const handleGetUsersError = (error: AxiosError) => {
    var errorMessage = "";
    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        errorMessage = JSON.stringify(error.response.data, null, 2);
    } else {
        console.log(error.message);
        errorMessage = error.message;
    }
    console.log(errorMessage);
    alert(error);
    return error;
};

const handleGetUsersRequest = (username: string, password: string) => {
    return new Promise<AxiosResponse | AxiosError>((resolve) => {
        const config: AxiosRequestConfig = {
            url: "/users",
            method: "get",
            headers: { "Content-Type": "application/json" },
            data: {
            },
            timeout: 5000,
            withCredentials: true,
            auth: {
                username: username,
                password: password
            },
            responseType: "json"
        };

        resolve(
            axios(config)
                .then(handleGetUsersResponse)
                .catch(handleGetUsersError));
    });
};

function isAxiosResponse(result: AxiosResponse | AxiosError): result is AxiosResponse {
    return (result as AxiosResponse).data !== undefined;
}

interface SQLQueryUserElement {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
}

export const fetchUserList = async (username: string, password: string) => {
    console.log("Fetching users ...");
    const result = await handleGetUsersRequest(username, password);
    let UserList = [] as unknown as UserList;
    if (isAxiosResponse(result)) {
        if (result.data) {
            if (result.data.data) {
                const data = result.data.data;
                for (let i = 0; i < data.length; i++) {
                    const userElement: SQLQueryUserElement = data[i];
                    const userName = userElement.id;
                    const displayName = [userElement.firstName, userElement.middleName, userElement.lastName].join(" ");
                    const User = { userName: userName, displayName: displayName } as User;
                    UserList!.push(User);
                }
            }
        }
    }
    return UserList;
};