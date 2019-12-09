import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { Category, CategoryList } from "../../types/types";

export const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Fake fetcher for testing purposes
export const fetchDummyCategoryList = async (Categoryname: string, password: string) => {
    console.log("Fetching categories ...");
    await timeout(2000);
    const CategoryList = [
        {
            count: 1,
            description: "Product A"
        },
        {
            count: 2,
            description: "Product B"
        }
    ] as unknown as CategoryList;
    return CategoryList;
};

const handleGetCategorysResponse = (response: AxiosResponse) => {
    return response;
};

const handleGetCategorysError = (error: AxiosError) => {
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

const handleGetCategorysRequest = (username: string, password: string) => {
    return new Promise<AxiosResponse | AxiosError>((resolve) => {
        const config: AxiosRequestConfig = {
            url: "/categories",
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
                .then(handleGetCategorysResponse)
                .catch(handleGetCategorysError));
    });
};

function isAxiosResponse(result: AxiosResponse | AxiosError): result is AxiosResponse {
    return (result as AxiosResponse).data !== undefined;
}

interface SQLQueryCategoryElement {
    description: string;
}

export const fetchCategoryList = async (username: string, password: string) => {
    console.log("Fetching categories ...");
    const result = await handleGetCategorysRequest(username, password);
    let categoryList = [] as unknown as CategoryList;
    if (isAxiosResponse(result)) {
        if (result.data) {
            if (result.data.data) {
                const data = result.data.data;
                for (let i = 0; i < data.length; i++) {
                    const categoryElement: SQLQueryCategoryElement = data[i];
                    const category = {
                        count: i,
                        description: categoryElement.description
                    } as Category;
                    categoryList!.push(category);
                }
            }
        }
    }
    return categoryList;
};