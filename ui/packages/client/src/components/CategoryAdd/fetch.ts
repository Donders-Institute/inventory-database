import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { Category, CategoryList } from "../../types/types";

export const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Fake fetcher for testing purposes
export const fetchDummyCategoryListCount = async (username: string, password: string) => {
    console.log("Counting categories ...");
    await timeout(2000);
    return 0;
};

const handleCountCategoriesResponse = (response: AxiosResponse) => {
    return response;
};

const handleCountCategoriesError = (error: AxiosError) => {
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

const handleCountCategoriesRequest = (username: string, password: string) => {
    return new Promise<AxiosResponse | AxiosError>((resolve) => {
        const config: AxiosRequestConfig = {
            url: "/count_categories",
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
                .then(handleCountCategoriesResponse)
                .catch(handleCountCategoriesError));
    });
};

function isAxiosResponse(result: AxiosResponse | AxiosError): result is AxiosResponse {
    return (result as AxiosResponse).data !== undefined;
}

export const fetchCategoryListCount = async (username: string, password: string) => {
    console.log("Counting categories ...");
    const result = await handleCountCategoriesRequest(username, password);
    let count = 0;
    if (isAxiosResponse(result)) {
        if (result.data) {
            if (result.data.data) {
                const data = result.data.data;
                count = data as number;
            }
        }
    }
    return count;
};